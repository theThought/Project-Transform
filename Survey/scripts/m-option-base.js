define(['component'],
    function (component) {

        /**
         * Molecule: Basic toggle option
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function mOptionBase(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questionid="' + this.id + '"]');
            this.checkbox = this.element.querySelector('input[type=checkbox],input[type=radio]');
            this.textInput = this.element.querySelector('input[type=text]');
            this.label = this.element.querySelector('.a-label-option');
            this.keypressed = null;
            this.isReadOnly = false;
            this.isExclusive = false;
        }

        mOptionBase.prototype = Object.create(component.prototype);
        mOptionBase.prototype.constructor = mOptionBase;

        mOptionBase.prototype.init = function () {
            this.isReadOnly = (this.checkbox.getAttribute('data-readonly') === 'true' || this.element.getAttribute('data-readonly') === 'true') || false;
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;

            this.configureProperties();
            this.storeInitialValue();
            this.configureReadonly();
            this.relocateTextInput();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configureInitialVisibility();
            this.processVisibilityRules();
            this.requestInitialSize();
            this.configurationComplete();
        }

        mOptionBase.prototype.configureIncomingEventListeners = function () {
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener(this.group + "_dismissExclusive", this, false);
            document.addEventListener(this.group + "_textFocus", this, false);
            document.addEventListener(this.group + "_textInput", this, false);
            document.addEventListener(this.group + "_beginResize", this, false);
            document.addEventListener(this.group + "_endResize", this, false);
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("restoreEntries", this, false);
            document.addEventListener("broadcastChange", this, false);
        }

        mOptionBase.prototype.configureLocalEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            this.element.addEventListener("click", this, false);
            this.element.addEventListener("change", this, false);
            this.element.addEventListener("keydown", this, false);
        }

        mOptionBase.prototype.handleEvent = function (event) {
            var eventsToPassWhenReadonly = [this.group + '_beginResize', this.group + '_endResize'];

            if (this.isReadOnly && eventsToPassWhenReadonly.indexOf(event.type) === -1) {
                event.preventDefault();
                return;
            }

            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
                case "change":
                    this.onChange(event);
                    break;
                case "clearEntries":
                    this.clearEntriesFromExternal(event);
                    break;
                case "restoreEntries":
                    this.restoreEntries(event);
                    break;
                case this.group + "_enableExclusive":
                    this.onEnableExclusive(event);
                    break;
                case this.group + "_dismissExclusive":
                    this.onDismissExclusive(event);
                    break;
                case this.group + "_textFocus":
                    this.onTextFocus(event);
                    break;
                case this.group + "_textInput":
                    this.onTextInput(event);
                    break;
                case this.group + "_beginResize":
                    this.onBeginResize(event);
                    break;
                case this.group + "_endResize":
                    this.onEndResize(event);
                    break;
                case "keydown":
                    this.getKeyPressed(event);
                    this.onKeydown();
                    break;
                case "broadcastChange":
                    this.processVisibilityRulesFromExternalTrigger(event);
                    break;
            }
        }

        mOptionBase.prototype.relocateTextInput = function () {
            if (this.textInput === null) {
                return;
            }

            var textDestination = this.element.querySelector('label');
            var textWrapper = this.element.querySelector('.m-input-singlelineedit');
            textDestination.appendChild(textWrapper);
        }

        mOptionBase.prototype.storeInitialValue = function () {
            component.prototype.storeInitialValue.call(this);
            this.changeState(this.checkbox.checked);
        }

        mOptionBase.prototype.getKeyPressed = function (event) {
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

        mOptionBase.prototype.onKeydown = function () {
            if (this.keypressed === 32 && !this.checkbox.disabled) {
                if (this.checkbox.type === 'radio') {
                    this.changeState(true);
                    var enableExclusive = new CustomEvent(this.group + '_enableExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    this.element.dispatchEvent(enableExclusive);
                } else {
                    this.changeState(!this.checkbox.checked);
                }

                this.broadcastChange();
            }
        }

        mOptionBase.prototype.configureReadonly = function () {
            if (!this.isReadOnly) {
                return;
            }

            this.element.setAttribute('data-readonly', 'true');

            if (this.textInput !== null) {
                this.textInput.setAttribute('data-readonly', 'true');
                this.textInput.readOnly = true;
            }
        }

        mOptionBase.prototype.clearEntries = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            if (this.checkbox.checked) {
                this.changeState(false);
                this.broadcastChange();
            }

            if (this.textInput !== null) {
                this.textInput.value = "";
                this.textInput.classList.remove('has-content');
            }
        }

        mOptionBase.prototype.restoreEntries = function () {
            // the following line is only required when children are made available by parents
            // we cannot call makeAvailable as it's possible to end in a loop
            this.element.classList.remove('unavailable');

            if (!this.restoreValues) {
                return;
            }

            if (this.initialValue && !this.checkbox.checked) {
                this.changeState(true);
                this.broadcastChange();
            }
        }

        mOptionBase.prototype.onChange = function (event) {

            event.stopImmediatePropagation();

            if (this.element.contains(event.target)) {

                // handle self-generated events
                if (this.isExclusive && this.checkbox.checked) {
                    var enableExclusive = new CustomEvent(this.group + '_enableExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    this.element.dispatchEvent(enableExclusive);

                } else {
                    var dismissExclusive = new CustomEvent(this.group + '_dismissExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    this.element.dispatchEvent(dismissExclusive);
                }

                if (this.textInput !== null) {
                    if (this.checkbox.checked) {
                        if (event.target !== this.textInput) {
                            this.textInput.focus();
                        }
                    } else {
                        if (this.textInput.value.length) {
                            this.textInput.placeholder = this.textInput.value;
                        }
                        this.textInput.value = '';
                        this.textInput.classList.remove('has-content');
                    }
                }

                this.broadcastChange();
            }
        }

        mOptionBase.prototype.onClick = function (event) {

            this.checkbox.focus();
            event.preventDefault();
            event.stopPropagation();

            var focusin = new CustomEvent('focusin', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(focusin);

            if (event.target === this.textInput) {
                return;
            }

            if (this.element.contains(event.target)) {
                // prevent radio buttons from de-selecting on subsequent clicks
                if (this.checkbox.checked && this.checkbox.type === 'radio') {
                    return;
                }
                this.changeState(!this.checkbox.checked);
                this.onChange(event);
            }
        }

        mOptionBase.prototype.onEnableExclusive = function (event) {
            // handle external events
            if (this.element !== event.detail.element) {
                if (this.element.getAttribute('data-checked') === 'true') {
                    this.changeState(false);
                    this.broadcastChange();
                }
            }
        }

        mOptionBase.prototype.onDismissExclusive = function (event) {
            // handle external events
            if (this.element !== event.detail.element && this.isExclusive) {
                if (this.element.getAttribute('data-checked') === 'true') {
                    this.changeState(false);
                    this.broadcastChange();
                }
            }
        }

        mOptionBase.prototype.onTextInput = function (event) {
            if (this.isExclusive && event.detail.element !== this.textInput) {
                if (this.checkbox.checked) {
                    this.changeState(false);
                    this.broadcastChange();
                }
            }

            if (event.detail.element === this.textInput) {
                this.changeState(true);
                this.broadcastChange();
            }
        }

        mOptionBase.prototype.onTextFocus = function (event) {

            // this section deals with textboxes which are in the same group as
            // checkboxes and may need to react correspondingly (e.g. exclusive)
            if (this.isExclusive && event.detail.element !== this.textInput) {
                if (event.detail.element.value.length && this.checkbox.checked) {
                    this.changeState(false);
                    this.broadcastChange();
                }
            }

            // this section deals with other specifier textboxes, where the textbox
            // 'belongs' to the checkbox
            if (event.detail.element === this.textInput && this.textInput.value.length) {
                this.changeState(true);
                this.broadcastChange();
            }
        }

        mOptionBase.prototype.changeState = function (check) {
            if (check) {
                this.checkbox.checked = true;
                this.element.setAttribute('data-checked', 'true');
            } else {
                this.checkbox.checked = false;
                this.element.setAttribute('data-checked', 'false')
            }
        }

        return mOptionBase;

    });