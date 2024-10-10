/* This is a copy of "main.js" for use in Storybook's "preview-head.html". */
define(
    function () {
        var initInterval = 300;
        var initRuns = 0;
        var initEmpy = 0;

        setInterval(componentsReady, initInterval);

        function componentsReady () {
            initRuns++;
            var i = app.preinitcomponents.length;

            if (i===0) {
                initEmpy++;
            } else {
                console.info('Calling init for ' + i + ' components');
            }

            while (i--) {
                var currentcomponent = app.preinitcomponents[i];
                if (typeof currentcomponent.init === 'function') {
                    try {
                        currentcomponent.init();
                    } catch (e) {
                        console.error('Failed to init component ' + currentcomponent.id + ' due to following error ' + e);
                        console.log(e.stack);
                    }
                } else {
                    console.log('No init defined for + ' + currentcomponent.id);
                }
                app.components.push(app.preinitcomponents.splice(i, 1)[0]);
            }

            // check whether there are any unused properties that might indicate a problem
            app.checkProperties();
        }
    });
