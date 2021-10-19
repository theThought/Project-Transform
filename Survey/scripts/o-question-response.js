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
            this.element.addEventListener("click", this.clicked, false);
            this.element.addEventListener("incomingExclusive", this.clicked, false);
        }

        oQuestionResponse.prototype.clicked = function () {
            console.log('Handling oQuestionResponse click event');
        }

        oQuestionResponse.prototype.incomingExclusive = function () {
            console.log('Handling oQuestionResponse exclusive event');
        }

        return oQuestionResponse;

    });