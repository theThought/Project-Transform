define(['component', 'pikaday'],
    function (component, datepicker) {

        /**
         * Atom: Single line input, text or date
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputSingleLineEdit(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('input[data-questionid="' + this.id + '"]');
            this.container = this.element.closest('div[data-questiongroup="' + this.group + '"]');
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.defaultPlaceholder = (this.element.placeholder.length) ? this.element.placeholder : '';
            this.wrapper = this.createWrapper();
            this.stepValue = null;
            this.isReadOnly = false;
        }

        aInputSingleLineEdit.prototype = Object.create(component.prototype);
        aInputSingleLineEdit.prototype.constructor = aInputSingleLineEdit;

        aInputSingleLineEdit.prototype.init = function () {
            this.isReadOnly = (this.container.getAttribute('data-readonly') === 'true' || this.element.readOnly) || false;

            this.configureProperties();
            this.getInitialValue();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configureInitialVisibility();
            this.processVisibilityRules();
            this.setInitialContentClass();
            this.setReadOnly();
            this.configurationComplete();
        }

        aInputSingleLineEdit.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("restoreEntries", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener("broadcastChange", this, false);
        }

        aInputSingleLineEdit.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener("keyup", this, false);
            this.element.addEventListener("change", this, false);
            this.element.addEventListener("input", this, false);
            this.element.addEventListener("click", this, false);
            this.element.addEventListener("focusin", this, false);
            this.element.addEventListener("focusout", this, false);
            this.element.addEventListener("keydown", this, false);
        }

        aInputSingleLineEdit.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "keydown":
                    this.onKeydown(event);
                    break;
                case "click":
                    this.onClick(event);
                    break;
                case "keyup":
                case "change":
                    this.onChange(event);
                    break;
                case "input":
                    this.onInput(event);
                    break;
                case "clearEntries":
                    this.clearEntriesFromExternal(event);
                    break;
                case "restoreEntries":
                    this.restoreEntries(event);
                    break;
                case "focusin":
                    this.onFocusIn(event);
                    break;
                case "focusout":
                    this.onFocusOut();
                    break;
                case this.group + "_enableExclusive":
                    this.onEnableExclusive();
                    break;
                case 'broadcastChange':
                    this.processVisibilityRulesFromExternalTrigger(event);
                    break;
            }
        }

        aInputSingleLineEdit.prototype.makeAvailable = function () {
            // call the parent (super) method
            component.prototype.makeAvailable.call(this);

            this.element.classList.remove('unavailable');
            this.wrapper.classList.remove('unavailable');
        }

        aInputSingleLineEdit.prototype.makeUnavailable = function () {
            // call the parent (super) method
            component.prototype.makeUnavailable.call(this);

            this.element.classList.add('unavailable');
            this.wrapper.classList.add('unavailable');
        }

        aInputSingleLineEdit.prototype.setReadOnly = function () {
            if (!this.isReadOnly) {
                return;
            }

            this.element.readOnly = true;
            this.wrapper.classList.add('read-only');
        }

        aInputSingleLineEdit.prototype.type = function (val) {
            switch (val) {
                case 'month':
                case 'date':
                    this.configureDateInput(val);
                    val = 'text';
                    break;
                case 'number':
                    this.configureNumericInput('integer');
                    break;
                case 'double':
                    this.configureNumericInput('double');
                    val = 'number';
                    break;
            }

            try {
                this.element.type = val;
            } catch (e) {
                this.element.type = 'text';
            }
        }

        aInputSingleLineEdit.prototype.createWrapper = function () {
            var parent = this.element.parentNode;
            var wrapperElement = document.createElement('span');
            wrapperElement.classList.add('m-input-singlelineedit');
            wrapperElement.classList.add('nowrap');
            wrapperElement.classList.add('position-' + this.element.getAttribute('data-position'));

            if (this.element.style.visibility === 'hidden') {
                wrapperElement.style.visibility = 'hidden';
            }

            var wrapper = parent.insertBefore(wrapperElement, this.element);
            wrapper.appendChild(this.element);

            return wrapper;
        }

        aInputSingleLineEdit.prototype.step = function (val) {
            this.stepValue = Number(val);
            this.element.step = this.stepValue;
        }

        aInputSingleLineEdit.prototype.setDefaultStep = function (numberformat) {
            if (this.stepValue !== null) {
                return;
            }

            if (numberformat === 'double') {
                this.step(0.01);
            } else {
                this.step(1);
            }
        }

        aInputSingleLineEdit.prototype.configureDateInput = function (val) {
            var outputformat = (val === 'month') ? 'MMMM' : 'DD [/] MM [/] YYYY';

            datemin = [2000, 1, 1];
            datemax = [3000, 12, 31];

            if (this.element.getAttribute('min') !== null) {
                var datemin = this.element.getAttribute('min').split('-');
            }

            if (this.element.getAttribute('max') !== null) {
                var datemax = this.element.getAttribute('max').split('-');
            }

            var picker = new datepicker(
                {
                    field: this.element,
                    firstDay: 1,
                    format: outputformat,
                    minDate: new Date(datemin[0], datemin[1], datemin[2]),
                    maxDate: new Date(datemax[0], datemax[1], datemax[2])
                });
        }

        aInputSingleLineEdit.prototype.configureNumericInput = function (numberformat) {
            this.setDefaultStep(numberformat);

            // create a wrapper to surround the input element and spinner buttons
            var inputWrapper = document.createElement('div');
            inputWrapper.className = 'm-input-button-wrapper';

            // create a wrapper to surround the spinner buttons only
            var spinnerWrapper = document.createElement('div');
            spinnerWrapper.className = 'm-button-spinner';

            var that = this;

            // create the spinner buttons and append them to the spinner container
            var incButton = document.createElement('button');
            incButton.className = 'a-button-spinner-up';
            incButton.innerHTML = '&#x25B2;'
            incButton.tabIndex = -1;
            incButton.onclick = function (event) {
                event.preventDefault();
            }
            incButton.onmousedown = function (event) {
                that.element.value = Number(that.element.value) + that.stepValue;
                that.broadcastChange();
            };
            var decButton = document.createElement('button');
            decButton.className = 'a-button-spinner-down';
            decButton.innerHTML = '&#x25BC;';
            decButton.tabIndex = -1;
            decButton.onclick = function (event) {
                event.preventDefault();
            }
            decButton.onmousedown = function (event) {
                that.element.value = Number(that.element.value) - that.stepValue;
                that.broadcastChange()
            }
            spinnerWrapper.appendChild(incButton);
            spinnerWrapper.appendChild(decButton);

            // insert the element wrapper to the DOM and append the input element to it
            inputWrapper = this.wrapper.insertBefore(inputWrapper, this.element);
            inputWrapper.appendChild(this.element);
            inputWrapper.appendChild(spinnerWrapper);
        }

        aInputSingleLineEdit.prototype.labels = function (props) {
            if (props['pre']) {
                var preElement = document.createElement('span');
                preElement.className = 'a-label-prelabel';
                var preContentText = props['pre'];
                preContentText = preContentText.replace(/%lt%/g, '<');
                preContentText = preContentText.replace(/%gt%/g, '>');
                preElement.innerHTML = preContentText;

                this.wrapper.insertBefore(preElement, this.wrapper.childNodes[0]);
            }

            if (props['post']) {
                var postElement = document.createElement('span');
                postElement.className = 'a-label-postlabel';
                var postContentText = props['post'];
                postContentText = postContentText.replace(/%lt%/g, '<');
                postContentText = postContentText.replace(/%gt%/g, '>');
                postElement.innerHTML = postContentText;

                this.wrapper.appendChild(postElement);
            }
        }

        aInputSingleLineEdit.prototype.onKeydown = function (event) {
            event.stopPropagation();
        }

        aInputSingleLineEdit.prototype.onClick = function (event) {
            event.stopPropagation();
        }

        aInputSingleLineEdit.prototype.onChange = function (event) {
            this.broadcastChange();
        }

        aInputSingleLineEdit.prototype.onInput = function (event) {
            var inputEvent = new CustomEvent(this.group + '_textInput', {bubbles: true, detail: this});
            this.element.dispatchEvent(inputEvent);
            this.manageContentClass();
        }

        aInputSingleLineEdit.prototype.onFocusIn = function (event) {
            this.wrapper.classList.add('focused');

            // handle self-generated events
            if (this.element.placeholder.length
                && this.element.placeholder !== this.defaultPlaceholder) {
                this.element.value = this.element.placeholder;
                this.element.placeholder = this.defaultPlaceholder;
                this.broadcastChange();
            }

            var clickedEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
            this.element.dispatchEvent(clickedEvent);
        }

        aInputSingleLineEdit.prototype.onFocusOut = function () {
            this.wrapper.classList.remove('focused');
        }

        aInputSingleLineEdit.prototype.onEnableExclusive = function () {

            if (this.element.value) {
                this.element.placeholder = this.element.value;
                this.element.value = '';
                this.broadcastChange();
            }

        }

        return aInputSingleLineEdit;

    });