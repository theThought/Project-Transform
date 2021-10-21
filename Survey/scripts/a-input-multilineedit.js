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
         * Atom: aInputMultilineEdit
         *
         * @constructor
         * @param {String} id - element id
         */

        function aInputMultilineEdit(id) {
            this.id = id;
            this.questiongroup = null;
            this.isExclusive = false;
            this.element = document.querySelector('textarea[data-questionid="' + id + '"]');
        }

        aInputMultilineEdit.prototype.Init = function () {
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.questiongroup = this.element.getAttribute('data-questiongroup');

            document.addEventListener("click", this, false);
            document.addEventListener("enableExclusive", this, false);
            document.addEventListener("dismissExclusive", this, false);
        }

        aInputMultilineEdit.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
                case "enableExclusive":
                    this.onEnableExclusive(event);
                    break;
                case "dismissExclusive":
                    this.onDismissExclusive(event);
                    break;
            }
        }

        aInputMultilineEdit.prototype.onClick = function (event) {

            if (event.target === this.element) {

                // handle self-generated events
                var clickedEvent = new CustomEvent('aInputMultilineEditClickEvent', {bubbles: true, detail: this});
                document.dispatchEvent(clickedEvent);
                this.element.removeAttribute('readonly');

            } else {

                // handle external events
                if (event.detail.questiongroup !== this.questiongroup) {
                    return
                }

                if (event.detail.isExclusive) {
                    this.element.setAttribute('readonly', 'readonly');
                }
            }
        }

        aInputMultilineEdit.prototype.onEnableExclusive = function (event) {
            this.element.setAttribute('readonly', 'readonly');
        }

        aInputMultilineEdit.prototype.onDismissExclusive = function (event) {
            this.element.removeAttribute('readonly');
        }

        return aInputMultilineEdit;

    });