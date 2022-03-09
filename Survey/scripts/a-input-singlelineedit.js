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

        function aInputSingleLineEdit(id, group) {
            this.id = id;
            this.group = group;
            this.element = document.querySelector('input[data-questionid="' + this.id + '"]');
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.defaultPlaceholder = (this.element.placeholder.length) ? this.element.placeholder : '';
            this.properties = {};

            this.configureIncomingEventListeners();
            this.configureProperties();
        }

        aInputSingleLineEdit.prototype = Object.create(component.prototype);

        aInputSingleLineEdit.prototype.type = function (val) {
            this.element.type = val;
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
            document.addEventListener("focusin", this, false);
            document.addEventListener("focusout", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
        }

        aInputSingleLineEdit.prototype.handleEvent = function (event) {
            switch (event.type) {
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
            }

        }

        return aInputSingleLineEdit;

    });