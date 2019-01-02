module.exports = (argument) => {

    $(document).keydown(function () {
      $('body').addClass('js_wcag-focus');
    });

    $(document).mousedown(function () {
      $('body').removeClass('js_wcag-focus');
    });

    // Focus click fix
    $(document).on('mousedown', '[tabindex], a, button, input[type="checkbox"], input[type="button"], input[type="submit"]', function (e) {
      $(this).addClass('js_wcag-focus--ignore');
    });

    $(document).on('mousedown', 'label', function (e) {
      var id = $(this).attr('for'),
        $input = $('#' + id);
      $input.addClass('js_wcag-focus--ignore');
    });

    $(document).on('keydown keyup', function (e) {
      $('.js_wcag-focus--ignore').removeClass('js_wcag-focus--ignore');
    });
},