/*=========================================================================
|| Google Maps 
=========================================================================*/
module.exports = (data) => {
    
    var
    FUNCTIONS = data.FUNCTIONS,
    SCROLL = data.SCROLL;

    // Main map element
    var
    mapElement = null,
    markers = [],
    mapObject = null;

    var
    OPTIONS = {};

    

    /**
     * Create map coordinate
     */
    var addCoordinate = (lat, lng) => {

        /* test-code */
        if (!lat || !lng) {
            DEBUG.debugConsole.add(`Add googleMapsCannot: cannot add coordinate {lat: <strong>${lat}</strong>; lng: <strong>${lng}</strong>}`, 'click');
            return false;
        }
        /* end-test-code */


        return {

        };
    };

    /**
     * Start function
     * 
     * @param {Object} data
     * replace values in SETTINGS 
     */
    var
    start = (data) => {

        $.extend( OPTIONS, data.OPTIONS );

        mapElement = document.getElementById( OPTIONS.mapID );

        
        if (mapElement) 
        {
            mapObject = new google.maps.Map( mapElement, OPTIONS);

            /* test-code */
            DEBUG.debugConsole.add("Start: googleMaps");
            /* end-test-code */
        }

    };

    /**
     * Return path to image
     * @param {String} name 
     */
    var
    imageMarker = (name) => {
        return `${wp.theme}/assets/images/markers/${name}.png`;
    };

    /**
     * 
     * @param {*} data 
     */
    var 
    addMarker = (data) => {

        let
        position = createLatLng(data.position),
        icon = imageMarker(data.color),
        iconSize = new google.maps.Size(OPTIONS.markerSize);

        let
        param = {
            position: position,
            map: mapObject,
            icon: icon,
            animation: google.maps.Animation.DROP,
            size: iconSize,
            scaledSize: iconSize,
            origin: iconSize,
            anchor: iconSize,
        };

        let
        marker = new google.maps.Marker(param);

        markers.push(marker);

        /* test-code */
        DEBUG.debugConsole.add(`(googleMaps) Add marker {lat: ${data.position.lat}; lon: ${data.position.lon}; icon: ${icon}}`);
        /* end-test-code */
    };

    var
    cleanMarkers = () => {
        markers.forEach( (element, index, array) => {
            element.setMap(null);
        });

        markers = [];
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

        mapObject.setCenter(position);
        mapObject.setZoom(zoom);

        cleanMarkers();
        addMarker(data);
        /* test-code */
        DEBUG.debugConsole.add(`Click <strong>googleMaps</strong> {lat: ${data.position.lat}; lon: ${data.position.lon}}`, 'click');
        /* end-test-code */
    };

    start(data);

    return {
        addMarker: addMarker,
        goToMarker: goToMarker,
        cleanMarkers: cleanMarkers,
    };
  
};