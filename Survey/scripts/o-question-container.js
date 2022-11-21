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
            this.expandedVisibilityRule = '';
            this.ruleParsingComplete = false;
            this.sourceQuestions = [];

            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureInitialVisibility();
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
                    this.processVisibilityRulesFromExternalTrigger(event);
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
                this.ruleParsingComplete = true;
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
            ruleString = this.extractQuestionIdentifiers(ruleString);
            this.expandedVisibilityRule = ruleString;
            this.ruleParsingComplete = true;
        }

        oQuestionContainer.prototype.extractQuestionIdentifiers = function (ruleString) {
            var questionRe = /%%(\w+)%%/g;
            var questions = ruleString.match(questionRe);
            questions = uniq(questions);

            for (var i = 0; i < questions.length; i++) {
                var currentQuestionRe = new RegExp(questions[i], "g");
                var currentQuestion = this.escapeString(questions[i]);
                currentQuestion = currentQuestion.replace(questionRe, '_Q$1');
                this.sourceQuestions.push(currentQuestion);
                ruleString = ruleString.replace(currentQuestionRe, "%%" + currentQuestion + "%%");
            }

            return ruleString;
        }

        oQuestionContainer.prototype.replaceOperators = function (ruleString) {
            ruleString = ruleString.replace(/or/gi, '||');
            ruleString = ruleString.replace(/and/gi, '&&');
            var questionRe = /\s?(\w+)(\s?[=<>]+\s?)/;
            ruleString = ruleString.replace(questionRe, "%%$1%%$2")
            ruleString = ruleString.replace(/[^=<>]=[^=]/g, '===');

            return ruleString;
        }

        oQuestionContainer.prototype.escapeString = function (string) {
            string = string.replace('_', '__');
            return string;
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
            var contains = this.escapeString(matches[2]);
            contains = contains.split(',');
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
            var contains = this.escapeString(matches[2]);
            contains = contains.split(',');
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
            var contains = this.escapeString(matches[2]);
            contains = contains.split(',');
            expandedString += contains.join(' && !%%' + matches[1] + '%% === ');

            return expandedString;
        }

        oQuestionContainer.prototype.processVisibilityRulesFromExternalTrigger = function (event) {
            this.processVisibilityRules();
        }

        oQuestionContainer.prototype.processVisibilityRules = function () {
            if (!this.ruleParsingComplete) {
                this.parseVisibilityRules();
            }

            if (this.expandedVisibilityRule === '') {
                return;
            }

            this.debug('Processing visibility rules for ' + this.questionName, 3);
            this.debug(this.complexVisibilityRule, 3);
            var ruleString = this.getQuestionValues(this.expandedVisibilityRule);

            if (this.evaluateRule(ruleString)) {
                this.makeAvailable();
            } else {
                this.makeUnavailable();
            }
        }

        oQuestionContainer.prototype.evaluateRule = function (string) {
            string = string.toLowerCase();
            this.debug(string, 3);
            return (new Function('return (' + string + ')')());
        }

        oQuestionContainer.prototype.getQuestionValues = function (ruleString) {
            for (var i = 0; i < this.sourceQuestions.length; i++) {
                var allQuestionsRe = new RegExp("%%" + this.sourceQuestions[i] + "%%", "g");
                var currentQuestion = this.sourceQuestions[i];

                var questionElements = document.querySelectorAll("input[name*='" + currentQuestion + "']");
                var defaultValue = 'null';

                if (!questionElements.length) {
                    this.debug('Could not find a question required by a visibility rule: ' + currentQuestion, 2);
                } else {
                    for (var j = 0; j < questionElements.length; j++) {
                        var questionType = questionElements[j].type;
                        if ((questionType === 'checkbox' || questionType === 'radio') && !questionElements[j].checked) {
                            continue;
                        }

                        var questionValue = questionElements[j].value;
                        ruleString = ruleString.replace("%%" + this.sourceQuestions[i] + "%%", "'" + questionValue + "'");
                    }
                }

                // replace any remaining questions in the string with the default/not present value
                ruleString = ruleString.replace(allQuestionsRe, defaultValue);
            }

            return ruleString;
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
            if (!this.available) {
                return;
            }

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