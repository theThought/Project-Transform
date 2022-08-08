/*
  functionality:

  character countdown

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    function () {

        /**
         * Base component class
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function component(id, group) {
            this.id = id;
            this.group = group;
            this.element = null;
            this.value = null;
            this.questionName = app.extractQuestionName(group);
            this.properties = {};
        }

        component.prototype.configureProperties = function (propertiesName) {
            propertiesName = (typeof propertiesName === 'undefined') ? app.extractQuestionName(this.group) : propertiesName;

            this.properties = app.getProperties(propertiesName);
            this.properties.registered = true;

            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        component.prototype.configurationComplete = function () {
            this.registerInitialState();
            var completeEvent = new CustomEvent('configComplete', {bubbles: true, detail: this});
            document.dispatchEvent(completeEvent);

            this.broadcastChange();
        }

        component.prototype.registerInitialState = function () {
            if (typeof this.element.value !== 'undefined') {
                app.registerInitialState(this.id, this.element.value);
            }

            if (typeof this.checkbox !== "undefined") {
                app.registerInitialState(this.id, this.checkbox.checked);
            }
        }

        component.prototype.broadcastChange = function (value) {
            var broadcastChange = new CustomEvent('broadcastChange', {bubbles: true, detail: this});
            document.dispatchEvent(broadcastChange);
        }

        component.prototype.clearEntries = function (event) {
            if (event.detail.questionName === this.questionName) {
                // this is responsible for clearing text areas
                this.element.value = "";
                this.broadcastChange();
            }
        }

        component.prototype.requestInitialSize = function () {
            var requestSize = new CustomEvent(this.group + '_requestSize', {
                bubbles: true,
                detail: this
            });
            document.dispatchEvent(requestSize);
        }

        component.prototype.onBeginResize = function (event) {
            if (!event.detail.isOnesize && !event.detail.isBalanced) {
                return;
            }

            if (!this.element.hasAttribute('data-original-width')) {
                // we must clear the element's width on resize to allow items to collapse as the container shrinks
                // however we do not want to lose any original width intention from the publisher - this preserves
                // a manually set width, if set.
                this.element.setAttribute('data-original-width', this.element.style.width);
            }

            this.element.style.width = '';
            this.element.style.height = '';

            if (event.detail.properties === null) {
                return false;
            }

            if (event.detail.isOnesize === true) {
                this.element.style.maxWidth = event.detail.maxwidth;
            }

            if (event.detail.isBalanced === true) {
                this.element.style.minWidth = event.detail.minwidth;
            }

        }

        component.prototype.onEndResize = function (event) {

            if (event.detail.isOnesize === true) {
                this.element.style.width = event.detail.widest + 'px';
                this.element.style.height = event.detail.tallest + 'px';
            }

        }

        return component;

    });