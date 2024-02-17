require(['domready'], function (domReady) {
    domReady(function () {
        var initInterval = 300;
        var initRuns = 0;
        var initEmpy = 0;
        var initLimit = 10;

        var initTimer = setInterval(componentsReady, initInterval);

        function componentsReady () {
            initRuns++;
            var i = app.preinitcomponents.length;

            if (i===0) {
                initEmpy++;
            } else {
                console.info('Calling init for ' + i + ' components');
            }

            if (initEmpy >= initLimit) {
                clearInterval(initTimer);
            }

            while (i--) {
                var currentcomponent = app.preinitcomponents[i];
                if (typeof currentcomponent['init'] === 'function') {
                    currentcomponent.init();
                }
                app.components.push(app.preinitcomponents.splice(i, 1));
            }

            // check whether there are any unused properties that might indicate a problem
            app.checkProperties();
        }
    })
});