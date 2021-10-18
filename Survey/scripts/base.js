// This polyfill is required for custom events to work on IE10
(function () {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

// This polyfill is required for StartsWith to work on IE10
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, rawPos) {
            var pos = rawPos > 0 ? rawPos|0 : 0;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}

requirejs.config({
    baseUrl: 'scripts'
});

/**
 * Survey Class
 *
 * @constructor
 */

function Survey() {
    this.components = {};
}

Survey.prototype.registerComponent = function (component) {
    this.components[component.id] = component;
}

Survey.prototype.removeComponent = function (id) {
    delete this.components[id];
}

Survey.prototype.getComponentById = function (id) {
    return this.components[id];
}

/**
 * Accepts element id and returns array containing child elements based on hierarchical id
 * e.g. _q_1 will return _q_1_text and _q_1_option_first etc.
 *
 * @param id - element id
 * @returns {*[]}
 */
Survey.prototype.getComponentsByParent = function (id) {
    var responseComponents = [];

    for (var component in this.components) {
        if (this.components.hasOwnProperty(component) &&
            component.toString().startsWith(id)) {
            responseComponents.push(this.components[component]);
        }
    }

    return responseComponents;
}

/**
 * Atom: aInputMultilineEdit
 *
 * @constructor
 * @param {String} id - element id
 */

function InputMultilineEdit(id) {
    this.id = id;
    this.element = document.getElementById(id);
    app.registerComponent(this);
    this.Init();
}

InputMultilineEdit.prototype.Init = function () {
    this.element.addEventListener("click", this.clicked, false);
    this.element.addEventListener("change", this.changed, false);
    this.element.addEventListener("exclusive", this.exclusive, false);
}

InputMultilineEdit.prototype.clicked = function (event) {
    console.log('Handling InputMultilineEdit click event');
}

InputMultilineEdit.prototype.changed = function (event) {
    console.log('Handling input change on aInputMultilineedit.')
}

InputMultilineEdit.prototype.exclusive = function (event) {
    console.log('Handling exclusive.');
}

/**
 * Organism: Question Response Class
 *
 * @constructor
 * @param {String} id - element id
 */

function QuestionResponse(id) {
    this.id = id;
    this.element = document.getElementById(id);
    app.registerComponent(this);
    this.Init();
}

QuestionResponse.prototype.Init = function () {
    this.element.addEventListener("click", this.clicked, false);
    this.components = app.getComponentsByParent(this.id);
}

QuestionResponse.prototype.clicked = function () {
    console.log('Handling oQuestionResponse click event');
}

/**
 * Molecule: Base Option
 *
 * @constructor
 * @param {String} id - element id
 */

function OptionBase(id) {
    this.id = id;
    this.element = document.getElementById(id);
    app.registerComponent(this);
    this.Init();
}

OptionBase.prototype.Init = function () {
    this.exclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;

    this.element.addEventListener("click", this, false);
    this.element.addEventListener("incomingExclusive", this, false);
}

OptionBase.prototype.handleEvent = function (event) {
    console.log('Handling optionbase event');
    switch (event.type) {
        case "click":
            this.clicked(event);
            break;
        case "incomingExclusive":
            this.incomingExclusive(event);
            break;
    }
}

OptionBase.prototype.incomingExclusive = function (event) {
    var originatingElement = event.target;
    if (this.element !== originatingElement) {
        this.element.checked = false;
    }
}

OptionBase.prototype.clicked = function (event) {
    if (this.exclusive) {
        var evExclusiveOn = new CustomEvent('incomingExclusive', {bubbles: true});
        this.element.dispatchEvent(evExclusiveOn);
    }

    if (this !== event.target && this.exclusive) {
        this.element.checked = false;
    }
}

var app = new Survey();