define(function () {
    return {
        
        /**
         * Elements
         */
        $button: null,
        $wrapper: null,
        $content: null,

        /**
         * Variables
         */
        active: 8,
       
        /**
         * Triggers
         */
        loadPosts(event) {
            var
            self = this,
            $this = $(this);

            $this.addClass("loading");

            /**
             * Ajax
             */
            $.post(
                wordpress.ajaxurl, 
                {
                    action: 'load_older_posts',
                    data: {
                        active: Main.initLoadMorePosts.active   
                    },
                },
                function(output) {
                    window.setTimeout(function() {

                        var
                        self = Main.initLoadMorePosts;
                        
                        /* test-code */
                        console.log(output);
                        /* end-test-code */

                        // More posts found
                        if (output) 
                        {
                            self.$content.append(output);

                            self.$wrapper
                            .css('height', self.$content[0].scrollHeight)
                            .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
                                
                                if (self.active >= 9) {
                                    self.$wrapper.addClass("active");
                                }

                                self.$wrapper.css('height', '');
                            });

                            $this.removeClass("loading");

                            self.active += 9;
                        } 

                        // No more posts to load
                        if (!output || self.active >= wordpress.posts.count) 
                        {
                            $this.addClass("disable");
                        }
                        
                    }, 1000);
                }
            );

            event.preventDefault();
        },

        /**
         * Binds
         */
        bindButton($element = Main.initLoadMorePosts.$button) {
            $element.on("click", this.loadPosts);
        },
        unbindButton($element = Main.initLoadMorePosts.$button) {
            $element.off("click", this.loadPosts);
        },

        /**
         * Start
         */
        start() {
            var self = this;
            self.$button = $('#load-older-posts__button');

            if (self.$button.length) {

                self.$wrapper = $("#load-older-posts__wrapper");
                self.$content = $("#load-older-posts__content");

                self.bindButton(self.$button);
            }
        }
        
    }
});