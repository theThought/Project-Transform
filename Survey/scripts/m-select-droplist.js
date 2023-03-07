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
            this.isJumpingToLetter = false;
            this.defaultPlaceholder = 'Select';
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
            document.addEventListener("clearEntries", this, false);
        }

        mSelectDroplist.prototype.configureLocalEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            this.element.addEventListener("change", this, false);
            this.element.addEventListener("keydown", this, false);
        }

        mSelectDroplist.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "change":
                    this.onChange(event);
                    break;
                case "keydown":
                    this.onKeydown(event);
                    break;
                case "clearEntries":
                    this.clearEntries(event);
                    break;
            }
        }

        mSelectDroplist.prototype.placeholder = function (prop) {
            this.defaultPlaceholder = prop;
            var el = new Option(prop, '');
            this.element.insertBefore(el, this.element.firstChild);
            this.element.selectedIndex = 0;
        }

        mSelectDroplist.prototype.jumptofirstletter = function (prop) {
            if (prop === true) {
                this.isJumpingToLetter = true;
            }
        }

        mSelectDroplist.prototype.onChange = function () {
            this.value = this.element.options[this.element.selectedIndex].value;
            this.broadcastChange();
        }

        mSelectDroplist.prototype.onKeydown = function (event) {
            if (!this.isJumpingToLetter) {
                event.preventDefault();
                event.stopPropagation();
            }
        }

        return mSelectDroplist;

    });