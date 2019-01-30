/*=========================================================================
|| jQuery Validation Plugin
|| https://jqueryvalidation.org/
=========================================================================*/
module.exports = () => {

    /* Start validator */
    const $formValidator = $('.js_validator');

    if ( $formValidator.length ) {

        /* Fix email regexe */
        $.validator.methods.email = function(value, element) {
            return this.optional(element) || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        };

        /* Change default settings */
        $.validator.setDefaults({
            errorClass: "input-error",
            validClass: "input-success",
        });

        /* Change validator messages */
        // const validatorMessages = global.validatorMessages;
        $.extend(jQuery.validator.messages, {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
            minlength: jQuery.validator.format("Please enter at least {0} characters."),
            rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
            range: jQuery.validator.format("Please enter a value between {0} and {1}."),
            max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
            min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
        });

        /**
         * Forms
         */
        var 
        // Newsletter
        $formNewsletter = $('.js_validator');
        
        if ( $formNewsletter.length ) {
            $formNewsletter.validate({
                // rules: {
                //     email: {
                //         required: true,
                //         email: true
                //     },
                // },
            });
        }
    }
};