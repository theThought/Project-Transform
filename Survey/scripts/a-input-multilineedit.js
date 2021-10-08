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
    [],
    function aInputMultilineedit() {

        // build an array of elements to iterate over
        var elements = document.getElementsByClassName('a-input-multilineedit');

        // define OUTBOUND events (the handler is defined on the receiving element)
        var aInputMultilineEditClick = new CustomEvent('aInputMultilineEditClick', {bubbles: true});

        // loop through all a-input-multilineedit elements and apply custom events
        for (var i = 0; i < elements.length; i++) {

            // HANDLE INCOMING EVENT: AN EXCLUSIVE ITEM HAS BEEN CLICKED
            elements[i].incomingExclusive = function () {
                this.setAttribute('readonly', true);
            }.bind(elements[i]);

            // HANDLE INCOMING EVENT: AN EXCLUSIVE ITEM TURNED OFF
            elements[i].incomingExclusiveOff = function () {
                this.removeAttribute('readonly');
            }.bind(elements[i]);

            // OUTBOUND EVENTS: THIS ITEM HAS BEEN CLICKED
            elements[i].addEventListener("click", function () {
                this.removeAttribute('readonly');
                this.dispatchEvent(aInputMultilineEditClick);
            });

        } // END LOOP
    }
)