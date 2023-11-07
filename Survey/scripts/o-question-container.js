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

            this.element = document.querySelector('div[class~="o-question-container"][data-questionid="' + this.id + '"]');
        }

        oQuestionContainer.prototype = Object.create(oQuestion.prototype);
        oQuestionContainer.prototype.constructor = oQuestionContainer;

        oQuestionContainer.prototype.init = function () {
            this.collapse = false;

            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureInitialVisibility();
            this.processVisibilityRules();
            this.processAlternativeVisibilityRules();
            this.processResponseContainerDataTags();
            this.configurationComplete();
        }

        oQuestionContainer.prototype.configureIncomingEventListeners = function () {
            document.addEventListener("configComplete", this, false);
            document.addEventListener("broadcastChange", this, false);
            document.addEventListener("focusin", this, false);
        }

        oQuestionContainer.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'broadcastChange':
                    this.processAlternativeVisibilityRulesFromExternalTrigger(event);
                    this.processVisibilityRulesFromExternalTrigger(event);
                    this.processOptionVisibilityRulesFromExternalTrigger(event);
                    this.processFilter(event);
                    break;
                case 'focusin':
                    this.onFocusIn(event);
                    break;
                case "configComplete":
                    this.onConfigurationComplete(event);
                    break;
            }
        }

        oQuestionContainer.prototype.onFocusIn = function (event) {
            if (this.element.contains(event.target) || event.target === this.element) {
                this.element.classList.add('focused');
            } else {
                this.element.classList.remove('focused');
            }
        }

        oQuestionContainer.prototype.processResponseContainerDataTags = function () {
            var element = this.element.querySelector('.o-question-response');
            var attr;

            if (element === null) {
                return;
            }

            for (var i = 0; i < element.attributes.length; i++) {
                attr = element.attributes[i];

                if (/^data-/.test(attr.nodeName)) {
                    switch (attr.nodeName) {
                        case 'data-hidden':
                            // this.isHidden = true;
                            break;
                        case 'data-readonly':
                            this.setReadOnly(attr.value);
                            break;
                        case 'data-position':
                            this.setPosition(attr.value);
                            break;
                    }
                }
            }
        }

        oQuestionContainer.prototype.setReadOnly = function (state) {
            if (state !== 'true') {
                return;
            }

            var inputelements = this.element.querySelectorAll('input, textarea, select');

            for (var i = 0; i < inputelements.length; i++) {
                inputelements[i].readOnly = true;
                inputelements[i].setAttribute('data-readonly', 'true');
            }
        }

        oQuestionContainer.prototype.setPosition = function (position) {
            this.element.setAttribute('data-position', position);

            if (position === 'side') {
                this.relocateResponseBlock();
            }
        }

        oQuestionContainer.prototype.relocateResponseBlock = function () {
            var responseBlock = this.element.querySelector('.o-question-response');
            var previousResponseContainer = this.element.previousElementSibling;

            if (previousResponseContainer === null) {
                return;
            }

            var previousResponseBlock = previousResponseContainer.querySelector('.o-question-core');

            if (previousResponseBlock === null) {
                return;
            }

            previousResponseBlock.appendChild(responseBlock);
            this.element.style.display = 'none';
        }

        oQuestionContainer.prototype.onConfigurationComplete = function (event) {
            if (!this.ready && event.detail.group === this.group) {
                this.ready = true;
                this.element.classList.add('config-complete');
                this.isInitialising = false;
            }
        }

        oQuestionContainer.prototype.processAlternativeVisibilityRulesFromExternalTrigger = function (event) {
            if (this.element === event.detail.element) {
                return;
            }

            this.processAlternativeVisibilityRules();
        }

        oQuestionContainer.prototype.processAlternativeVisibilityRules = function () {
            if (!this.alternativeRuleParsingComplete) {
                this.parseAlternativeVisibilityRules();
            }

            if (!this.hasAlternativeVisibilityRules) {
                return;
            }

            this.debug('Processing alternative label rules for ' + this.questionName, 3);
            this.getQuestionValues();

            for (var i = 0; i < this.properties.labels.alternatives.length; i++) {
                var currentRuleset = this.properties.labels.alternatives[i];
                var ruleString = this.insertQuestionValuesIntoRule(currentRuleset.parsedRule);
                this.debug(currentRuleset.parsedRule, 3);

                if (typeof currentRuleset.visible !== "undefined") {
                    this.evaluateAlternativeVisibleRule(ruleString, currentRuleset.name)
                } else {
                    this.evaluateAlternativeInvisibleRule(ruleString, currentRuleset.name);
                }

            }
        }

        oQuestionContainer.prototype.evaluateAlternativeVisibleRule = function (rule, name) {

            if (this.evaluateRule(rule)) {
                this.makeAlternativeAvailable(name);
            } else {
                this.makeAlternativeUnavailable(name);
            }
        }

        oQuestionContainer.prototype.evaluateAlternativeInvisibleRule = function (rule, name) {

            if (this.evaluateRule(rule)) {
                this.makeAlternativeUnavailable(name);
            } else {
                this.makeAlternativeAvailable(name);
            }
        }

        oQuestionContainer.prototype.makeAlternativeAvailable = function (name) {
            var labelelement = this.element.querySelector('.o-question-information-content[name="' + name + '"]')
            this.element.querySelector('.o-question-information-content').appendChild(labelelement);
        }

        oQuestionContainer.prototype.makeAlternativeUnavailable = function (name) {
            var labelelement = this.element.querySelector('.o-question-information-content[name="' + name + '"]')
            this.element.querySelector('.o-question-alternatives').appendChild(labelelement);
        }

        oQuestionContainer.prototype.separator = function (val) {
            if (val === false) {
                this.element.classList.add('no-separator');
            }
        }

        return oQuestionContainer;

    });