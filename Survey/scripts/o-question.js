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
            this.element = document.querySelector('div[data-questiongroup*="' + this.group + '"]');
            this.parent = this.element.closest('div.o-question-container');
            this.collapse = true;
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
            if (this.parent === null) {
                return;
            }

            this.configureVisibilityRules();

            if (!this.ready && event.detail.group === this.group) {
                this.ready = true;
                this.parent.classList.add('config-complete');

                this.configureInitialVisibility();
            }

        }

        oQuestion.prototype.configureInitialVisibility = function () {

            // if there are no visibility rules defined for this question lift the cover immediately
            if (typeof this.properties.visible === "undefined") {
                this.liftCover();
            }

            // proceed if we have found a visibility ruleset for this question
            if (typeof this.properties.visible === "object") {
                this.parent.classList.add('unavailable'); // initial visibility is hidden

                if (this.collapse) {
                    this.parent.classList.add('collapse');
                }

                // at this point we need to iterate each rule and request relevant question values
                // we do this by telling the contributing question to broadcast its current value
                // TODO: Replace this with iteration of the event log to get logged values
                this.visibilityRules.forEach(function (rule) {
                    for (var component in app.components) {
                        if (app.components[component].questionName === rule.question.replace(/_/g, "__").toLowerCase()) {
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

            if (this.properties.visible.collapse === false) {
                this.collapse = false;
            }

            this.visibilityRules = this.properties.visible.rules;
        }

        oQuestion.prototype.receiveBroadcast = function (event) {

            // how many rules are there to process
            var requiredScore = this.visibilityRules.length;

            // in the case that there are no rules to be processed and the question
            // is already visible there is nothing to do
            if (requiredScore === 0 && this.available) {
                return;
            }

            // are there rules applicable to this question
            var applicableRules = false;

            // number of rules that have had their condition met
            var score = 0;

            // originating component data
            var broadcastingComponent = event.detail;

            // get context
            var self = this;

            // process visibility rules
            this.visibilityRules.forEach(function (rule) {
                var ruleQuestion = rule.question.toLowerCase().replace(/_/g, "__");

                if (broadcastingComponent.questionName === ruleQuestion) {
                    applicableRules = true;

                    // incoming event matches a ruleset, begin processing
                    switch (rule.type) {
                        case 'min-value':
                            self.processVisibilityMinValue(rule, broadcastingComponent);
                            break;
                        case 'max-value':
                            self.processVisibilityMaxValue(rule, broadcastingComponent);
                            break;
                        case 'not-value':
                            self.processVisibilityNotValue(rule, broadcastingComponent);
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
            if (typeof broadcastingComponent.element.value !== 'undefined') {
                var incomingValue = broadcastingComponent.element.value;
                rule.satisfied = Number(incomingValue) >= Number(rule.value);
            }
        }

        oQuestion.prototype.processVisibilityMaxValue = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.element.value !== 'undefined') {
                var incomingValue = broadcastingComponent.element.value;
                rule.satisfied = Number(incomingValue) <= Number(rule.value);
            }
        }

        oQuestion.prototype.processVisibilityNotValue = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.element.value !== 'undefined') {
                var incomingValue = broadcastingComponent.element.value;
                rule.satisfied = Number(incomingValue) !== Number(rule.value);
            }
        }

        oQuestion.prototype.processVisibilitySpecificOption = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.checkbox == "undefined") {
                return;
            }

            var incomingValue = broadcastingComponent.checkbox.value;
            var incomingChecked = broadcastingComponent.checkbox.checked;

            if (rule.value.toLowerCase().replace(/_/g, "__") === incomingValue.toLowerCase()) {
                rule.satisfied = incomingChecked;
            }
        }

        oQuestion.prototype.processVisibilityNotSpecificOption = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.checkbox == "undefined") {
                return;
            }

            var incomingValue = broadcastingComponent.checkbox.value;
            var incomingChecked = broadcastingComponent.checkbox.checked;

            if (rule.value.toLowerCase().replace(/_/g, "__") === incomingValue.toLowerCase()) {
                rule.satisfied = !incomingChecked;
            }
        }

        oQuestion.prototype.makeAvailable = function () {
            if (this.parent === null || this.available) {
                return;
            }

            this.available = true;
            this.parent.classList.remove('unavailable');
            this.requestInitialSize();
            this.liftCover();
        }

        oQuestion.prototype.makeUnavailable = function () {
            this.available = false;
            this.cover();
            //var clearEntries = new CustomEvent('clearEntries', {bubbles: true, detail: this});
            //document.dispatchEvent(clearEntries);
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
