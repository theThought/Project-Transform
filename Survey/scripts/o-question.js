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
            this.id = id;
            this.group = group;
            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"]');
            this.parent = this.element.closest('div.o-question-container');
            this.properties = {};
        }

        oQuestion.prototype = Object.create(component.prototype);

        oQuestion.prototype.separator = function (val) {
            if (val === false) {
                this.parent.classList.add('no-separator');
            }
        }

        return oQuestion;

    });