initModals: function() {

    var $modals = $("[data='modal']");

    if ($modals.length) {
        
        var toggleModal = function() {
            var $this = $(this),
                modalUrl = $this.attr("data-target");

            $.ajax({
                type: "method",
                url: modalUrl,
                data: "data",
                dataType: "dataType",
                success: function (response) {
                    
                }
            });

            

        };
    }

},