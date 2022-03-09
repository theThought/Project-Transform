/*
  functionality:

  switching states

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Atom: Decrement Button
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputButtonInc(id, group) {
            this.id = id;
            this.group = group;
            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"] button.a-button-postterminator');
            this.defaultsymbol = '&raquo;' // default arrow appearance

            this.symbol(this.defaultsymbol)
            this.configureIncomingEventListeners();
        }

        aInputButtonInc.prototype = Object.create(component.prototype);

        aInputButtonInc.prototype.symbol = function (symbol) {
            this.element.innerHTML = symbol;
        }

        aInputButtonInc.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("click", this, false);
        }

        aInputButtonInc.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
            }
        }

        aInputButtonInc.prototype.onClick = function (event) {
            if (event.target === this.element) {

                var incrementValueEvent = new CustomEvent(this.group + '_incrementValue', {
                    bubbles: true,
                    detail: this
                });
                document.dispatchEvent(incrementValueEvent);
            }
        }

        return aInputButtonInc;

    });