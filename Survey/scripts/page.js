define(
    function () {

        function page(id, group) {
            this.id = id;
            this.group = group;
            this.focusonfirstinput = true;
            this.focusquestion = true;
            this.focuscontrol = true;
            this.focuserror = false;
            this.allowpaste = false;
            this.validateform = false;
            this.element = document.querySelector('body>form');
        }

        page.prototype.init = function () {
            this.configureProperties();
            this.styleInstructions();
            this.styleDetails();
            this.setFormValidation();
            this.setQuestionFocusStyle();
            this.setControlFocusStyle();
            this.focusFirstQuestion();
            this.scrollToError();
            this.focusFirstInput();
            this.configurePaste();
        }

        page.prototype.configureProperties = function (propertiesName) {
            propertiesName = (typeof propertiesName === 'undefined') ? this.group : propertiesName;

            this.properties = app.getProperties(propertiesName);
            this.properties.registered = true;

            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop) && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        page.prototype.paste = function (prop) {
            this.allowpaste = prop;
        }

        page.prototype.sidebyside = function (width) {
            var question = this.element.getElementsByClassName('o-question-container sidebyside');

            for (var i = 0; i < question.length; i++) {
                var questionmessages = question[i].getElementsByClassName('o-question-information-messages');

                for (var j = 0; j < questionmessages.length; j++) {
                    questionmessages[j].style.flexBasis = width + '%';
                    questionmessages[j].style.msFlex = '0 0 ' + width + '%';
                }

                var questioninformation = question[i].getElementsByClassName('o-question-information-and-messages')[0];
                questioninformation.style.flexBasis = width + '%';
                questioninformation.style.msFlex = '0 0 ' + width + '%';
            }
        }

      /**
       * Sets the 'validate' bool from a custom user property
       * @param {boolean} prop
       */
      page.prototype.validate = function (prop) {
                this.validateform = prop;
        }

        /**
         * Write the novalidate attribute to the form
         */
        page.prototype.setFormValidation = function () {
            if (this.validateform) {
                this.element.setAttribute('novalidate', 'false');
            } else {
              this.element.setAttribute('novalidate', 'true');
            }
        }

        /**
         *
         * @param {boolean} prop Property to determine whether detail panels will float over content (defaults to true)
         */
        page.prototype.floatdetails = function (prop) {
            if (!prop) {
                this.element.classList.add('details-inline');
            }
        }

        page.prototype.styleDetails = function () {
            var detailmessages = document.querySelectorAll('details.o-message-information');

            document.addEventListener('click', function (event) {
                if (event.target.tagName === 'SUMMARY') {
                    event.preventDefault();
                    if (event.target.parentElement.getAttribute('open') !== 'open') {
                        event.target.parentElement.setAttribute('open', 'open');
                    } else {
                        event.target.parentElement.removeAttribute('open');
                    }
                }
            });

            for (var i = 0; i < detailmessages.length; i++) {
                var detailmessage = detailmessages[i];
                if (detailmessage.innerHTML.trim().length) {
                    detailmessage.classList.add('has-content');
                }
            }
        }

        page.prototype.styleInstructions = function () {
            var questioninstructions = document.getElementsByClassName('m-message-instruction');

            for (var i = 0; i < questioninstructions.length; i++) {
                var questioninstruction = questioninstructions[i];
                if (questioninstruction.innerHTML.trim().length) {
                    // extract the content from the instruction and add it to a new container
                    var questioninformationcontentcontainer = document.createElement('div');
                    questioninformationcontentcontainer.innerHTML = questioninstructions[i].innerHTML;
                    questioninstructions[i].innerHTML = '';
                    questioninstructions[i].appendChild(questioninformationcontentcontainer);
                    questioninstruction.classList.add('has-content');
                }
            }
        }

        page.prototype.configurePaste = function () {
            this.element.setAttribute('data-paste', this.allowpaste);
        }

        page.prototype.focus = function (prop) {
            if (prop.control !== 'undefined' && !prop.control) {
                this.focuscontrol = false;
            }

            if (prop.question !== 'undefined' && !prop.question) {
                this.focusquestion = false;
            }
        }

        page.prototype.jumptoerror = function (prop) {
            if (prop) {
                this.focuserror = true;
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
            // do not focus on question if there is an error present and we are focusing on error
            if (!this.focusonfirstinput) {
                return;
            }

            // only select inputs from the first question
            var firstquestion = this.element.querySelector('div.o-question-container');

            if (firstquestion === null) {
                return;
            }

            // only allow focus in text input fields
            var firstelement = firstquestion.querySelector('input:not([type=hidden]), textarea');

            if (firstelement === null) {
                return;
            }

            firstelement.focus();
        }

        page.prototype.scrollToError = function () {
            if (this.focuserror) {
                var firsterror = document.querySelector('.a-label-error');

                if (firsterror === null) {
                    return;
                }

                var erroritem = firsterror.getAttribute('data-questionid');
                var errorelement = document.getElementById(erroritem);

                this.focusonfirstinput = false;

                if (errorelement === null) {
                    console.warn('An error message was displayed but no corresponding input could be found for focus.');
                    firsterror.scrollIntoView({'block': 'center'});
                    return;
                }

                errorelement.scrollIntoView({'block': 'center'});
                errorelement.focus();
            }
        }

        return page;

    });