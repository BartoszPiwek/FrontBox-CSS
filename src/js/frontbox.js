(function($, _) {
    'use strict';

    /* @include frontbox/_rotate_text.js */
    /* @include frontbox/_spy_element.js */
    /* !@include frontbox/scroll.js */

    var Main = _.Main = {

        //=========================================================================
        // Main variables
        //=========================================================================


        //=========================================================================
        // Initiation
        //=========================================================================

        init: function() {
            var self = this;

            /**
             * Fallback
             */
            self.initVerticalUnit();
            self.is_ios_device();

            /**
             * Wordpress
             */
            // self.initLoadMorePosts.start();


            //=========================================================================
            // Main

            

            // Run plugin
            // frontbox/scroll.js
            // $(".js_scroll").frontbox_scroll();

            // Blazy
            // var bLazy = new Blazy({
            //     selector: '.js_blazy', // all images
            //     successClass: 'js_blazy--active',
            // });


            self.initToggle();
            self.initInputCounter();

            // self.cookies();

            self.initConsoleLogInformation();
            self.initWCAG();

            /**
             * Header
             */
            self.initBurgerToggle.start();
            // self.initHeaderSpySticky();
            // self.initDropHeaderShadow();

            //=========================================================================
            // Custom

            self.validation();

            self.initTabs.add("main");

            /* test-code */
            console.log(self);
            Main.debugConsole.add("Running correct...");
            /* end-test-code */
        },

        //=========================================================================
        // Autoappend functions
        //=========================================================================

        //=========================================================================
        // Main

        page_calculate: {
            bind: () => {
                $(window).on('resize orientationchange', function() {
                    Main.recalculatePageVariables();
                });
                Main.recalculatePageVariables();
            }
        },

        scroll_calculate: {
            bind: () => {
                $(window).scroll(Main.recalculateScrollVariables);
                Main.recalculateScrollVariables();
            }
        },

        /**
         * Header
         */
        /* @include frontbox/header_burger.js */
        /* @include frontbox/header_drop-shadow.js */
        /* @include frontbox/header_spy-sticky.js */

        // @include frontbox/console_log_information.js

        /* @include frontbox/tabs.js */
        /* @include frontbox/_toggle_elements.js */
        /* @include frontbox/cookies.js */
        /* @include frontbox/input-counter.js */
        /* @include frontbox/wcag.js */

        /**
         * Wordpress
         */
        /* !@include frontbox/wordpress/load-more-posts.js */
        

        /**
         * Fallback
         */
        /* @include frontbox/fallback/is_ios_device.js */
        /* @include frontbox/fallback/v_unity_to_pixel.js */

        

        //=========================================================================
        // Custom

        /**
         * Validation function
         * jQuery Validation Plugin (https://github.com/jquery-validation/jquery-validation)
         */
        validation: () => {
            // Fix email regexe
            $.validator.methods.email = function(value, element) {
                return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            };

            $(".js_validate").each(function() {
                $(this).validate({
                    errorClass: "input-error",
                    validClass: "input-success",
                    wrapper: "div",
                    debug: true,
                    submitHandler: function() {
                        alert("Submitted!")
                    },
                    rules: {
                        email: {
                            required: true,
                            email: true
                        }
                    },
                    messages: {
                        email: {
                            required: "Adres e-mail jest wymagany",
                            email: "Wprowadź prawidłowy adres e-mail"
                        }
                    }
                });
            });
        },

    };

    $(() => {
        Main.init();
    });

})(jQuery, window);
