/*
  functionality:

  click event to change state
  disabled state
  receive broadcast to change state

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    function () {

        /**
         * Molecule: Base Option
         *
         * @constructor
         * @param {String} id - element id
         */

        function mOptionBase(id) {
            this.id = id;
            this.element = null;
            this.questionGroup = null;
            this.checkbox = null;
            this.textInput = null;
            this.isExclusive = false;
        }

        mOptionBase.prototype.Init = function () {
            this.element = document.querySelector('div[data-questionid="' + this.id + '"]');
            this.questionGroup = this.element.getAttribute('data-questiongroup');
            this.checkbox = this.element.querySelector('input[type=checkbox],input[type=radio]');
            this.textInput = this.element.querySelector('input[type=text]');
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;

            document.addEventListener("change", this, false);
            document.addEventListener("click", this, false);
            document.addEventListener(this.questionGroup + "_enableExclusive", this, false);
            document.addEventListener(this.questionGroup + "_dismissExclusive", this, false);
            document.addEventListener(this.questionGroup + "_textFocus", this, false);
        }

        mOptionBase.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
                case "change":
                    this.onChange(event);
                    break;
                case this.questionGroup + "_enableExclusive":
                    this.onEnableExclusive(event);
                    break;
                case this.questionGroup + "_dismissExclusive":
                    this.onDismissExclusive(event);
                    break;
                case this.questionGroup + "_textFocus":
                    this.onTextFocus(event);
                    break;
            }
        }

        mOptionBase.prototype.onChange = function (event) {

            if (event.target === this.checkbox) {

                // handle self-generated events
                if (this.isExclusive && this.checkbox.checked) {
                    var enableExclusive = new CustomEvent(this.questionGroup + '_enableExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    document.dispatchEvent(enableExclusive);

                } else {
                    var dismissExclusive = new CustomEvent(this.questionGroup + '_dismissExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    document.dispatchEvent(dismissExclusive);
                }
            }
        }

        mOptionBase.prototype.onClick = function (event) {

            if (event.target === this.textInput) {
                this.checkbox.checked = true;
            }

        }

        mOptionBase.prototype.onEnableExclusive = function (event) {

            // handle external events
            if (this.element !== event.detail.element) {
                this.checkbox.checked = false;
            }

        }

        mOptionBase.prototype.onDismissExclusive = function (event) {

            // handle external events
            if (this.element !== event.detail.element && this.isExclusive) {
                this.checkbox.checked = false;
            }
        }

        mOptionBase.prototype.onTextFocus = function (event) {

            if (this.isExclusive && event.detail.element !== this.textInput) {
                this.checkbox.checked = false;
            }
        }

        return mOptionBase;

    });