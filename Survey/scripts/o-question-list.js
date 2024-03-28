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

            this.maxwidth = '';
            this.isOnesize = false;
            this.element = document.querySelector('div[class*=o-question-list][data-questiongroup="' + this.group + '"]');
        }

        oQuestionList.prototype = Object.create(oQuestion.prototype);
        oQuestionList.prototype.constructor = oQuestionList;

        oQuestionList.prototype.init = function () {
            oQuestion.prototype.init.call(this);

            this.configureOnesize();
            this.configurationComplete();
        }

        oQuestionList.prototype.type = function (prop) {
            this.element.classList.add(prop);
        }

        oQuestionList.prototype.onesize = function (props) {
            this.isOnesize = props.state;
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