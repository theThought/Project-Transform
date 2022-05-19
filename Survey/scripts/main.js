require(['domready'], function (domReady) {
    domReady(function () {

        var componentsReady = function () {

            if (!app.components.length) {
                // if the component array hasn't finished building but the DOM is complete
                // we need to wait a moment for components to finish registering prior to init()
                setTimeout(componentsReady, 300)
            } else {
                // ready to init() components
                for (var component in app.components) {
                    var currentcomponent = app.components[component];
                    if (typeof currentcomponent['init'] === 'function') {
                        currentcomponent.init();
                    }
                }

            }
        }

        componentsReady();

        // check whether there are any unused properties that might indicate a problem
        app.checkProperties();
    })
});