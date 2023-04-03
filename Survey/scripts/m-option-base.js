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
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.label = this.element.querySelector('.a-label-option');
        }

        mOptionBase.prototype = Object.create(component.prototype);
        mOptionBase.prototype.constructor = mOptionBase;

        mOptionBase.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.requestInitialSize();
            this.configurationComplete();
        }

        mOptionBase.prototype.configureIncomingEventListeners = function () {
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener(this.group + "_dismissExclusive", this, false);
            document.addEventListener(this.group + "_textFocus", this, false);
            document.addEventListener(this.group + "_beginResize", this, false);
            document.addEventListener(this.group + "_endResize", this, false);
            document.addEventListener("clearEntries", this, false);
        }

        mOptionBase.prototype.configureLocalEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            this.element.addEventListener("click", this, false);
            this.element.addEventListener("change", this, false);
        }

        mOptionBase.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
                case "change":
                    this.onChange(event);
                    break;
                case "clearEntries":
                    this.clearEntries(event);
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
                case this.group + "_beginResize":
                    this.onBeginResize(event);
                    break;
                case this.group + "_endResize":
                    this.onEndResize(event);
                    break;
            }
        }

        mOptionBase.prototype.clearEntries = function (event) {
            if (event.detail.questionName === this.questionName) {
                if (this.checkbox.checked) {
                    this.checkbox.checked = false;
                    this.broadcastChange();
                }

                if (this.textInput !== null) {
                    this.textInput.value = "";
                }

            }
        }

        mOptionBase.prototype.onChange = function (event) {

            event.stopImmediatePropagation();

            if (this.element.contains(event.target)) {

                this.broadcastChange();

                // handle self-generated events
                if (this.isExclusive && this.checkbox.checked) {
                    var enableExclusive = new CustomEvent(this.group + '_enableExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    document.dispatchEvent(enableExclusive);

                } else {
                    var dismissExclusive = new CustomEvent(this.group + '_dismissExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    document.dispatchEvent(dismissExclusive);
                }

                if (this.textInput !== null) {
                    if (this.checkbox.checked) {
                        this.textInput.focus();
                    } else {
                        this.textInput.placeholder = this.textInput.value;
                        this.textInput.value = '';
                    }
                }
            }
        }

        mOptionBase.prototype.onClick = function (event) {

            event.preventDefault();
            event.stopImmediatePropagation();

            if (event.target === this.textInput || this.element.contains(event.target)) {
                this.checkbox.checked = true;
            }

            this.onChange(event);

        }

        mOptionBase.prototype.onEnableExclusive = function (event) {

            // handle external events
            if (this.element !== event.detail.element) {
                if (this.checkbox.checked) {
                    this.checkbox.checked = false;
                }
                this.broadcastChange();
            }

        }

        mOptionBase.prototype.onDismissExclusive = function (event) {

            // handle external events
            if (this.element !== event.detail.element && this.isExclusive) {
                if (this.checkbox.checked) {
                    this.checkbox.checked = false;
                    this.broadcastChange();
                }
            }
        }

        mOptionBase.prototype.onTextFocus = function (event) {

            if (this.isExclusive && event.detail.element !== this.textInput) {
                if (this.checkbox.checked) {
                    this.checkbox.checked = false;
                    this.broadcastChange();
                }
            }
        }

        return mOptionBase;

    });