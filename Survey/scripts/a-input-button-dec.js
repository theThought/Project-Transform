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
        }

        aInputButtonDec.prototype.Init = function () {
            this.element = document.querySelector('button[data-questionid="' + this.id + '"]');
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