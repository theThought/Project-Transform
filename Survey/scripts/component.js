define(
    function () {

        /**
         * Base component class
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function component(id, group) {
            this.id = id;
            this.isInitialising = true;
            this.group = group;
            this.element = null;
            this.container = null;
            this.value = null;
            this.initialValue = null;
            this.available = false;
            this.restoreValues = false;
            this.isDebugging = true;
            this.questionName = app.extractQuestionName(group);
            this.complexVisibilityRule = '';
            this.expandedVisibilityRule = '';
            this.expandedCalculation = '';
            this.ruleParsingComplete = false;
            this.sourceQuestions = {};
            this.properties = {};
        }

        component.prototype.debug = function (message, priority) {
            if (!this.isDebugging) {
                return;
            }

            priority = priority || 4;

            switch (priority) {
                case 1:
                    console.error(message);
                    break;
                case 2:
                    console.warn(message);
                    break;
                case 3:
                    console.info(message);
                    break;
                default:
                    console.log(message);
            }
        }

        component.prototype.init = function () {
            this.initialValue = this.value = this.getCurrentValue();
        }

        component.prototype.configureProperties = function (propertiesName) {
            propertiesName = (typeof propertiesName === 'undefined') ? this.group : propertiesName;

            this.properties = app.getProperties(propertiesName);
            this.properties.registered = true;

            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop) && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        component.prototype.storeInitialValue = function () {
            this.initialValue = this.value = this.getCurrentValue();
        }

        component.prototype.getCurrentValue = function () {
            var value = (this.element.value) ? this.element.value : null

            if (typeof this.checkbox !== "undefined") {
                value = (this.checkbox.checked);
            }

            return value;
        }

        component.prototype.setInitialContentClass = function () {
            if (typeof this.element.value !== 'undefined') {
                this.manageContentClass();
            }
        }

        component.prototype.requestValue = function () {
            if (this.element.value) {
                return;
            }

            var valueRequest = new CustomEvent(this.group + '_valueRequest', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(valueRequest);
        }

        component.prototype.checkCollision = function (firstElement, secondElement) {
            var firstElementBottom = firstElement.getBoundingClientRect().bottom;
            var secondElementTop = secondElement.getBoundingClientRect().top;

            return firstElementBottom > secondElementTop;
        }

        component.prototype.checkViewportBounds = function (element) {
            var bounding = element.getBoundingClientRect();
            var overflow = {};

            overflow.top = bounding.top < 0;
            overflow.left = bounding.left < 0;
            overflow.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
            overflow.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
            overflow.any = overflow.top || overflow.left || overflow.bottom || overflow.right;

            return overflow;
        };

        component.prototype.configurationComplete = function () {
            var completeEvent = new CustomEvent('configComplete', {bubbles: true, detail: this});
            this.element.dispatchEvent(completeEvent);
            this.broadcastChange();
            this.isInitialising = false;
        }

        component.prototype.hasChangedValue = function () {
            var oldValue = this.value;
            var newValue = this.getCurrentValue();
            this.value = newValue;

            return oldValue !== newValue;
        }

        component.prototype.broadcastChange = function () {

            // do not broadcast events during page initialisation
            if (this.isInitialising) {
                return;
            }

            // do not broadcast a change when the value has not altered
            if (!this.hasChangedValue()) {
                return;
            }

            console.log('broadcasting a change');

            var broadcastChange = new CustomEvent('broadcastChange', {bubbles: true, detail: this});
            this.element.dispatchEvent(broadcastChange);
        }

        component.prototype.clearEntries = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            // this is responsible for clearing text areas
            if (this.element.value !== "") {
                this.element.value = "";
                this.broadcastChange();
            }
        }

        component.prototype.manageContentClass = function () {
            if (typeof this.element.value === 'undefined') {
                return;
            }

            if (this.element.value.length) {
                this.addContentClass();
            } else {
                this.clearContentClass();
            }
        }

        component.prototype.addContentClass = function () {
            this.element.classList.add('has-content');
        }

        component.prototype.clearContentClass = function () {
            this.element.classList.remove('has-content');
        }

        component.prototype.clearChildren = function () {
            var clearEntries = new CustomEvent('clearEntries', {bubbles: true, detail: this});
            this.element.dispatchEvent(clearEntries);
        }

        component.prototype.clearEntriesFromExternal = function (event) {
            if (event.detail.element.contains(this.element)) {

                if (event.detail.available === false) {
                    // if the parent element has become unavailable the same should be applied to the current element
                    this.makeUnavailable();
                } else {
                    // clear entries is handled by makeUnavailable in the other branch of this logic
                    this.clearEntries();
                }

                this.manageContentClass();
            }
        }

        component.prototype.restoreEntries = function () {
            if (!this.restoreValues) {
                return;
            }

            if (this.available) {
                return;
            }

            if (this.element.value !== this.initialValue) {
                this.element.value = this.initialValue;
                this.manageContentClass();
                this.broadcastChange();
            }
        }

        component.prototype.resettonull = function (val) {
            // the default for 'reset to null' is true; meaning values should be cleared when an item is reset
            // if reset to null is false, any initial values that were set for a question are restored
            if (val === false) {
                this.restoreValues = true;
            }
        }

        component.prototype.requestInitialSize = function () {
            var requestSize = new CustomEvent(this.group + '_requestSize', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(requestSize);
        }

        component.prototype.onBeginResize = function (event) {
            if (!event.detail.isOnesize && !event.detail.isBalanced) {
                return;
            }

            if (!this.element.hasAttribute('data-original-width')) {
                // we must clear the element's width on resize to allow items to collapse as the container shrinks
                // however we do not want to lose any original width intention from the publisher - this preserves
                // a manually set width, if set.
                this.element.setAttribute('data-original-width', this.element.style.width);
            }

            this.element.style.width = '';
            this.element.style.height = '';

            if (event.detail.properties === null) {
                return false;
            }

            if (event.detail.isOnesize === true) {
                this.element.style.maxWidth = event.detail.maxwidth;
            }

            if (event.detail.isBalanced === true) {
                this.element.style.minWidth = event.detail.minwidth;
            }

        }

        component.prototype.decodeHTML = function (html) {
            var textarea = document.createElement("textarea");
            textarea.innerHTML = html;
            return textarea.value;
        }

        component.prototype.replaceHTMLPlaceholder = function (html) {
            html = html.replace(/%gt%/g, '>');
            html = html.replace(/%lt%/g, '<');
            return html;
        }

        component.prototype.onEndResize = function (event) {

            // preserve the original element width, if set
            if (this.element.hasAttribute('data-original-width') && this.element.getAttribute('data-original-width').length) {
                this.element.style.width = this.element.getAttribute('data-original-width');
                return;
            }

            if (event.detail.isOnesize === true && event.detail.widest > 0 && event.detail.tallest > 0) {
                this.element.style.width = event.detail.widest + 'px';
                this.element.style.height = event.detail.tallest + 'px';
            }

        }

        component.prototype.configureInitialVisibility = function () {
            // if there are no visibility rules defined for this question lift the cover immediately
            if (typeof this.properties.visible === "undefined" && typeof this.properties.invisible === "undefined") {
                this.makeAvailable();
                return;
            }

            // the collapse property removes the space required by the question if it is hidden
            if ((typeof this.properties.visible !== "undefined" && this.properties.visible.collapse === true) ||
                (typeof this.properties.invisible !== "undefined" && this.properties.invisible.collapse === true)) {
                this.collapse = true;
                this.element.classList.add('collapse');
            }

            // this question has visibility rules so should begin in the hidden state
            this.element.classList.add('unavailable');
        }

        component.prototype.processVisibilityRulesFromExternalTrigger = function (event) {
            if (this.isInitialising || event.detail.isInitialising) {
                return;
            }

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

        component.prototype.processVisibilityRules = function () {
            if (typeof this.properties.visible === "undefined" && typeof this.properties.invisible === "undefined") {
                this.ruleParsingComplete = true;
                return;
            }

            if (typeof this.properties.visible !== "undefined") {
                this.processVisibleRules();
            }

            if (typeof this.properties.invisible !== "undefined") {
                this.processInvisibleRules();
            }
        }

        component.prototype.processVisibleRules = function () {

            if (!this.ruleParsingComplete) {
                this.complexVisibilityRule = this.properties.visible.rules;
                this.expandedVisibilityRule = this.parseVisibilityRules(this.complexVisibilityRule);
                this.ruleParsingComplete = true;
            }

            if (typeof this.expandedVisibilityRule === 'undefined' || this.expandedVisibilityRule === '') {
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

        component.prototype.parseVisibilityRules = function (ruleString) {
            if (!ruleString) {
                return;
            }

            // regular expression that searches for a string followed by an operator
            // operators are = < > <> .containsNone .containsNone .containsAll
            var questionRe = /\s?(\w+)(\.contains(?:None|Any|All)\((.*?)\)|\s?[=<>+-]|\s?%gt%|\s?%lt%|\.json)/ig;
            var questions = ruleString.match(questionRe);

            if (questions === null) {
                this.debug('A visibility rule was found but did not identify any questions:', 2);
                this.debug(this.questionName + ': ' + ruleString, 2);
                return;
            }

            ruleString = this.expandContainsAnyRule(ruleString);
            ruleString = this.expandContainsAllRule(ruleString);
            ruleString = this.expandContainsNoneRule(ruleString);
            ruleString = this.replaceOperators(ruleString);
            ruleString = this.extractQuestionIdentifiers(ruleString);

            return ruleString;
        }

        component.prototype.processInvisibleRules = function () {

            if (!this.ruleParsingComplete) {
                this.complexVisibilityRule = this.properties.invisible.rules;
                this.expandedVisibilityRule = this.parseVisibilityRules(this.complexVisibilityRule);
                this.ruleParsingComplete = true;
            }

            if (typeof this.expandedVisibilityRule === 'undefined' || this.expandedVisibilityRule === '') {
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

        component.prototype.processAvailability = function (event) {
            if (event.detail.available) {
                this.makeAvailable();
            } else {
                this.makeUnavailable();
            }
        }

        component.prototype.makeAvailable = function () {
            if (this.available) {
                return;
            }

            this.element.classList.remove('unavailable');
            this.requestInitialSize();
            this.resetValues();
            this.liftCover();
            this.available = true;

            var broadcastAvailability = new CustomEvent('broadcastAvailability', {bubbles: true, detail: this});
            this.element.dispatchEvent(broadcastAvailability);
        }

        component.prototype.makeUnavailable = function () {
            if (!this.available) {
                return;
            }

            this.element.classList.add('unavailable');
            this.available = false;

            this.cover();
            this.clearEntries();
            this.clearChildren();

            //var broadcastAvailability = new CustomEvent('broadcastAvailability', {bubbles: true, detail: this});
            //this.element.dispatchEvent(broadcastAvailability);
        }

        component.prototype.resetValues = function () {
            if (this.available) {
                return;
            }

            var restoreEntries = new CustomEvent('restoreEntries', {bubbles: true, detail: this});
            this.element.dispatchEvent(restoreEntries);
        }

        component.prototype.processCalculations = function (event) {
            if (this.element === event.detail.element) {
                return;
            }

            if (typeof this.properties.calculation !== "undefined") {
                this.debug('Processing calculation for ' + this.questionName, 3);
                this.getQuestionValues();
                this.element.value = this.insertJSONValuesIntoRule(this.expandedCalculation).trim();
            }
        }

        component.prototype.cover = function () {
            this.element.classList.remove('cover-off');
        }

        component.prototype.liftCover = function () {
            this.element.classList.add('cover-off');
        }

        component.prototype.getQuestionValues = function () {
            for (var currentQuestion in this.sourceQuestions) {
                if (this.sourceQuestions.hasOwnProperty(currentQuestion)) {
                    this.sourceQuestions[currentQuestion] = [];
                    var questionElements = document.querySelectorAll("div.o-question-response[data-questiongroup$='" + currentQuestion + "'] input, div.o-question-response[data-questiongroup$='" + currentQuestion + "'] select");

                    if (!questionElements.length) {
                        this.debug('Could not find a question required by a visibility rule: ' + currentQuestion, 2);
                    } else {
                        for (var j = 0; j < questionElements.length; j++) {
                            // determine the input type - required for handling unselected checkboxes/radio buttons
                            var questionType = questionElements[j].type;

                            if (questionType === 'button' || (questionType === 'checkbox' || questionType === 'radio') && !questionElements[j].checked) {
                                continue;
                            }

                            var questionValue = questionElements[j].value;
                            this.sourceQuestions[currentQuestion].push(questionValue);
                        }

                        this.sourceQuestions[currentQuestion] = uniq(this.sourceQuestions[currentQuestion]);
                    }
                }
            }
        }

        component.prototype.insertQuestionValuesIntoRule = function (ruleString) {
            for (var currentQuestion in this.sourceQuestions) {
                if (this.sourceQuestions.hasOwnProperty(currentQuestion)) {
                    var questionData = this.sourceQuestions[currentQuestion].join("','");
                }

                var allQuestionsRe = new RegExp("%%" + currentQuestion + "%%", "g");
                ruleString = ruleString.replace(allQuestionsRe, "'" + questionData.toLowerCase() + "'");
            }

            return ruleString;
        }

        component.prototype.insertJSONValuesIntoRule = function (ruleString) {
            for (var currentQuestion in this.sourceQuestions) {
                if (this.sourceQuestions.hasOwnProperty(currentQuestion)) {
                    var questionData = this.sourceQuestions[currentQuestion].join("");
                }

                var re = new RegExp("%%" + currentQuestion + "%%\.json\.(\\w+)", "ig");
                var matches;

                // match 0: full string
                // match 1: question
                // match 2: contains property requested
                while (null !== (matches = re.exec(ruleString))) {
                    var data;

                    try {
                        data = JSON.parse(questionData);
                    } catch (e) {
                        data = {}
                    }

                    var value = data[matches[1]];

                    if (typeof value === 'undefined' || value === null) {
                        value = '';
                    }

                    ruleString = ruleString.replace(matches[0], value);
                }

                return ruleString;
            }

            return ruleString;
        }

        component.prototype.evaluateRule = function (string) {
            // replace any remaining question placeholders with null --
            // a final safety net that should ultimately be unnecessary
            string = string.replace(/%%(\w+)%%/g, 'null');

            this.debug(this.questionName + ': ' + string, 3);

            return (new Function('return (' + string + ')')());
        }

        component.prototype.extractQuestionIdentifiers = function (ruleString) {
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

        component.prototype.calculation = function (prop) {
            if (typeof prop.rule === "undefined") {
                return;
            }

            var ruleString = prop.rule;

            this.expandedCalculation = this.expandJSONRule(ruleString);
            this.expandedCalculation = this.extractQuestionIdentifiers(this.expandedCalculation);
        }

        component.prototype.expandJSONRule = function (ruleString) {

            if (ruleString.toLowerCase().indexOf('.json') === -1) {
                return ruleString;
            }

            var re = /\s?(\w+)\.JSON\(["'](.*?)["']\)/ig;
            var matches;

            // match 0: full string
            // match 1: question
            // match 2: contains property requested
            while (null !== (matches = re.exec(ruleString))) {
                var expandedString = '%%' + matches[1] + '%%.json.' + matches[2];
                expandedString = ' ' + expandedString + ' ';
                ruleString = ruleString.replace(matches[0], expandedString);
            }

            return ruleString;
        }

        component.prototype.replaceOperators = function (ruleString) {
            var questionRe = /\s?(\w+)(\s?[=<>+-]+\s?)/g;

            ruleString = ruleString.replace(/or /gi, '|| ');
            ruleString = ruleString.replace(/and /gi, '&& ');
            ruleString = ruleString.replace(/%gt%/g, '>');
            ruleString = ruleString.replace(/%lt%/g, '<');
            ruleString = ruleString.replace(questionRe, " %%$1%% $2 ");
            ruleString = ruleString.replace(/[^=!<>]=[^=]/g, '==');

            return ruleString;
        }

        component.prototype.escapeString = function (ruleString) {
            ruleString = ruleString.replace(/__([^Q])/g, '_$1');
            ruleString = ruleString.replace(/_([^Q])/g, '__$1');
            return ruleString;
        }

        component.prototype.expandContainsAnyRule = function (ruleString) {
            if (ruleString.toLowerCase().indexOf('containsany') === -1) {
                return ruleString;
            }

            var re = /\s?(\w+)\.containsAny\((.*?)\)/ig;
            var matches;

            // match 0: full string
            // match 1: question
            // match 2: contains string
            while (null !== (matches = re.exec(ruleString))) {
                var expandedString = '[' + this.escapeString(matches[2]).toLowerCase() + '].some(function (val) {return [%%' + this.escapeString(matches[1]) + '%%].indexOf(val) >= 0})';
                expandedString = ' (' + expandedString + ') ';
                ruleString = ruleString.replace(matches[0], expandedString);
            }

            return ruleString;
        }

        component.prototype.expandContainsAllRule = function (ruleString) {
            if (ruleString.toLowerCase().indexOf('containsall') === -1) {
                return ruleString;
            }

            var re = /\s?(\w+)\.containsAll\((.*?)\)/ig;
            var matches;

            // match 0: full string
            // match 1: question
            // match 2: contains string
            while (null !== (matches = re.exec(ruleString))) {
                var expandedString = '[' + this.escapeString(matches[2]).toLowerCase() + '].every(function (val) {return [%%' + this.escapeString(matches[1]) + '%%].indexOf(val) >= 0})';
                expandedString = ' (' + expandedString + ') ';
                ruleString = ruleString.replace(matches[0], expandedString);
            }

            return ruleString;
        }

        component.prototype.expandContainsNoneRule = function (ruleString) {
            if (ruleString.toLowerCase().indexOf('containsnone') === -1) {
                return ruleString;
            }

            var re = /\s?(\w+)\.containsNone\((.*?)\)/ig;
            var matches;

            // match 0: full string
            // match 1: question
            // match 2: contains string
            while (null !== (matches = re.exec(ruleString))) {
                var expandedString = '[' + this.escapeString(matches[2]).toLowerCase() + '].every(function (val) {return [%%' + this.escapeString(matches[1]) + '%%].indexOf(val) == -1})';
                expandedString = ' (' + expandedString + ') ';
                ruleString = ruleString.replace(matches[0], expandedString);
            }

            return ruleString;
        }

        return component;

    });