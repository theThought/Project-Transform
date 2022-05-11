/*
  functionality:

  placeholders
  expanding box as you type

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Atom: aInputSingleLineEdit
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputListDropdown(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"] input.a-input-list-dropdown');
            this.defaultPlaceholder = 'Select';

            this.setReadOnly();
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configurationComplete();
        }

        aInputListDropdown.prototype = Object.create(component.prototype);
        aInputListDropdown.prototype.constructor = aInputListDropdown;

        aInputListDropdown.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("change", this, false);
            document.addEventListener("keyup", this, false);
            document.addEventListener("click", this, false);
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("broadcastChange", this, false);
        }

        aInputListDropdown.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "keyup":
                case "change":
                    this.onChange(event);
                    break;
                case "clearEntries":
                    this.clearEntries(event);
                    break;
                case "click":
                    this.onClick(event);
                    break;
                case "broadcastChange":
                    this.receiveBroadcast(event);
                    break;
            }
        }

        aInputListDropdown.prototype.placeholder = function (prop) {
            this.defaultPlaceholder = prop;
            this.element.value  = this.defaultPlaceholder;
        }

        aInputListDropdown.prototype.setReadOnly = function () {
            this.element.classList.add('readonly');
            this.element.readOnly = true;
        }

        aInputListDropdown.prototype.receiveBroadcast = function (event) {
            if (event.detail.group === this.group) {
                if (typeof event.detail.checkbox !== "undefined") {
                    console.log(event.detail.checkbox);
                    if (event.detail.checkbox.checked) {
                        this.element.value = event.detail.checkbox.value;
                    }
                }
            }
        }

        aInputListDropdown.prototype.onChange = function (event) {
            if (event.target === this.element) {
                this.broadcastChange();
            }
        }

        aInputListDropdown.prototype.onClick = function (event) {

            var parentNode = this.element.parentNode;

            if (event.target !== parentNode && !parentNode.contains(event.target)) {
                parentNode.classList.remove('focused');
            } else {
                parentNode.classList.toggle('focused');
            }

        }

        return aInputListDropdown;

    });