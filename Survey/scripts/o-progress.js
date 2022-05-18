/*
  functionality:


  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Organism: Complex Progress Bar
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oProgress(id, group) {
            component.call(this, id, group);
            this.element = document.querySelector('div.overall-progress.complex#' + this.id);

            this.configureProperties();
        }

        oProgress.prototype = Object.create(component.prototype);
        oProgress.prototype.constructor = oProgress;

        oProgress.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
        }

        oProgress.prototype.handleEvent = function (event) {
            switch (event.type) {
                // event handlers to match incoming event listeners
            }
        }

        oProgress.prototype.sections = function (sections) {
            var self = this;

            sections.forEach(function (section) {
                self.element.appendChild(self.createSection(section));
            });
        }

        oProgress.prototype.createSection = function (section) {
            var self = this;

            var newSection = document.createElement('div');
            newSection.classList.add('m-progress-section');

            if (section.title === this.properties.currentsection) {
                newSection.classList.add('current-section');
            }

            newSection.title = section.title;

            section.questions.forEach(function (question) {
                newSection.appendChild(self.createQuestion(question));
            })

            return newSection;
        }

        oProgress.prototype.createQuestion = function (question) {
            var newQuestion = document.createElement('div');
            newQuestion.classList.add('a-progress-question');

            if (question.title === this.properties.currentquestion) {
                newQuestion.classList.add('current-question');
            }

            newQuestion.title = question.title;

            return newQuestion;
        }

        return oProgress;

    });