(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * css-vars-ponyfill
 * v2.0.2
 * https://jhildenbiddle.github.io/css-vars-ponyfill/
 * (c) 2018-2019 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, 
    global.cssVars = factory());
})(this, function() {
    "use strict";
    function _extends() {
        _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        return _extends.apply(this, arguments);
    }
    function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }
    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
            return arr2;
        }
    }
    function _iterableToArray(iter) {
        if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }
    function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
    }
    /*!
   * get-css-data
   * v1.6.3
   * https://github.com/jhildenbiddle/get-css-data
   * (c) 2018-2019 John Hildenbiddle <http://hildenbiddle.com>
   * MIT license
   */    function getUrls(urls) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var settings = {
            mimeType: options.mimeType || null,
            onBeforeSend: options.onBeforeSend || Function.prototype,
            onSuccess: options.onSuccess || Function.prototype,
            onError: options.onError || Function.prototype,
            onComplete: options.onComplete || Function.prototype
        };
        var urlArray = Array.isArray(urls) ? urls : [ urls ];
        var urlQueue = Array.apply(null, Array(urlArray.length)).map(function(x) {
            return null;
        });
        function isValidCss() {
            var cssText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var isHTML = cssText.trim().charAt(0) === "<";
            return !isHTML;
        }
        function onError(xhr, urlIndex) {
            settings.onError(xhr, urlArray[urlIndex], urlIndex);
        }
        function onSuccess(responseText, urlIndex) {
            var returnVal = settings.onSuccess(responseText, urlArray[urlIndex], urlIndex);
            responseText = returnVal === false ? "" : returnVal || responseText;
            urlQueue[urlIndex] = responseText;
            if (urlQueue.indexOf(null) === -1) {
                settings.onComplete(urlQueue);
            }
        }
        var parser = document.createElement("a");
        urlArray.forEach(function(url, i) {
            parser.setAttribute("href", url);
            parser.href = String(parser.href);
            var isIElte9 = Boolean(document.all && !window.atob);
            var isIElte9CORS = isIElte9 && parser.host.split(":")[0] !== location.host.split(":")[0];
            if (isIElte9CORS) {
                var isSameProtocol = parser.protocol === location.protocol;
                if (isSameProtocol) {
                    var xdr = new XDomainRequest();
                    xdr.open("GET", url);
                    xdr.timeout = 0;
                    xdr.onprogress = Function.prototype;
                    xdr.ontimeout = Function.prototype;
                    xdr.onload = function() {
                        if (isValidCss(xdr.responseText)) {
                            onSuccess(xdr.responseText, i);
                        } else {
                            onError(xdr, i);
                        }
                    };
                    xdr.onerror = function(err) {
                        onError(xdr, i);
                    };
                    setTimeout(function() {
                        xdr.send();
                    }, 0);
                } else {
                    console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(url, ")"));
                    onError(null, i);
                }
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                if (settings.mimeType && xhr.overrideMimeType) {
                    xhr.overrideMimeType(settings.mimeType);
                }
                settings.onBeforeSend(xhr, url, i);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200 && isValidCss(xhr.responseText)) {
                            onSuccess(xhr.responseText, i);
                        } else {
                            onError(xhr, i);
                        }
                    }
                };
                xhr.send();
            }
        });
    }
    /**
   * Gets CSS data from <style> and <link> nodes (including @imports), then
   * returns data in order processed by DOM. Allows specifying nodes to
   * include/exclude and filtering CSS data using RegEx.
   *
   * @preserve
   * @param {object}   [options] The options object
   * @param {object}   [options.rootElement=document] Root element to traverse for
   *                   <link> and <style> nodes.
   * @param {string}   [options.include] CSS selector matching <link> and <style>
   *                   nodes to include
   * @param {string}   [options.exclude] CSS selector matching <link> and <style>
   *                   nodes to exclude
   * @param {object}   [options.filter] Regular expression used to filter node CSS
   *                   data. Each block of CSS data is tested against the filter,
   *                   and only matching data is included.
   * @param {object}   [options.useCSSOM=false] Determines if CSS data will be
   *                   collected from a stylesheet's runtime values instead of its
   *                   text content. This is required to get accurate CSS data
   *                   when a stylesheet has been modified using the deleteRule()
   *                   or insertRule() methods because these modifications will
   *                   not be reflected in the stylesheet's text content.
   * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
   *                   1) the XHR object, 2) source node reference, and 3) the
   *                   source URL as arguments.
   * @param {function} [options.onSuccess] Callback on each CSS node read. Passes
   *                   1) CSS text, 2) source node reference, and 3) the source
   *                   URL as arguments.
   * @param {function} [options.onError] Callback on each error. Passes 1) the XHR
   *                   object for inspection, 2) soure node reference, and 3) the
   *                   source URL that failed (either a <link> href or an @import)
   *                   as arguments
   * @param {function} [options.onComplete] Callback after all nodes have been
   *                   processed. Passes 1) concatenated CSS text, 2) an array of
   *                   CSS text in DOM order, and 3) an array of nodes in DOM
   *                   order as arguments.
   *
   * @example
   *
   *   getCssData({
   *     rootElement: document,
   *     include    : 'style,link[rel="stylesheet"]',
   *     exclude    : '[href="skip.css"]',
   *     filter     : /red/,
   *     useCSSOM   : false,
   *     onBeforeSend(xhr, node, url) {
   *       // ...
   *     }
   *     onSuccess(cssText, node, url) {
   *       // ...
   *     }
   *     onError(xhr, node, url) {
   *       // ...
   *     },
   *     onComplete(cssText, cssArray, nodeArray) {
   *       // ...
   *     }
   *   });
   */    function getCssData(options) {
        var regex = {
            cssComments: /\/\*[\s\S]+?\*\//g,
            cssImports: /(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g
        };
        var settings = {
            rootElement: options.rootElement || document,
            include: options.include || 'style,link[rel="stylesheet"]',
            exclude: options.exclude || null,
            filter: options.filter || null,
            useCSSOM: options.useCSSOM || false,
            onBeforeSend: options.onBeforeSend || Function.prototype,
            onSuccess: options.onSuccess || Function.prototype,
            onError: options.onError || Function.prototype,
            onComplete: options.onComplete || Function.prototype
        };
        var sourceNodes = Array.apply(null, settings.rootElement.querySelectorAll(settings.include)).filter(function(node) {
            return !matchesSelector(node, settings.exclude);
        });
        var cssArray = Array.apply(null, Array(sourceNodes.length)).map(function(x) {
            return null;
        });
        function handleComplete() {
            var isComplete = cssArray.indexOf(null) === -1;
            if (isComplete) {
                var cssText = cssArray.join("");
                settings.onComplete(cssText, cssArray, sourceNodes);
            }
        }
        function handleSuccess(cssText, cssIndex, node, sourceUrl) {
            var returnVal = settings.onSuccess(cssText, node, sourceUrl);
            cssText = returnVal !== undefined && Boolean(returnVal) === false ? "" : returnVal || cssText;
            resolveImports(cssText, node, sourceUrl, function(resolvedCssText, errorData) {
                if (cssArray[cssIndex] === null) {
                    errorData.forEach(function(data) {
                        return settings.onError(data.xhr, node, data.url);
                    });
                    if (!settings.filter || settings.filter.test(resolvedCssText)) {
                        cssArray[cssIndex] = resolvedCssText;
                    } else {
                        cssArray[cssIndex] = "";
                    }
                    handleComplete();
                }
            });
        }
        function parseImportData(cssText, baseUrl) {
            var ignoreRules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            var importData = {};
            importData.rules = (cssText.replace(regex.cssComments, "").match(regex.cssImports) || []).filter(function(rule) {
                return ignoreRules.indexOf(rule) === -1;
            });
            importData.urls = importData.rules.map(function(rule) {
                return rule.replace(regex.cssImports, "$1");
            });
            importData.absoluteUrls = importData.urls.map(function(url) {
                return getFullUrl(url, baseUrl);
            });
            importData.absoluteRules = importData.rules.map(function(rule, i) {
                var oldUrl = importData.urls[i];
                var newUrl = getFullUrl(importData.absoluteUrls[i], baseUrl);
                return rule.replace(oldUrl, newUrl);
            });
            return importData;
        }
        function resolveImports(cssText, node, baseUrl, callbackFn) {
            var __errorData = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
            var __errorRules = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
            var importData = parseImportData(cssText, baseUrl, __errorRules);
            if (importData.rules.length) {
                getUrls(importData.absoluteUrls, {
                    onBeforeSend: function onBeforeSend(xhr, url, urlIndex) {
                        settings.onBeforeSend(xhr, node, url);
                    },
                    onSuccess: function onSuccess(cssText, url, urlIndex) {
                        var returnVal = settings.onSuccess(cssText, node, url);
                        cssText = returnVal === false ? "" : returnVal || cssText;
                        var responseImportData = parseImportData(cssText, url, __errorRules);
                        responseImportData.rules.forEach(function(rule, i) {
                            cssText = cssText.replace(rule, responseImportData.absoluteRules[i]);
                        });
                        return cssText;
                    },
                    onError: function onError(xhr, url, urlIndex) {
                        __errorData.push({
                            xhr: xhr,
                            url: url
                        });
                        __errorRules.push(importData.rules[urlIndex]);
                        resolveImports(cssText, node, baseUrl, callbackFn, __errorData, __errorRules);
                    },
                    onComplete: function onComplete(responseArray) {
                        responseArray.forEach(function(importText, i) {
                            cssText = cssText.replace(importData.rules[i], importText);
                        });
                        resolveImports(cssText, node, baseUrl, callbackFn, __errorData, __errorRules);
                    }
                });
            } else {
                callbackFn(cssText, __errorData);
            }
        }
        if (sourceNodes.length) {
            sourceNodes.forEach(function(node, i) {
                var linkHref = node.getAttribute("href");
                var linkRel = node.getAttribute("rel");
                var isLink = node.nodeName === "LINK" && linkHref && linkRel && linkRel.toLowerCase() === "stylesheet";
                var isStyle = node.nodeName === "STYLE";
                if (isLink) {
                    getUrls(linkHref, {
                        mimeType: "text/css",
                        onBeforeSend: function onBeforeSend(xhr, url, urlIndex) {
                            settings.onBeforeSend(xhr, node, url);
                        },
                        onSuccess: function onSuccess(cssText, url, urlIndex) {
                            var sourceUrl = getFullUrl(linkHref, location.href);
                            handleSuccess(cssText, i, node, sourceUrl);
                        },
                        onError: function onError(xhr, url, urlIndex) {
                            cssArray[i] = "";
                            settings.onError(xhr, node, url);
                            handleComplete();
                        }
                    });
                } else if (isStyle) {
                    var cssText = node.textContent;
                    if (settings.useCSSOM) {
                        cssText = Array.apply(null, node.sheet.cssRules).map(function(rule) {
                            return rule.cssText;
                        }).join("");
                    }
                    handleSuccess(cssText, i, node, location.href);
                } else {
                    cssArray[i] = "";
                    handleComplete();
                }
            });
        } else {
            settings.onComplete("", []);
        }
    }
    function getFullUrl(url) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : location.href;
        var d = document.implementation.createHTMLDocument("");
        var b = d.createElement("base");
        var a = d.createElement("a");
        d.head.appendChild(b);
        d.body.appendChild(a);
        b.href = base;
        a.href = url;
        return a.href;
    }
    function matchesSelector(elm, selector) {
        var matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;
        return matches.call(elm, selector);
    }
    var balancedMatch = balanced;
    function balanced(a, b, str) {
        if (a instanceof RegExp) a = maybeMatch(a, str);
        if (b instanceof RegExp) b = maybeMatch(b, str);
        var r = range(a, b, str);
        return r && {
            start: r[0],
            end: r[1],
            pre: str.slice(0, r[0]),
            body: str.slice(r[0] + a.length, r[1]),
            post: str.slice(r[1] + b.length)
        };
    }
    function maybeMatch(reg, str) {
        var m = str.match(reg);
        return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
        var begs, beg, left, right, result;
        var ai = str.indexOf(a);
        var bi = str.indexOf(b, ai + 1);
        var i = ai;
        if (ai >= 0 && bi > 0) {
            begs = [];
            left = str.length;
            while (i >= 0 && !result) {
                if (i == ai) {
                    begs.push(i);
                    ai = str.indexOf(a, i + 1);
                } else if (begs.length == 1) {
                    result = [ begs.pop(), bi ];
                } else {
                    beg = begs.pop();
                    if (beg < left) {
                        left = beg;
                        right = bi;
                    }
                    bi = str.indexOf(b, i + 1);
                }
                i = ai < bi && ai >= 0 ? ai : bi;
            }
            if (begs.length) {
                result = [ left, right ];
            }
        }
        return result;
    }
    function parseCss(css) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var defaults = {
            preserveStatic: true,
            removeComments: false
        };
        var settings = _extends({}, defaults, options);
        var errors = [];
        function error(msg) {
            throw new Error("CSS parse error: ".concat(msg));
        }
        function match(re) {
            var m = re.exec(css);
            if (m) {
                css = css.slice(m[0].length);
                return m;
            }
        }
        function open() {
            return match(/^{\s*/);
        }
        function close() {
            return match(/^}/);
        }
        function whitespace() {
            match(/^\s*/);
        }
        function comment() {
            whitespace();
            if (css[0] !== "/" || css[1] !== "*") {
                return;
            }
            var i = 2;
            while (css[i] && (css[i] !== "*" || css[i + 1] !== "/")) {
                i++;
            }
            if (!css[i]) {
                return error("end of comment is missing");
            }
            var str = css.slice(2, i);
            css = css.slice(i + 2);
            return {
                type: "comment",
                comment: str
            };
        }
        function comments() {
            var cmnts = [];
            var c;
            while (c = comment()) {
                cmnts.push(c);
            }
            return settings.removeComments ? [] : cmnts;
        }
        function selector() {
            whitespace();
            while (css[0] === "}") {
                error("extra closing bracket");
            }
            var m = match(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);
            if (m) {
                return m[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function(m) {
                    return m.replace(/,/g, "‌");
                }).split(/\s*(?![^(]*\)),\s*/).map(function(s) {
                    return s.replace(/\u200C/g, ",");
                });
            }
        }
        function declaration() {
            match(/^([;\s]*)+/);
            var comment_regexp = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g;
            var prop = match(/^(\*?[-#\/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
            if (!prop) {
                return;
            }
            prop = prop[0].trim();
            if (!match(/^:\s*/)) {
                return error("property missing ':'");
            }
            var val = match(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/);
            var ret = {
                type: "declaration",
                property: prop.replace(comment_regexp, ""),
                value: val ? val[0].replace(comment_regexp, "").trim() : ""
            };
            match(/^[;\s]*/);
            return ret;
        }
        function declarations() {
            if (!open()) {
                return error("missing '{'");
            }
            var d;
            var decls = comments();
            while (d = declaration()) {
                decls.push(d);
                decls = decls.concat(comments());
            }
            if (!close()) {
                return error("missing '}'");
            }
            return decls;
        }
        function keyframe() {
            whitespace();
            var vals = [];
            var m;
            while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
                vals.push(m[1]);
                match(/^,\s*/);
            }
            if (vals.length) {
                return {
                    type: "keyframe",
                    values: vals,
                    declarations: declarations()
                };
            }
        }
        function at_keyframes() {
            var m = match(/^@([-\w]+)?keyframes\s*/);
            if (!m) {
                return;
            }
            var vendor = m[1];
            m = match(/^([-\w]+)\s*/);
            if (!m) {
                return error("@keyframes missing name");
            }
            var name = m[1];
            if (!open()) {
                return error("@keyframes missing '{'");
            }
            var frame;
            var frames = comments();
            while (frame = keyframe()) {
                frames.push(frame);
                frames = frames.concat(comments());
            }
            if (!close()) {
                return error("@keyframes missing '}'");
            }
            return {
                type: "keyframes",
                name: name,
                vendor: vendor,
                keyframes: frames
            };
        }
        function at_page() {
            var m = match(/^@page */);
            if (m) {
                var sel = selector() || [];
                return {
                    type: "page",
                    selectors: sel,
                    declarations: declarations()
                };
            }
        }
        function at_fontface() {
            var m = match(/^@font-face\s*/);
            if (m) {
                return {
                    type: "font-face",
                    declarations: declarations()
                };
            }
        }
        function at_supports() {
            var m = match(/^@supports *([^{]+)/);
            if (m) {
                return {
                    type: "supports",
                    supports: m[1].trim(),
                    rules: rules()
                };
            }
        }
        function at_host() {
            var m = match(/^@host\s*/);
            if (m) {
                return {
                    type: "host",
                    rules: rules()
                };
            }
        }
        function at_media() {
            var m = match(/^@media *([^{]+)/);
            if (m) {
                return {
                    type: "media",
                    media: m[1].trim(),
                    rules: rules()
                };
            }
        }
        function at_custom_m() {
            var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
            if (m) {
                return {
                    type: "custom-media",
                    name: m[1].trim(),
                    media: m[2].trim()
                };
            }
        }
        function at_document() {
            var m = match(/^@([-\w]+)?document *([^{]+)/);
            if (m) {
                return {
                    type: "document",
                    document: m[2].trim(),
                    vendor: m[1] ? m[1].trim() : null,
                    rules: rules()
                };
            }
        }
        function at_x() {
            var m = match(/^@(import|charset|namespace)\s*([^;]+);/);
            if (m) {
                return {
                    type: m[1],
                    name: m[2].trim()
                };
            }
        }
        function at_rule() {
            whitespace();
            if (css[0] === "@") {
                var ret = at_keyframes() || at_supports() || at_host() || at_media() || at_custom_m() || at_page() || at_document() || at_fontface() || at_x();
                if (ret && !settings.preserveStatic) {
                    var hasVarFunc = false;
                    if (ret.declarations) {
                        hasVarFunc = ret.declarations.some(function(decl) {
                            return /var\(/.test(decl.value);
                        });
                    } else {
                        var arr = ret.keyframes || ret.rules || [];
                        hasVarFunc = arr.some(function(obj) {
                            return (obj.declarations || []).some(function(decl) {
                                return /var\(/.test(decl.value);
                            });
                        });
                    }
                    return hasVarFunc ? ret : {};
                }
                return ret;
            }
        }
        function rule() {
            if (!settings.preserveStatic) {
                var balancedMatch$1 = balancedMatch("{", "}", css);
                if (balancedMatch$1) {
                    var hasVarDecl = balancedMatch$1.pre.indexOf(":root") !== -1 && /--\S*\s*:/.test(balancedMatch$1.body);
                    var hasVarFunc = /var\(/.test(balancedMatch$1.body);
                    if (!hasVarDecl && !hasVarFunc) {
                        css = css.slice(balancedMatch$1.end + 1);
                        return {};
                    }
                }
            }
            var sel = selector() || [];
            var decls = settings.preserveStatic ? declarations() : declarations().filter(function(decl) {
                var hasVarDecl = sel.some(function(s) {
                    return s.indexOf(":root") !== -1;
                }) && /^--\S/.test(decl.property);
                var hasVarFunc = /var\(/.test(decl.value);
                return hasVarDecl || hasVarFunc;
            });
            if (!sel.length) {
                error("selector missing");
            }
            return {
                type: "rule",
                selectors: sel,
                declarations: decls
            };
        }
        function rules(core) {
            if (!core && !open()) {
                return error("missing '{'");
            }
            var node;
            var rules = comments();
            while (css.length && (core || css[0] !== "}") && (node = at_rule() || rule())) {
                if (node.type) {
                    rules.push(node);
                }
                rules = rules.concat(comments());
            }
            if (!core && !close()) {
                return error("missing '}'");
            }
            return rules;
        }
        return {
            type: "stylesheet",
            stylesheet: {
                rules: rules(true),
                errors: errors
            }
        };
    }
    function parseVars(cssData) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var defaults = {
            store: {},
            onWarning: function onWarning() {}
        };
        var settings = _extends({}, defaults, options);
        if (typeof cssData === "string") {
            cssData = parseCss(cssData, settings);
        }
        cssData.stylesheet.rules.forEach(function(rule) {
            if (rule.type !== "rule") {
                return;
            }
            if (rule.selectors.length !== 1 || rule.selectors[0] !== ":root") {
                return;
            }
            rule.declarations.forEach(function(decl, i) {
                var prop = decl.property;
                var value = decl.value;
                if (prop && prop.indexOf("--") === 0) {
                    settings.store[prop] = value;
                }
            });
        });
        return settings.store;
    }
    function stringifyCss(tree) {
        var delim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var cb = arguments.length > 2 ? arguments[2] : undefined;
        var renderMethods = {
            charset: function charset(node) {
                return "@charset " + node.name + ";";
            },
            comment: function comment(node) {
                return node.comment.indexOf("__CSSVARSPONYFILL") === 0 ? "/*" + node.comment + "*/" : "";
            },
            "custom-media": function customMedia(node) {
                return "@custom-media " + node.name + " " + node.media + ";";
            },
            declaration: function declaration(node) {
                return node.property + ":" + node.value + ";";
            },
            document: function document(node) {
                return "@" + (node.vendor || "") + "document " + node.document + "{" + visit(node.rules) + "}";
            },
            "font-face": function fontFace(node) {
                return "@font-face" + "{" + visit(node.declarations) + "}";
            },
            host: function host(node) {
                return "@host" + "{" + visit(node.rules) + "}";
            },
            import: function _import(node) {
                return "@import " + node.name + ";";
            },
            keyframe: function keyframe(node) {
                return node.values.join(",") + "{" + visit(node.declarations) + "}";
            },
            keyframes: function keyframes(node) {
                return "@" + (node.vendor || "") + "keyframes " + node.name + "{" + visit(node.keyframes) + "}";
            },
            media: function media(node) {
                return "@media " + node.media + "{" + visit(node.rules) + "}";
            },
            namespace: function namespace(node) {
                return "@namespace " + node.name + ";";
            },
            page: function page(node) {
                return "@page " + (node.selectors.length ? node.selectors.join(", ") : "") + "{" + visit(node.declarations) + "}";
            },
            rule: function rule(node) {
                var decls = node.declarations;
                if (decls.length) {
                    return node.selectors.join(",") + "{" + visit(decls) + "}";
                }
            },
            supports: function supports(node) {
                return "@supports " + node.supports + "{" + visit(node.rules) + "}";
            }
        };
        function visit(nodes) {
            var buf = "";
            for (var i = 0; i < nodes.length; i++) {
                var n = nodes[i];
                if (cb) {
                    cb(n);
                }
                var txt = renderMethods[n.type](n);
                if (txt) {
                    buf += txt;
                    if (txt.length && n.selectors) {
                        buf += delim;
                    }
                }
            }
            return buf;
        }
        return visit(tree.stylesheet.rules);
    }
    function walkCss(node, fn) {
        node.rules.forEach(function(rule) {
            if (rule.rules) {
                walkCss(rule, fn);
                return;
            }
            if (rule.keyframes) {
                rule.keyframes.forEach(function(keyframe) {
                    if (keyframe.type === "keyframe") {
                        fn(keyframe.declarations, rule);
                    }
                });
                return;
            }
            if (!rule.declarations) {
                return;
            }
            fn(rule.declarations, node);
        });
    }
    var VAR_PROP_IDENTIFIER = "--";
    var VAR_FUNC_IDENTIFIER = "var";
    function transformCss(cssData) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var defaults = {
            preserveStatic: true,
            preserveVars: false,
            variables: {},
            onWarning: function onWarning() {}
        };
        var settings = _extends({}, defaults, options);
        if (typeof cssData === "string") {
            cssData = parseCss(cssData, settings);
        }
        walkCss(cssData.stylesheet, function(declarations, node) {
            for (var i = 0; i < declarations.length; i++) {
                var decl = declarations[i];
                var type = decl.type;
                var prop = decl.property;
                var value = decl.value;
                if (type !== "declaration") {
                    continue;
                }
                if (!settings.preserveVars && prop && prop.indexOf(VAR_PROP_IDENTIFIER) === 0) {
                    declarations.splice(i, 1);
                    i--;
                    continue;
                }
                if (value.indexOf(VAR_FUNC_IDENTIFIER + "(") !== -1) {
                    var resolvedValue = resolveValue(value, settings);
                    if (resolvedValue !== decl.value) {
                        resolvedValue = fixNestedCalc(resolvedValue);
                        if (!settings.preserveVars) {
                            decl.value = resolvedValue;
                        } else {
                            declarations.splice(i, 0, {
                                type: type,
                                property: prop,
                                value: resolvedValue
                            });
                            i++;
                        }
                    }
                }
            }
        });
        return stringifyCss(cssData);
    }
    function fixNestedCalc(value) {
        var reCalcVal = /calc\(([^)]+)\)/g;
        (value.match(reCalcVal) || []).forEach(function(match) {
            var newVal = "calc".concat(match.split("calc").join(""));
            value = value.replace(match, newVal);
        });
        return value;
    }
    function resolveValue(value) {
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var __recursiveFallback = arguments.length > 2 ? arguments[2] : undefined;
        if (value.indexOf("var(") === -1) {
            return value;
        }
        var valueData = balancedMatch("(", ")", value);
        function resolveFunc(value) {
            var name = value.split(",")[0].replace(/[\s\n\t]/g, "");
            var fallback = (value.match(/(?:\s*,\s*){1}(.*)?/) || [])[1];
            var match = settings.variables.hasOwnProperty(name) ? String(settings.variables[name]) : undefined;
            var replacement = match || (fallback ? String(fallback) : undefined);
            var unresolvedFallback = __recursiveFallback || value;
            if (!match) {
                settings.onWarning('variable "'.concat(name, '" is undefined'));
            }
            if (replacement && replacement !== "undefined" && replacement.length > 0) {
                return resolveValue(replacement, settings, unresolvedFallback);
            } else {
                return "var(".concat(unresolvedFallback, ")");
            }
        }
        if (!valueData) {
            if (value.indexOf("var(") !== -1) {
                settings.onWarning('missing closing ")" in the value "'.concat(value, '"'));
            }
            return value;
        } else if (valueData.pre.slice(-3) === "var") {
            var isEmptyVarFunc = valueData.body.trim().length === 0;
            if (isEmptyVarFunc) {
                settings.onWarning("var() must contain a non-whitespace string");
                return value;
            } else {
                return valueData.pre.slice(0, -3) + resolveFunc(valueData.body) + resolveValue(valueData.post, settings);
            }
        } else {
            return valueData.pre + "(".concat(resolveValue(valueData.body, settings), ")") + resolveValue(valueData.post, settings);
        }
    }
    var isBrowser = typeof window !== "undefined";
    var isNativeSupport = isBrowser && window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)");
    var counters = {
        group: 0,
        job: 0
    };
    var defaults = {
        rootElement: isBrowser ? document : null,
        shadowDOM: false,
        include: "style,link[rel=stylesheet]",
        exclude: "",
        variables: {},
        onlyLegacy: true,
        preserveStatic: true,
        preserveVars: false,
        silent: false,
        updateDOM: true,
        updateURLs: true,
        watch: null,
        onBeforeSend: function onBeforeSend() {},
        onWarning: function onWarning() {},
        onError: function onError() {},
        onSuccess: function onSuccess() {},
        onComplete: function onComplete() {}
    };
    var regex = {
        cssComments: /\/\*[\s\S]+?\*\//g,
        cssKeyframes: /@(?:-\w*-)?keyframes/,
        cssMediaQueries: /@media[^{]+\{([\s\S]+?})\s*}/g,
        cssRootRules: /(?::root\s*{\s*[^}]*})/g,
        cssUrls: /url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,
        cssVarDecls: /(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,
        cssVarFunc: /var\(\s*--[\w-]/,
        cssVars: /(?:(?::root\s*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/
    };
    var variableStore = {
        dom: {},
        job: {},
        user: {}
    };
    var cssVarsIsRunning = false;
    var cssVarsObserver = null;
    var cssVarsSrcNodeCount = 0;
    var debounceTimer = null;
    var isShadowDOMReady = false;
    /**
   * Fetches, parses, and transforms CSS custom properties from specified
   * <style> and <link> elements into static values, then appends a new <style>
   * element with static values to the DOM to provide CSS custom property
   * compatibility for legacy browsers. Also provides a single interface for
   * live updates of runtime values in both modern and legacy browsers.
   *
   * @preserve
   * @param {object}   [options] Options object
   * @param {object}   [options.rootElement=document] Root element to traverse for
   *                   <link> and <style> nodes
   * @param {boolean}  [options.shadowDOM=false] Determines if shadow DOM <link>
   *                   and <style> nodes will be processed.
   * @param {string}   [options.include="style,link[rel=stylesheet]"] CSS selector
   *                   matching <link re="stylesheet"> and <style> nodes to
   *                   process
   * @param {string}   [options.exclude] CSS selector matching <link
   *                   rel="stylehseet"> and <style> nodes to exclude from those
   *                   matches by options.include
   * @param {object}   [options.variables] A map of custom property name/value
   *                   pairs. Property names can omit or include the leading
   *                   double-hyphen (—), and values specified will override
   *                   previous values
   * @param {boolean}  [options.onlyLegacy=true] Determines if the ponyfill will
   *                   only generate legacy-compatible CSS in browsers that lack
   *                   native support (i.e., legacy browsers)
   * @param {boolean}  [options.preserveStatic=true] Determines if CSS
   *                   declarations that do not reference a custom property will
   *                   be preserved in the transformed CSS
   * @param {boolean}  [options.preserveVars=false] Determines if CSS custom
   *                   property declarations will be preserved in the transformed
   *                   CSS
   * @param {boolean}  [options.silent=false] Determines if warning and error
   *                   messages will be displayed on the console
   * @param {boolean}  [options.updateDOM=true] Determines if the ponyfill will
   *                   update the DOM after processing CSS custom properties
   * @param {boolean}  [options.updateURLs=true] Determines if the ponyfill will
   *                   convert relative url() paths to absolute urls
   * @param {boolean}  [options.watch=false] Determines if a MutationObserver will
   *                   be created that will execute the ponyfill when a <link> or
   *                   <style> DOM mutation is observed
   * @param {function} [options.onBeforeSend] Callback before XHR is sent. Passes
   *                   1) the XHR object, 2) source node reference, and 3) the
   *                   source URL as arguments
   * @param {function} [options.onWarning] Callback after each CSS parsing warning
   *                   has occurred. Passes 1) a warning message as an argument.
   * @param {function} [options.onError] Callback after a CSS parsing error has
   *                   occurred or an XHR request has failed. Passes 1) an error
   *                   message, and 2) source node reference, 3) xhr, and 4 url as
   *                   arguments.
   * @param {function} [options.onSuccess] Callback after CSS data has been
   *                   collected from each node and before CSS custom properties
   *                   have been transformed. Allows modifying the CSS data before
   *                   it is transformed by returning any string value (or false
   *                   to skip). Passes 1) CSS text, 2) source node reference, and
   *                   3) the source URL as arguments.
   * @param {function} [options.onComplete] Callback after all CSS has been
   *                   processed, legacy-compatible CSS has been generated, and
   *                   (optionally) the DOM has been updated. Passes 1) a CSS
   *                   string with CSS variable values resolved, 2) an array of
   *                   output <style> node references that have been appended to
   *                   the DOM, 3) an object containing all custom properies names
   *                   and values, and 4) the ponyfill execution time in
   *                   milliseconds.
   *
   * @example
   *
   *   cssVars({
   *     rootElement   : document,
   *     shadowDOM     : false,
   *     include       : 'style,link[rel="stylesheet"]',
   *     exclude       : '',
   *     variables     : {},
   *     onlyLegacy    : true,
   *     preserveStatic: true,
   *     preserveVars  : false,
   *     silent        : false,
   *     updateDOM     : true,
   *     updateURLs    : true,
   *     watch         : false,
   *     onBeforeSend(xhr, node, url) {},
   *     onWarning(message) {},
   *     onError(message, node, xhr, url) {},
   *     onSuccess(cssText, node, url) {},
   *     onComplete(cssText, styleNode, cssVariables, benchmark) {}
   *   });
   */    function cssVars() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var msgPrefix = "cssVars(): ";
        var settings = _extends({}, defaults, options);
        function handleError(message, sourceNode, xhr, url) {
            if (!settings.silent && window.console) {
                console.error("".concat(msgPrefix).concat(message, "\n"), sourceNode);
            }
            settings.onError(message, sourceNode, xhr, url);
        }
        function handleWarning(message) {
            if (!settings.silent && window.console) {
                console.warn("".concat(msgPrefix).concat(message));
            }
            settings.onWarning(message);
        }
        if (!isBrowser) {
            return;
        }
        if (settings.watch) {
            settings.watch = defaults.watch;
            addMutationObserver(settings);
            cssVars(settings);
            return;
        } else if (settings.watch === false && cssVarsObserver) {
            cssVarsObserver.disconnect();
            cssVarsObserver = null;
        }
        if (!settings.__benchmark) {
            if (cssVarsIsRunning === settings.rootElement) {
                cssVarsDebounced(options);
                return;
            }
            settings.__benchmark = getTimeStamp();
            settings.exclude = [ cssVarsObserver ? '[data-cssvars]:not([data-cssvars=""])' : '[data-cssvars="out"]', settings.exclude ].filter(function(selector) {
                return selector;
            }).join(",");
            settings.variables = fixVarNames(settings.variables);
            if (!cssVarsObserver) {
                var outNodes = Array.apply(null, settings.rootElement.querySelectorAll('[data-cssvars="out"]'));
                outNodes.forEach(function(outNode) {
                    var dataGroup = outNode.getAttribute("data-cssvars-group");
                    var srcNode = dataGroup ? settings.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(dataGroup, '"]')) : null;
                    if (!srcNode) {
                        outNode.parentNode.removeChild(outNode);
                    }
                });
                if (cssVarsSrcNodeCount) {
                    var srcNodes = settings.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])');
                    if (srcNodes.length < cssVarsSrcNodeCount) {
                        cssVarsSrcNodeCount = srcNodes.length;
                        variableStore.dom = {};
                    }
                }
            }
        }
        if (document.readyState !== "loading") {
            var isShadowElm = settings.shadowDOM || settings.rootElement.shadowRoot || settings.rootElement.host;
            if (isNativeSupport && settings.onlyLegacy) {
                if (settings.updateDOM) {
                    var targetElm = settings.rootElement.host || (settings.rootElement === document ? document.documentElement : settings.rootElement);
                    Object.keys(settings.variables).forEach(function(key) {
                        targetElm.style.setProperty(key, settings.variables[key]);
                    });
                }
            } else if (isShadowElm && !isShadowDOMReady) {
                getCssData({
                    rootElement: defaults.rootElement,
                    include: defaults.include,
                    exclude: settings.exclude,
                    onSuccess: function onSuccess(cssText, node, url) {
                        cssText = cssText.replace(regex.cssComments, "").replace(regex.cssMediaQueries, "");
                        cssText = (cssText.match(regex.cssRootRules) || []).join("");
                        return cssText || false;
                    },
                    onComplete: function onComplete(cssText, cssArray, nodeArray) {
                        parseVars(cssText, {
                            store: variableStore.dom,
                            onWarning: handleWarning
                        });
                        isShadowDOMReady = true;
                        cssVars(settings);
                    }
                });
            } else {
                cssVarsIsRunning = settings.rootElement;
                getCssData({
                    rootElement: settings.rootElement,
                    include: settings.include,
                    exclude: settings.exclude,
                    onBeforeSend: settings.onBeforeSend,
                    onError: function onError(xhr, node, url) {
                        var responseUrl = xhr.responseURL || getFullUrl$1(url, location.href);
                        var statusText = xhr.statusText ? "(".concat(xhr.statusText, ")") : "Unspecified Error" + (xhr.status === 0 ? " (possibly CORS related)" : "");
                        var errorMsg = "CSS XHR Error: ".concat(responseUrl, " ").concat(xhr.status, " ").concat(statusText);
                        handleError(errorMsg, node, xhr, responseUrl);
                    },
                    onSuccess: function onSuccess(cssText, node, url) {
                        var returnVal = settings.onSuccess(cssText, node, url);
                        cssText = returnVal !== undefined && Boolean(returnVal) === false ? "" : returnVal || cssText;
                        if (settings.updateURLs) {
                            cssText = fixRelativeCssUrls(cssText, url);
                        }
                        return cssText;
                    },
                    onComplete: function onComplete(cssText, cssArray) {
                        var nodeArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
                        var jobVars = {};
                        var varStore = settings.updateDOM ? variableStore.dom : Object.keys(variableStore.job).length ? variableStore.job : variableStore.job = JSON.parse(JSON.stringify(variableStore.dom));
                        var hasVarChange = false;
                        nodeArray.forEach(function(node, i) {
                            if (regex.cssVars.test(cssArray[i])) {
                                try {
                                    var cssTree = parseCss(cssArray[i], {
                                        preserveStatic: settings.preserveStatic,
                                        removeComments: true
                                    });
                                    parseVars(cssTree, {
                                        store: jobVars,
                                        onWarning: handleWarning
                                    });
                                    node.__cssVars = {
                                        tree: cssTree
                                    };
                                } catch (err) {
                                    handleError(err.message, node);
                                }
                            }
                        });
                        if (settings.updateDOM) {
                            _extends(variableStore.user, settings.variables);
                        }
                        _extends(jobVars, settings.variables);
                        hasVarChange = Boolean((document.querySelector("[data-cssvars]") || Object.keys(variableStore.dom).length) && Object.keys(jobVars).some(function(name) {
                            return jobVars[name] !== varStore[name];
                        }));
                        _extends(varStore, variableStore.user, jobVars);
                        if (hasVarChange) {
                            resetCssNodes(settings.rootElement);
                            cssVars(settings);
                        } else {
                            var outCssArray = [];
                            var outNodeArray = [];
                            var hasKeyframesWithVars = false;
                            variableStore.job = {};
                            if (settings.updateDOM) {
                                counters.job++;
                            }
                            nodeArray.forEach(function(node) {
                                var isSkip = !node.__cssVars;
                                if (node.__cssVars) {
                                    try {
                                        transformCss(node.__cssVars.tree, _extends({}, settings, {
                                            variables: varStore,
                                            onWarning: handleWarning
                                        }));
                                        var outCss = stringifyCss(node.__cssVars.tree);
                                        if (settings.updateDOM) {
                                            if (!node.getAttribute("data-cssvars")) {
                                                node.setAttribute("data-cssvars", "src");
                                            }
                                            if (outCss.length) {
                                                var dataGroup = node.getAttribute("data-cssvars-group") || ++counters.group;
                                                var outCssNoSpaces = outCss.replace(/\s/g, "");
                                                var outNode = settings.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(dataGroup, '"]')) || document.createElement("style");
                                                hasKeyframesWithVars = hasKeyframesWithVars || regex.cssKeyframes.test(outCss);
                                                if (!outNode.hasAttribute("data-cssvars")) {
                                                    outNode.setAttribute("data-cssvars", "out");
                                                }
                                                if (outCssNoSpaces === node.textContent.replace(/\s/g, "")) {
                                                    isSkip = true;
                                                    if (outNode && outNode.parentNode) {
                                                        node.removeAttribute("data-cssvars-group");
                                                        outNode.parentNode.removeChild(outNode);
                                                    }
                                                } else if (outCssNoSpaces !== outNode.textContent.replace(/\s/g, "")) {
                                                    [ node, outNode ].forEach(function(n) {
                                                        n.setAttribute("data-cssvars-job", counters.job);
                                                        n.setAttribute("data-cssvars-group", dataGroup);
                                                    });
                                                    outNode.textContent = outCss;
                                                    outCssArray.push(outCss);
                                                    outNodeArray.push(outNode);
                                                    if (!outNode.parentNode) {
                                                        node.parentNode.insertBefore(outNode, node.nextSibling);
                                                    }
                                                }
                                            }
                                        } else {
                                            if (node.textContent.replace(/\s/g, "") !== outCss) {
                                                outCssArray.push(outCss);
                                            }
                                        }
                                    } catch (err) {
                                        handleError(err.message, node);
                                    }
                                }
                                if (isSkip) {
                                    node.setAttribute("data-cssvars", "skip");
                                }
                                if (!node.hasAttribute("data-cssvars-job")) {
                                    node.setAttribute("data-cssvars-job", counters.job);
                                }
                            });
                            cssVarsSrcNodeCount = settings.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length;
                            if (settings.shadowDOM) {
                                var elms = [ settings.rootElement ].concat(_toConsumableArray(settings.rootElement.querySelectorAll("*")));
                                for (var i = 0, elm; elm = elms[i]; ++i) {
                                    if (elm.shadowRoot && elm.shadowRoot.querySelector("style")) {
                                        var shadowSettings = _extends({}, settings, {
                                            rootElement: elm.shadowRoot,
                                            variables: variableStore.dom
                                        });
                                        cssVars(shadowSettings);
                                    }
                                }
                            }
                            if (settings.updateDOM && hasKeyframesWithVars) {
                                fixKeyframes(settings.rootElement);
                            }
                            cssVarsIsRunning = false;
                            settings.onComplete(outCssArray.join(""), outNodeArray, JSON.parse(JSON.stringify(varStore)), getTimeStamp() - settings.__benchmark);
                        }
                    }
                });
            }
        } else {
            document.addEventListener("DOMContentLoaded", function init(evt) {
                cssVars(options);
                document.removeEventListener("DOMContentLoaded", init);
            });
        }
    }
    cssVars.reset = function() {
        cssVarsIsRunning = false;
        if (cssVarsObserver) {
            cssVarsObserver.disconnect();
            cssVarsObserver = null;
        }
        cssVarsSrcNodeCount = 0;
        debounceTimer = null;
        isShadowDOMReady = false;
        for (var prop in variableStore) {
            variableStore[prop] = {};
        }
    };
    function addMutationObserver(settings) {
        function isLink(node) {
            var isStylesheet = node.tagName === "LINK" && (node.getAttribute("rel") || "").indexOf("stylesheet") !== -1;
            return isStylesheet && !node.disabled;
        }
        function isStyle(node) {
            return node.tagName === "STYLE" && !node.disabled;
        }
        function isValidAddMutation(mutationNodes) {
            return Array.apply(null, mutationNodes).some(function(node) {
                var isElm = node.nodeType === 1;
                var hasAttr = isElm && node.hasAttribute("data-cssvars");
                var isStyleWithVars = isStyle(node) && regex.cssVars.test(node.textContent);
                var isValid = !hasAttr && (isLink(node) || isStyleWithVars);
                return isValid;
            });
        }
        function isValidRemoveMutation(mutationNodes) {
            return Array.apply(null, mutationNodes).some(function(node) {
                var isElm = node.nodeType === 1;
                var isOutNode = isElm && node.getAttribute("data-cssvars") === "out";
                var isSrcNode = isElm && node.getAttribute("data-cssvars") === "src";
                var isValid = isSrcNode;
                if (isSrcNode || isOutNode) {
                    var dataGroup = node.getAttribute("data-cssvars-group");
                    var orphanNode = settings.rootElement.querySelector('[data-cssvars-group="'.concat(dataGroup, '"]'));
                    if (isSrcNode) {
                        resetCssNodes(settings.rootElement);
                        variableStore.dom = {};
                    }
                    if (orphanNode) {
                        orphanNode.parentNode.removeChild(orphanNode);
                    }
                }
                return isValid;
            });
        }
        if (!window.MutationObserver) {
            return;
        }
        if (cssVarsObserver) {
            cssVarsObserver.disconnect();
            cssVarsObserver = null;
        }
        cssVarsObserver = new MutationObserver(function(mutations) {
            var hasValidMutation = mutations.some(function(mutation) {
                var isValid = false;
                if (mutation.type === "attributes") {
                    isValid = isLink(mutation.target);
                } else if (mutation.type === "childList") {
                    isValid = isValidAddMutation(mutation.addedNodes) || isValidRemoveMutation(mutation.removedNodes);
                }
                return isValid;
            });
            if (hasValidMutation) {
                cssVars(settings);
            }
        });
        cssVarsObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [ "disabled", "href" ],
            childList: true,
            subtree: true
        });
    }
    function cssVarsDebounced(settings) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
            settings.__benchmark = null;
            cssVars(settings);
        }, delay);
    }
    function fixKeyframes(rootElement) {
        var animationNameProp = [ "animation-name", "-moz-animation-name", "-webkit-animation-name" ].filter(function(prop) {
            return getComputedStyle(document.body)[prop];
        })[0];
        if (animationNameProp) {
            var allNodes = rootElement.getElementsByTagName("*");
            var keyframeNodes = [];
            var nameMarker = "__CSSVARSPONYFILL-KEYFRAMES__";
            for (var i = 0, len = allNodes.length; i < len; i++) {
                var node = allNodes[i];
                var animationName = getComputedStyle(node)[animationNameProp];
                if (animationName !== "none") {
                    node.style[animationNameProp] += nameMarker;
                    keyframeNodes.push(node);
                }
            }
            void document.body.offsetHeight;
            for (var _i = 0, _len = keyframeNodes.length; _i < _len; _i++) {
                var nodeStyle = keyframeNodes[_i].style;
                nodeStyle[animationNameProp] = nodeStyle[animationNameProp].replace(nameMarker, "");
            }
        }
    }
    function fixRelativeCssUrls(cssText, baseUrl) {
        var cssUrls = cssText.replace(regex.cssComments, "").match(regex.cssUrls) || [];
        cssUrls.forEach(function(cssUrl) {
            var oldUrl = cssUrl.replace(regex.cssUrls, "$1");
            var newUrl = getFullUrl$1(oldUrl, baseUrl);
            cssText = cssText.replace(cssUrl, cssUrl.replace(oldUrl, newUrl));
        });
        return cssText;
    }
    function fixVarNames() {
        var varObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var reLeadingHyphens = /^-{2}/;
        return Object.keys(varObj).reduce(function(obj, value) {
            var key = reLeadingHyphens.test(value) ? value : "--".concat(value.replace(/^-+/, ""));
            obj[key] = varObj[value];
            return obj;
        }, {});
    }
    function getFullUrl$1(url) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : location.href;
        var d = document.implementation.createHTMLDocument("");
        var b = d.createElement("base");
        var a = d.createElement("a");
        d.head.appendChild(b);
        d.body.appendChild(a);
        b.href = base;
        a.href = url;
        return a.href;
    }
    function getTimeStamp() {
        return isBrowser && (window.performance || {}).now ? window.performance.now() : new Date().getTime();
    }
    function resetCssNodes(rootElement) {
        var resetNodes = Array.apply(null, rootElement.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]'));
        resetNodes.forEach(function(node) {
            return node.setAttribute("data-cssvars", "");
        });
    }
    return cssVars;
});


},{}],2:[function(require,module,exports){
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

},{}],3:[function(require,module,exports){
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.vhCheck = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    // don't know a better way to get the size of a CSS 100vh…
    function createTestElement() {
        var testElement = document.createElement('div');
        testElement.style.cssText =
            'position: fixed; top: 0; height: 100vh; pointer-events: none;';
        document.documentElement.insertBefore(testElement, document.documentElement.firstChild);
        return testElement;
    }
    function removeTestElement(element) {
        document.documentElement.removeChild(element);
    }
    //  in some browsers this will be bigger than window.innerHeight
    function checkSizes() {
        var vhTest = createTestElement();
        var windowHeight = window.innerHeight;
        var vh = vhTest.offsetHeight;
        var offset = vh - windowHeight;
        removeTestElement(vhTest);
        return {
            vh: vh,
            windowHeight: windowHeight,
            offset: offset,
            isNeeded: offset !== 0,
            value: 0,
        };
    }
    // export
    function noop() { }
    function computeDifference() {
        var sizes = checkSizes();
        sizes.value = sizes.offset;
        return sizes;
    }
    function redefineVhUnit() {
        var sizes = checkSizes();
        sizes.value = sizes.windowHeight * 0.01;
        return sizes;
    }

    var methods = /*#__PURE__*/Object.freeze({
        noop: noop,
        computeDifference: computeDifference,
        redefineVhUnit: redefineVhUnit
    });

    function isString(text) {
        return typeof text === "string" && text.length > 0;
    }
    function isFunction(f) {
        return typeof f === "function";
    }
    var defaultOptions = Object.freeze({
        cssVarName: 'vh-offset',
        redefineVh: false,
        method: computeDifference,
        force: false,
        bind: true,
        updateOnTouch: false,
        onUpdate: noop,
    });
    function getOptions(options) {
        // old options handling: only redefine the CSS var name
        if (isString(options)) {
            return __assign({}, defaultOptions, { cssVarName: options });
        }
        // be sure to have a configuration object
        if (typeof options !== 'object')
            return defaultOptions;
        // make sure we have the right options to start with
        var finalOptions = {
            force: options.force === true,
            bind: options.bind !== false,
            updateOnTouch: options.updateOnTouch === true,
            onUpdate: isFunction(options.onUpdate) ? options.onUpdate : noop,
        };
        // method change
        var redefineVh = options.redefineVh === true;
        finalOptions.method =
            methods[redefineVh ? 'redefineVhUnit' : 'computeDifference'];
        finalOptions.cssVarName = isString(options.cssVarName)
            ? options.cssVarName
            : redefineVh
                ? /*
                  when redefining vh unit we follow this article name convention
                  https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
                */
                    'vh'
                : defaultOptions.cssVarName;
        return finalOptions;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
    var passiveSupported = false;
    var eventListeners = [];
    /* istanbul ignore next */
    try {
        var options = Object.defineProperty({}, "passive", {
            get: function () {
                passiveSupported = true;
            },
        });
        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
    function addListener(eventName, callback) {
        eventListeners.push({
            eventName: eventName,
            callback: callback,
        });
        window.addEventListener(eventName, callback, 
        /* istanbul ignore next */
        passiveSupported ? { passive: true } : false);
    }
    function removeAll() {
        eventListeners.forEach(function (config) {
            window.removeEventListener(config.eventName, config.callback);
        });
        eventListeners = [];
    }

    function updateCssVar(cssVarName, result) {
        document.documentElement.style.setProperty("--" + cssVarName, result.value + "px");
    }
    function formatResult(sizes, options) {
        return __assign({}, sizes, { unbind: removeAll, recompute: options.method });
    }
    function vhCheck(options) {
        var config = Object.freeze(getOptions(options));
        var result = formatResult(config.method(), config);
        // usefulness check
        if (!result.isNeeded && !config.force) {
            return result;
        }
        updateCssVar(config.cssVarName, result);
        config.onUpdate(result);
        // enabled by default
        if (!config.bind)
            return result;
        function onWindowChange() {
            window.requestAnimationFrame(function () {
                var sizes = config.method();
                updateCssVar(config.cssVarName, sizes);
                config.onUpdate(formatResult(sizes, config));
            });
        }
        // be sure we don't duplicates events listeners
        result.unbind();
        // listen for orientation change
        // - this can't be configured
        // - because it's convenient and not a real performance bottleneck
        addListener('orientationchange', onWindowChange);
        // listen to touch move for scrolling
        // – disabled by default
        // - listening to scrolling can be expansive…
        if (config.updateOnTouch) {
            addListener('touchmove', onWindowChange);
        }
        return result;
    }

    return vhCheck;

})));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_1 = require("./bootstrap/elements");
var browser_1 = require("./bootstrap/browser");
var cookie_1 = require("./bootstrap/cookie");
var input_counter_1 = require("./bootstrap/input-counter");
var resize_1 = require("./bootstrap/resize");
var scroll_lock_1 = require("./bootstrap/scroll-lock");
var burger_menu_1 = require("./bootstrap/burger-menu");
var sticky_1 = require("./bootstrap/sticky");
var tabs_1 = require("./bootstrap/tabs");
var protect_email_1 = require("./bootstrap/protect-email");
/* Polyfill */
require('vh-check')(); // Get reliable CSS vh sizes (https://github.com/Hiswe/vh-check)
var cssVars = require('css-vars-ponyfill'); // CSS custom properties support
window.onload = function () {
    var browser = new browser_1.Browser(), scrollLock = new scroll_lock_1.ScrollLock(), resize = new resize_1.Resize();
    new burger_menu_1.BurgerMenu({
        scrollLock: scrollLock,
        $burger: document.getElementById('burger-button'),
        $container: document.getElementById('header'),
        $overlay: document.getElementById('header-overlay'),
        cssClassActive: 'js_burger-active'
    });
    new sticky_1.Sticky({
        browser: browser,
        scrollLock: scrollLock,
        $element: document.getElementById('header-content')
    });
    new tabs_1.Tabs({
        name: 'primary'
    });
    new protect_email_1.ProtectEmail();
    /* Forms */
    new input_counter_1.InputCounter({
        cssClass: {
            wrap: "[data-bind=\"input-counter\"]",
            input: ".input-counter__input",
            button: ".input-counter__btn",
            disable: "--disable"
        }
    });
    /* Informations */
    new cookie_1.InformationCookie();
    /* Polyfill */
    // CSS Custom Properties
    // cssVars({
    // 	variables: {
    // 		scrollbarWidth: `${browser.scrollbarWidth}px`
    // 	}
    // });
    // const placeholder = new ElementPlaceholder();
    // placeholder.create(document.getElementById('header'));
    /* Inform stylesheed to remove style fallback for JavaScript elements */
    elements_1.html.classList.remove('js_no');
};
},{"./bootstrap/browser":5,"./bootstrap/burger-menu":6,"./bootstrap/cookie":7,"./bootstrap/elements":9,"./bootstrap/input-counter":10,"./bootstrap/protect-email":11,"./bootstrap/resize":12,"./bootstrap/scroll-lock":13,"./bootstrap/sticky":14,"./bootstrap/tabs":15,"css-vars-ponyfill":1,"vh-check":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_1 = require("./elements");
var css_1 = require("./css");
function isScrollbar() {
    return window.innerWidth != document.documentElement.clientWidth;
}
exports.isScrollbar = isScrollbar;
function cleanUrl() {
    var hash = window.location.hash;
    if (hash.startsWith('#')) {
        var cleanUrl_1 = location.protocol + '//' + location.host + location.pathname;
        window.history.replaceState({}, document.title, cleanUrl_1);
        return hash.substring(hash.indexOf('-') + 1, hash.length);
    }
    return false;
}
exports.cleanUrl = cleanUrl;
// TODO remove
function getScrollPosition() {
    return window.pageYOffset || elements_1.html.scrollTop;
}
exports.getScrollPosition = getScrollPosition;
// Get transition vendor prefix
function getTransitionEvent() {
    var element = document.createElement('getTransitionEvent'), transitions = {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd'
    };
    for (var key in transitions) {
        if (element.style[key] !== undefined) {
            return transitions[key];
        }
    }
    /* test-code */
    console.error("Browser\n- fired getTransitionEvent() function and return undefined transition");
    /* end-test-code */
}
exports.getTransitionEvent = getTransitionEvent;
/**
 * @class Browser
 */
var Browser = /** @class */ (function () {
    function Browser() {
        var _this = this;
        console.log("Browser");
        this.transitionEvent = getTransitionEvent();
        this.portable = this.getMobileOperatingSystem();
        this.refresh();
        window.addEventListener('scroll', function () {
            _this.onScroll();
        });
        window.addEventListener('resize orientationchange', function () {
            _this.onScroll();
        });
    }
    Browser.prototype.getScrollbarWidth = function () {
        var $scrollbar = document.getElementById('js_check-scrollbar'), $content = $scrollbar.children.item(0), output = $scrollbar.offsetWidth - $content.clientWidth;
        $scrollbar.parentNode.removeChild($scrollbar);
        return output;
    };
    /* Determine the mobile operating system */
    Browser.prototype.getMobileOperatingSystem = function () {
        var userAgent = navigator.userAgent || navigator.vendor;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return 'Windows Phone';
        }
        if (/android/i.test(userAgent)) {
            return 'Android';
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !!navigator.platform) {
            return 'iOS';
        }
        // PHP user agent
        if (elements_1.body.classList.contains('device-portable')) {
            return true;
        }
        return false;
    };
    Browser.prototype.refresh = function () {
        this.responsive = this.getResponsive();
        this.scrollbarWidth = this.getScrollbarWidth();
        this.calculatePage();
        this.onScroll();
    };
    Browser.prototype.onScroll = function () {
        /* Check last center */
        var lastCenter = 0;
        if (this.scroll) {
            lastCenter = this.scroll.center;
        }
        /* Prepare variables */
        var top = getScrollPosition(), center = top + this.height / 2, bottom = top + this.height, speed = Math.abs(lastCenter - center), direction = 'down';
        /* Check scroll direction */
        if (center < lastCenter) {
            direction = 'up';
        }
        this.scroll = {
            top: top,
            bottom: bottom,
            center: center,
            speed: speed,
            direction: direction
        };
    };
    Browser.prototype.calculatePage = function () {
        /* Prepare variables */
        var width = window.innerWidth, lastWidth = this.width, height = window.innerHeight, lastHeight = this.height, orientation = this.getOrientation(), lastOrientation = this.orientation;
        /* Set variables */
        this.width = width;
        this.height = height;
        /**
         * Don't refresh page if user change tab
         * @browser Opera
         */
        if (lastWidth === width && lastHeight === height && lastOrientation) {
            return false;
        }
    };
    Browser.prototype.getResponsive = function () {
        for (var key in css_1.breakpointsDefault) {
            var value = css_1.breakpointsDefault[key];
            if (window.matchMedia("(min-width: " + value + "px)").matches) {
                return key;
            }
        }
        return 'mobile';
    };
    Browser.prototype.getOrientation = function () {
        if (window.matchMedia('(orientation: portrait)').matches) {
            return 'portrait';
        }
        else {
            return 'landscape';
        }
    };
    return Browser;
}());
exports.Browser = Browser;
},{"./css":8,"./elements":9}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Toggle burger menu with overlay
 *
 * @class						BurgerMenu
 * @version					1.0
 * @css							burger-menu.scss
 * @require					ScrollLock object
 */
