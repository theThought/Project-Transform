/**
 * Survey Class
 *
 * @constructor
 */

function Survey() {
    this.preinitcomponents = [];
    this.components = [];
    this.properties = {};
}

Survey.prototype.registerComponent = function (componentType, id, group) {
    switch (componentType.toLowerCase()) {
        case 'page':
            requirejs(['page'], function (page) {
                app.preinitcomponents.unshift(new page(id, group));
            });
            break;
        case 'oprogress':
            requirejs(['o-progress'], function (oProgress) {
                app.preinitcomponents.unshift(new oProgress(id, group));
            });
            break;
        case 'a-button-barcode':
            requirejs(['a-button-barcode'], function (aButtonBarcode) {
                app.preinitcomponents.unshift(new aButtonBarcode(id, group));
            });
            break;
        case 'ainputsinglelineedit':
            requirejs(['a-input-singlelineedit'], function (aInputSinglelineEdit) {
                app.preinitcomponents.unshift(new aInputSinglelineEdit(id, group));
            });
            break;
        case 'ainputmultilineedit':
            requirejs(['a-input-multilineedit'], function (aInputMultilineEdit) {
                app.preinitcomponents.unshift(new aInputMultilineEdit(id, group));
            });
            break;
        case 'ainputreadwriteedit':
            requirejs(['a-input-readwriteedit'], function (aInputReadWriteEdit) {
                app.preinitcomponents.unshift(new aInputReadWriteEdit(id, group));
            });
            break;
        case 'moptionbase':
            requirejs(['m-option-base'], function (mOptionBase) {
                app.preinitcomponents.unshift(new mOptionBase(id, group));
            });
            break;
        case 'abuttonoption':
            requirejs(['a-button-option'], function (aButtonOption) {
                app.preinitcomponents.unshift(new aButtonOption(id, group));
            });
            break;
        case 'ocombobox':
            requirejs(['o-combobox'], function (oCombobox) {
                app.preinitcomponents.unshift(new oCombobox(id, group));
            });
            break;
        case 'mlist':
            requirejs(['m-list'], function (mList) {
                app.preinitcomponents.unshift(new mList(id, group));
            });
            break;
        case 'oopenendsearch':
            requirejs(['o-openendsearch'], function (oOpenendSearch) {
                app.preinitcomponents.unshift(new oOpenendSearch(id, group));
            });
            break;
        case 'odropdown':
        case 'osliderdatethumbdate':
            requirejs(['o-dropdown'], function (oDropdown) {
                app.preinitcomponents.unshift(new oDropdown(id, group));
            });
            break;
        case 'oquestiongrid':
            requirejs(['o-question-grid'], function (oQuestionGrid) {
                app.preinitcomponents.unshift(new oQuestionGrid(id, group));
            });
            break;
        case 'oquestionlist':
            requirejs(['o-question-list'], function (oQuestionList) {
                app.preinitcomponents.unshift(new oQuestionList(id, group));
            });
            break;
        case 'oquestion':
        case 'oquestionchoice':
        case 'oquestionreadwriteedit':
        case 'oquestionsinglelineedit':
            requirejs(['o-question-choice'], function (oQuestionChoice) {
                app.preinitcomponents.unshift(new oQuestionChoice(id, group));
            });
            break;
        case 'oquestiondropdown':
            requirejs(['o-question'], function (oQuestionDropdown) {
                app.preinitcomponents.unshift(new oQuestionDropdown(id, group));
            });
            break;
        case 'oquestioncombobox':
            requirejs(['o-question'], function (oQuestionCombobox) {
                app.preinitcomponents.unshift(new oQuestionCombobox(id, group));
            });
            break;
        case 'oquestioncontainer':
            requirejs(['o-question-container'], function (oQuestionContainer) {
                app.preinitcomponents.unshift(new oQuestionContainer(id, group));
            });
            break;
        case 'oquestionslider-horizontal':
        case 'oquestionslider-vertical':
            requirejs(['o-question-slider'], function (oQuestionSlider) {
                app.preinitcomponents.unshift(new oQuestionSlider(id, group));
            });
            break;
        case 'oquestionopenend-search':
            requirejs(['o-question-openend-search'], function (oQuestionOpenendSearch) {
                app.preinitcomponents.unshift(new oQuestionOpenendSearch(id, group));
            });
            break;
        case 'oquestionchoice-summary':
            requirejs(['oQuestionChoice-summary'], function (oQuestionChoiceSummary) {
                app.preinitcomponents.unshift(new oQuestionChoiceSummary(id, group));
            });
            break;
        case 'abuttonpreterminator':
            requirejs(['a-input-button-dec'], function (aInputButtonDec) {
                app.preinitcomponents.unshift(new aInputButtonDec(id, group));
            });
            break;
        case 'abuttonpostterminator':
            requirejs(['a-input-button-inc'], function (aInputButtonInc) {
                app.preinitcomponents.unshift(new aInputButtonInc(id, group));
            });
            break;
        case 'alabelthumbvalue':
            requirejs(['a-label-thumbvalue'], function (aLabelThumbValue) {
                app.preinitcomponents.unshift(new aLabelThumbValue(id, group));
            });
            break;
        case 'oquestiondatetime-recent':
            requirejs(['o-question-datetime-recent'], function (oQuestionDateTimeRecent) {
                app.preinitcomponents.unshift(new oQuestionDateTimeRecent(id, group));
            });
            break;
        case 'msliderthumbinteractive':
            requirejs(['m-slider-thumb-interactive'], function (mSliderThumbInteractive) {
                app.preinitcomponents.unshift(new mSliderThumbInteractive(id, group));
            });
            break;
        case 'ainputthumbtop':
            requirejs(['a-input-thumb-top'], function (aInputThumbTop) {
                app.preinitcomponents.unshift(new aInputThumbTop(id, group));
            });
            break;
        case 'odropdownthumbbottom':
            requirejs(['o-dropdown-thumb-bottom'], function (oDropdownThumbBottom) {
                app.preinitcomponents.unshift(new oDropdownThumbBottom(id, group));
            });
            break;
        case 'oquestionscale':
        case 'oquestionscale-horizontal':
        case 'oquestionscale-vertical':
            requirejs(['o-question-scale'], function (oQuestionScale) {
                app.preinitcomponents.unshift(new oQuestionScale(id, group));
            });
            break;
        case 'oquestionmedia-external':
            requirejs(['o-question-media'], function (oQuestionMedia) {
                app.preinitcomponents.unshift(new oQuestionMedia(id, group));
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

Survey.prototype.RegisterProperties = function (id, props) {
    id = id.toLowerCase();
    if (id.indexOf('_q') === 0) {
        id = id.substring(2);
    }
    var newprops = this.sanitiseProperties(props);
    var currprops = app.properties[id] ? app.properties[id] : {};
    app.properties[id] = Object.assign(currprops, newprops);
}

Survey.prototype.getProperties = function (id) {
    // perform a loop becoming less specific until properties
    // are returned, or we run out of things to search for
    id = id.toLowerCase();

    if (app.properties[id] !== undefined) {
        return app.properties[id];
    }

    while (id.length > 0) {
        if (typeof app.properties[id] !== 'undefined') {
            return app.properties[id];
        }
        if (id.indexOf('_q') === -1) {
            return {};
        }
        id = id.substring(id.indexOf('_q') + 2);
    }

    return {};
}

/**
 * Returns a component with a property matching the supplied value.
 *
 * @param property {string}
 * @param value {*}
 * @returns {object}
 */
Survey.prototype.getComponentByProperty = function (property, value) {
    for (var i = 0; i < this.components.length; i++) {
        if (this.components[i][property] === value) {
            return this.components[i];
        }
    }
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