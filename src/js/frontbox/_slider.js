//=========================================================================
// FILE: slider.js
//=========================================================================
// TODO: documentation
//=========================================================================

initTabs: function() {

  var active_navigation_tab;

  var $tabsElement = $("[data-tab]");
  var toggleClass = function() {

    var $this = $(this),
      targetItem = $this.attr("href"),
      tabLink = {
        tab: $("#" + $this.attr("data-tab")),
        addon: $this.attr("data-addon"),
        itemElement: $(targetItem),
        this_tab_toggler: $("[href='" + targetItem + "']"),
        itemElements: $("[data-tab='" + $this.attr("data-tab") + "']"),
        target: "single",
        self: "ignore"
      };

    tabLink.itemElements.removeClass("active");
    tabLink.tab.find(".active").removeClass("active");
    tabLink.this_tab_toggler.addClass("active");
    tabLink.itemElement.addClass("active");

    return false;
  };

  $tabsElement.on("click", toggleClass);
},