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
            this.questionGroup = this.element.getAttribute('data-questiongroup');
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.defaultPlaceholder = (this.element.placeholder.length) ? this.element.placeholder : '';

            document.addEventListener("focusin", this, false);
            document.addEventListener(this.questionGroup + "_enableExclusive", this, false);
        }

        aInputMultilineEdit.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "focusin":
                    this.onFocusIn(event);
                    break;
                case this.questionGroup + "_enableExclusive":
                    this.onEnableExclusive();
                    break;
                case this.questionGroup + "_dismissExclusive":
                    this.onDismissExclusive();
                    break;
            }
        }

        aInputMultilineEdit.prototype.onFocusIn = function (event) {

            if (event.target === this.element) {

                // handle self-generated events
                var clickedEvent = new CustomEvent(this.questionGroup + '_textFocus', {bubbles: true, detail: this});
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