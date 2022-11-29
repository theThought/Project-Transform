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
            this.optionRuleParsingComplete = false;
            this.sourceQuestions = {};

            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureInitialVisibility();
            this.processVisibilityRules();
            this.processOptionVisibilityRules();
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

        oQuestionContainer.prototype.parseVisibilityRules = function (ruleString) {
            // regular expression that searches for a string followed by an operator
            // operators are = < > <> .containsNone .containsNone .containsAll
            var questionRe = /\s?(\w+)(\.contains(?:None|Any|All)\((.*?)\)|\s?[=<>]|\s?%gt%|\s?%lt%)/;
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
            this.ruleParsingComplete = true;

            return ruleString;
        }

        oQuestionContainer.prototype.extractQuestionIdentifiers = function (ruleString) {
            var questionRe = /%%(\w+)%%/g;
            var questions = ruleString.match(questionRe);
            questions = uniq(questions);

            for (var i = 0; i < questions.length; i++) {
                var currentQuestionRe = new RegExp(questions[i], "g");
                var currentQuestion = questions[i];
                currentQuestion = currentQuestion.replace(questionRe, '_Q$1');
                this.sourceQuestions[currentQuestion] = [];
                ruleString = ruleString.replace(currentQuestionRe, "%%" + currentQuestion + "%%");
            }

            return ruleString;
        }

        oQuestionContainer.prototype.replaceOperators = function (ruleString) {
            ruleString = ruleString.replace(/or/gi, '||');
            ruleString = ruleString.replace(/and/gi, '&&');
            ruleString = ruleString.replace(/%gt%/g, '>');
            ruleString = ruleString.replace(/%lt%/g, '<');
            var questionRe = /\s?(\w+)(\s?[=<>]+\s?)/;
            ruleString = ruleString.replace(questionRe, " %%$1%% $2 ");
            ruleString = ruleString.replace(/[^=!<>]=[^=]/g, '==');

            return ruleString;
        }

        oQuestionContainer.prototype.escapeString = function (string) {
            string = string.replace(/_([^Q])/g, '__$1');
            return string;
        }

        oQuestionContainer.prototype.expandContainsAnyRule = function (ruleString) {
            if (ruleString.indexOf('containsAny') === -1) {
                return ruleString;
            }

            var re = /\s?(\w+)\.containsAny\((.*?)\)/ig;
            var matches;

            // match 0: full string
            // match 1: question
            // match 2: contains string
            while (null !== (matches = re.exec(ruleString))) {
                var expandedString = '[' + this.escapeString(matches[2]).toLowerCase() + '].some(function (val) {return [%%' + this.escapeString(matches[1]) + '%%].indexOf(val) >= 0})';
                expandedString = '(' + expandedString + ')';

                ruleString = ruleString.replace(matches[0], expandedString);
            }


            return ruleString;
        }

        oQuestionContainer.prototype.expandContainsAllRule = function (ruleString) {
            if (ruleString.indexOf('containsAll') === -1) {
                return ruleString;
            }

            var re = /\s?(\w+)\.containsAll\((.*?)\)/ig;
            var matches;

            // match 0: full string
            // match 1: question
            // match 2: contains string
            while (null !== (matches = re.exec(ruleString))) {
                var expandedString = '[' + this.escapeString(matches[2]).toLowerCase() + '].every(function (val) {return [%%' + this.escapeString(matches[1]) + '%%].indexOf(val) >= 0})';
                expandedString = '(' + expandedString + ')';

                ruleString = ruleString.replace(matches[0], expandedString);
            }


            return ruleString;
        }

        oQuestionContainer.prototype.expandContainsNoneRule = function (ruleString) {
            if (ruleString.indexOf('containsNone') === -1) {
                return ruleString;
            }

            var re = /\s?(\w+)\.containsNone\((.*?)\)/ig;
            var matches;

            // match 0: full string
            // match 1: question
            // match 2: contains string
            while (null !== (matches = re.exec(ruleString))) {
                var expandedString = '[' + this.escapeString(matches[2]).toLowerCase() + '].every(function (val) {return [%%' + this.escapeString(matches[1]) + '%%].indexOf(val) == -1})';
                expandedString = '(' + expandedString + ')';

                ruleString = ruleString.replace(matches[0], expandedString);
            }

            return ruleString;
        }

        oQuestionContainer.prototype.processVisibilityRulesFromExternalTrigger = function (event) {
            this.processVisibilityRules();
        }

        oQuestionContainer.prototype.processVisibilityRules = function () {
            if (typeof this.properties.visible === "undefined") {
                this.ruleParsingComplete = true;
                return;
            }

            if (!this.ruleParsingComplete) {
                this.complexVisibilityRule = this.properties.visible.rules;
                this.expandedVisibilityRule = this.parseVisibilityRules(this.complexVisibilityRule);
            }

            if (this.expandedVisibilityRule === '') {
                return;
            }

            this.debug('Processing visibility rules for ' + this.questionName, 3);
            this.debug(this.complexVisibilityRule, 3);
            this.getQuestionValues();
            var ruleString = this.insertQuestionValuesIntoRule(this.expandedVisibilityRule);

            if (this.evaluateRule(ruleString)) {
                this.makeAvailable();
            } else {
                this.makeUnavailable();
            }
        }

        oQuestionContainer.prototype.processOptionVisibilityRules = function () {
            if (!this.optionRuleParsingComplete) {
                this.parseOptionVisibilityRules();
            }
        }

        oQuestionContainer.prototype.parseOptionVisibilityRules = function () {
            if (typeof this.properties.options === "undefined") {
                this.optionRuleParsingComplete = true;
                return;
            }

            for (var i = 0; i < this.properties.options.length; i++) {
                var ruleString = this.properties.options[i].invisibility.rules;
                this.properties.options[i].invisibility.parsedRule = this.parseVisibilityRules(ruleString);
            }
        }

        oQuestionContainer.prototype.insertQuestionValuesIntoRule = function (ruleString) {
            for (var currentQuestion in this.sourceQuestions) {
                if (this.sourceQuestions.hasOwnProperty(currentQuestion)) {
                    var questionData = this.sourceQuestions[currentQuestion].join("','");
                }
                var allQuestionsRe = new RegExp("%%" + currentQuestion + "%%", "g");
                ruleString = ruleString.replace(allQuestionsRe, "'" + questionData + "'");
            }

            return ruleString;
        }

        oQuestionContainer.prototype.evaluateRule = function (string) {
            // replace any remaining question placeholders with null --
            // a final safety net that should ultimately be unnecessary
            string = string.replace(/%%(\w+)%%/g, 'null');

            this.debug(string, 3);

            return (new Function('return (' + string + ')')());
        }

        oQuestionContainer.prototype.getQuestionValues = function () {
            for (var currentQuestion in this.sourceQuestions) {
                if (this.sourceQuestions.hasOwnProperty(currentQuestion)) {
                    this.sourceQuestions[currentQuestion] = [];
                    var allQuestionsRe = new RegExp("%%" + currentQuestion + "%%", "g");
                    var questionElements = document.querySelectorAll("input[name*='" + currentQuestion + "']");

                    if (!questionElements.length) {
                        this.debug('Could not find a question required by a visibility rule: ' + currentQuestion, 2);
                    } else {
                        var questionSubstitutionString = "";

                        for (var j = 0; j < questionElements.length; j++) {
                            // determine the input type - required for handling unselected checkboxes/radio buttons
                            var questionType = questionElements[j].type;

                            if ((questionType === 'checkbox' || questionType === 'radio') && !questionElements[j].checked) {
                                continue;
                            }

                            var questionValue = questionElements[j].value.toLowerCase();
                            this.sourceQuestions[currentQuestion].push(questionValue);
                        }
                        this.sourceQuestions[currentQuestion] = uniq(this.sourceQuestions[currentQuestion]);
                    }
                }
            }
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