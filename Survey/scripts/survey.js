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

    switch (componentType.toLowerCase()) {
        case 'ainputsinglelineedit':
            requirejs(['a-input-singlelineedit'], function (aInputSinglelineEdit) {
                app.components[id] = new aInputSinglelineEdit(id, group);
                app.components[id].Init();
            });
            break;
        case 'moptionbase':
            requirejs(['m-option-base'], function (mOptionBase) {
                app.components[id] = new mOptionBase(id, group);
                app.components[id].Init();
            });
            break;
        case 'ainputmultilineedit':
            requirejs(['a-input-multilineedit'], function (aInputMultilineEdit) {
                app.components[id] = new aInputMultilineEdit(id, group);
                app.components[id].Init();
            });
            break;
        case 'oquestionchoice':
            requirejs(['o-question-choice'], function (oQuestionChoice) {
                app.components[id] = new oQuestionChoice(id, group);
                app.components[id].Init();
            });
            break;
        case 'oquestionhnumberslider':
            requirejs(['o-question-h-number-slider'], function (oQuestionHNumberSlider) {
                app.components[id] = new oQuestionHNumberSlider(id, group);
                app.components[id].Init();
            });
            break;
        case 'ainputbuttoninc':
            requirejs(['a-input-button-inc'], function (aInputButtonInc) {
                app.components[id] = new aInputButtonInc(id, group);
                app.components[id].Init();
            });
            break;
        case 'ainputbuttondec':
            requirejs(['a-input-button-dec'], function (aInputButtonDec) {
                app.components[id] = new aInputButtonDec(id, group);
                app.components[id].Init();
            });
            break;
        case 'alabelthumbvalue':
            requirejs(['a-label-thumbvalue'], function (aLabelThumbValue) {
                app.components[id] = new aLabelThumbValue(id, group);
                app.components[id].Init();
            });
            break;
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