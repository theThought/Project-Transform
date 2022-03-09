/*
  functionality:

  switching states

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    function () {

        /**
         * Atom: Decrement Button
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputButtonDec(id, group) {
            this.id = id;
            this.group = group;
            this.element = null;
            this.symbol = '&laquo;'; // default arrow appearance
        }

        aInputButtonDec.prototype.Init = function () {
            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"] button.a-button-preterminator');
            this.element.innerHTML = this.symbol;

            this.configureIncomingEventListeners();
        }

        aInputButtonDec.prototype.configureIncomingEventListeners = function() {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("click", this, false);
        }

        aInputButtonDec.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
            }
        }

        aInputButtonDec.prototype.onClick = function (event) {
            if (event.target === this.element) {

                var decrementValueEvent = new CustomEvent(this.group + '_decrementValue', {
                    bubbles: true,
                    detail: this
                });
                document.dispatchEvent(decrementValueEvent);
            }
        }

        return aInputButtonDec;

    });