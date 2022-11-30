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
            this.sourceQuestions = {};
            this.optionRuleParsingComplete = false;

            this.container = this.getContainer();
            this.element = document.querySelector('div[class*="o-question-"][data-questiongroup*="' + this.group + '"]');

            this.processOptionVisibilityRules();
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

        oQuestion.prototype.evaluateRule = function (string) {
            // replace any remaining question placeholders with null --
            // a final safety net that should ultimately be unnecessary
            string = string.replace(/%%(\w+)%%/g, 'null');

            this.debug(string, 3);

            return (new Function('return (' + string + ')')());
        }

        oQuestion.prototype.processOptionVisibilityRules = function () {
            if (!this.optionRuleParsingComplete) {
                this.parseOptionVisibilityRules();
            }
        }

        oQuestion.prototype.getQuestionValues = function () {
            for (var currentQuestion in this.sourceQuestions) {
                if (this.sourceQuestions.hasOwnProperty(currentQuestion)) {
                    this.sourceQuestions[currentQuestion] = [];
                    var questionElements = document.querySelectorAll("input[name*='" + currentQuestion + "']");

                    if (!questionElements.length) {
                        this.debug('Could not find a question required by a visibility rule: ' + currentQuestion, 2);
                    } else {
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

        oQuestion.prototype.insertQuestionValuesIntoRule = function (ruleString) {
            for (var currentQuestion in this.sourceQuestions) {
                if (this.sourceQuestions.hasOwnProperty(currentQuestion)) {
                    var questionData = this.sourceQuestions[currentQuestion].join("','");
                }

                var allQuestionsRe = new RegExp("%%" + currentQuestion + "%%", "g");
                ruleString = ruleString.replace(allQuestionsRe, "'" + questionData + "'");
            }

            return ruleString;
        }

        oQuestion.prototype.parseOptionVisibilityRules = function () {
            if (typeof this.properties.options === "undefined") {
                this.optionRuleParsingComplete = true;
                return;
            }

            for (var i = 0; i < this.properties.options.length; i++) {
                var ruleString = this.properties.options[i].invisibility.rules;
                this.properties.options[i].invisibility.parsedRule = this.parseVisibilityRules(ruleString);
            }
        }
        
        oQuestion.prototype.parseVisibilityRules = function (ruleString) {
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

        oQuestion.prototype.extractQuestionIdentifiers = function (ruleString) {
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

        oQuestion.prototype.replaceOperators = function (ruleString) {
            var questionRe = /\s?(\w+)(\s?[=<>]+\s?)/;

            ruleString = ruleString.replace(/or/gi, '||');
            ruleString = ruleString.replace(/and/gi, '&&');
            ruleString = ruleString.replace(/%gt%/g, '>');
            ruleString = ruleString.replace(/%lt%/g, '<');
            ruleString = ruleString.replace(questionRe, " %%$1%% $2 ");
            ruleString = ruleString.replace(/[^=!<>]=[^=]/g, '==');

            return ruleString;
        }

        oQuestion.prototype.escapeString = function (string) {
            string = string.replace(/_([^Q])/g, '__$1');
            return string;
        }

        oQuestion.prototype.expandContainsAnyRule = function (ruleString) {
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

        oQuestion.prototype.expandContainsAllRule = function (ruleString) {
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

        oQuestion.prototype.expandContainsNoneRule = function (ruleString) {
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

        return oQuestion;

    });
