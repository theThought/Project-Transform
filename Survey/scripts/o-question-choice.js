/*
  functionality:

  character countdown

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    function () {

        /**
         * Organism: Question Class
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oQuestionChoice(id, group) {
            this.id = id;
            this.group = group;
            this.element = null;
            this.parent = null;
            this.tallest = 0;
            this.widest = 0;
            this.minwidth = '';
            this.maxwidth = '';
            this.isOnesize = true;
            this.isBalanced = false;
            this.properties = {};
        }

        oQuestionChoice.prototype.Init = function () {
            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"]');
            this.parent = this.element.closest('div.o-question-container');

            if (this.element === null) {
                console.warn('Unable to find a DOM element for the oQuestionChoice component '
                    + this.group
                    + '. Intended behaviours are likely to be missing from this page.');
            } else {
                this.configureProperties();
                this.configureIncomingEventListeners();
                this.configureBalance();
                this.configureOnesize();
            }

            this.onResize();
        }

        oQuestionChoice.prototype.configureProperties = function () {
            var propertiesName = this.group.toLowerCase();

            if (!app.properties[propertiesName]) {
                return false;
            }

            this.properties = app.getProperties(propertiesName);

            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        oQuestionChoice.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + "_requestSize", this, false);
        }

        oQuestionChoice.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'resize':
                case this.group + '_requestSize':
                    this.onResize();
                    break;
            }
        }

        oQuestionChoice.prototype.balance = function (props) {
            if (props['state'] === true) {
                this.isBalanced = true;
            }
        }

        oQuestionChoice.prototype.onesize = function (props) {
            if (props['state'] === false) {
                this.isOnesize = false;
            }
        }

        oQuestionChoice.prototype.configureBalance = function () {
            if (this.isBalanced) {

                this.element.classList.add('balance');
                window.addEventListener("resize", this, false);

                if (!this.properties || !this.properties.balance) {
                    return false;
                }

                if (typeof this.properties.balance['min-width'] !== 'undefined') {
                    this.setMinWidth(this.properties.balance['min-width']);
                }

            }
        }

        oQuestionChoice.prototype.configureOnesize = function () {
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

        oQuestionChoice.prototype.setMinWidth = function (minwidth) {
            this.minwidth = minwidth;
        }

        oQuestionChoice.prototype.setMaxWidth = function (maxwidth) {
            this.maxwidth = maxwidth;
        }

        oQuestionChoice.prototype.onResize = function () {

            var children = this.element.getElementsByClassName("m-option-base");
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
                var contentheight = elementheight - (parseFloat(dims.paddingTop) + parseFloat(dims.paddingBottom));
                var contentwidth = elementwidth - (parseFloat(dims.paddingLeft) + parseFloat(dims.paddingRight));

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

        oQuestionChoice.prototype.separator = function (val) {
            if (val === false) {
                this.parent.classList.add('no-separator');
            }
        }

        return oQuestionChoice;

    });