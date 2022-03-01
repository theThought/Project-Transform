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

        function aInputButtonInc(id, group) {
            this.id = id;
            this.group = group;
            this.element = null;
        }

        aInputButtonInc.prototype.Init = function () {
            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"] button.a-button-postterminator');
            this.element.innerHTML = '&raquo;'; // default arrow appearance
            document.addEventListener("click", this, false);

            this.properties  = app.getProperties(this.group);
            this.configureProperties();
        }

        aInputButtonInc.prototype.configureProperties = function () {
            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
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