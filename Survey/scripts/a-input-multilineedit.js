/*
  functionality:

  placeholders
  expanding box as you type

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Atom: aInputMultilineEdit
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputMultilineEdit(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('textarea[data-questionid="' + this.id + '"]');
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.defaultPlaceholder = (this.element.placeholder.length) ? this.element.placeholder : '';

            this.configureProperties();
            this.configureIncomingEventListeners();
        }

        aInputMultilineEdit.prototype = Object.create(component.prototype);
        aInputMultilineEdit.prototype.constructor = aInputMultilineEdit;

        aInputMultilineEdit.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("focusin", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
        }

        aInputMultilineEdit.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "focusin":
                    this.onFocusIn(event);
                    break;
                case this.group + "_enableExclusive":
                    this.onEnableExclusive();
                    break;
            }
        }

        aInputMultilineEdit.prototype.onFocusIn = function (event) {

            if (event.target === this.element) {

                // handle self-generated events
                var clickedEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
                document.dispatchEvent(clickedEvent);

                if (this.element.placeholder.length
                    && this.element.placeholder !== this.defaultPlaceholder) {
                    this.element.value = this.element.placeholder;
                    this.element.placeholder = this.defaultPlaceholder;
                }

            }

        }

        aInputMultilineEdit.prototype.onEnableExclusive = function () {

            if (this.element.value) {
                this.element.placeholder = this.element.value;
                this.element.value = '';
            }

        }

        return aInputMultilineEdit;

    });