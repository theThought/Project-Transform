define(
    function () {

        function page(id, group) {
            this.id = id;
            this.group = group;
            this.focusquestion = true;
            this.focuscontrol = true;
            this.element = document.querySelector('body>form');
        }

        page.prototype.init = function () {
            this.configureProperties();
            this.setQuestionFocusStyle();
            this.setControlFocusStyle();
            this.focusFirstQuestion();
            this.focusFirstInput();
        }

        page.prototype.configureProperties = function (propertiesName) {
            propertiesName = (typeof propertiesName === 'undefined') ? this.group : propertiesName;

            this.properties = app.getProperties(propertiesName);
            this.properties.registered = true;

            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        page.prototype.sidebyside = function (width) {
            var questioninformation = this.element.getElementsByClassName('o-question-information');
            var questioninstruction = this.element.getElementsByClassName('o-question-errorandinstruction');

            for (var i = 0; i < questioninformation.length; i++) {
                questioninformation[i].style.flexBasis = width + '%';
                questioninformation[i].style.msFlex = '0 0 ' + width + '%';
            }

            for (var j = 0; j < questioninstruction.length; j++) {
                questioninstruction[j].style.maxWidth = width + '%';
            }

        }

        page.prototype.focus = function (prop) {
            if (prop.control !== 'undefined' && !prop.control) {
                this.focuscontrol = false;
            }

            if (prop.question !== 'undefined' && !prop.question) {
                this.focusquestion = false;
            }
        }

        page.prototype.setQuestionFocusStyle = function () {
            if (!this.focusquestion) {
                return;
            }

            this.element.classList.add('focus-question');
        }

        page.prototype.setControlFocusStyle = function () {
            if (!this.focuscontrol) {
                return;
            }

            this.element.classList.add('focus-control');
        }

        page.prototype.focusFirstQuestion = function () {
            if (!this.focusquestion) {
                return;
            }

            var firstquestion = this.element.querySelector('div.o-question-container');

            if (firstquestion === null) {
                return;
            }

            firstquestion.classList.add('focused');
        }

        page.prototype.focusFirstInput = function () {
            // only select inputs from the first question
            var firstquestion = this.element.querySelector('div.o-question-container');

            if (firstquestion === null) {
                return;
            }

            // only allow focus in text input fields
            var firstelement = firstquestion.querySelector(
                '.o-question-singlelineedit input.a-input-singlelineedit, ' +
                'textarea, ' +
                'input[type=checkbox], ' +
                'input[type=radio]');

            if (firstelement === null) {
                return;
            }

            firstelement.focus();
        }

        return page;

    });