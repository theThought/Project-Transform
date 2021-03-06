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

            this.element = document.querySelector('div[class~="o-question-container"][data-questiongroup="' + this.group + '"]');

            this.configureProperties();
            this.configureVisibilityRules();
            this.configureInitialVisibility();
            this.configureIncomingEventListeners();
            this.configurationComplete();
        }

        oQuestionContainer.prototype = Object.create(oQuestion.prototype);
        oQuestionContainer.prototype.constructor = oQuestionContainer;

        oQuestionContainer.prototype.configureIncomingEventListeners = function () {
            document.addEventListener("configComplete", this, false);
            document.addEventListener("broadcastChange", this, false);
        }

        oQuestionContainer.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'broadcastChange':
                    this.processVisibilityRules(event);
                    break;
                case "configComplete":
                    this.onConfigurationComplete(event);
                    break;
            }
        }

        oQuestion.prototype.onConfigurationComplete = function (event) {

            if (!this.ready && event.detail.group === this.group) {
                this.ready = true;
                this.element.classList.add('config-complete');
            }

        }

        oQuestion.prototype.configureInitialVisibility = function () {

            // if there are no visibility rules defined for this question lift the cover immediately
            if (typeof this.properties.visible === "undefined") {
                this.liftCover();
            }

            // proceed if we have found a visibility ruleset for this question
            if (typeof this.properties.visible === "object") {
                this.element.classList.add('unavailable'); // initial visibility is hidden

                if (this.collapse) {
                    this.element.classList.add('collapse');
                }

                // at this point we need to iterate each rule and request relevant question values
                // we do this by telling the contributing question to broadcast its current value
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

        oQuestion.prototype.processVisibilityRules = function (event) {

            // get data from the component that broadcast the state
            // change event and started this process
            var broadcastingComponent = event.detail;

            // do not try and process visibility rules when the
            // current component is the originating component
            if (broadcastingComponent.id.indexOf(this.id) === 0) {
                return;
            }

            // the required visibility score is equal to the number
            // of rules to be processed, as they are 'AND' rules
            var requiredScore = this.visibilityRules.length;
            var currentScore = 0;

            // if there are no rules to be processed and the
            // question is already visible, there is nothing to do
            if (requiredScore === 0 && this.available) {
                return;
            }

            // if there are no rules to be processed and the
            // question is not visible, make it visible
            if (requiredScore === 0 && !this.available) {
                this.makeAvailable();
                return;
            }

            // get context
            var self = this;

            // iterate and process the visibility rules
            this.visibilityRules.forEach(function (rule) {
                var ruleQuestion = rule.question.toLowerCase().replace(/_/g, "__");

                if (broadcastingComponent.questionName === ruleQuestion) {

                    if (rule.type === 'specific-option'
                        && typeof broadcastingComponent.checkbox !== "undefined"
                        && broadcastingComponent.checkbox.value.toLowerCase() !== rule.value.toLowerCase().replace(/_/g, "__")) {
                        return;
                    }

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
                        case 'specific-list':
                            self.processVisibilitySpecificList(rule, broadcastingComponent);
                            break;
                    }

                }
            });

            this.visibilityRules.forEach(function (rule) {
                if (rule.satisfied) {
                    currentScore++;
                }
            });

            if (currentScore >= requiredScore) {
                // the current question met its visibility criteria
                this.makeAvailable();

            } else if (this.available) {
                // the current question has visibility rules and failed the criteria
                this.makeUnavailable();
            }

        }

        oQuestion.prototype.processVisibilityMinValue = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.element.value === 'undefined') {
                return;
            }

            var incomingValue = broadcastingComponent.element.value;
            rule.satisfied = Number(incomingValue) >= Number(rule.value);
        }

        oQuestion.prototype.processVisibilityMaxValue = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.element.value === 'undefined') {
                return;
            }

            var incomingValue = broadcastingComponent.element.value;

            // treat blank entries as a 0
            if (incomingValue === '') {
                incomingValue = 0;
            }

            rule.satisfied = Number(incomingValue) <= Number(rule.value);
        }

        oQuestion.prototype.processVisibilityNotValue = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.element.value === 'undefined') {
                return;
            }

            var incomingValue = broadcastingComponent.element.value;
            rule.satisfied = Number(incomingValue) !== Number(rule.value);
        }

        oQuestion.prototype.processVisibilitySpecificOption = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.checkbox === "undefined") {
                return;
            }

            var incomingValue = broadcastingComponent.checkbox.value;
            var incomingChecked = broadcastingComponent.checkbox.checked;

            if (rule.value.toLowerCase().replace(/_/g, "__") === incomingValue.toLowerCase()) {
                rule.satisfied = incomingChecked;
            }
        }

        oQuestion.prototype.processVisibilityNotSpecificOption = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.checkbox === "undefined") {
                return;
            }

            var incomingValue = broadcastingComponent.checkbox.value;
            var incomingChecked = broadcastingComponent.checkbox.checked;

            if (rule.value.toLowerCase().replace(/_/g, "__") === incomingValue.toLowerCase()) {
                rule.satisfied = !incomingChecked;
            }
        }

        oQuestion.prototype.processVisibilitySpecificList = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.checkbox === 'undefined') {
                return;
            }

            if (!Array.isArray(rule.value)) {
                return;
            }

            var requiredScore = 1; // for future consideration where we may require 2 out of 3 options, &c.
            var currentScore = 0;
            var incomingValue = broadcastingComponent.checkbox.value;
            var incomingChecked = broadcastingComponent.checkbox.checked;

            if (typeof rule.valuessatisfied === "undefined") {
                rule.valuessatisfied = [];
            }

            rule.value.forEach(function (item) {
                if (incomingValue.toLowerCase() === item.toLowerCase().replace(/_/g, "__")) {
                    if (incomingChecked) {
                        if (rule.valuessatisfied.indexOf(incomingValue) === -1) {
                            rule.valuessatisfied.push(incomingValue);
                        }
                    } else {
                        var index = rule.valuessatisfied.indexOf(incomingValue);
                        if (index !== -1) {
                            rule.valuessatisfied.splice(index, 1);
                        }
                    }
                }
            });

            currentScore = rule.valuessatisfied.length;
            rule.satisfied = currentScore >= requiredScore;
        }

        oQuestion.prototype.makeAvailable = function () {
            if (this.container === null || this.available) {
                return;
            }

            this.available = true;
            this.element.classList.remove('unavailable');
            this.requestInitialSize();
            this.liftCover();
        }

        oQuestion.prototype.makeUnavailable = function () {
            this.available = false;
            this.cover();
            var clearEntries = new CustomEvent('clearEntries', {bubbles: true, detail: this});
            document.dispatchEvent(clearEntries);
            this.element.classList.add('unavailable');
        }

        oQuestion.prototype.cover = function () {
            this.element.classList.remove('cover-off');
        }

        oQuestion.prototype.liftCover = function () {
            this.element.classList.add('cover-off');
        }

        oQuestion.prototype.separator = function (val) {
            if (val === false) {
                this.element.classList.add('no-separator');
            }
        }


        return oQuestionContainer;

    });