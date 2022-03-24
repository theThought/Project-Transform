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
            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"]');
            this.parent = this.element.closest('div.o-question-container');
            this.visibilityRules = [];

            this.configureQuestionIncomingEventListeners();
        }

        oQuestion.prototype = Object.create(component.prototype);
        oQuestion.prototype.constructor = oQuestion;

        oQuestion.prototype.configureQuestionIncomingEventListeners = function () {
            document.addEventListener("configComplete", this, false);
            document.addEventListener("broadcastChange", this, false);
        }

        oQuestion.prototype.handleEvent = function (event) {
            switch (event.type) {

            }
        }

        oQuestion.prototype.onConfigurationComplete = function (event) {
            if (!this.ready && event.detail.group === this.group) {
                this.ready = true;
                this.parent.classList.add('config-complete');

                this.configureInitialVisibility();
                this.configureVisibilityRules();
            }

        }

        oQuestion.prototype.configureInitialVisibility = function () {
            if (typeof this.properties.visible === "undefined") {
                this.liftCover();
            }

            if (typeof this.properties.visible === "object") {
                this.parent.classList.add('unavailable');
            }
        }

        oQuestion.prototype.configureVisibilityRules = function () {
            if (typeof this.properties.visible === "undefined") {
                return false;
            }

            this.visibilityRules = this.properties.visible;
        }

        oQuestion.prototype.receiveBroadcast = function (event) {
            // determine starting visibility state
            var currentVisibilityStatus = (this.parent.classList.contains('cover-off'));

            // originating component data
            var broadcastingComponent = event.detail;

            // get context
            var self = this;

            // process visibility rules
            this.visibilityRules.forEach(function (rule) {
                var ruleQuestion = rule.question.toLowerCase();
                console.info('processing visibility rule ' + ruleQuestion)
                if (broadcastingComponent.questionName === ruleQuestion) {
                    self.parent.classList.remove('unavailable');
                    self.liftCover();
                }
            });

        }

        oQuestion.prototype.liftCover = function () {
            this.parent.classList.add('cover-off');
        }

        oQuestion.prototype.separator = function (val) {
            if (val === false) {
                this.parent.classList.add('no-separator');
            }
        }

        return oQuestion;

    });