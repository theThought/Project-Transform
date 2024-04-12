define(['o-question'],
    function (oQuestion) {

        /**
         * Organism: Question Class
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oQuestionChoice(id, group) {
            oQuestion.call(this, id, group);

            this.tallest = 0;
            this.widest = 0;
            this.minwidth = '';
            this.maxwidth = '';
            this.isOnesize = false;
            this.isBalanced = false;
            this.element = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"]');
        }

        oQuestionChoice.prototype = Object.create(oQuestion.prototype);
        oQuestionChoice.prototype.constructor = oQuestionChoice;

        oQuestionChoice.prototype.init = function () {
            oQuestion.prototype.init.call(this);

            this.configureIncomingEventListeners();
            this.configureBalance();
            this.configureOnesize();
            this.onResize();
            this.configurationComplete();
        }

        oQuestionChoice.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + "_requestSize", this, false);
            document.addEventListener("broadcastChange", this, false);
        }

        oQuestionChoice.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'resize':
                case this.group + '_requestSize':
                    this.onResize();
                    break;
            }
        }

        oQuestionChoice.prototype.sublistline = function (props) {
            if (props.state === false) {
                this.element.classList.add('no-separator');
            }

            if (typeof props.length !== 'undefined') {
                this.element.classList.add('separator-length-' + props.length);
            }
        }

        oQuestionChoice.prototype.balance = function (props) {
            if (props.state === true) {
                this.isBalanced = true;
            }
        }

        oQuestionChoice.prototype.onesize = function (props) {
            this.isOnesize = props.state;
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

            var children = this.element.querySelectorAll(".m-option-base, .a-button-option");
            this.tallest = 0;
            this.widest = 0;

            var beginresize = new CustomEvent(this.group + '_beginResize', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(beginresize);

            for (var i = 0; i < children.length; i++) {
                var element = children[i];
                var dims = getComputedStyle(element);
                var elementheight = parseFloat(dims.height);
                var elementwidth = parseFloat(dims.width);
                var contentheight = elementheight;
                var contentwidth = elementwidth;

                if (element.hasAttribute('data-original-width') && element.getAttribute('data-original-width').length) {
                    var elementname = element.name;
                    var originalwidth = element.getAttribute('data-original-width');
                    this.debug(elementname + ' has an original width of ' + originalwidth, 3);
                }

                contentheight = Math.ceil(contentheight);
                contentwidth = Math.ceil(contentwidth);

                if (isNaN(contentwidth) || isNaN(contentheight)) {
                    continue;
                }

                if (contentheight > this.tallest) {
                    this.tallest = contentheight;
                }

                if (contentwidth > this.widest) {
                    this.widest = contentwidth;
                }
            }

            var endresize = new CustomEvent(this.group + '_endResize', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(endresize);
        }

        return oQuestionChoice;

    });