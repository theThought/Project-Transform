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
            this.complexVisibilityRule = '';
            this.expandedVisibilityRule = '';
            this.ruleParsingComplete = false;

            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureInitialVisibility();
            this.processVisibilityRules();
            this.processAlternativeVisibilityRules();
            this.configurationComplete();
        }

        oQuestionContainer.prototype.configureIncomingEventListeners = function () {
            document.addEventListener("configComplete", this, false);
            document.addEventListener("broadcastChange", this, false);
        }

        oQuestionContainer.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'broadcastChange':
                    this.processAlternativeVisibilityRulesFromExternalTrigger(event);
                    this.processVisibilityRulesFromExternalTrigger(event);
                    this.processOptionVisibilityRulesFromExternalTrigger(event);
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
                this.makeAvailable();
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

        oQuestionContainer.prototype.processVisibilityRulesFromExternalTrigger = function (event) {
            if (this.element === event.detail.element) {
                return;
            }

            if (typeof this.properties.visible !== "undefined") {
                this.processVisibleRules();
            }

            if (typeof this.properties.invisible !== "undefined") {
                this.processInvisibleRules();
            }
        }

        oQuestionContainer.prototype.processVisibilityRules = function () {
            if (typeof this.properties.visible === "undefined"
                && typeof this.properties.invisible === "undefined") {
                this.ruleParsingComplete = true;
                return;
            }

            if (typeof this.properties.visible !== "undefined") {
                this.processVisibleRules();
                return;
            }

            this.processInvisibleRules();
        }

        oQuestionContainer.prototype.processVisibleRules = function () {

            if (!this.ruleParsingComplete) {
                this.complexVisibilityRule = this.properties.visible.rules;
                this.expandedVisibilityRule = this.parseVisibilityRules(this.complexVisibilityRule);
                this.ruleParsingComplete = true;
            }

            if (this.expandedVisibilityRule === '') {
                return;
            }

            this.debug('Processing visible rules for ' + this.questionName, 3);
            this.debug(this.complexVisibilityRule, 3);
            this.getQuestionValues();
            var ruleString = this.insertQuestionValuesIntoRule(this.expandedVisibilityRule);

            if (this.evaluateRule(ruleString)) {
                this.makeAvailable();
            } else {
                this.makeUnavailable();
            }
        }

        oQuestionContainer.prototype.processInvisibleRules = function () {

            if (!this.ruleParsingComplete) {
                this.complexVisibilityRule = this.properties.invisible.rules;
                this.expandedVisibilityRule = this.parseVisibilityRules(this.complexVisibilityRule);
                this.ruleParsingComplete = true;
            }

            if (this.expandedVisibilityRule === '') {
                return;
            }

            this.debug('Processing invisible rules for ' + this.questionName, 3);
            this.debug(this.complexVisibilityRule, 3);
            this.getQuestionValues();
            var ruleString = this.insertQuestionValuesIntoRule(this.expandedVisibilityRule);

            if (this.evaluateRule(ruleString)) {
                this.makeUnavailable();
            } else {
                this.makeAvailable();
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
                var ruleString = this.insertQuestionValuesIntoRule(this.properties.labels.alternatives[i].visible.parsedRule);
                this.debug(ruleString, 3);

                if (this.evaluateRule(ruleString)) {
                    this.makeAlternativeAvailable(this.properties.labels.alternatives[i].name);
                } else {
                    this.makeAlternativeUnavailable(this.properties.labels.alternatives[i].name);
                }
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