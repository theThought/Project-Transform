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

define(
    [
        'a-label-question',
        'a-icon-multistate',
    ],
    function mOptionBase() {

        // build an array of elements to iterate over
        var elements = document.getElementsByClassName('m-option-base');

        // define OUTBOUND events (the handler is defined on the receiving element)
        var evCheckboxClicked = new CustomEvent('mOptionBaseClicked', {bubbles: true});
        var evExclusiveOn = new CustomEvent('mOptionBaseExclusiveClickOn', {bubbles: true});
        var evExclusiveOff = new CustomEvent('mOptionBaseExclusiveClickOff', {bubbles: true});

        // loop through all m-option-base elements and apply custom events
        for (var i = 0; i < elements.length; i++) {

            // HANDLE INCOMING EVENT: SOMETHING HAS BEEN CLICKED
            elements[i].incomingClick = function (originatingElement) {
                if (this !== originatingElement && this.getAttribute('data-exclusive') === 'true') {
                    var elCheckbox = this.getElementsByTagName('input');
                    elCheckbox[0].checked = false;
                }
            }.bind(elements[i]);

            // HANDLE INCOMING EVENT: AN EXCLUSIVE ITEM HAS BEEN CLICKED
            elements[i].incomingExclusive = function (originatingElement) {
                if (this !== originatingElement) {
                    var elCheckbox = this.getElementsByTagName('input');
                    elCheckbox[0].checked = false;
                }
            }.bind(elements[i]);

            // OUTBOUND EVENT: THIS ITEM IS EXCLUSIVE AND HAS BEEN SWITCHED ON/OFF
            if (elements[i].getAttribute('data-exclusive') === 'true') {
                elements[i].addEventListener("change", function () {
                    var elCheckbox = this.getElementsByTagName('input');

                    if (elCheckbox[0].checked === true) {
                        this.dispatchEvent(evExclusiveOn);
                    } else {
                        this.dispatchEvent(evExclusiveOff);
                    }
                });
            }

            // OUTBOUND EVENT: THIS ITEM HAS BEEN CLICKED / CHANGED
            if (!elements[i].hasAttribute('data-exclusive') || elements[i].getAttribute('data-exclusive') === 'false') {
                elements[i].addEventListener("change", function () {
                    this.dispatchEvent(evCheckboxClicked);
                });
            }

        } // END LOOP
    }
)