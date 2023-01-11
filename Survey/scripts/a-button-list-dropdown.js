define(['component'],
    function (component) {

        /**
         * Atom: Dropdown toggle button
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aButtonListDropdown(id, group) {
            component.call(this, id, group);

            this.wrapper = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"]')
            this.element = this.wrapper.querySelector('button.a-button-list-dropdown');
        }

        aButtonListDropdown.prototype = Object.create(component.prototype);
        aButtonListDropdown.prototype.constructor = aButtonListDropdown;

        aButtonListDropdown.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configurationComplete();
        }

        aButtonListDropdown.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
        }

        aButtonListDropdown.prototype.type = function (prop) {
            if (prop === 'combobox') {
                this.element.style.display = 'none';
            }
        }

        aButtonListDropdown.prototype.handleEvent = function (event) {
            switch (event.type) {

            }
        }

        return aButtonListDropdown;

    });