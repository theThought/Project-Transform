/*
  functionality:

  character countdown

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Organism: Question Class
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oQuestion(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"]');
            this.parent = this.element.closest('div.o-question-container');

            this.configureQuestionIncomingEventListeners();
        }

        oQuestion.prototype = Object.create(component.prototype);
        oQuestion.prototype.constructor = oQuestion;

        oQuestion.prototype.configureQuestionIncomingEventListeners = function () {
            document.addEventListener(this.group + "_configComplete", this, false);
        }

        oQuestion.prototype.onConfigurationComplete = function () {
            console.log('Configuration complete for ' + this.id);
        }

        oQuestion.prototype.separator = function (val) {
            if (val === false) {
                this.parent.classList.add('no-separator');
            }
        }

        return oQuestion;

    });