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
        }

        oQuestionChoice.prototype.Init = function () {
            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"]');
            this.properties = app.properties[this.group];
            this.tallest = 0;
            this.widest = 0;
            this.minwidth = '';
            this.maxwidth = '';

            document.addEventListener(this.group + "_requestSize", this, false);

            if (this.element === null) {
                console.warn('Unable to find a DOM element for the oQuestionChoice component '
                    + this.group
                    + '. Intended behaviours are likely to be missing from this page.');
            } else {
                this.configureProperties();
            }

            this.onResize();
        }

        oQuestionChoice.prototype.configureProperties = function () {
            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        oQuestionChoice.prototype.balance = function (prop) {
            if (prop === true) {
                this.element.classList.add('balance');
                window.addEventListener("resize", this, false);
            }
        }

        oQuestionChoice.prototype.onesize = function (props) {
            if (props['state'] === true) {
                this.element.classList.add('one-size');
                window.addEventListener("resize", this, false);
            }

            if (props['min-width']) {
                this.setMinWidth(props['min-width']);
            }

            if (props['max-width']) {
                this.setMaxWidth(props['max-width']);
            }
        }

        oQuestionChoice.prototype.setMinWidth = function (minwidth) {
            this.minwidth = minwidth;
        }

        oQuestionChoice.prototype.setMaxWidth = function (maxwidth) {
            this.minwidth = maxwidth;
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
                var elementheight = element.clientHeight;
                var elementwidth = element.clientWidth;
                var contentheight = elementheight - (parseFloat(dims.paddingTop) + parseFloat(dims.paddingBottom));
                var contentwidth = elementwidth - (parseFloat(dims.paddingLeft) + parseFloat(dims.paddingRight));

                if (contentheight > this.tallest) this.tallest = contentheight;
                if (contentwidth > this.widest) this.widest = contentwidth;
            }

            var endresize = new CustomEvent(this.group + '_endResize', {
                bubbles: true,
                detail: this
            });
            document.dispatchEvent(endresize);
        }

        oQuestionChoice.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'resize':
                case this.group + '_requestSize':
                    this.onResize();
                    break;
            }
        }

        return oQuestionChoice;

    });