var BurgerMenu = /** @class */ (function () {
    function BurgerMenu(param) {
        this.active = false;
        this.moving = false;
        this.expandTime = 200;
        this.cssClassActive = 'js_burger-active';
        this.$button = param.$burger;
        this.$container = param.$container;
        this.cssClassActive = param.cssClassActive;
        this.scrollLock = param.scrollLock;
        if (param.cssClassActive) {
            this.cssClassActive = param.cssClassActive;
        }
        if (param.$overlay) {
            this.$overlay = param.$overlay;
        }
        this.bind();
    }
    BurgerMenu.prototype.bind = function () {
        var _this = this;
        /* test-code */
        console.info("BurgerMenu\n- fired bind() function");
        /* end-test-code */
        this.$button.onclick = function () {
            _this.click();
        };
        if (this.$overlay) {
            this.$overlay.onclick = function () {
                _this.click();
            };
        }
    };
    BurgerMenu.prototype.unbind = function () {
        /* test-code */
        console.info("BurgerMenu\n- fired unbind() function");
        /* end-test-code */
        this.$button.onclick = null;
        this.$overlay.onclick = null;
    };
    BurgerMenu.prototype.click = function () {
        var _this = this;
        /* test-code */
        console.info("BurgerMenu\n- fired click() function");
        /* end-test-code */
        if (this.moving) {
            return false;
        }
        this.moving = true;
        this.scrollLock.change();
        this.$container.classList.toggle(this.cssClassActive);
        window.setTimeout(function () {
            _this.moving = false;
        }, this.expandTime);
    };
    return BurgerMenu;
}());
exports.BurgerMenu = BurgerMenu;
/**
 * Changelog
 * 26.06.2019 Add
 */
},{}],7:[function(require,module,exports){
"use strict";
/**
 * Inform users that your site uses cookies
 *
 * @class Cookie
 * @version 1.0
 * @require
 * JavaScript Cookie - https://github.com/js-cookie/js-cookie
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Cookies = require("js-cookie");
var elements_1 = require("./elements");
var InformationCookie = /** @class */ (function () {
    function InformationCookie(data) {
        var _this = this;
        this.data = {
            template: null,
        };
        this.getContent = function (callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'partials/cookies.html');
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4)
                    return;
                if (xhr.status >= 200 && xhr.status < 300) {
                    callback.apply(this, [xhr.responseText]);
                }
            };
        };
        /**
         * Show information
         */
        this.mount = function (cookiesContentHTML) {
            elements_1.body.insertAdjacentHTML('beforeend', cookiesContentHTML);
            _this.cookie = document.getElementById('js_cookies-information');
            _this.accept = document.querySelectorAll('.js_cookies-close');
            _this.bindClick();
        };
        this.show = function () {
            if (_this.data.template) {
                _this.mount(_this.data.template);
            }
            else {
                _this.getContent(function (cookiesContentHTML) {
                    _this.mount(cookiesContentHTML);
                });
            }
        };
        if (!Cookies.get('using_cookies')) {
            this.data = Object.assign(this.data, data);
            this.show();
            /* test-code */
            console.log("Cookie\n - show information about using cookies");
            /* end-test-code */
        }
        /* test-code */
        else {
            console.log("Cookie\n - information already showed");
        }
        /* end-test-code */
    }
    InformationCookie.prototype.bindClick = function () {
        var _this = this;
        this.accept.forEach(function (item) {
            item.addEventListener('click', function () {
                _this.onClick();
            });
        });
    };
    InformationCookie.prototype.onClick = function () {
        Cookies.set('using_cookies', 1);
        this.cookie.classList.add("js_cookies-information--hide");
        /* test-code */
        console.log("Cookie\n - accepted cookies");
        /* end-test-code */
        return false;
    };
    return InformationCookie;
}());
exports.InformationCookie = InformationCookie;
/**
 * Changelog
 * 21.05.2019 Convert jQuery code to vanilla JS
 */
},{"./elements":9,"js-cookie":2}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var root = document.querySelector(':root');
var CSS = window.getComputedStyle(root);
exports.breakpointsDefault = {
    desktop: Number(CSS.getPropertyValue("--desktop")),
    tablet: Number(CSS.getPropertyValue("--tablet")),
    fablet: Number(CSS.getPropertyValue("--fablet")),
    mobile: Number(CSS.getPropertyValue("--mobile")),
};
exports.breakpointsHeader = {
    desktop: Number(CSS.getPropertyValue("--headerDesktop")),
    tablet: Number(CSS.getPropertyValue("--headerTablet")),
    fablet: Number(CSS.getPropertyValue("--headerFablet")),
    mobile: Number(CSS.getPropertyValue("--headerMobile")),
};
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.body = document.body;
exports.html = document.documentElement;
exports.CSS = window.getComputedStyle(exports.html);
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputCounter = /** @class */ (function () {
    function InputCounter(data) {
        this.database = [];
        this.active = false;
        this.cssClass = data.cssClass;
        this.refresh();
        this.active = true;
    }
    InputCounter.prototype.changeValue = function () {
    };
    InputCounter.prototype.bind = function () {
    };
    InputCounter.prototype.unbind = function () {
    };
    InputCounter.prototype.loopElement = function () { };
    InputCounter.prototype.add = function (wrap) {
        var input, button, value, max, min;
        input = wrap.querySelector('.input-counter__input');
        button = wrap.querySelectorAll('.input-counter__btn');
        value = Number(input.value);
        min = Number(input.min);
        max = Number(input.max);
        this.database.push({
            wrap: wrap,
            input: input,
            button: button,
            value: value,
            max: max,
            min: min,
        });
        // Bind input change
        input.onfocus = function () {
            input.select();
        };
        input.oninput = function () {
            var valueNew = Number(input.value);
            console.log(valueNew);
            if (!valueNew) {
                input.value = String(value);
                return false;
            }
            value = valueNew;
            if (valueNew >= max) {
                value = max;
                console.log("max");
            }
            else if (valueNew <= min) {
                value = min;
                console.log("min");
            }
            input.value = String(value);
            input.select();
        };
    };
    InputCounter.prototype.refresh = function () {
        var _this = this;
        /* Off previous bind clicks */
        if (this.active) {
            // this.$input.off("click");
            // this.$button.off("input");
            this.active = false;
        }
        ;
        /* Get elements wrap */
        var wrap = document.querySelectorAll("[data-bind=\"input-counter\"]");
        /* Fill database */
        wrap.forEach(function (item) {
            _this.add(item);
        });
        console.log(this.database);
        this.active = true;
    };
    return InputCounter;
}());
exports.InputCounter = InputCounter;
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProtectEmail = /** @class */ (function () {
    function ProtectEmail() {
        this.refresh();
    }
    ProtectEmail.prototype.refresh = function () {
        this.$links = document.getElementsByClassName('js_email');
        var length = this.$links.length;
        for (var index = 0; index < length; index++) {
            var $element = this.$links[index];
            $element.addEventListener('click', this.onClick);
        }
    };
    ProtectEmail.prototype.onClick = function (e) {
        // @ts-ignore
        var $link = this;
        var email = $link.children[0].textContent
            .split('')
            .reverse()
            .join('');
        $link.setAttribute('href', "mailto:" + email);
        $link.classList.remove('js_email');
        $link.textContent = email;
        var $copy = $link.cloneNode(true);
        $link.parentNode.replaceChild($copy, $link);
        return;
    };
    return ProtectEmail;
}());
exports.ProtectEmail = ProtectEmail;
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resize = /** @class */ (function () {
    /* Constructor */
    function Resize(data) {
        /* Arguments */
        this.data = {
            template: false,
        };
        /* Time to fire resize */
        this.resizeTime = 400;
    }
    Resize.prototype.trigger = function () {
    };
    Resize.prototype.add = function () {
    };
    Resize.prototype.clean = function () {
    };
    Resize.prototype.run = function () {
    };
    Resize.prototype.resize = function () {
    };
    return Resize;
}());
exports.Resize = Resize;
},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_1 = require("./elements");
var browser_1 = require("./browser");
/**
 * Toggle scroll lock for body element
 * Export "%scrollbar-placeholder" for CSS Selectorn to include scrollbar space
 *
 * @class						ScrollLock
 * @version					1.0
 * @css							scroll-lock.scss
 * @require					getScrollPosition
 */
