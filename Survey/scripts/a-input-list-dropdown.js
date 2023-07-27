define(['component'],
    function (component) {

        /**
         * Atom: Dropdown list wrapper - should be molecule?
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputListDropdown(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] input.a-input-list-dropdown');
            this.droplist = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] div.m-list-optionlist');
            this.button = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] button.a-button-list-dropdown');
            this.wrapper = this.element.parentNode;
            this.focused = false;
            this.isJumpingToLetter = false;
            this.keypressed = null;
            this.editable = false;
            this.filtermethod = 'contains';
            this.lastselectedvalue = '';
            this.defaultPlaceholder = 'Select';
        }

        aInputListDropdown.prototype = Object.create(component.prototype);
        aInputListDropdown.prototype.constructor = aInputListDropdown;

        aInputListDropdown.prototype.init = function () {
            this.manualWidth = this.checkManualWidth();
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.getValue();
            this.setWidth();
            this.disableButtonTabIndex();
            this.setDroplistSizeAndPosition();
            this.configurationComplete();
        }

        aInputListDropdown.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("closeDropdowns", this, false);
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("restoreEntries", this, false);
            document.addEventListener("broadcastChange", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener("click", this, false);
        }

        aInputListDropdown.prototype.configureLocalEventListeners = function () {
            this.wrapper.addEventListener("change", this, false);
            this.wrapper.addEventListener("keydown", this, false);
            this.wrapper.addEventListener("keyup", this, false);
            this.wrapper.addEventListener("mousedown", this, false);
            this.element.addEventListener("focus", this, false);
            this.element.addEventListener("focusout", this, false);
        }

        aInputListDropdown.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "closeDropdowns":
                    this.onCloseDropdowns(event);
                    break;
                case "keydown":
                    this.getKeyPressed(event);
                    this.onKeydown(event);
                    break;
                case "keyup":
                    this.getKeyPressed(event);
                    this.onKeyup();
                    this.onChange(event);
                    break;
                case "change":
                    this.onChange(event);
                    break;
                case "clearEntries":
                    this.clearEntries(event);
                    break;
                case "restoreEntries":
                    this.restoreEntries(event);
                    break;
                case "mousedown":
                    this.onMousedown(event);
                    break;
                case "focus":
                    this.setFocus();
                    break;
                case "focusout":
                    this.onFocusOut(event);
                    break;
                case "click":
                    this.onClick(event);
                    break;
                case "broadcastChange":
                    this.receiveBroadcast(event);
                    break;
                case this.group + "_enableExclusive":
                    this.onEnableExclusive(event);
                    break;
            }
        }

        aInputListDropdown.prototype.setWidth = function () {
            // respect manual width if set
            if (this.manualWidth) {
                return;
            }

            // do not try to get the width of invisible elements
            if (this.droplist.offsetWidth === 0) {
                return;
            }

            // we must set the size in order for the browser to recalculate the width of the component
            this.element.size = Math.max(this.defaultPlaceholder.length, 1);
            var inputwidth = this.element.offsetWidth;
            var droplistwidth = this.droplist.offsetWidth;
            var padding = 32; // the droplist does not have padding included
            var errormargin = 4; // element.size is font-specific and needs a little safety margin

            this.element.style.width = Math.max(droplistwidth, inputwidth) + errormargin + 'px';
            this.button.style.width = Math.max(droplistwidth, inputwidth) + errormargin + 'px';
            this.droplist.style.width = Math.max(droplistwidth, inputwidth) + errormargin + padding + 'px';
            this.element.style.boxSizing = 'border-box';
        }

        aInputListDropdown.prototype.checkManualWidth = function () {
            return this.element.style.width.length > 0;
        }

        aInputListDropdown.prototype.filtertype = function (prop) {
            this.filtermethod = prop;
        }

        aInputListDropdown.prototype.disableButtonTabIndex = function () {
            this.button.tabIndex = -1;
        }

        aInputListDropdown.prototype.setDroplistSizeAndPosition = function () {
            var event = new CustomEvent(this.group + '_droplistSize', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(event);
        }

        aInputListDropdown.prototype.getValue = function () {
            var selectedOption = this.droplist.querySelector('input:checked');

            if (selectedOption !== null) {
                var labelElement = selectedOption.nextElementSibling;
                this.lastselectedvalue = labelElement.getElementsByClassName('a-label-option')[0].innerHTML;
                this.element.value = this.lastselectedvalue;
            }
        }

        aInputListDropdown.prototype.onEnableExclusive = function (event) {
            if (event.detail.group !== this.group) {
                return;
            }

            // do not hide list on option change if this is a combo box
            if (this.editable) {
                return;
            }

            this.removeFocus();
        }

        aInputListDropdown.prototype.placeholder = function (prop) {
            this.defaultplaceholder = this.decodeHTML(prop);
            this.element.placeholder = this.defaultPlaceholder;
        }

        aInputListDropdown.prototype.type = function (prop) {
            if (prop === 'dropdown') {
                this.element.classList.add('readonly');
                this.element.readOnly = true;
            }

            if (prop === 'combobox') {
                this.editable = true;
                this.debug('Unsupported old-style of combobox was used', 2);
            }
        }

        aInputListDropdown.prototype.receiveBroadcast = function (event) {
            if (event.detail.group !== this.group) {
                return;
            }

            if (typeof event.detail.checkbox !== "undefined") {

                if (event.detail.checkbox.checked) {
                    this.element.value = event.detail.label.textContent;
                    this.lastselectedvalue = event.detail.label.textContent;
                }
            }
        }

        aInputListDropdown.prototype.onChange = function (event) {
            if (event.target === this.element) {
                event.stopPropagation();
                this.broadcastChange();
            }
        }

        aInputListDropdown.prototype.onFocusOut = function (event) {
            if (!this.focused) {
                return;
            }

            if (event.relatedTarget === null) {
                return;
            }

            if (this.editable) {
                this.restoreSelection();
            }

            if (!this.wrapper.contains(event.relatedTarget)) {
                event.stopPropagation();
                this.removeFocus();
            }
        }

        aInputListDropdown.prototype.restoreSelection = function () {
            if (this.element.value !== this.lastselectedvalue) {
                this.element.value = this.lastselectedvalue
            }
        }

        aInputListDropdown.prototype.onMousedown = function (event) {
            event.stopPropagation();

            var focusin = new CustomEvent('focusin', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(focusin);

            if (this.editable && this.focused) {
                return;
            }

            this.toggleVisibility();
        }

        aInputListDropdown.prototype.onClick = function (event) {
            if (!this.focused) {
                return;
            }

            if (this.wrapper.contains(event.target) || event.target === this.droplist
                || (this.editable && this.droplist.contains(event.target))) {
                event.stopPropagation();
                return;
            }

            this.removeFocus();
        }

        aInputListDropdown.prototype.toggleVisibility = function () {
            if (this.focused) {
                this.removeFocus()
            } else {
                this.setFocus()
            }
        }

        aInputListDropdown.prototype.setFocus = function () {
            this.focused = true;
            this.wrapper.classList.add('focused');

            this.closeDropdowns();
            this.showList();
        }

        aInputListDropdown.prototype.removeFocus = function () {
            this.focused = false;
            this.wrapper.classList.remove('focused');

            this.hideList();
        }

        aInputListDropdown.prototype.closeDropdowns = function () {
            var closeDropdowns = new CustomEvent('closeDropdowns', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(closeDropdowns);
        }

        aInputListDropdown.prototype.onCloseDropdowns = function (event) {
            if (event.detail.group === this.group) {
                return;
            }

            if (this.editable) {
                this.restoreSelection();
            }

            this.removeFocus();
        }

        aInputListDropdown.prototype.showList = function () {
            this.wrapper.classList.add('show-list');
        }

        aInputListDropdown.prototype.hideList = function () {
            this.wrapper.classList.remove('show-list');
        }

        aInputListDropdown.prototype.jumptofirstletter = function (prop) {
            if (prop === true) {
                this.isJumpingToLetter = true;
            }
        }

        aInputListDropdown.prototype.onKeydown = function (event) {
            if (!this.focused) {
                return;
            }

            switch (this.keypressed) {
                case 9: // tab key
                    this.hideList();
                    break;
                case 38: //up arrow
                case 40: // down arrow
                    event.preventDefault();
                    break;
                case 13: // enter key
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    break;
                default:
                    this.processKeyJump();
            }
        }

        aInputListDropdown.prototype.onKeyup = function () {
            if (!this.focused) {
                return;
            }

            switch (this.keypressed) {
                case 13: // enter key
                    return;
            }

            this.showList();
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
            if (!this.isJumpingToLetter) {
                return;
            }

            var keyEvent = new CustomEvent(this.group + '_jumpToLetter', {bubbles: true, detail: this});
            this.element.dispatchEvent(keyEvent);
        }

        return aInputListDropdown;

    });