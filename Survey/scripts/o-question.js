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
            this.isFiltered = false;
            this.isReadOnly = false;
            this.optionRuleParsingComplete = false;
            this.alternativeRuleParsingComplete = false;
            this.hasOptionVisibilityRules = false;

            this.container = this.getContainer();
            this.element = document.querySelector('div[class*="o-question-"][data-questiongroup*="' + this.group + '"]');
        }

        oQuestion.prototype = Object.create(component.prototype);
        oQuestion.prototype.constructor = oQuestion;

        oQuestion.prototype.init = function () {
            this.configureProperties();
            this.processOptionVisibilityRules();
        }

        oQuestion.prototype.getContainer = function () {
            // some questions may register with a suffix, e.g. _Q0_C, we only want the initial question number
            var scripttagid = this.id.split('_')[1];
            var scripttag = document.querySelector('script[data-questionid="_' + scripttagid + '"]');
            var container = scripttag.closest('div.o-question-container');

            // prevent sub-questions from overwriting attributes in a parent container
            if (container !== null && container.getAttribute('data-questiongroup') === null) {
                container.setAttribute('data-questiongroup', this.group);
                container.setAttribute('data-questionid', '_' + scripttagid);
            }

            return container;
        }

        oQuestion.prototype.showspinner = function (prop) {
            if (prop === true) {
                this.element.classList.add('show-spinner');
            }
        }

        oQuestion.prototype.filter = function (props) {
            this.isFiltered = true;
            this.filterSource = props.source;
            this.filterExclusions = props.exclusions;
        }

        oQuestion.prototype.processFilter = function (event) {
            // this question does not have a filter rule declared
            if (!this.isFiltered) {
                return;
            }

            // do not process events originating with the current question
            if (event.detail.group === this.group) {
                return;
            }

            // the incoming question is not included in the list of filter sources
            if (event.detail.questionName.toLowerCase() !== this.filterSource.toLowerCase()) {
                return;
            }

            // the incoming value has been found in the exclusions list
            if (typeof event.detail.checkbox !== "undefined"
                && this.filterExclusions.indexOf(event.detail.checkbox.value) >= 0) {
                return;
            }

            if (typeof event.detail.checkbox !== "undefined") {
                if (event.detail.checkbox.checked) {
                    this.debug('Identified incoming value from a filter source.');
                    this.hideOption(event.detail.checkbox.value, 'filter');
                } else {
                    this.showOption(event.detail.checkbox.value, 'filter');
                }
            }

            if (typeof event.detail.droplist !== "undefined") {
                var selectedelement = event.detail.droplist.querySelector('[data-selected]');

                if (selectedelement === null) {
                    this.showOption(null, 'filter');
                } else {
                    this.hideOption(selectedelement.getAttribute('data-value'), 'filter');

                }

                this.debug('Identified incoming value from a filter source.');
            }
        }

        oQuestion.prototype.labels = function (prop) {
            if (typeof prop.alternatives === "undefined") {
                return;
            }

            var alternativescontainer = this.container.querySelector('div.o-question-alternatives');

            // guard condition to prevent old-style pages, lacking the new container,
            // from throwing errors
            if (alternativescontainer === null) {
                return;
            }

            // do not add the labels a second time
            if (alternativescontainer.childNodes.length > 1) {
                return;
            }

            prop.alternatives.forEach(function (item, idx, arr) {

                var elementtype = item.block ? 'div' : 'span';
                var alternative = document.createElement(elementtype);

                alternative.setAttribute('name', item.name);
                alternative.classList.add('o-question-information-content');
                alternative.innerHTML = item.label;

                if (prop.separator !== 'undefined' && prop.separator.length && idx !== arr.length - 1) {
                    var alternativeseparator = document.createElement('span');
                    alternativeseparator.className = 'a-label-alternative-separator';
                    alternativeseparator.innerHTML = prop.separator;
                    alternative.appendChild(alternativeseparator);
                }

                alternativescontainer.appendChild(alternative);
            });
        }

        oQuestion.prototype.processOptionVisibilityRulesFromExternalTrigger = function (event) {
            if (this.element === event.detail.element) {
                return;
            }

            this.processOptionVisibilityRules();
        }

        oQuestion.prototype.processOptionVisibilityRules = function () {
            if (!this.optionRuleParsingComplete) {
                this.parseOptionVisibilityRules();
            }

            if (!this.hasOptionVisibilityRules) {
                return;
            }

            this.debug('Processing option visibility rules for ' + this.questionName, 3);
            this.getQuestionValues();

            if (typeof this.properties.options.invisible !== "undefined") {
                for (var i = 0; i < this.properties.options.invisible.length; i++) {
                    if (this.properties.options.invisible[i].parsedRule === "undefined") {
                        continue;
                    }

                    var invisibleRuleString = this.properties.options.invisible[i].parsedRule;
                    invisibleRuleString = this.insertQuestionValuesIntoRule(invisibleRuleString);

                    if (this.evaluateRule(invisibleRuleString)) {
                        this.hideOption(this.properties.options.invisible[i].name, 'rule');
                    } else {
                        this.showOption(this.properties.options.invisible[i].name, 'rule');
                    }
                }
            }

            if (typeof this.properties.options.visible !== "undefined") {
                for (var j = 0; j < this.properties.options.visible.length; j++) {
                    if (this.properties.options.visible[j].parsedRule === "undefined") {
                        continue;
                    }

                    var ruleString = this.properties.options.visible[j].parsedRule;
                    ruleString = this.insertQuestionValuesIntoRule(ruleString);

                    if (this.evaluateRule(ruleString)) {
                        this.showOption(this.properties.options.visible[j].name, 'rule');
                    } else {
                        this.hideOption(this.properties.options.visible[j].name, 'rule');
                    }
                }
            }
        }

        oQuestion.prototype.hideOption = function (itemValue, hideMethod) {
            var option = this.element.querySelector(".hiddencontrol[value='" + itemValue + "'], [data-value='" + itemValue + "']");

            if (option === null) {
                this.debug('Could not find the option ' + itemValue + ' to hide.', 2);
                return;
            }

            var optiongroup = option.parentNode.getAttribute('data-questiongroup');

            // for m-option-base we should operate on the parent element
            if (option.tagName === 'INPUT' && !option.classList.contains('a-input-combobox')) {
                option.checked = false;
                option = option.parentNode;
            }

            if (hideMethod === 'filter') {
                option.classList.add('hidden-filter');
                if (option.querySelector('input') !== null) {
                    option.querySelector('input').disabled = true;
                }
            } else {
                option.classList.add('hidden-rule');
                option.tabIndex = -1;
                if (option.querySelector('input') !== null) {
                    option.querySelector('input').disabled = true;
                }
            }

            this.sendResizeNotifier(optiongroup);
        }

        oQuestion.prototype.showOption = function (itemValue, hideMethod) {
            var option;

            if (itemValue === null) {
                option = this.element.querySelector(".hidden-filter");
            } else {
                option = this.element.querySelector("[value='" + itemValue + "'], [data-value='" + itemValue + "']");
            }

            if (option === null) {
                return;
            }

            var optiongroup = option.parentNode.getAttribute('data-questiongroup');

            // for m-option-base we should operate on the parent element
            if (option.tagName === 'INPUT' && !option.classList.contains('a-input-combobox')) {
                option = option.parentNode;
            }

            if (hideMethod === 'filter') {
                option.classList.remove('hidden-filter');
                if (option.querySelector('input') !== null) {
                    option.querySelector('input').disabled = false;
                }
            } else {
                option.classList.remove('hidden-rule');
                if (option.querySelector('input') !== null) {
                    option.querySelector('input').disabled = false;
                }
            }

            this.sendResizeNotifier(optiongroup);
        }

        oQuestion.prototype.sendResizeNotifier = function () {
            if (typeof (Event) === 'function') {
                // modern browsers
                window.dispatchEvent(new Event('resize'));
            } else {
                // for IE and other old browsers
                var evt = document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
            }
        }

        oQuestion.prototype.parseAlternativeVisibilityRules = function () {
            if (typeof this.properties.labels === "undefined") {
                this.alternativeRuleParsingComplete = true;
                return;
            }

            if (typeof this.properties.labels.alternatives === "undefined") {
                this.alternativeRuleParsingComplete = true;
                return;
            }

            for (var i = 0; i < this.properties.labels.alternatives.length; i++) {
                this.hasAlternativeVisibilityRules = true;
                var ruleString = "";

                if (typeof this.properties.labels.alternatives[i].visible !== "undefined") {
                    ruleString = this.properties.labels.alternatives[i].visible.rules;
                } else {
                    ruleString = this.properties.labels.alternatives[i].invisible.rules;
                }

                this.properties.labels.alternatives[i].parsedRule = this.parseVisibilityRules(ruleString);
            }

            this.alternativeRuleParsingComplete = true;
        }

        oQuestion.prototype.parseOptionVisibilityRules = function () {
            if (typeof this.properties.options === "undefined") {
                this.optionRuleParsingComplete = true;
                return;
            }

            if (typeof this.properties.options.invisible !== "undefined") {
                for (var i = 0; i < this.properties.options.invisible.length; i++) {
                    this.hasOptionVisibilityRules = true;
                    var invisibleRuleString = this.properties.options.invisible[i].rules;
                    var invisibleOptionName = this.properties.options.invisible[i].name;
                    this.properties.options.invisible[i].name = this.escapeString(invisibleOptionName);
                    this.properties.options.invisible[i].parsedRule = this.parseVisibilityRules(invisibleRuleString);
                }
            }

            if (typeof this.properties.options.visible !== "undefined") {
                for (var j = 0; j < this.properties.options.visible.length; j++) {
                    this.hasOptionVisibilityRules = true;
                    var ruleString = this.properties.options.visible[j].rules;
                    var optionName = this.properties.options.visible[j].name;
                    this.properties.options.visible[j].name = this.escapeString(optionName);
                    this.properties.options.visible[j].parsedRule = this.parseVisibilityRules(ruleString);
                }
            }

            this.optionRuleParsingComplete = true;
        }

        return oQuestion;

    });
    