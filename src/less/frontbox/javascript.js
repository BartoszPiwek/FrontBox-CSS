registerPlugin({
    install: function(less, pluginManager, functions) {
        functions.add('arrayElement', function(array, position) {
            position = position.value;
            array = array.value;
            return array[position];
        });
    }
})