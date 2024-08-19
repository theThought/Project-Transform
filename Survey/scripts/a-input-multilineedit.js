define(['component'],
    function (component) {

        /**
         * Atom: Multi-line text input
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputMultilineEdit(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('textarea[data-questionid="' + this.id + '"]');
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.defaultPlaceholder = (this.element.placeholder.length) ? this.element.placeholder : '';
            this.allowPaste = null;
        }

        aInputMultilineEdit.prototype = Object.create(component.prototype);
        aInputMultilineEdit.prototype.constructor = aInputMultilineEdit;

        aInputMultilineEdit.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.setInitialContentClass();
            this.configurationComplete();
        }

        aInputMultilineEdit.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener('clearEntries', this, false);
            document.addEventListener('restoreEntries', this, false);
            document.addEventListener('broadcastChange', this, false);
            document.addEventListener(this.group + '_enableExclusive', this, false);
        }

        aInputMultilineEdit.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('focusin', this, false);
            this.element.addEventListener('input', this, false);
            this.element.addEventListener('paste', this, false);
            this.element.addEventListener('change', this, false);
        }

        aInputMultilineEdit.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'change':
                    this.onChange();
                    break;
                case 'paste':
                    this.onPaste(event);
                    break;
                case 'focusin':
                    this.onFocusIn(event);
                    break;
                case 'input':
                    this.onInput();
                    break;
                case 'clearEntries':
                    this.clearEntriesFromExternal(event);
                    break;
                case 'restoreEntries':
                    this.restoreEntries(event);
                    break;
                case this.group + '_enableExclusive':
                    this.onEnableExclusive();
                    break;
                case 'broadcastChange':
                    this.processVisibilityRulesFromExternalTrigger(event);
                    this.processCalculations(event);
                    break;
            }
        }

        aInputMultilineEdit.prototype.paste = function (prop) {
            this.allowPaste = prop;
        }

        aInputMultilineEdit.prototype.onChange = function () {
            this.broadcastChange();
        }

        aInputMultilineEdit.prototype.onPaste = function (event) {
            var parentForm = this.element.closest('form');
            var pageAllowPaste = parentForm.getAttribute('data-paste');

            if (this.allowPaste === false || (pageAllowPaste === 'false' && !this.allowPaste)) {
                event.preventDefault();
                event.stopPropagation();
            }
        }

        aInputMultilineEdit.prototype.onInput = function () {
            var inputEvent = new CustomEvent(this.group + '_textInput', {bubbles: true, detail: this});
            this.element.dispatchEvent(inputEvent);
            this.manageContentClass();
        }

        aInputMultilineEdit.prototype.onFocusIn = function () {
            // handle self-generated events
            if (this.element.placeholder.length && this.element.placeholder !== this.defaultPlaceholder) {
                this.element.value = this.element.placeholder;
                this.element.placeholder = this.defaultPlaceholder;
            }

            var clickedEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
            this.element.dispatchEvent(clickedEvent);
        }

        aInputMultilineEdit.prototype.onEnableExclusive = function () {

            if (this.element.value) {
                this.element.placeholder = this.element.value;
                this.element.value = '';
            }

        }

        return aInputMultilineEdit;

    });