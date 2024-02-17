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
            this.styleInstructions();
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
            var question = this.element.getElementsByClassName('o-question-container');

            for (var i = 0; i < question.length; i++) {
                var questioninformation = question[i].getElementsByClassName('o-question-information')[0];
                questioninformation.style.flexBasis = width + '%';
                questioninformation.style.msFlex = '0 0 ' + width + '%';
            }
        }

        page.prototype.styleInstructions = function () {
            var questioninstructions = document.getElementsByClassName('o-question-instruction');
            var sidebyside = (typeof this.properties.sidebyside !== "undefined");

            for (var i = 0; i < questioninstructions.length; i++) {
                var questioninstruction = questioninstructions[i];
                if (questioninstruction.innerHTML.trim().length) {
                    // extract the content from the instruction and add it to a new container
                    var questioninformationcontentcontainer = document.createElement('div');
                    questioninformationcontentcontainer.innerHTML = questioninstructions[i].innerHTML;
                    questioninstructions[i].innerHTML = '';
                    questioninstructions[i].appendChild(questioninformationcontentcontainer);
                    questioninstruction.classList.add('has-content');

                    // in side-by-side layouts it is necessary to move the instruction to prevent
                    // it from occupying horizontal space adjacent to the question information
                    if (sidebyside) {
                        var questioncontainer = questioninstruction.closest('.o-question-container');
                        var questionresponse = questioncontainer.querySelector('.o-question-response');

                        // in certain circumstances (information only questions) there may not be a question response
                        // area - in these cases the instruction should be left in its original position
                        if (questionresponse === null) {
                            continue;
                        }

                        questionresponse.insertAdjacentElement('afterbegin', questioninstruction);
                    }
                }
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

            var questions = this.element.querySelectorAll('div.o-question-container');

            if (questions.length === 0) {
                return;
            }

            for (var i = 0; i < questions.length; i++) {
                var inputelement = questions[i].querySelector('input, textarea');

                if (inputelement === null) {
                    continue;
                }

                questions[i].classList.add('focused');
                return;
            }

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