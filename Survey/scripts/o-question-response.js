/*
  functionality:

  character countdown

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    [
        'm-input-multilineedit',
        'm-option-base',
    ],
    function oQuestionResponse() {

        // build an array of elements to iterate over
        var elements = document.getElementsByClassName('o-question-response');

        for (var i = 0; i < elements.length; i++) {

            // INCOMING EVENT: M-OPTION-BASE CLICK
            elements[i].addEventListener('mOptionBaseClicked', function (event) {
                // Define elements that should be notified of this event
                var strElements = '.m-option-base';
                var inputElements = event.currentTarget.querySelectorAll(strElements);

                // Loop these through these elements and call the receiving function (defined in the element)
                for (var j = 0; j < inputElements.length; j++) {
                    inputElements[j].incomingClick(event.target);
                }
            });

            // INCOMING EVENT: EXCLUSIVE CLICK (ON)
            elements[i].addEventListener('mOptionBaseExclusiveClickOn', function (event) {
                // Define elements that should be notified of this event
                var strElements = '.m-option-base,.a-input-multilineedit';
                var inputElements = event.currentTarget.querySelectorAll(strElements);

                // Loop these through these elements and call the receiving function (defined in the element)
                for (var j = 0; j < inputElements.length; j++) {
                    inputElements[j].incomingExclusive(event.target);
                }
            });

            // INCOMING EVENT: EXCLUSIVE CLICK (OFF)
            elements[i].addEventListener('mOptionBaseExclusiveClickOff', function (event) {
                // Define elements that should be notified of this event
                var strElements = '.a-input-multilineedit';
                var inputElements = event.currentTarget.querySelectorAll(strElements);

                // Loop these through these elements and call the receiving function (defined in the element)
                for (var j = 0; j < inputElements.length; j++) {
                    inputElements[j].incomingExclusiveOff(event.target);
                }
            });

            // INCOMING EVENT: INPUT MULTILINEEDIT CLICK
            elements[i].addEventListener('aInputMultilineEditClick', function (event) {
                // Define elements that should be notified of this event
                var strElements = '.m-option-base';
                var inputElements = event.currentTarget.querySelectorAll(strElements);

                // Loop these through these elements and call the receiving function (defined in the element)
                for (var j = 0; j < inputElements.length; j++) {
                    inputElements[j].incomingClick(event.target);
                }
            });

        } // END LOOP
    }
)