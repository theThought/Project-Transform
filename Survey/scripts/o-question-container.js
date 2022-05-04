/*
  functionality:

  character countdown

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['o-question'],
    function (oQuestion) {

        /**
         * Organism: Question Class
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oQuestionContainer(id, group) {
            oQuestion.call(this, id, group);

            this.element = document.querySelector('div[class=o-question-container][data-questiongroup="' + this.group + '"]');

            this.configureProperties();
            this.configurationComplete();
        }

        oQuestionContainer.prototype = Object.create(oQuestion.prototype);
        oQuestionContainer.prototype.constructor = oQuestionContainer;

        oQuestionContainer.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'broadcastChange':
                    this.receiveBroadcast(event);
                    break;
                case "configComplete":
                    this.onConfigurationComplete(event);
                    break;
            }
        }

        return oQuestionContainer;

    });