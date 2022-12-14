require(['domready'], function (domReady) {
    domReady(function () {
        setInterval(componentsReady, 300);

        function componentsReady () {
            console.info('Calling init for ' + app.preinitcomponents.length + ' components');
            var i = app.preinitcomponents.length;

            while (i--) {
                var currentcomponent = app.preinitcomponents[i];
                if (typeof currentcomponent['init'] === 'function') {
                    currentcomponent.init();
                }
                app.components.push(app.preinitcomponents.splice(i, 1));
            }
        }

        // check whether there are any unused properties that might indicate a problem
        app.checkProperties();
    })
});