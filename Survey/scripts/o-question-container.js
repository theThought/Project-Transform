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
            this.complexVisibilityRule = '';

            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureVisibilityRules();
            this.configureInitialVisibility();
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

        oQuestionContainer.prototype.onConfigurationComplete = function (event) {

            if (!this.ready && event.detail.group === this.group) {
                this.ready = true;
                this.element.classList.add('config-complete');
            }

        }

        oQuestionContainer.prototype.configureInitialVisibility = function () {

            // if there are no visibility rules defined for this question lift the cover immediately
            if (typeof this.properties.visible === "undefined"
                && typeof this.properties.complexVisibility === "undefined") {
                this.liftCover();
            }

            // proceed if we have found a visibility ruleset for this question
            // this can either be an old-style ruleset or a complex rule string
            if (typeof this.properties.visible === "object") {
                this.element.classList.add('unavailable'); // initial visibility is hidden

                if (this.collapse) {
                    this.element.classList.add('collapse');
                }

                // at this point we need to iterate each rule and request relevant question values
                // we do this by telling the contributing question to broadcast its current value
                this.requestComponentValues();
            }
        }

        oQuestionContainer.prototype.requestComponentValues = function () {
            this.visibilityRules.forEach(function (rule) {
                for (var component in app.components) {
                    var groupname = app.components[component].group.toLowerCase();
                    var questionrulename = rule.question.replace(/(\w)_([^qQ])/g, "$1__$2").toLowerCase();
                    if (groupname.indexOf(questionrulename) !== -1) {
                        app.components[component].broadcastChange();
                    }
                }
            });
        }

        oQuestionContainer.prototype.configureVisibilityRules = function () {
            if (typeof this.properties.visible === "undefined") {
                return false;
            }

            if (this.properties.visible.collapse === false) {
                this.collapse = false;
            }

            // if a complex visibility rules exists any old-style rules
            // will not be added to the container for processing
            if (this.properties.visible.complexrule !== undefined) {
                this.parseComplexVisibilityRule(this.properties.visible.complexrule);
            } else {
                this.visibilityRules = this.properties.visible.rules;
            }
        }

        oQuestionContainer.prototype.parseComplexVisibilityRule = function (ruleString) {
            // regular expression that searches for a string followed by an operator
            // operators are = < > <> .containsAny .containsNone .containsAll
            var questionRe = /\s?(\w+)(\.containsAny|\.containsAll|\.containsNone|\s?[=<>]\s?)/;
            var questions = ruleString.match(/%(.*?)%/g);

            if (questions === null) {
                console.warn('A complex visibility rule was found but did not identify any questions:');
                console.warn(ruleString);
                return;
            }

            ruleString = this.expandContainsAnyRule(ruleString);
            ruleString = this.expandContainsAllRule(ruleString);
            ruleString = this.expandContainsNoneRule(ruleString);
            ruleString = this.getQuestionValues(ruleString);
            ruleString = this.replaceOperators(ruleString);

            console.info(ruleString);

            var func = function (string) {
                return (new Function('return (' + string + ')')());
            }

            this.complexVisibilityRule = func(ruleString);
            console.log(this.complexVisibilityRule);
        }

        oQuestionContainer.prototype.getQuestionValues = function (ruleString) {

            var questionRe = /\s?(\w+?)\./;
            var questions = ruleString.match(/%(.*?)%/g);

            for (var i = 0; i < questions.length; i++) {
                var currentquestion = questions[i];
                currentquestion = currentquestion.replace('_', '__');
                currentquestion = currentquestion.replace(questionRe, '_Q$1');
                var questionelement = document.getElementsByName(currentquestion)[0];
                var questionvalue = 0;

                if (typeof questionelement === 'undefined') {
                    console.warn('Could not find a question required by a visibility rule:');
                    console.warn(currentquestion);
                } else {
                    questionvalue = questionelement.value;
                }

                ruleString = ruleString.replace(/%(.*?)%/, '"' + questionvalue + '"');
            }

            return ruleString;
        }

        oQuestionContainer.prototype.replaceOperators = function (ruleString) {
            ruleString = ruleString.replace(/or/gi, '||');
            ruleString = ruleString.replace(/and/gi, '&&');
            ruleString = ruleString.replace(/=/g, '===');

            return ruleString;
        }

        oQuestionContainer.prototype.expandContainsAnyRule = function (ruleString) {
            if (ruleString.indexOf('containsAny') === -1) {
                return ruleString;
            }

            var expandedString = '';
            var re = /%(.*?)%(\s+containsAny\((.*?)\))?/g;
            var rules = ruleString.match(re);
            // match 0: full string
            // match 1: question
            // match 2: contains string

            var contains = rules[2].split(',');
            contains.forEach(function (item) {
                expandedString += rules[1] + ' === ' + item + ' || ';
            });

            return expandedString;
        }

        oQuestionContainer.prototype.expandContainsAllRule = function (ruleString) {
            if (ruleString.indexOf('containsAll') === -1) {
                return ruleString;
            }
        }

        oQuestionContainer.prototype.expandContainsNoneRule = function (ruleString) {
            if (ruleString.indexOf('containsNone') === -1) {
                return ruleString;
            }
        }

        oQuestionContainer.prototype.processVisibilityRules = function (event) {

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
                var ruleQuestion = rule.question.toLowerCase().replace(/(\w)_([^qQ])/g, "$1__$2");
                var broadcastingComponentName = broadcastingComponent.group.toLowerCase().replace(/(\w)_([^qQ])/g, "$1_$2");

                if (broadcastingComponentName.indexOf(ruleQuestion) !== -1) {

                    if (rule.type === 'specific-option'
                        && typeof broadcastingComponent.checkbox !== "undefined"
                        && broadcastingComponent.checkbox.value.toLowerCase() !== rule.value.toLowerCase().replace(/(\w)_([^qQ])/g, "$1__$2")) {
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

        oQuestionContainer.prototype.processVisibilityMinValue = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.element.value === 'undefined') {
                return;
            }

            var incomingValue = broadcastingComponent.element.value;
            rule.satisfied = Number(incomingValue) >= Number(rule.value);
        }

        oQuestionContainer.prototype.processVisibilityMaxValue = function (rule, broadcastingComponent) {
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

        oQuestionContainer.prototype.processVisibilityNotValue = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.element.value === 'undefined') {
                return;
            }

            var incomingValue = broadcastingComponent.element.value;
            rule.satisfied = Number(incomingValue) !== Number(rule.value);
        }

        oQuestionContainer.prototype.processVisibilitySpecificOption = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.checkbox === "undefined") {
                return;
            }

            var incomingValue = broadcastingComponent.checkbox.value;
            var incomingChecked = broadcastingComponent.checkbox.checked;

            if (rule.value.toLowerCase().replace(/(\w)_([^qQ])/g, "$1__$2") === incomingValue.toLowerCase()) {
                rule.satisfied = incomingChecked;
            }
        }

        oQuestionContainer.prototype.processVisibilityNotSpecificOption = function (rule, broadcastingComponent) {
            if (typeof broadcastingComponent.checkbox === "undefined") {
                return;
            }

            var incomingValue = broadcastingComponent.checkbox.value;
            var incomingChecked = broadcastingComponent.checkbox.checked;

            if (rule.value.toLowerCase().replace(/(\w)_([^qQ])/g, "$1__$2") === incomingValue.toLowerCase()) {
                rule.satisfied = !incomingChecked;
            }
        }

        oQuestionContainer.prototype.processVisibilitySpecificList = function (rule, broadcastingComponent) {
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
                if (incomingValue.toLowerCase() === item.toLowerCase().replace(/(\w)_([^qQ])/g, "$1__$2")) {
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

        oQuestionContainer.prototype.makeAvailable = function () {
            if (this.container === null || this.available) {
                return;
            }

            this.available = true;
            this.element.classList.remove('unavailable');
            this.requestInitialSize();
            this.liftCover();
        }

        oQuestionContainer.prototype.makeUnavailable = function () {
            this.available = false;
            this.cover();
            var clearEntries = new CustomEvent('clearEntries', {bubbles: true, detail: this});
            document.dispatchEvent(clearEntries);
            this.element.classList.add('unavailable');
        }

        oQuestionContainer.prototype.cover = function () {
            this.element.classList.remove('cover-off');
        }

        oQuestionContainer.prototype.liftCover = function () {
            this.element.classList.add('cover-off');
        }

        oQuestionContainer.prototype.separator = function (val) {
            if (val === false) {
                this.element.classList.add('no-separator');
            }
        }


        return oQuestionContainer;

    });