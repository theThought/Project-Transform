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
            this.layouttype = '';
        }

        oQuestionContainer.prototype = Object.create(oQuestion.prototype);
        oQuestionContainer.prototype.constructor = oQuestionContainer;

        oQuestionContainer.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.setLayoutType();
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
                    if (!this.isInitialising && !event.detail.isInitialising) {
                        this.updateAnswerCount(event);
                        this.processAlternativeVisibilityRulesFromExternalTrigger(event);
                        this.processVisibilityRulesFromExternalTrigger(event);
                        this.processOptionVisibilityRulesFromExternalTrigger(event);
                        this.processFilter(event);
                    }
                    break;
                case 'focusin':
                    this.onFocusIn(event);
                    break;
                case "configComplete":
                    this.onConfigurationComplete(event);
                    break;
            }
        }

        oQuestionContainer.prototype.setLayoutType = function () {
            this.layouttype = this.element.classList.contains('sidebyside') ? 'horizontal' : 'vertical';
        }

        oQuestionContainer.prototype.messageinformation = function (prop) {
            if (typeof prop.widthinpercentage !== "undefined") {
                this.setMessageInformationWidth(prop.widthinpercentage);
            }

            if (typeof prop.popover !== "undefined") {
                this.setMessagePopoverType(prop.popover);
            }
        }

        oQuestionContainer.prototype.setMessageInformationWidth = function (prop) {
            var message = this.element.querySelector('.o-message-information');
            message.classList.add('width-' + prop);
        }

        oQuestionContainer.prototype.setMessagePopoverType = function (prop) {
            var message = this.element.querySelector('.o-message-information');

            if (prop) {
                message.classList.add('style-popover');
            } else {
                message.classList.add('style-inline');
            }
        }

        oQuestionContainer.prototype.onFocusIn = function (event) {
            if (this.element) {
                if (this.element.contains(event.target) || event.target === this.element) {
                    this.element.classList.add('focused');
                } else {
                    this.element.classList.remove('focused');
                }
            }
        }

        oQuestionContainer.prototype.processResponseContainerDataTags = function () {
            var element = this.element.querySelector('question .o-question-response');
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
            var responseBlock = this.element.querySelector('question');
            var previousResponseContainer = this.element.previousElementSibling;

            if (previousResponseContainer === null) {
                return;
            }

            var previousResponseBlock = previousResponseContainer.querySelector('.o-question-core questions');

            if (previousResponseBlock === null) {
                return;
            }

            previousResponseBlock.setAttribute('data-position', 'side');
            previousResponseBlock.appendChild(responseBlock);
            this.element.style.display = 'none';
        }

        oQuestionContainer.prototype.onConfigurationComplete = function (event) {
            if (!this.ready && event.detail.group === this.group) {
                this.ready = true;
                if (this.element) {
                    this.element.classList.add('config-complete');
                }
                this.isInitialising = false;
            }
        }

        oQuestionContainer.prototype.processAlternativeVisibilityRulesFromExternalTrigger = function (event) {
            if (this.isInitialising || event.detail.isInitialising) {
                return;
            }

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
