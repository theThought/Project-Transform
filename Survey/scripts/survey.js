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
    console.log('Registering component.');

    switch (componentType) {
        case 'mOptionBase':
            require(['m-option-base'], function (mOptionBase) {
                app.components[id] = new mOptionBase(id);
            });
            break;
        case 'aInputMultilineedit':
            require(['a-input-multilineedit'], function (aInputMultilineEdit) {
                app.components[id] = new aInputMultilineEdit(id);
            });
            break;
    }
}