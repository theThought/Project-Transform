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

        function oQuestionList(id, group) {
            oQuestion.call(this, id, group);

            this.tallest = 0;
            this.widest = 0;
            this.maxwidth = '';
            this.isOnesize = true;
            this.list = null;
            this.element = document.querySelector('div[class*=o-question-list][data-questiongroup="' + this.group + '"]');

            this.configureProperties();
            this.list = this.buildList();
            this.configureIncomingEventListeners();
            this.configureOnesize();
            this.configurationComplete();
        }

        oQuestionList.prototype = Object.create(oQuestion.prototype);
        oQuestionList.prototype.constructor = oQuestionList;

        oQuestionList.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("click", this, false);
            document.addEventListener("mousedown", this, false);
            document.addEventListener(this.group + "_requestSize", this, false);
            document.addEventListener(this.group + "_jumpToLetter", this, false);
        }

        oQuestionList.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'click':
                case 'mousedown':
                    this.onClick(event);
                    break;
                case 'broadcastChange':
                    this.receiveBroadcast(event);
                    break;
                case this.group + "_jumpToLetter":
                    this.jumpToLetter(event);
                    break;
            }
        }

        oQuestionList.prototype.buildList = function () {
            var listcontainer = this.element.querySelector('.m-list-optionlist');
            return listcontainer.querySelectorAll('.m-option-base');
        }

        oQuestionList.prototype.jumpToLetter = function (event) {
            if (event.detail.questionName !== this.questionName) {
                return;
            }

            var char = String.fromCharCode(event.detail.keypressed).toLowerCase();
            console.info('Pressed key: ' + char);

            for (var i = 0; i<this.list.length; i++) {
                var itemlabel = this.list[i].querySelector('.a-label-option');
                if (itemlabel.innerHTML.toLowerCase().indexOf(char) === 0) {
                    itemlabel.click();
                    return;
                }
            }
        }

        oQuestionList.prototype.onClick = function (event) {
            if (event.target === this.element) {
                this.element.classList.add('focused');
            }
        }

        oQuestionList.prototype.displayicon = function (prop) {
            if (prop === true) {
                this.element.classList.add('display-icons');
            }
        }

        oQuestionList.prototype.onesize = function (props) {
            if (props['state'] === false) {
                this.isOnesize = false;
            }
        }

        oQuestionList.prototype.configureOnesize = function () {
            if (this.isOnesize) {

                this.element.classList.add('one-size');
                window.addEventListener("resize", this, false);

                if (!this.properties || !this.properties.onesize) {
                    return false;
                }

                if (typeof this.properties.onesize['max-width'] !== 'undefined') {
                    this.setMaxWidth(this.properties.onesize['max-width']);
                }

            }
        }

        oQuestionList.prototype.setMaxWidth = function (maxwidth) {
            this.maxwidth = maxwidth;
        }

        return oQuestionList;

    });