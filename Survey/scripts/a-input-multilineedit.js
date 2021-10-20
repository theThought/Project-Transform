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
            this.element = document.getElementById(id);
        }

        aInputMultilineEdit.prototype.Init = function () {
            this.exclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;

            document.addEventListener("click", this, false);
            document.addEventListener("change", this, false);
            document.addEventListener("enableExclusive", this, false);
            document.addEventListener("dismissExclusive", this, false);
        }

        aInputMultilineEdit.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.clicked(event);
                    break;
                case "change":
                    this.changed(event);
                    break;
                case "enableExclusive":
                    this.enableExclusive(event);
                    break;
                case "dismissExclusive":
                    this.dismissExclusive(event);
                    break;
            }
        }

        aInputMultilineEdit.prototype.clicked = function (event) {
            event.stopPropagation();
            this.element.removeAttribute('readonly');
        }

        aInputMultilineEdit.prototype.changed = function (event) {
            console.log('Handling input change on aInputMultilineedit for ' + this.id)
        }

        aInputMultilineEdit.prototype.enableExclusive = function (event) {
            this.element.setAttribute('readonly', 'true');
        }

        aInputMultilineEdit.prototype.dismissExclusive = function (event) {
            this.element.removeAttribute('readonly');
        }

        return aInputMultilineEdit;

    });