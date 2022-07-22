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
            this.element = document.querySelector('div[class*=o-question-list][data-questiongroup="' + this.group + '"]');

            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureOnesize();
            this.onResize();
            this.configurationComplete();
        }

        oQuestionList.prototype = Object.create(oQuestion.prototype);
        oQuestionList.prototype.constructor = oQuestionList;

        oQuestionList.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("click", this, false);
            document.addEventListener("mousedown", this, false);
            document.addEventListener(this.group + "_requestSize", this, false);
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
                case 'resize':
                case this.group + '_requestSize':
                    this.onResize();
                    break;
                case "configComplete":
                    this.onConfigurationComplete(event);
                    break;
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

        oQuestionList.prototype.onResize = function () {

            var children = this.element.querySelectorAll(".m-option-base, .a-button-option");
            this.tallest = 0;
            this.widest = 0;

            var beginresize = new CustomEvent(this.group + '_beginResize', {
                bubbles: true,
                detail: this
            });
            document.dispatchEvent(beginresize);

            for (var i = 0; i < children.length; i++) {
                var element = children[i];
                var dims = getComputedStyle(element);
                var elementheight = parseFloat(dims.height);
                var elementwidth = parseFloat(dims.width);
                var contentheight = elementheight;
                var contentwidth = elementwidth;

                contentheight = Math.ceil(contentheight);
                contentwidth = Math.ceil(contentwidth);

                if (contentheight > this.tallest) this.tallest = contentheight;
                if (contentwidth > this.widest) this.widest = contentwidth;
            }

            var endresize = new CustomEvent(this.group + '_endResize', {
                bubbles: true,
                detail: this
            });
            document.dispatchEvent(endresize);
        }

        return oQuestionList;

    });