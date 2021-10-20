/*
  functionality:

  character countdown

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    function () {

        /**
         * Organism: Question Response Class
         *
         * @constructor
         * @param {String} id - element id
         */

        function oQuestionResponse(id) {
            this.id = id;
            this.element = document.getElementById(id);
            app.registerComponent(this);
        }

        oQuestionResponse.prototype.Init = function () {
            document.addEventListener("click", this, false);
            document.addEventListener("enableExclusive", this, false);
        }

        oQuestionResponse.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'click':
                    this.clicked(event);
                    break;
                case 'incomingExclusive':
                    this.enableExclusive(event);
                    break;
            }
        }

        oQuestionResponse.prototype.clicked = function () {
            console.log('Handling oQuestionResponse click event');
        }

        oQuestionResponse.prototype.enableExclusive = function () {
            console.log('Handling oQuestionResponse exclusive event');
        }

        return oQuestionResponse;

    });