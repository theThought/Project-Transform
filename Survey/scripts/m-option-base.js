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
            this.element = document.getElementById(id);
        }

        mOptionBase.prototype.Init = function () {
            this.exclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;

            this.element.addEventListener("click", this, false);
            this.element.addEventListener("incomingExclusive", this, false);
        }

        mOptionBase.prototype.handleEvent = function (event) {
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

        mOptionBase.prototype.incomingExclusive = function (event) {
            var originatingElement = event.target;
            if (this.element !== originatingElement) {
                this.element.checked = false;
            }
        }

        mOptionBase.prototype.clicked = function (event) {
            if (this.exclusive) {
                var evExclusiveOn = new CustomEvent('incomingExclusive', {bubbles: true});
                this.element.dispatchEvent(evExclusiveOn);
            }

            if (this !== event.target && this.exclusive) {
                this.element.checked = false;
            }
        }

        return mOptionBase;

    });