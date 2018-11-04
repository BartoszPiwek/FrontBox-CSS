/*=========================================================================
|| Google Maps 
=========================================================================*/
module.exports = (data) => {
    'use strict';
    
    const
    FUNCTIONS = data.FUNCTIONS,
    SCROLL = data.SCROLL;

    // Main map element
    var
    mapElement = null,
    markers = {},
    pointers = [],
    mapObject = null;

    var
    OPTIONS_MAP = {},
    OPTIONS = {};

    function smoothZoom (map, max, cnt) {
        if (cnt >= max) {
            return;
        }
        else {
            var z = google.maps.event.addListener(map, 'zoom_changed', function(event){
                google.maps.event.removeListener(z);
                smoothZoom(map, max, cnt + 1);
            });
            setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
        }
    }  

    /**
     * Start function
     * 
     * @param {Object} data
     * replace values in SETTINGS 
     */
    var
    start = (data) => {

        $.extend( OPTIONS_MAP, data.OPTIONS_MAP );
        $.extend( OPTIONS, data.OPTIONS );

        mapElement = document.getElementById( OPTIONS_MAP.mapID );

        
        if (mapElement) 
        {
            mapObject = new google.maps.Map( mapElement, OPTIONS_MAP);

            /* test-code */
            DEBUG.debugConsole.add("Start: googleMaps");
            /* end-test-code */
        }

    };

    /**
     * Return path to image
     * @param {String} name 
     */
    const
    imageMarker = (name) => {
        return `${OPTIONS.markerImagePath}/${name}.png`;
    };

    function DivMarker(latlng, map, data) {
        this.latlng_ = latlng;
        this.data = data;
        /*Do this or nothing will happen:*/
        this.setMap(map);
    }
    
    DivMarker.prototype = new google.maps.OverlayView();
    DivMarker.prototype.draw = function() {
        var me = this;
        var div = this.div_;
        if (!div) {
            // Create a overlay text DIV
            div = this.div_ = document.createElement('DIV');
            div.style.border = "none";
            div.style.position = "absolute";
            div.style.paddingLeft = "0px";
            div.style.cursor = 'pointer';
            
            div.setAttribute("data-region", this.data.name );

            var span = document.createElement("span");

            span.style.height = "30px";
            span.style.width = "30px";
            span.style.borderRadius = "50%";
            span.style.backgroundColor = "#017eff";
            span.style.paddingLeft = "0px";
            span.style.position = "absolute";
            span.className = "markerOverlay";
            span.style.top = "50%";
            span.style.left = "50%";
            span.style.transform = "translate(-50%, -50%)";

            var text = document.createElement("span");
            text.style.position = "absolute";
            span.style.color = "#FFFFFF";
            span.style.fontWeight = "bolder";
            span.style.fontSize = "16px";
            text.style.top = "50%";
            text.style.left = "50%";
            text.style.transform = "translate(-50%, -50%)";

            text.appendChild(document.createTextNode(this.data.count));
            div.appendChild(span);
            span.appendChild(text);
            google.maps.event.addDomListener(div, "click", function(event) {
                google.maps.event.trigger(me, "click");
                $("#region").val(me.data.name).trigger('change');
            });
    
            // Then add the overlay to the DOM
            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }
    
        // Position the overlay 
        var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
        if (point) {
          div.style.left = point.x + 'px';
          div.style.top = point.y + 'px';
        }
    };
    
    DivMarker.prototype.hide = function() {
        // Check if the overlay was on the map and needs to be removed.
        if (this.div_) {    
            this.div_.style.display = "none";
        }
    };
    DivMarker.prototype.show = function() {
        // Check if the overlay was on the map and needs to be removed.
        if (this.div_) {    
            this.div_.style.display = "block";
        }
    };
    DivMarker.prototype.remove = function() {
        // Check if the overlay was on the map and needs to be removed.
        if (this.div_) {    
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
        }
    };
    
    DivMarker.prototype.getPosition = function() {
        return this.latlng_;
    };
    
    const
    addPointers = ( data ) => {


        $.each(data, function (indexInArray, valueOfElement) { 
            if (indexInArray != "Polska") {
                let
                position = new google.maps.LatLng(PLACES_TYPE[indexInArray].position.lat, PLACES_TYPE[indexInArray].position.lng);
                pointers.push( new DivMarker(position, mapObject, valueOfElement) );
            }
        });
    };

    const
    goToRegion = (name) => {

        let
        bounds = new google.maps.LatLngBounds();
        
        bounds.extend( new google.maps.LatLng(PLACES_TYPE[name].northeast.lat, PLACES_TYPE[name].northeast.lng) );
        bounds.extend( new google.maps.LatLng(PLACES_TYPE[name].southwest.lat, PLACES_TYPE[name].southwest.lng) );
        mapObject.fitBounds(bounds);
        mapObject.panToBounds(bounds); 

        /* test-code */
        DEBUG.debugConsole.add(`googleMaps: change region <strong>${name}</strong>`);
        /* end-test-code */
    };

    /**
     * 
     * @param {*} data 
     */
    var 
    addMarker = (data, animation = false) => {

        deleteMarker(data);

        let
        position = createLatLng(data.position),
        url = imageMarker(data.color),
        iconSize = new google.maps.Size( OPTIONS.markerSize[0], OPTIONS.markerSize[1] ),
        origin  = new google.maps.Point( OPTIONS.origin[0], OPTIONS.origin[1] ),
        anchor = new google.maps.Point( OPTIONS.anchor[0], OPTIONS.anchor[1] );

        let
        param = {
            position: position,
            map: mapObject,
            icon: {
                url: url,
                size: iconSize,
                scaledSize: iconSize,
                origin: origin,
                anchor: anchor,
            }
        };

        if (animation) {
            param.icon.url = imageMarker('black');
            param.animation = google.maps.Animation.DROP;
        }

        let
        marker = new google.maps.Marker(param);

        markers[data.id] = marker;

        clickMarkers(marker, data);

        /* test-code */
        DEBUG.debugConsole.add(`(<strong>googleMaps</strong>) Add marker {lat: ${data.position.lat}; lon: ${data.position.lon}; icon: ${url}}`);
        /* end-test-code */
    };

    const
    addMarkers = ( data ) => {
        if ( data ) {
            for (var element of data) {
                addMarker(element);
            }
        }
    };

    var
    deleteMarker = ( data ) => {
        if (markers[data.id]) {
            markers[data.id].setMap(null); 
            delete markers[data.id];

            /* test-code */
            DEBUG.debugConsole.add(`(<strong>googleMaps</strong>) delete marker {lat: ${data.position.lat}; lon: ${data.position.lon};`);
            /* end-test-code */
        }
    };

    var
    deleteMarkers = () => {
        if ( markers ) {
            $.each(markers, function (indexInArray, valueOfElement) { 
                valueOfElement.setMap(null);
            });
        }
    };

    var
    clickMarkers = ( marker, data ) => {
        marker.addListener('click', function() {
            data.$this.trigger('click');
        });
    };

    var
    createLatLng = ( data ) => {
        return new google.maps.LatLng(parseFloat(data.lat),parseFloat(data.lon));
    };

    /**
     * Update map function
     * @param {Object lat/lng} position 
     */
    var
    goToMarker = ( data, zoom ) => {
        let
        position = createLatLng( data.position );

        mapObject.panTo(position);
        smoothZoom(mapObject, zoom, mapObject.getZoom());

        /* test-code */
        DEBUG.debugConsole.add(`Click <strong>googleMaps</strong> {lat: ${data.position.lat}; lon: ${data.position.lon}}`, 'click');
        /* end-test-code */
    };

    var
    changePointers = ( DATA ) => {
        for (let value of pointers) {
            switch (DATA) {
                case "show":
                    value.show();
                    break;
                case "hide":
                    value.hide();
                    break;
            }
        }
    };

    start(data);

    return {
        addMarker: addMarker,
        addMarkers: addMarkers,
        goToMarker: goToMarker,
        deleteMarkers: deleteMarkers,
        deleteMarker: deleteMarker,
        goToRegion: goToRegion,
        addPointers: addPointers,
        changePointers: changePointers,
    };
  
};