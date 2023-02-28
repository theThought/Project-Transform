define(['component'],
    function (component) {

        /**
         * Atom: Dropdown toggle button
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputDropList(id, group) {
            component.call(this, id, group);

            this.wrapper = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"]')
            this.element = this.wrapper.querySelector('select.m-select-droplist');
        }

        aInputDropList.prototype = Object.create(component.prototype);
        aInputDropList.prototype.constructor = aInputDropList;

        aInputDropList.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configurationComplete();
        }

        aInputDropList.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
        }

        aInputDropList.prototype.handleEvent = function (event) {
            switch (event.type) {

            }
        }

        return aInputDropList;

    });