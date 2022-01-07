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
            this.slider = null;
        }

        aInputButtonDec.prototype.Init = function () {
            this.element = document.querySelector('button[data-questionid="' + this.id + '"]');
            this.slider = document.querySelector('input[name="' + this.group + '"]');
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

                var decrementValue = new CustomEvent(this.group + '_decrementValue', {
                    bubbles: true,
                    detail: this
                });
                document.dispatchEvent(decrementValue);
            }
        }

        return aInputButtonDec;

    });