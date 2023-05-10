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
            this.restoreValues = false;
            this.initialValue = null;
            this.isDebugging = true;
            this.questionName = app.extractQuestionName(group);
            this.properties = {};
        }

        component.prototype.debug = function (message, priority) {
            if (!this.isDebugging) {
                return;
            }

            priority = priority || 4;

            switch (priority) {
                case 1:
                    console.error(message);
                    break;
                case 2:
                    console.warn(message);
                    break;
                case 3:
                    console.info(message);
                    break;
                default:
                    console.log(message);
            }
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
            if (typeof this.element.value !== 'undefined') {
                this.initialValue = this.element.value;
            }

            var completeEvent = new CustomEvent('configComplete', {bubbles: true, detail: this});
            document.dispatchEvent(completeEvent);

            this.broadcastChange();
        }

        component.prototype.broadcastChange = function () {
            var broadcastChange = new CustomEvent('broadcastChange', {bubbles: true, detail: this});
            document.dispatchEvent(broadcastChange);
        }

        component.prototype.clearEntries = function (event) {
            if (event.detail.questionName !== this.questionName) {
                return;
            }

            // this is responsible for clearing text areas
            if (this.element.value !== "") {
                this.element.value = "";
                this.broadcastChange();
            }
        }

        component.prototype.restoreEntries = function (event) {
            if (event.detail.questionName !== this.questionName) {
                return;
            }

            if (this.restoreValues && this.element.value !== this.initialValue) {
                this.element.value = this.initialValue;
                this.broadcastChange();
            }
        }

        component.prototype.resettonull = function (val) {
            if (val === false) {
                this.restoreValues = true;
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

            // preserve the original element width, if set
            if (this.element.hasAttribute('data-original-width')
                && this.element.getAttribute('data-original-width').length) {
                this.element.style.width = this.element.getAttribute('data-original-width');
                return;
            }

            if (event.detail.isOnesize === true
                && event.detail.widest > 0
                && event.detail.tallest > 0) {
                this.element.style.width = event.detail.widest + 'px';
                this.element.style.height = event.detail.tallest + 'px';
            }

        }

        return component;

    });