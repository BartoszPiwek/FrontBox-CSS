/*=========================================================================
|| FILE: toggle_elements.js
===========================================================================
|| Toggle elements class using data attributes
||
|| * data-element - select elements separate with comma ( $("data-lement") )
|| * data-toggle - select type of toggle
||
|| Data-toggle type:
|| * collapse - collapse data-element ( use less/javascript/_collapse.less class )
|| * something else - toggle data-element using class on data-toggle
=========================================================================*/

initToggle: function () {

 var toggle_array = [];

 var event_toggle_class = function () {


  var $this = $(this),
   data_element = $this.attr("data-element").toString(),
   $element_object = $(data_element),
   element_html = $(data_element)[0],
   toggle_type = $this.attr("data-toggle"),
   element_index_array = toggle_array.indexOf(element_html),
   element_height = $element_object[0].scrollHeight;

  switch (toggle_type) {

   // Collapse element animation 
  case "collapse":

   // Close 
   if (element_index_array !== -1) {

    toggle_array = $.grep(toggle_array, function (value) {
     return value != element_html;
    });
    $element_object.css('height', element_height);
    window.setTimeout(function () {
     $element_object.css('height', "").addClass('off');
    }, 10);

    // Open
   } else {

    $element_object
      .css('height', element_height).removeClass('off')
      .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        $element_object.css('height', '');
    });
    toggle_array.push(element_html);
   }
   break;

   // Default: toggle "toggle_type" class
  default:
   $element_object.toggleClass(toggle_type);
   $this.toggleClass("active");
  }

 };

 $("body").on("click", '[data-toggle]', event_toggle_class);
},