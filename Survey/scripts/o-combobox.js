define(['component'],
    function (component) {

        /**
         * @constructor
         * @param id {string} Unique question ID allocated by Dimensions to this control.
         * @param group {string} User-specified name plus generated prefix/suffix to identify grouped elements.
         */
        function oCombobox(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('input.a-input-combobox[data-questionid="' + this.id + '"]');
            this.container = this.element.closest('div[data-questiongroup="' + this.group + '"]');

            this.isReadOnly = false;
            this.hiddenelement = null;
            this.mincharacters = 0;
            this.keypressed = null;
            this.keybuffer = '';
            this.defaultplaceholder = 'Select';
            this.manualWidth = false;
            this.width = 0;
            this.userspecifiedheight = 0;
            this.keytimer = null;
            this.keytimerlimit = 500; // Time in milliseconds at which the buffer is cleared.
        }

        oCombobox.prototype = Object.create(component.prototype);
        oCombobox.prototype.constructor = oCombobox;

        /**
         * Initialises this component.
         *
         * Saves the initial value, sets up event listeners and handles any other tasks
         * that are required as the component is constructed. Broadcasts a 'complete'
         * event once all tasks are completed.
         */
        oCombobox.prototype.init = function () {
            this.isReadOnly = this.checkReadOnly();
            this.manualWidth = this.checkManualWidth();
            this.cloneInputElement();
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.storeInitialValue();
            this.setControlType();
            this.calculateWidth();
            this.configureInitialVisibility();
            this.processVisibilityRules();
            this.setInitialLabel();
            this.configurationComplete();
        }

        /**
         * Bind listeners for events that are broadcast from other components on the page.
         */
        oCombobox.prototype.configureIncomingEventListeners = function () {
            document.addEventListener('broadcastAvailability', this.handleEvent.bind(this), false);
            document.addEventListener('broadcastChange', this.handleEvent.bind(this), false);
            document.addEventListener('clearEntries', this.handleEvent.bind(this), false);
            document.addEventListener('mousedown', this.handleEvent.bind(this), false);
            document.addEventListener('restoreEntries', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_enableExclusive', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_listWidth', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_optionVisibility', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_requestControlWidth', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_updateListInput', this.handleEvent.bind(this), false);
        }

        /**
         * Binds listeners for events that have originated from the current element.
         */
        oCombobox.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('change', this.handleEvent.bind(this), false);
            this.element.addEventListener('focusin', this.handleEvent.bind(this), false);
            this.element.addEventListener('focusout', this.handleEvent.bind(this), false);
            this.element.addEventListener('input', this.handleEvent.bind(this), false);
            this.element.addEventListener('keydown', this.handleEvent.bind(this), false);
            this.element.addEventListener('keyup', this.handleEvent.bind(this), false);
        }

        /**
         * Receives and handles all incoming events that have defined listeners.
         * @param {event} event
         */
        oCombobox.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'broadcastAvailability':
                    this.processAvailability(event);
                    break;
                case 'broadcastChange':
                    this.processVisibilityRulesFromExternalTrigger(event);
                    break;
                case 'change':
                    this.onChange(event);
                    break;
                case 'clearEntries':
                    this.clearEntriesFromExternal(event);
                    break;
                case 'focusin':
                case 'input':
                    this.onFocusIn();
                    break;
                case 'focusout':
                    this.onFocusOut();
                    break;
                case 'keydown':
                    this.getKeyPressed(event);
                    this.onKeydown(event);
                    break;
                case 'keyup':
                    this.onKeyup();
                    this.onChange(event);
                    break;
                case 'mousedown':
                    this.toggleList(event);
                    break;
                case 'restoreEntries':
                    this.restoreEntries(event);
                    break;
                case this.group + '_enableExclusive':
                    this.onEnableExclusive(event);
                    break;
                case this.group + '_listWidth':
                    this.setWidthFromList(event);
                    break;
                case this.group + '_requestControlWidth':
                    this.notifyElementWidth();
                    break;
                case this.group + '_optionVisibility':
                    this.receiveOptionVisibilityChange(event);
                    break;
                case this.group + '_updateListInput':
                    this.setSelectedValue(event);
                    break;
            }
        }

        oCombobox.prototype.checkReadOnly = function () {
            if (this.element.closest('[data-readonly="true"]') !== null || (this.element.getAttribute('data-readonly') === true)) {
                this.element.readOnly = true;
                return true;
            } else {
                return false;
            }
        }

        oCombobox.prototype.receiveOptionVisibilityChange = function (event) {
            if (this.getHiddenValue() === event.detail.itemValue) {
                this.clearEntries();
            }
        }

        /**
         * Sets whether the list will jump to the entry that
         * starts with the letter matching the user's keystroke.
         *
         * Automagically called by the property setter function.
         * @param prop {boolean}
         */
        oCombobox.prototype.jumptofirstletter = function (prop) {
            if (prop === true) {
                this.isjumpingtoletter = true;
            }
        }

        /**
         * Sets the placeholder text that will appear in the input area.
         * @param prop {string}
         */
        oCombobox.prototype.placeholder = function (prop) {
            this.defaultplaceholder = this.decodeHTML(prop);
            this.element.placeholder = this.defaultplaceholder;
        }

        /**
         * Check whether the user has specified a width for this component.
         * @return {boolean}
         */
        oCombobox.prototype.checkManualWidth = function () {
            return this.element.style.width.length > 0;
        }

        /**
         * Helper function which places all the text items on the page and
         * returns the width as rendered.
         * @param text {string}
         * @returns {number}
         */
        oCombobox.prototype.getWidthOfText = function (text) {
            var tmp = document.createElement("span");
            tmp.style.whiteSpace = 'nowrap';
            tmp.innerHTML = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            this.container.appendChild(tmp);
            var width = Math.round(tmp.getBoundingClientRect().width);
            this.container.removeChild(tmp);
            return width;
        }

        /**
         * Calculates the width of the input.
         */
        oCombobox.prototype.calculateWidth = function () {
            if (this.manualWidth) {
                this.element.classList.add('manual-width');
                this.width = this.element.style.width;
                this.notifyElementWidth();
                return;
            }

            var elementdims = getComputedStyle(this.element);
            var initialwidth = parseInt(elementdims.width);
            var longestentry = this.defaultplaceholder;
            var inputwidth = this.getWidthOfText(longestentry);
            var desiredwidth = (Math.max(initialwidth, inputwidth));

            var newwidth = Math.min(desiredwidth, this.getContainerWidth());

            this.setWidth(newwidth);
            this.requestListWidth();
        }

        oCombobox.prototype.getContainerWidth = function () {
            var padding = 32;
            var containerstyles = getComputedStyle(this.container.closest('question'));
            return Math.floor(parseFloat(containerstyles.width) - padding);
        }

        oCombobox.prototype.setWidth = function (newwidth) {
            this.element.style.width = newwidth + 'px';
            this.width = newwidth;
            this.notifyElementWidth();
        }

        oCombobox.prototype.setWidthFromList = function (event) {
            if (event.detail.element === this.element || this.manualWidth) {
                return;
            }

            if (event.detail.width > this.width) {
                var newwidth = Math.min(event.detail.width, this.getContainerWidth());
                var padding = 32; // from the list
                this.element.style.width = newwidth - padding + 'px';
                this.width = newwidth;
            }
        }

        oCombobox.prototype.notifyElementWidth = function () {
            if (!this.width) {
                this.calculateWidth();
                return;
            }

            var widthEvent = new CustomEvent(this.group + '_listWidth', {bubbles: true, detail: this});
            this.element.dispatchEvent(widthEvent);
        }

        oCombobox.prototype.requestListWidth = function () {
            var widthEvent = new CustomEvent(this.group + '_requestListWidth', {bubbles: true, detail: this});
            this.element.dispatchEvent(widthEvent);
        }

        /**
         * Determines which sort of droplist this component will be.
         *
         * At present only combobox is supported, it is envisaged this could be expanded
         * to include select and open-end search by setting the appropriate attributes.
         */
        oCombobox.prototype.setControlType = function () {
            this.element.setAttribute('aria-autocomplete', 'list');
            this.element.setAttribute('aria-expanded', 'false');
            this.element.setAttribute('aria-controls', this.id + '_list');
            this.container.classList.add('list-combobox');
        }

        /**
         * Create a duplicate of the original form element.
         *
         * The user will interact with the duplicate item. The original element retains the initial value
         * and will be updated with new values as the user chooses or enters labels. The value of the new
         * element is not submitted to Dimensions as it is lacking the 'name' attribute.
         *
         * @return {void}
         */
        oCombobox.prototype.cloneInputElement = function () {
            var newelement = this.element.cloneNode();
            newelement.name = '';

            this.element.type = 'hidden';
            this.hiddenelement = this.element;
            this.element.id = '';

            this.element = this.element.insertAdjacentElement('afterend', newelement);
        }

        /**
         * Removes any undesirable characters from the user-supplied label.
         * @param {string} textstring
         * @returns {string}
         */
        oCombobox.prototype.sanitiseText = function (textstring) {
            textstring = textstring.replace(/[\r\n\t]/mg, ' ');
            textstring = textstring.replace(/\s\s+/mg, ' ');
            return textstring.trim();
        }

        oCombobox.prototype.onChange = function (event) {
            event.stopImmediatePropagation();
            this.broadcastChange();
        }

        oCombobox.prototype.onFocusIn = function () {
            var focusEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
            this.element.dispatchEvent(focusEvent);
        }

        oCombobox.prototype.onFocusOut = function () {
            var focusEvent = new CustomEvent('focusOut', {bubbles: true, detail: this});
            this.element.dispatchEvent(focusEvent);
        }

        oCombobox.prototype.getKeyPressed = function (event) {
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

        oCombobox.prototype.onKeydown = function (event) {
            switch (this.keypressed) {
                case 9: // tab key
                    this.clearKeyBuffer();
                    this.hideList();
                    break;
                case 35: // end
                case 36: // home
                    break;
                case 38: // up arrow
                case 40: // down arrow
                    event.preventDefault(); // prevent caret from moving
                    break;
                case 13: // enter key
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    this.requestSelectedValue();
                    break;
                default:
                    this.element.classList.remove('exact');
                    this.keybuffer += String.fromCharCode(this.keypressed).toLowerCase();
            }
        }

        oCombobox.prototype.onKeyup = function () {
            switch (this.keypressed) {
                case 27: // escape key
                    this.hideList();
                    return;
                case 37: // left
                case 39: // right
                case 35: // end
                case 36: // home
                    return;
                case 38: // up arrow
                case 40: // down arrow
                    this.clearKeyBuffer();
                    this.sendKeyToList();
                    break;
                case 9: // tab key
                case null:
                    break;
                case 13: // enter key
                    return;
                default:
                    this.restartKeyBuffer();
                    this.sendKeyToList();
                    break;
            }

            this.showList();
        }

        oCombobox.prototype.restartKeyBuffer = function () {
            clearInterval(this.keytimer);
            var self = this;
            this.keytimer = setTimeout(function () {
                self.clearKeyBuffer()
            }, this.keytimerlimit);
        }

        oCombobox.prototype.clearKeyBuffer = function () {
            this.keybuffer = '';
        }

        /**
         * Dispatch an event instructing the list to display.
         */
        oCombobox.prototype.showList = function () {
            if (this.isReadOnly) {
                return;
            }

            this.element.setAttribute('aria-expanded', 'true');
            var listEvent = new CustomEvent('showList', {bubbles: true, detail: this});
            this.element.dispatchEvent(listEvent);
        }

        /**
         * Dispatch an event instructing the list to hide.
         */
        oCombobox.prototype.hideList = function () {
            this.element.setAttribute('aria-expanded', 'false');
            var listEvent = new CustomEvent('hideList', {bubbles: true, detail: this});
            this.element.dispatchEvent(listEvent);
        }

        /**
         * Dispatch an event instructing the list visibility to toggle.
         */
        oCombobox.prototype.toggleList = function (event) {
            if (this.isReadOnly) {
                return;
            }

            if (event.target === this.element) {
                var expanded = this.element.getAttribute('aria-expanded') === 'true';
                this.element.setAttribute('aria-expanded', !expanded);
                var listEvent = new CustomEvent('toggleList', {bubbles: true, detail: this});
                this.element.dispatchEvent(listEvent);
                return;
            }

            if (!this.container.contains(event.target)) {
                this.hideList();
            }
        }

        /**
         * Dispatch an event which forwards the keypress to the list.
         */
        oCombobox.prototype.sendKeyToList = function () {
            var listEvent = new CustomEvent(this.group + '_sendKeyToList', {bubbles: true, detail: this});
            this.element.dispatchEvent(listEvent);
        }

        oCombobox.prototype.onEnableExclusive = function (event) {
            if (this.element !== event.detail.element) {
                this.clearOptions();
                this.clearKeyBuffer();
                this.setValue('');
                this.setHiddenValue('');
                this.sendKeyToList();
            }
        }

        oCombobox.prototype.clearEntries = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            // call the parent (super) method
            component.prototype.clearEntries.call(this);
            this.setValue('');
            this.clearOptions();
        }

        oCombobox.prototype.clearOptions = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            this.element.classList.remove('exact');

            if (this.getHiddenValue()) {
                this.setHiddenValue('');
                this.broadcastChange();
            }
        }

        oCombobox.prototype.requestSelectedValue = function () {
            var valueEvent = new CustomEvent(this.group + '_requestValue', {bubbles: true, detail: this});
            this.element.dispatchEvent(valueEvent);
        }

        oCombobox.prototype.setSelectedValue = function (event) {
            var selectedOption = event.detail.element.querySelector('li.selected');
            this.clearKeyBuffer();
            this.hideList();

            if (selectedOption === null) {
                return;
            }

            this.setSelectedOption(selectedOption);
            this.onChange(event);
        }

        oCombobox.prototype.setSelectedOption = function (selectedOption) {
            this.setValue(selectedOption.textContent);
            this.setHiddenValue(selectedOption.getAttribute('data-value'));
            this.element.setAttribute('aria-activedescendant', selectedOption.id);
        }

        /**
         * Sets the visible text.
         *
         * Retrieves the label (innerText) associated with the value (data-value) of the list.
         */
        oCombobox.prototype.setInitialLabel = function () {
            if (!this.getValue()) {
                return;
            }

            var selectedOption = document.querySelector('#' + this.id + '_list li[data-value="' + this.getValue() + '"]');
            this.setSelectedOption(selectedOption);
        }

        /**
         * Gets the value of the visible element.
         *
         * The visible element holds the selected label or current user input.
         * @returns {*}
         */
        oCombobox.prototype.getValue = function () {
            return this.element.value;
        }

        /**
         * Sets the value of the visible element.
         *
         * The visible element handles the user interactions and feedback.
         * @param valuestring {string|null}
         */
        oCombobox.prototype.setValue = function (valuestring) {
            this.element.value = this.sanitiseText(valuestring);
            this.element.classList.add('exact');
        }

        /**
         * Gets the value of the hidden element.
         *
         * The hidden element holds the value that will be submitted to Dimensions.
         * @returns {*}
         */
        oCombobox.prototype.getHiddenValue = function () {
            return this.hiddenelement.value;
        }

        /**
         * Sets the value of the hidden element.
         *
         * The hidden element is the item that is submitted to Dimensions.
         * @param valuestring {string|null}
         */
        oCombobox.prototype.setHiddenValue = function (valuestring) {
            this.hiddenelement.value = valuestring;
            this.hiddenelement.setAttribute('data-value', valuestring);
        }

        return oCombobox;
    });