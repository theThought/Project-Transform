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
            this.collapse = false;
            this.complexVisibilityRule = '';
            this.parsedVisibilityRule = '';
            this.sourceQuestions = [];

            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureInitialVisibility();
            this.parseVisibilityRules();
            this.processVisibilityRules();
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
                    this.debug('Calling process from broadcastChange');
                    this.processVisibilityRules();
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
            if (typeof this.properties.visible === "undefined") {
                this.liftCover();
                return;
            }

            // the collapse property removes the space required by the question if it is hidden
            if (this.properties.visible.collapse === true) {
                this.collapse = true;
                this.element.classList.add('collapse');
            }

            // this question has visibility rules so should begin in the hidden state
            this.element.classList.add('unavailable');
        }

        oQuestionContainer.prototype.parseVisibilityRules = function () {
            if (typeof this.properties.visible === "undefined") {
                return;
            }

            this.complexVisibilityRule = this.properties.visible.rules;
            var ruleString = this.complexVisibilityRule;
            // regular expression that searches for a string followed by an operator
            // operators are = < > <> .containsNone .containsNone .containsAll
            var questionRe = /\s?(\w+)(\.contains(?:None|Any|All)\((.*?)\)|\s?[=<>]\s?)/;
            var questions = ruleString.match(questionRe);

            if (questions === null) {
                this.debug('A visibility rule was found but did not identify any questions:', 2);
                this.debug(ruleString, 2);
                return;
            }

            ruleString = this.expandContainsAnyRule(ruleString);
            ruleString = this.expandContainsAllRule(ruleString);
            ruleString = this.expandContainsNoneRule(ruleString);
            ruleString = this.replaceOperators(ruleString);
            this.extractQuestionIdentifiers(ruleString);
            ruleString = this.getQuestionValues(ruleString);
            this.parsedVisibilityRule = ruleString;
        }

        oQuestionContainer.prototype.extractQuestionIdentifiers = function (ruleString) {
            var questionRe = /%%(\w+)%%/g;
            var questions = ruleString.match(questionRe);

            for (var i = 0; i < questions.length; i++) {
                var currentquestion = questions[i].replace('_', '__');
                currentquestion = currentquestion.replace(questionRe, '_Q$1');
                this.sourceQuestions.push(currentquestion);
            }
        }

        oQuestionContainer.prototype.getQuestionValues = function (ruleString) {
            var questionRe = /%%(\w+?)%%/g;

            for (var i = 0; i < this.sourceQuestions.length; i++) {
                var currentquestion = this.sourceQuestions[i];
                //currentquestion = currentquestion.replace('_', '__');
                currentquestion = currentquestion.replace(questionRe, '_Q$1');
                var questionelement = document.getElementsByName(currentquestion)[0];
                var questionvalue = 0;

                if (typeof questionelement === 'undefined') {
                    this.debug('Could not find a question required by a visibility rule:', 2);
                    this.debug(currentquestion, 2);
                } else {
                    questionvalue = questionelement.value;
                }

                ruleString = ruleString.replace(questionRe, "'" + questionvalue + "'");
            }

            return ruleString;
        }

        oQuestionContainer.prototype.replaceOperators = function (ruleString) {
            ruleString = ruleString.replace(/or/gi, '||');
            ruleString = ruleString.replace(/and/gi, '&&');
            ruleString = ruleString.replace(/[^=]=[^=]/g, '===');
            var questionRe = /\s?(\w+)(\s?[=<>]\s?)/;
            ruleString = ruleString.replace(questionRe, "%%$1%%$2")

            return ruleString;
        }

        oQuestionContainer.prototype.expandContainsAnyRule = function (ruleString) {
            if (ruleString.indexOf('containsAny') === -1) {
                return ruleString;
            }

            var re = /\s?(\w+)\.containsAny\((.*)\)/g;
            var matches;

            // match 0: full string
            // match 1: question
            // match 2: contains string
            matches = re.exec(ruleString);

            var expandedString = '%%' + matches[1] + '%% === ';
            var contains = matches[2].split(',');
            expandedString += contains.join(' || %%' + matches[1] + '%% === ');

            return '(' + expandedString + ')';
        }

        oQuestionContainer.prototype.expandContainsAllRule = function (ruleString) {
            if (ruleString.indexOf('containsAll') === -1) {
                return ruleString;
            }

            var re = /\s?(\w+)\.containsAll\((.*)\)/g;
            var matches;

            // match 0: full string
            // match 1: question
            // match 2: contains string
            matches = re.exec(ruleString);

            var expandedString = '%%' + matches[1] + '%% === ';
            var contains = matches[2].split(',');
            expandedString += contains.join(' && %%' + matches[1] + '%% === ');

            return '(' + expandedString + ')';
        }

        oQuestionContainer.prototype.expandContainsNoneRule = function (ruleString) {
            if (ruleString.indexOf('containsNone') === -1) {
                return ruleString;
            }

            var re = /\s?(\w+)\.containsNone\((.*)\)/g;
            var matches;

            // match 0: full string
            // match 1: question
            // match 2: contains string
            matches = re.exec(ruleString);

            var expandedString = '!%%' + matches[1] + '%% === ';
            var contains = matches[2].split(',');
            expandedString += contains.join(' && !%%' + matches[1] + '%% === ');

            return expandedString;
        }

        oQuestionContainer.prototype.processVisibilityRules = function () {
            if (this.parsedVisibilityRule === '') {
                return;
            }

            var func = function (string) {
                return (new Function('return (' + string + ')')());
            }

            this.debug(this.complexVisibilityRule, 3);
            this.debug(this.parsedVisibilityRule, 3);
            var rule = func(this.parsedVisibilityRule);
            this.debug(rule, 3);
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