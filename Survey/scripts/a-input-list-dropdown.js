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
            this.container = document.querySelector('div[data-questiongroup="' + this.group + '"]');
            this.focused = false;
            this.isJumpingToLetter = false;
            this.keypressed = null;
            this.editable = false;
            this.filtermethod = 'contains';
            this.defaultPlaceholder = 'Select';
            this.manualWidth = this.checkManualWidth();

            this.configureProperties();
            this.configureIncomingEventListeners();
            this.getValue();
            this.configurationComplete();
        }

        aInputListDropdown.prototype = Object.create(component.prototype);
        aInputListDropdown.prototype.constructor = aInputListDropdown;

        aInputListDropdown.prototype.checkManualWidth = function () {
            return this.element.style.width.length > 0;
        }

        aInputListDropdown.prototype.filtertype = function (prop) {
            this.filtermethod = prop;
        }

        aInputListDropdown.prototype.getValue = function () {
            var options = this.container.querySelectorAll('input[type=checkbox], input[type=radio]');

            for (var i = 0; i < options.length; i++) {
                var element = options[i];
                if (element.checked) {
                    // the label for the selected item is expected to be the immediately adjacent element
                    var labelElement = element.nextElementSibling;
                    this.element.value = labelElement.getElementsByClassName('a-label-option')[0].innerHTML;
                }
            }
        }

        aInputListDropdown.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("change", this, false);
            document.addEventListener("keyup", this, false);
            document.addEventListener("keypress", this, false);
            document.addEventListener("click", this, false);
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("broadcastChange", this, false);
            document.addEventListener(this.group + "_beginResize", this, false);
            document.addEventListener(this.group + "_endResize", this, false);
        }

        aInputListDropdown.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "keypress":
                    this.getKeyPressed(event);
                    this.onKeypress(event);
                    break;
                case "keyup":
                    this.getKeyPressed(event);
                    this.onKeyup(event);
                    this.onChange(event);
                    break;
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
                case this.group + "_beginResize":
                case this.group + "_endResize":
                    this.onEndResize(event);
                    break;
            }
        }

        aInputListDropdown.prototype.onEndResize = function (event) {

            if (event.detail.group !== this.group) {
                return;
            }

            if (this.manualWidth) {
                return;
            }

            var manualwidth = this.element.style.width;

            var buttonwidth = 0;
            this.element.style.width = (event.detail.widest + buttonwidth) + 'px';

        }

        aInputListDropdown.prototype.placeholder = function (prop) {
            this.defaultPlaceholder = prop;
            this.element.placeholder = this.defaultPlaceholder;
        }

        aInputListDropdown.prototype.type = function (prop) {
            if (prop === 'dropdown') {
                this.element.classList.add('readonly');
                this.element.readOnly = true;
            }

            if (prop === 'combobox') {
                this.editable = true;
            }
        }

        aInputListDropdown.prototype.receiveBroadcast = function (event) {
            if (event.detail.group === this.group) {
                if (typeof event.detail.checkbox !== "undefined") {

                    if (event.detail.checkbox.checked) {
                        this.element.value = event.detail.label.textContent;
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
                this.focused = false;
                parentNode.classList.remove('focused');
            } else {
                this.focused = true;
                parentNode.classList.toggle('focused');
            }
        }

        aInputListDropdown.prototype.jumptofirstletter = function (prop) {
            if (prop === true) {
                this.isJumpingToLetter = true;
            }
        }

        aInputListDropdown.prototype.onKeypress = function (event) {
            if (!this.focused) {
                return;
            }

            if (this.isJumpingToLetter) {
                this.processKeyJump();
            }

        }

        aInputListDropdown.prototype.onKeyup = function (event) {
            if (!this.focused) {
                return;
            }

            if (this.editable) {
                this.processFilterList();
            }
        }

        aInputListDropdown.prototype.getKeyPressed = function (event) {
            if (event.keyCode) {
                this.keypressed = event.keyCode;
            } else if (event.which) {
                this.keypressed = event.which;
            } else if (event.key) {
                this.keypressed = event.key;
            } else {
                this.keypressed = event.code;
            }
        }

        aInputListDropdown.prototype.processKeyJump = function () {
            var keyEvent = new CustomEvent(this.group + '_jumpToLetter', {bubbles: true, detail: this});
            document.dispatchEvent(keyEvent);
        }

        aInputListDropdown.prototype.processFilterList = function () {
            var keyEvent = new CustomEvent(this.group + '_filterList', {bubbles: true, detail: this});
            document.dispatchEvent(keyEvent);
        }

        return aInputListDropdown;

    });