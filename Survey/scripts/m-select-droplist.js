define(['component'],
    function (component) {

        /**
         * Molecule: Select element
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function mSelectDroplist(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] select.m-select-droplist');
            this.wrapper = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"]')
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
            document.addEventListener("restoreEntries", this, false);
        }

        mSelectDroplist.prototype.configureLocalEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            this.element.addEventListener("change", this, false);
            this.element.addEventListener("keydown", this, false);
            this.element.addEventListener("keypress", this, false);
            this.element.addEventListener("keyup", this, false);
        }

        mSelectDroplist.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "change":
                    this.onChange(event);
                    break;
                case "keydown":
                case "keypress":
                case "keyup":
                    this.onKeyEvent(event);
                    break;
                case "restoreEntries":
                    this.restoreEntries(event);
                    break;
            }
        }

        mSelectDroplist.prototype.placeholder = function (prop) {
            this.defaultplaceholder = this.decodeHTML(prop);
            var el = new Option(prop, '');
            this.element.insertBefore(el, this.element.firstChild);

            // select the placeholder value only if an existing selection does not exist
            if (this.element.selectedIndex === -1) {
                this.element.selectedIndex = 0;
            }
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

        mSelectDroplist.prototype.onKeyEvent = function (event) {
            if (!this.isJumpingToLetter) {
                // this functionality is not supported consistently with select menus
                // as it generally just captures tabbing into the control and using
                // the space bar to expand it - preventing this is undesirable

                // event.preventDefault();
                // event.stopPropagation();
            }
        }

        return mSelectDroplist;

    });