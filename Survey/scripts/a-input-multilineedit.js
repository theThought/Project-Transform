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
            this.element.addEventListener("click", this.clicked, false);
            this.element.addEventListener("change", this.changed, false);
            this.element.addEventListener("exclusive", this.exclusive, false);
        }

        aInputMultilineEdit.prototype.clicked = function (event) {
            console.log('Handling InputMultilineEdit click event');
        }

        aInputMultilineEdit.prototype.changed = function (event) {
            console.log('Handling input change on aInputMultilineedit.')
        }

        aInputMultilineEdit.prototype.exclusive = function (event) {
            console.log('Handling exclusive.');
        }

        return aInputMultilineEdit;

    });