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
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;

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
            document.addEventListener("change", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener(this.group + "_dismissExclusive", this, false);
            document.addEventListener(this.group + "_textFocus", this, false);
            document.addEventListener(this.group + "_beginResize", this, false);
            document.addEventListener(this.group + "_endResize", this, false);
        }

        aButtonOption.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
                case "change":
                    this.onChange(event);
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

        aButtonOption.prototype.onChange = function (event) {

        }

        aButtonOption.prototype.onClick = function (event) {

        }

        aButtonOption.prototype.onEnableExclusive = function (event) {

        }

        aButtonOption.prototype.onDismissExclusive = function (event) {

        }

        return aButtonOption;

    });