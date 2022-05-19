/*
  functionality:

  click event to change state
  disabled state
  receive broadcast to change state

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Molecule: Base Option
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aButtonOption(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('input#' + this.id);
            this.isExclusive = (this.element.dataset.exclusive === 'true') || false;

            this.configureButton();
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.requestInitialSize();
            this.configurationComplete();
        }

        aButtonOption.prototype = Object.create(component.prototype);
        aButtonOption.prototype.constructor = aButtonOption;

        aButtonOption.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("click", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener(this.group + "_dismissExclusive", this, false);
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
        }

        aButtonOption.prototype.onClick = function (event) {
            // stop buttons from submitting
            if (event.target === this.element) {

                event.preventDefault();

                if (this.element.dataset.checked === 'true') {
                    this.element.setAttribute('data-checked', 'false');
                } else {
                    this.element.setAttribute('data-checked', 'true');
                }

                // handle self-generated events
                if (this.isExclusive && this.element.dataset.checked === 'true') {
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

            }
        }

        aButtonOption.prototype.onEnableExclusive = function (event) {

            // handle external events
            if (this.element !== event.detail.element) {
                this.element.setAttribute('data-checked', 'false');
            }

        }

        aButtonOption.prototype.onDismissExclusive = function (event) {

            // handle external events
            if (this.element !== event.detail.element && this.isExclusive) {
                this.element.setAttribute('data-checked', 'false');
            }
        }

        return aButtonOption;

    });