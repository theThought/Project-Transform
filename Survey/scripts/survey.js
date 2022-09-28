/**
 * Survey Class
 *
 * @constructor
 */

function Survey() {
    this.components = [];
    this.properties = {};
    this.initialvalues = {};
}

Survey.prototype.registerComponent = function (componentType, id, group) {

    switch (componentType.toLowerCase()) {
        case 'page':
            requirejs(['page'], function (page) {
                app.components.push(new page(id, group));
            });
            break;
        case 'oprogress':
            requirejs(['o-progress'], function (oProgress) {
                app.components.push(new oProgress(id, group));
            });
            break;
        case 'ainputsinglelineedit':
            requirejs(['a-input-singlelineedit'], function (aInputSinglelineEdit) {
                app.components.push(new aInputSinglelineEdit(id, group));
            });
            break;
        case 'ainputreadwriteedit':
            requirejs(['a-input-readwriteedit'], function (aInputReadWriteEdit) {
                app.components.push(new aInputReadWriteEdit (id, group));
            });
            break;
        case 'moptionbase':
            requirejs(['m-option-base'], function (mOptionBase) {
                app.components.push(new mOptionBase(id, group));
            });
            break;
        case 'abuttonoption':
            requirejs(['a-button-option'], function (aButtonOption) {
                app.components.push(new aButtonOption(id, group));
            });
            break;
        case 'abuttonlistdropdown':
            requirejs(['a-button-list-dropdown'], function (aButtonListDropdown) {
                app.components.push(new aButtonListDropdown(id, group));
            });
            break;
        case 'ainputlistdropdown':
            requirejs(['a-input-list-dropdown'], function (aInputListDropdown) {
                app.components.push(new aInputListDropdown(id, group));
            });
            break;
        case 'ainputmultilineedit':
            requirejs(['a-input-multilineedit'], function (aInputMultilineEdit) {
                app.components.push(new aInputMultilineEdit(id, group));
            });
            break;
        case 'oquestiongrid':
            requirejs(['o-question-grid'], function (oQuestionGrid) {
                app.components.push(new oQuestionGrid(id, group));
            });
            break;
        case 'oquestionlist':
            requirejs(['o-question-list'], function (oQuestionList) {
                app.components.push(new oQuestionList(id, group));
            });
            break;
        case 'oquestion':
        case 'oquestionchoice':
        case 'oquestionreadwriteedit':
        case 'oquestionsinglelineedit':
            requirejs(['o-question-choice'], function (oQuestionChoice) {
                app.components.push(new oQuestionChoice(id, group));
            });
            break;
        case 'oquestioncontainer':
            requirejs(['o-question-container'], function (oQuestionContainer) {
                app.components.push(new oQuestionContainer(id, group));
            });
            break;
        case 'oquestionhnumberslider':
            requirejs(['o-question-h-number-slider'], function (oQuestionHNumberSlider) {
                app.components.push(new oQuestionHNumberSlider(id, group));
            });
            break;
        case 'abuttonpreterminator':
            requirejs(['a-input-button-dec'], function (aInputButtonDec) {
                app.components.push(new aInputButtonDec(id, group));
            });
            break;
        case 'abuttonpostterminator':
            requirejs(['a-input-button-inc'], function (aInputButtonInc) {
                app.components.push(new aInputButtonInc(id, group));
            });
            break;
        case 'alabelthumbvalue':
            requirejs(['a-label-thumbvalue'], function (aLabelThumbValue) {
                app.components.push(new aLabelThumbValue(id, group));
            });
            break;
        case 'mlistoptionlist':
            requirejs(['m-list-optionlist'], function (mListOptionList) {
                app.components.push(new mListOptionList(id, group));
            });
            break;
        default:
            console.info('A request was made to register an unrecognised component type, ' + componentType + '.');
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
    id = id[id.length - 1];
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