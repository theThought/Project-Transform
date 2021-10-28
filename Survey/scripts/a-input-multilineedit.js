/*
  functionality:

  placeholders
  expanding box as you type

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    function () {

        /**
         * Atom: aInputMultilineEdit
         *
         * @constructor
         * @param {String} id - element id
         */

        function aInputMultilineEdit(id) {
            this.id = id;
            this.element = null;
            this.questionGroup = null;
            this.isExclusive = false;
            this.defaultPlaceholder = '';
        }

        aInputMultilineEdit.prototype.Init = function () {
            this.element = document.querySelector('textarea[data-questionid="' + this.id + '"]');
            this.questionGroup = this.element.getAttribute('data-questionGroup');
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.defaultPlaceholder = (this.element.placeholder.length) ? this.element.placeholder : '';

            document.addEventListener("focusin", this, false);
            document.addEventListener("enableExclusive", this, false);
            document.addEventListener("dismissExclusive", this, false);
        }

        aInputMultilineEdit.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "focusin":
                    this.onFocusIn(event);
                    break;
                case "enableExclusive":
                    this.onEnableExclusive(event);
                    break;
                case "dismissExclusive":
                    this.onDismissExclusive(event);
                    break;
            }
        }

        aInputMultilineEdit.prototype.onFocusIn = function (event) {

            if (event.target === this.element) {

                // handle self-generated events
                var clickedEvent = new CustomEvent('aInputMultilineEditFocusEvent', {bubbles: true, detail: this});
                document.dispatchEvent(clickedEvent);

                if (this.element.placeholder.length
                    && this.element.placeholder !== this.defaultPlaceholder) {
                    this.element.value = this.element.placeholder;
                    this.element.placeholder = this.defaultPlaceholder;
                }

            } else {

                // handle external events

                // ignore events from other questions
                if (event.detail.questionGroup !== this.questionGroup) {
                    return;
                }

            }
        }

        aInputMultilineEdit.prototype.onEnableExclusive = function (event) {

            // ignore events from other questions
            if (event.detail.questionGroup !== this.questionGroup) {
                return;
            }

            if (this.element.value) {
                this.element.placeholder = this.element.value;
                this.element.value = '';
            }

        }

        aInputMultilineEdit.prototype.onDismissExclusive = function (event) {

            // ignore events from other questions
            if (event.detail.questionGroup !== this.questionGroup) {
                return
            }

            if (this.element.placeholder.length
                && this.element.placeholder !== this.defaultPlaceholder) {
                this.element.value = this.element.placeholder;
                this.element.placeholder = this.defaultPlaceholder;
            }

        }

        return aInputMultilineEdit;

    });