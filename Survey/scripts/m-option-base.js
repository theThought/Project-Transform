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
            this.element = document.querySelector('div[data-questionid="' + id + '"]');
        }

        mOptionBase.prototype.Init = function () {
            this.exclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;

            document.addEventListener("click", this, false);
            document.addEventListener("enableExclusive", this, false);
            document.addEventListener("dismissExclusive", this, false);
        }

        mOptionBase.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.clicked(event);
                    break;
                case "enableExclusive":
                    this.enableExclusive(event);
                    break;
                case "dismissExclusive":
                    this.dismissExclusive(event);
                    break;
            }
        }

        mOptionBase.prototype.enableExclusive = function (event) {
            if (this.element !== event.target) {
                var elCheckbox = this.element.getElementsByTagName('input');
                elCheckbox[0].checked = false;
            }
        }


        mOptionBase.prototype.dismissExclusive = function (event) {
            if (this.element !== event.target) {
                var elCheckbox = this.element.getElementsByTagName('input');
                elCheckbox[0].checked = false;
            }
        }

        mOptionBase.prototype.clicked = function (event) {
            if (this.exclusive) {
                var evExclusiveOn = new CustomEvent('enableExclusive', {bubbles: true});
                this.element.dispatchEvent(evExclusiveOn);
            }

            if (this.element !== event.target && this.exclusive) {
                var elCheckbox = this.element.getElementsByTagName('input');
                elCheckbox[0].checked = false;
            }
        }

        return mOptionBase;

    });