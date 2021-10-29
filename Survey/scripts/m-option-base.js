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
            this.isExclusive = false;
        }

        mOptionBase.prototype.Init = function () {
            this.element = document.querySelector('div[data-questionid="' + this.id + '"]');
            this.questionGroup = this.element.getAttribute('data-questiongroup');
            this.checkbox = this.element.getElementsByTagName('input')[0];
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;

            document.addEventListener("change", this, false);
            document.addEventListener("enableExclusive", this, false);
            document.addEventListener("dismissExclusive", this, false);
            document.addEventListener("aInputMultilineEditFocusEvent", this, false);
        }

        mOptionBase.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "change":
                    this.onChange(event);
                    break;
                case "enableExclusive":
                    this.onEnableExclusive(event);
                    break;
                case "dismissExclusive":
                    this.onDismissExclusive(event);
                    break;
                case "aInputMultilineEditFocusEvent":
                    this.onAInputMultilineEditClickEvent(event);
                    break;
            }
        }

        mOptionBase.prototype.onChange = function (event) {

            if (event.target === this.checkbox) {

                // handle self-generated events
                if (this.isExclusive && this.checkbox.checked) {
                    var enableExclusive = new CustomEvent('enableExclusive', {bubbles: true, detail: this});
                    document.dispatchEvent(enableExclusive);

                } else {
                    var dismissExclusive = new CustomEvent('dismissExclusive', {bubbles: true, detail: this});
                    document.dispatchEvent(dismissExclusive);
                }
            }
        }

        mOptionBase.prototype.onEnableExclusive = function (event) {

            // ignore events from other questions
            if (event.detail.questionGroup !== this.questionGroup) {
                return
            }

            // handle external events
            if (this.element !== event.detail.element) {
                this.checkbox.checked = false;
            }
        }

        mOptionBase.prototype.onDismissExclusive = function (event) {

            // ignore events from other questions
            if (event.detail.questionGroup !== this.questionGroup) {
                return
            }

            if (this.element !== event.detail.element && this.isExclusive) {
                this.checkbox.checked = false;
            }
        }

        mOptionBase.prototype.onAInputMultilineEditClickEvent = function (event) {

            // ignore events from other questions
            if (event.detail.questionGroup !== this.questionGroup) {
                return
            }

            if (this.isExclusive) {
                this.checkbox.checked = false;
            }
        }

        return mOptionBase;

    });