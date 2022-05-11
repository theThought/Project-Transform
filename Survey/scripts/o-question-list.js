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

        function oQuestionList(id, group) {
            oQuestion.call(this, id, group);

            this.element = document.querySelector('div[class*=o-question-list][data-questiongroup="' + this.group + '"]');

            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configurationComplete();
        }

        oQuestionList.prototype = Object.create(oQuestion.prototype);
        oQuestionList.prototype.constructor = oQuestionList;

        oQuestionList.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("click", this, false);
            document.addEventListener("mousedown", this, false);

        }

        oQuestionList.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'click':
                case 'mousedown':
                    this.onClick(event);
                    break;
                case 'broadcastChange':
                    this.receiveBroadcast(event);
                    break;
                case "configComplete":
                    this.onConfigurationComplete(event);
                    break;
            }
        }

        oQuestionList.prototype.onClick = function (event) {
            if (event.target === this.element) {

                //var parentNode = this.element.parentNode;
                this.element.classList.add('focused');
            }
        }

        return oQuestionList;

    });