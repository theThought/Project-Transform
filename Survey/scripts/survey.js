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

Survey.prototype.registerComponent = function (componentType, id, group) {
    console.log('Registering component ' + id);

    switch (componentType) {
        case 'aInputSinglelineedit':
            requirejs(['a-input-singlelineedit'], function (aInputSinglelineedit) {
                app.components[id] = new aInputSinglelineedit(id, group);
                app.components[id].Init();
            });
            break;
        case 'mOptionBase':
            requirejs(['m-option-base'], function (mOptionBase) {
                app.components[id] = new mOptionBase(id, group);
                app.components[id].Init();
            });
            break;
        case 'aInputMultilineedit':
            requirejs(['a-input-multilineedit'], function (aInputMultilineEdit) {
                app.components[id] = new aInputMultilineEdit(id, group);
                app.components[id].Init();
            });
            break;
        case 'oQuestionChoice':
            requirejs(['o-question-choice'], function (oQuestionChoice) {
                app.components[id] = new oQuestionChoice(id, group);
                app.components[id].Init();
            })
    }

}

Survey.prototype.RegisterProperties = function (id, props) {
    console.log('Registering properties for ' + id);
    app.properties[id] = this.sanitiseProperties(props);
}

Survey.prototype.sanitiseProperties = function (props) {
    for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
            if (props[prop] === 'true') {
                props[prop] = true;
            }
            if (props[prop] === 'false') {
                props[prop] = false;
            }
        }
    }

    return props;
}