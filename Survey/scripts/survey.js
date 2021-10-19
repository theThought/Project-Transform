/*
  functionality:


  Parameters:


  Event Handlers:


  Configuration:
  {}

*/

/**
 * Survey Class
 *
 * @constructor
 */

function Survey() {
    this.components = {};
}

Survey.prototype.Init = function () {
    console.log('Init components.');

    for (var component in this.components) {
        this.components[component].Init();
    }

}

Survey.prototype.registerComponent = function (componentType, id) {
    console.log('Registering component');
    switch (componentType) {
        case 'mOptionBase':
            require(['m-option-base'], function (mOptionBase) {
                app.components[id] = new mOptionBase(id);
            });
            break;
        case 'aInputMultilineedit':
            this.components[id] = require(['a-input-multilineedit'], function (aInputMultilineEdit) {
               app.components[id] = new aInputMultilineEdit(id);
            });
            break;
    }
}

Survey.prototype.x_registerComponent = function (component) {
    console.log('registering component');
    this.components[component.id] = component;
}

Survey.prototype.removeComponent = function (id) {
    delete this.components[id];
}

Survey.prototype.getComponentById = function (id) {
    return this.components[id];
}