var ScrollLock = /** @class */ (function () {
    function ScrollLock() {
        this.cssActiveClass = 'js_scroll-lock';
        this.cssActiveScrollbar = 'js_scrollbar-active';
    }
    ScrollLock.prototype.on = function () {
        this.positionTop = browser_1.getScrollPosition();
        elements_1.body.style.top = "-" + this.positionTop + "px";
        if (browser_1.isScrollbar()) {
            elements_1.html.classList.add(this.cssActiveScrollbar);
        }
        elements_1.html.classList.add(this.cssActiveClass);
        this.state = true;
    };
    ScrollLock.prototype.off = function () {
        elements_1.html.classList.remove(this.cssActiveClass, this.cssActiveScrollbar);
        window.scrollTo(0, this.positionTop);
        elements_1.body.style.top = '';
        this.positionTop = 0;
        this.state = false;
    };
    ScrollLock.prototype.change = function (state) {
        if (state && this.state === state) {
            /* test-code */
            console.info("ScrollLock\n- fired scrollLock() function with parameter '" + state + "', but state is already '" + this.state + "'");
            /* end-test-code */
            return false;
        }
        if (state === true || this.state) {
            this.off();
        }
        else {
            this.on();
        }
        /* test-code */
        console.info("ScrollLock\n- fired scrollLock() function with parameter '" + state + "', state is '" + this.state + "'");
        /* end-test-code */
    };
    return ScrollLock;
}());
exports.ScrollLock = ScrollLock;
/**
 * Changelog
 * 26.06.2019 Support custom properties polyfill
 * 20.06.2019 Add
 */
},{"./browser":5,"./elements":9}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Toggle burger menu with overlay
 *
 * @class						BurgerMenu
 * @version					1.0
 * @css							burger-menu.scss
 * @require					ScrollLock object
 */
