registerPlugin({
    install: function(less, pluginManager, functions) {

        functions.add('arrayElement', function(array, position) {
            position = position.value;
            array = array.value;
            return array[position];
        });

        functions.add('arrayIndexOf', function( name, arrayFind ) {
            var output = Array( arrayFind )[0].value[0].value;
            // return output[name];
            // console.log(output[0].value[0].value);
            return output;
        });

    },
});