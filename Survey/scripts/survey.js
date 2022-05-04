/**
 * Survey Class
 *
 * @constructor
 */

function Survey() {
    this.components = {};
    this.properties = {};
    this.initialvalues = {};
}

Survey.prototype.registerComponent = function (componentType, id, group) {

    switch (componentType.toLowerCase()) {
        case 'ainputsinglelineedit':
            requirejs(['a-input-singlelineedit'], function (aInputSinglelineEdit) {
                app.components[id] = new aInputSinglelineEdit(id, group);
            });
            break;
        case 'moptionbase':
            requirejs(['m-option-base'], function (mOptionBase) {
                app.components[id] = new mOptionBase(id, group);
            });
            break;
        case 'abuttonoption':
            requirejs(['a-button-option'], function (aButtonOption) {
                app.components[id] = new aButtonOption(id, group);
            });
            break;
        case 'ainputmultilineedit':
            requirejs(['a-input-multilineedit'], function (aInputMultilineEdit) {
                app.components[id] = new aInputMultilineEdit(id, group);
            });
            break;
        case 'oquestiongrid':
            requirejs(['o-question-grid'], function (oQuestionGrid) {
                app.components[id] = new oQuestionGrid(id, group);
            });
            break;
        case 'oquestion':
        case 'oquestionchoice':
        case 'oquestionsinglelineedit':
            requirejs(['o-question-choice'], function (oQuestionChoice) {
                app.components[id] = new oQuestionChoice(id, group);
            });
            break;
        case 'oquestioncontainer':
            requirejs(['o-question-container'], function (oQuestionContainer) {
                app.components[id] = new oQuestionContainer(id, group);
            });
            break;
        case 'oquestionhnumberslider':
            requirejs(['o-question-h-number-slider'], function (oQuestionHNumberSlider) {
                app.components[id] = new oQuestionHNumberSlider(id, group);
            });
            break;
        case 'abuttonpreterminator':
            requirejs(['a-input-button-dec'], function (aInputButtonDec) {
                app.components[id] = new aInputButtonDec(id, group);
            });
            break;
        case 'abuttonpostterminator':
            requirejs(['a-input-button-inc'], function (aInputButtonInc) {
                app.components[id] = new aInputButtonInc(id, group);
            });
            break;
        case 'alabelthumbvalue':
            requirejs(['a-label-thumbvalue'], function (aLabelThumbValue) {
                app.components[id] = new aLabelThumbValue(id, group);
            });
            break;
        default:
            console.info('A request was made to register an unrecognised component type, ' + componentType + '.')
    }

}

Survey.prototype.checkProperties = function () {
    for (var prop in app.properties) {
        if (!app.properties[prop].registered) {
            console.warn('Properties registered for ' + prop + ' were not used by any component.');
        }
    }
}

Survey.prototype.registerInitialState = function (id, value) {
    app.initialvalues[id] = value;
}

Survey.prototype.RegisterProperties = function (id, props) {
    id = this.extractQuestionName(id);
    app.properties[id] = this.sanitiseProperties(props);
}

Survey.prototype.getProperties = function (id) {
    id = this.extractQuestionName(id);

    if (typeof app.properties[id] == "undefined") {
        return {};
    }

    return app.properties[id];
}

Survey.prototype.extractQuestionName = function (id) {
    id = id.toLowerCase();
    id = id.split('_q');
    id = id[id.length-1];
    return id;
}

Survey.prototype.sanitiseProperties = function (props) {

    for (var prop in props) {
        if (props.hasOwnProperty(prop)) {

            // recursion for nested properties
            if (typeof props[prop] === 'object') {
                app.sanitiseProperties(props[prop]);
            }

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