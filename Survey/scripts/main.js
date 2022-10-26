require(['domready'], function (domReady) {
    domReady(function () {
        setInterval(componentsReady, 300);

        function componentsReady () {
            console.info('Calling init for ' + app.components.length + ' components');
            var i = app.components.length;

            while (i--) {
                var currentcomponent = app.components[i];
                if (typeof currentcomponent['init'] === 'function') {
                    currentcomponent.init();
                }
                app.components.splice(i, 1);
            }
        }

        // check whether there are any unused properties that might indicate a problem
        app.checkProperties();
    })
});