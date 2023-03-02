define(['component'],
    function (component) {

        /**
         * Atom: Dropdown toggle button
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function mSelectDroplist(id, group) {
            component.call(this, id, group);

            this.wrapper = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"]')
            this.element = this.wrapper.querySelector('select.m-select-droplist');
        }

        mSelectDroplist.prototype = Object.create(component.prototype);
        mSelectDroplist.prototype.constructor = mSelectDroplist;

        mSelectDroplist.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        mSelectDroplist.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
        }

        mSelectDroplist.prototype.configureLocalEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            this.element.addEventListener("change", this, false);
        }

        mSelectDroplist.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "change":
                    this.onChange(event);
                    break;
            }
        }

        mSelectDroplist.prototype.onChange = function (event) {
            this.value = this.element.options[this.element.selectedIndex].value;
            this.broadcastChange();
        }

        return mSelectDroplist;

    });