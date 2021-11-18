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
    this.properties = {};
}

Survey.prototype.Init = function () {
}

Survey.prototype.registerComponent = function (componentType, id) {
    console.log('Registering component ' + id);

    switch (componentType) {
        case 'aInputSinglelineedit':
            requirejs(['a-input-singlelineedit'], function (aInputSinglelineedit) {
                app.components[id] = new aInputSinglelineedit(id);
                app.components[id].Init();
            });
            break;
        case 'mOptionBase':
            requirejs(['m-option-base'], function (mOptionBase) {
                app.components[id] = new mOptionBase(id);
                app.components[id].Init();
            });
            break;
        case 'aInputMultilineedit':
            requirejs(['a-input-multilineedit'], function (aInputMultilineEdit) {
                app.components[id] = new aInputMultilineEdit(id);
                app.components[id].Init();
            });
            break;
    }

}

Survey.prototype.RegisterProperties = function (id, props) {
    console.log('Registering properties for ' + id);
    app.properties[id] = props;
}