var Sticky = /** @class */ (function () {
    function Sticky(param) {
        var _this = this;
        this.browser = param.browser;
        this.scrollLock = param.scrollLock;
        this.$element = param.$element;
        window.addEventListener('resize orientationchange', function () {
            _this.refresh();
        });
        this.refresh();
        window.addEventListener('scroll', function () {
            _this.onScroll();
        });
        this.onScroll();
    }
    Sticky.prototype.refresh = function () {
        this.offset = this.$element.parentElement.offsetTop;
        console.log(this.offset);
    };
    Sticky.prototype.onScroll = function () {
        if (!this.scrollLock.state) {
            if (this.browser.scroll.top > this.offset) {
                if (!this.active) {
                    this.active = true;
                    this.$element.parentElement.classList.add("js_sticky");
                }
            }
            else {
                if (this.active) {
                    this.active = false;
                    this.$element.parentElement.classList.remove("js_sticky");
                }
            }
        }
    };
    return Sticky;
}());
exports.Sticky = Sticky;
/**
 * Changelog
 * 26.06.2019 Add
 */
},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transition_size_1 = require("./transition-size");
var Tabs = /** @class */ (function () {
    function Tabs(param) {
        this.activeTab = 0;
        this.isRun = false;
        this.active = false;
        this.name = param.name;
        if (param.callbackChange) {
            this.callbackChange = param.callbackChange;
        }
        this.refresh();
    }
    Tabs.prototype.refresh = function () {
        var $contents = document.querySelectorAll("[data-tabs-content=\"" + this.name + "\"]"), $buttons = document.querySelectorAll("[data-tabs-buttons=\"" + this.name + "\"]"), $containers = document.querySelectorAll("[data-tabs-" + this.name + "-active]");
        if (this.active) {
            this.unbind();
        }
        if ($contents.length) {
            this.$contents = $contents[0].children;
            this.$buttons = $buttons[0].children;
            if ($containers.length) {
                this.$containers = $containers[0].children;
            }
            this.bind();
        }
    };
    Tabs.prototype.bind = function () {
        var _this = this;
        var length = this.$buttons.length;
        var _loop_1 = function (index) {
            var $element = this_1.$buttons[index];
            $element.addEventListener('click', function () {
                _this.change(index);
            });
        };
        var this_1 = this;
        for (var index = 0; index < length; index++) {
            _loop_1(index);
        }
    };
    Tabs.prototype.unbind = function () { };
    Tabs.prototype.change = function (index) {
        var _this = this;
        if (this.activeTab === index || this.isRun) {
            return false;
        }
        this.isRun = true;
        transition_size_1.transition({
            $element: this.$contents[index],
            callbackChanged: function () {
                _this.isRun = false;
                if (_this.callbackChange) {
                    _this.callbackChange();
                }
            }
        });
        this.$buttons[this.activeTab].classList.remove('active');
        this.$contents[this.activeTab].classList.remove('active');
        this.$buttons[index].classList.add('active');
        this.$contents[index].classList.add('active');
        if (this.$containers) {
            this.$containers[this.activeTab].classList.remove('active');
            this.$containers[index].classList.add('active');
        }
        this.activeTab = index;
    };
    return Tabs;
}());
exports.Tabs = Tabs;
},{"./transition-size":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("./browser");
function transition(args) {
    var $container = args.$element.parentElement, containerHeight = $container.clientHeight, elementHeight = args.$element.clientHeight;
    $container.classList.add('js_transition');
    $container.style.height = containerHeight + "px";
    window.setTimeout(function () {
        $container.style.height = elementHeight + "px";
        $container.addEventListener(browser_1.getTransitionEvent(), function () {
            $container.classList.remove('js_transition');
            $container.style.height = null;
            if (args.callbackChanged) {
                args.callbackChanged();
            }
        }, false);
    }, 50);
}
exports.transition = transition;
},{"./browser":5}]},{},[4])

//# sourceMappingURL=app.dev.js.map
