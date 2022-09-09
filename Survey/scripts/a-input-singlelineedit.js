/*
  functionality:

  placeholders
  expanding box as you type

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component', 'pikaday'],
    function (component, datepicker) {

        /**
         * Atom: aInputSingleLineEdit
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputSingleLineEdit(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('input[data-questionid="' + this.id + '"]');
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.defaultPlaceholder = (this.element.placeholder.length) ? this.element.placeholder : '';

            this.configureProperties();
            this.setReadOnly();
            this.configureIncomingEventListeners();
            this.configurationComplete();
        }

        aInputSingleLineEdit.prototype = Object.create(component.prototype);
        aInputSingleLineEdit.prototype.constructor = aInputSingleLineEdit;

        aInputSingleLineEdit.prototype.setReadOnly = function () {
            if (!this.element.readOnly) {
                return;
            }

            var parent = this.element.parentNode;
            parent.classList.add('read-only');
        }

        aInputSingleLineEdit.prototype.type = function (val) {

            if (val === 'month' || val === 'date') {
                var outputformat = (val === 'month') ? 'MMMM' : 'DD [/] MM [/] YYYY';
                val = 'text';

                var picker = new datepicker(
                    {
                        field: this.element,
                        firstDay: 1,
                        format: outputformat,
                        minDate: new Date(2000, 0, 1),
                        maxDate: new Date(2022, 12, 31)
                    });

            }

            try {
                this.element.type = val;
            } catch (e) {
                this.element.type = 'text';
            }
        }

        aInputSingleLineEdit.prototype.labels = function (props) {
            var parent = this.element.parentNode;
            var wrapperElement = document.createElement('div');
            wrapperElement.className = 'm-input-singlelineedit nowrap';
            var wrapper = parent.insertBefore(wrapperElement, this.element);
            wrapper.appendChild(this.element);

            if (props['pre']) {
                var preElement = document.createElement('span');
                preElement.className = 'a-label-prelabel';
                var preContent = document.createTextNode(props['pre']);
                preElement.appendChild(preContent);

                wrapper.insertBefore(preElement, this.element);
            }

            if (props['post']) {
                var postElement = document.createElement('span');
                postElement.className = 'a-label-postlabel';
                var postContent = document.createTextNode(props['post']);
                postElement.appendChild(postContent);

                wrapper.insertBefore(postElement, this.element.nextSibling);
            }
        }

        aInputSingleLineEdit.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("change", this, false);
            document.addEventListener("keyup", this, false);
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("focusin", this, false);
            document.addEventListener("focusout", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
        }

        aInputSingleLineEdit.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "keyup":
                case "change":
                    this.onChange(event);
                    break;
                case "clearEntries":
                    this.clearEntries(event);
                    break;
                case "focusin":
                    this.onFocusIn(event);
                    break;
                case "focusout":
                    this.onFocusOut(event);
                    break;
                case this.group + "_enableExclusive":
                    this.onEnableExclusive();
                    break;
            }
        }

        aInputSingleLineEdit.prototype.onChange = function (event) {
            if (event.target === this.element) {
                this.broadcastChange();
            }
        }

        aInputSingleLineEdit.prototype.onFocusIn = function (event) {

            if (event.target === this.element) {

                var parentNode = this.element.parentNode;
                parentNode.classList.add('focused');

                // handle self-generated events
                var clickedEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
                document.dispatchEvent(clickedEvent);

                if (this.element.placeholder.length
                    && this.element.placeholder !== this.defaultPlaceholder) {
                    this.element.value = this.element.placeholder;
                    this.element.placeholder = this.defaultPlaceholder;
                    this.broadcastChange();
                }

            }

        }

        aInputSingleLineEdit.prototype.onFocusOut = function (event) {
            var parentNode = this.element.parentNode;
            parentNode.classList.remove('focused');
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