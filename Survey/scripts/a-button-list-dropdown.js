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

        function aButtonListDropdown(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"] button.a-button-list-dropdown');
            this.defaultsymbol = '&#8964;'; // default down arrow appearance

            this.symbol(this.defaultsymbol);
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configurationComplete();
        }

        aButtonListDropdown.prototype = Object.create(component.prototype);
        aButtonListDropdown.prototype.constructor = aButtonListDropdown;

        aButtonListDropdown.prototype.symbol = function (symbol) {
            this.element.innerHTML = symbol;
        }

        aButtonListDropdown.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
        }

        aButtonListDropdown.prototype.handleEvent = function (event) {
            switch (event.type) {

            }
        }


        return aButtonListDropdown;

    });