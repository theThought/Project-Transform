define(['component'],
    function (component) {

        /**
         * Atom: Button
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aButtonOption(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('input#' + this.id);
            this.parent = this.element.parentNode;
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.hiddenelement = null;
        }

        aButtonOption.prototype = Object.create(component.prototype);
        aButtonOption.prototype.constructor = aButtonOption;

        aButtonOption.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.requestInitialSize();
            this.configurationComplete();
        }

        aButtonOption.prototype.configureIncomingEventListeners = function () {
            document.addEventListener(this.group + "_beginResize", this, false);
            document.addEventListener(this.group + "_endResize", this, false);
        }

        aButtonOption.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
                case this.group + "_enableExclusive":
                    this.onEnableExclusive(event);
                    break;
                case this.group + "_dismissExclusive":
                    this.onDismissExclusive(event);
                    break;
                case this.group + "_beginResize":
                    this.onBeginResize(event);
                    break;
                case this.group + "_endResize":
                    this.onEndResize(event);
                    break;
            }
        }

        aButtonOption.prototype.configureButton = function () {
            if (!this.element.hasAttribute('data-checked')) {
                this.element.setAttribute('data-checked', 'false');
            }

            this.hiddenelement = this.element.cloneNode();
            this.hiddenelement.type = 'hidden';

            // remove the ID from the cloned element (duplicate IDs are not permitted)
            // and the name from the original element (the name attribute is how forms are handled)
            this.hiddenelement.id = '';
            this.element.name = '';

            if (this.element.getAttribute('data-checked') === 'false') {
                this.hiddenelement.value = '';
            }

            this.parent.insertBefore(this.hiddenelement, this.element);
        }

        aButtonOption.prototype.onClick = function (event) {
            // stop buttons from submitting
            if (event.target === this.element) {

                if (this.element.getAttribute('data-checked') === 'true') {
                    this.element.setAttribute('data-checked', 'false');
                    this.hiddenelement.value = '';
                } else {
                    this.element.setAttribute('data-checked', 'true');
                    this.hiddenelement.value = this.element.value;
                }

                // handle self-generated events
                if (this.isExclusive && this.element.getAttribute('data-checked') === 'true') {
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

            }
        }

        aButtonOption.prototype.onEnableExclusive = function (event) {

            // handle external events
            if (this.element !== event.detail.element) {
                this.element.setAttribute('data-checked', 'false');
                this.hiddenelement.value = '';
                this.broadcastChange();
            }

        }

        aButtonOption.prototype.onDismissExclusive = function (event) {

            // handle external events
            if (this.element !== event.detail.element && this.isExclusive) {
                this.element.setAttribute('data-checked', 'false');
                this.hiddenelement.value = '';
                this.broadcastChange();
            }
        }

        return aButtonOption;

    });