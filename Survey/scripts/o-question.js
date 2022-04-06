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
            this.element = document.querySelector('div[data-questiongroup*="' + this.group + '"]');
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
                case 'configComplete':
                    this.onConfigurationComplete(event);
                    break;
                case 'broadcastChange':
                    this.receiveBroadcast(event);
                    break;

            }
        }

        oQuestion.prototype.onConfigurationComplete = function (event) {
            this.configureVisibilityRules();

            if (!this.ready && event.detail.group === this.group) {
                this.ready = true;
                this.parent.classList.add('config-complete');

                this.configureInitialVisibility();
            }

        }

        oQuestion.prototype.configureInitialVisibility = function () {
            if (typeof this.properties.visible === "undefined") {
                this.liftCover();
            }

            if (typeof this.properties.visible === "object") {
                this.parent.classList.add('unavailable');

                // at this point we need to iterate and request question values
                this.visibilityRules.forEach(function (rule) {
                    for (var component in app.components) {
                        if (app.components[component].questionName === rule.question.toLowerCase()) {
                            app.components[component].broadcastChange();
                        }
                    }
                });

            }
        }

        oQuestion.prototype.configureVisibilityRules = function () {
            if (typeof this.properties.visible === "undefined") {
                return false;
            }

            this.visibilityRules = this.properties.visible;
        }

        oQuestion.prototype.receiveBroadcast = function (event) {

            // are there rules applicable to this question
            var applicableRules = false;

            // how many rules are there to process
            var requiredScore = this.visibilityRules.length;

            // number of rules that had their condition met
            var score = 0;

            // originating component data
            var broadcastingComponent = event.detail;

            // get context
            var self = this;

            // process visibility rules
            this.visibilityRules.forEach(function (rule) {
                var ruleQuestion = rule.question.toLowerCase();

                if (broadcastingComponent.questionName === ruleQuestion) {
                    applicableRules = true;

                    // incoming event matches a ruleset, begin processing
                    switch (rule.type) {
                        case 'min-value':
                            self.processVisibilityMinValue(rule, broadcastingComponent);
                            break;
                        case 'specific-option':
                            self.processVisibilitySpecificOption(rule, broadcastingComponent);
                            break;
                        case 'not-specific-option':
                            self.processVisibilityNotSpecificOption(rule, broadcastingComponent);
                            break;
                    }

                }
            });

            this.visibilityRules.forEach(function (rule) {
                if (rule.satisfied) {
                    score++;
                }
            });

            if (requiredScore === 0) {
                // the current question has no visibility rules
                this.makeAvailable();

            } else if (applicableRules && score >= requiredScore) {
                // the current question met its visibility criteria
                this.makeAvailable();

            } else if (applicableRules) {
                // the current question has visibility rules and failed the criteria
                this.makeUnavailable();
            }

        }

        oQuestion.prototype.processVisibilityMinValue = function (rule, broadcastingComponent) {

            var incomingValue = broadcastingComponent.element.value;

            rule.satisfied = Number(incomingValue) >= Number(rule.value);
        }

        oQuestion.prototype.processVisibilitySpecificOption = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.checkbox == "undefined") {
                return;
            }

            var incomingValue = broadcastingComponent.checkbox.value;
            var incomingChecked = broadcastingComponent.checkbox.checked;

            if (rule.value.toLowerCase() === incomingValue.toLowerCase()) {
                rule.satisfied = incomingChecked;
            }
        }

        oQuestion.prototype.processVisibilityNotSpecificOption = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.checkbox == "undefined") {
                return;
            }

            var incomingValue = broadcastingComponent.checkbox.value;
            var incomingChecked = broadcastingComponent.checkbox.checked;

            if (rule.value.toLowerCase() === incomingValue.toLowerCase()) {
                rule.satisfied = !incomingChecked;
            }
        }

        oQuestion.prototype.makeAvailable = function () {
            this.parent.classList.remove('unavailable');
            this.liftCover();
        }

        oQuestion.prototype.makeUnavailable = function () {
            this.cover();
            var clearEntries = new CustomEvent('clearEntries', {bubbles: true, detail: this});
            document.dispatchEvent(clearEntries);
            this.parent.classList.add('unavailable');
        }

        oQuestion.prototype.cover = function () {
            this.parent.classList.remove('cover-off');
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