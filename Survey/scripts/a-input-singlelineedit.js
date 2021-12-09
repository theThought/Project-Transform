/*
  functionality:

  placeholders
  expanding box as you type

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    function () {

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
            this.element = null;
            this.isExclusive = false;
            this.defaultPlaceholder = '';
            this.properties = {};
        }

        aInputSingleLineEdit.prototype.Init = function () {
            this.element = document.querySelector('input[data-questionid="' + this.id + '"]');
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.defaultPlaceholder = (this.element.placeholder.length) ? this.element.placeholder : '';
            this.properties = app.properties[this.element.getAttribute('name')];
            this.configureProperties();

            document.addEventListener("focusin", this, false);
            document.addEventListener("focusout", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
        }

        aInputSingleLineEdit.prototype.configureProperties = function () {
            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        aInputSingleLineEdit.prototype.type = function (val) {
            this.element.type = val;
        }

        aInputSingleLineEdit.prototype.labels = function (val) {
            var parent = this.element.parentNode;
            var wrapperelement = document.createElement('div');
            wrapperelement.className = 'm-input-singlelineedit nowrap';
            var wrapper = parent.insertBefore(wrapperelement, this.element);
            wrapper.appendChild(this.element);

            if (val['pre']) {
                var preelement = document.createElement('span');
                preelement.className = 'a-label-prelabel';
                var precontent = document.createTextNode(val['pre']);
                preelement.appendChild(precontent);

                wrapper.insertBefore(preelement, this.element);
            }

            if (val['post']) {
                var postelement = document.createElement('span');
                postelement.className = 'a-label-postlabel';
                var postcontent = document.createTextNode(val['post']);
                postelement.appendChild(postcontent);

                wrapper.insertBefore(postelement, this.element.nextSibling);
            }
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
                case this.group + "_dismissExclusive":
                    this.onDismissExclusive();
                    break;
            }
        }

        aInputSingleLineEdit.prototype.onFocusIn = function (event) {

            if (event.target === this.element) {

                this.element.parentNode.classList.add('focused');

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
            this.element.parentNode.classList.remove('focused');
        }

        aInputSingleLineEdit.prototype.onEnableExclusive = function () {

            if (this.element.value) {
                this.element.placeholder = this.element.value;
                this.element.value = '';
            }

        }

        return aInputSingleLineEdit;

    });