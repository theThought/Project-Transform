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

            this.ready = false;
            this.available = false;
            this.collapse = true;
            this.visibilityRules = [];

            this.container = this.getContainer();
            this.element = document.querySelector('div[class*="o-question-"][data-questiongroup*="' + this.group + '"]');

        }

        oQuestion.prototype = Object.create(component.prototype);
        oQuestion.prototype.constructor = oQuestion;

        oQuestion.prototype.getContainer = function () {
            // some questions may register with a suffix, e.g. _Q0_C, we only want the initial question number
            var scripttagid = this.id.split('_')[1];
            var scripttag = document.querySelector('script[data-questionid="_' + scripttagid + '"]');
            var container = scripttag.closest('div.o-question-container');
            container.setAttribute('data-questiongroup', this.group);
            container.setAttribute('data-questionid', this.id);

            return container;
        }

        oQuestion.prototype.showspinner = function (prop) {
            if (prop === true) {
                this.element.classList.add('show-spinner');
            }
        }

        oQuestion.prototype.handleEvent = function (event) {

        }

        return oQuestion;

    });
