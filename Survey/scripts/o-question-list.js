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
            this.isOnesize = false;
            this.list = null;
            this.mincharacters = 0;
            this.element = document.querySelector('div[class*=o-question-list][data-questiongroup="' + this.group + '"]');
            this.inputelement = this.element.querySelector('input.a-input-list-dropdown');
        }

        oQuestionList.prototype = Object.create(oQuestion.prototype);
        oQuestionList.prototype.constructor = oQuestionList;

        oQuestionList.prototype.init = function () {
            this.list = this.buildList();
            this.disableTabIndex(this.list);
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureOnesize();
            this.configurationComplete();
        }

        oQuestionList.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + "_jumpToLetter", this, false);
            document.addEventListener(this.group + "_filterList", this, false);
        }

        oQuestionList.prototype.handleEvent = function (event) {
            switch (event.type) {
                case this.group + "_jumpToLetter":
                    this.jumpToLetter(event);
                    break;
            }
        }

        oQuestionList.prototype.mincharactersforlist = function (prop) {
            this.mincharacters = prop;
        }

        oQuestionList.prototype.autoshowlist = function (prop) {
            this.autoshowlist = prop;
        }

        oQuestionList.prototype.dropdownvisible = function (prop) {
            this.dropdownvisible = prop;
        }

        oQuestionList.prototype.type = function (prop) {
            this.listtype = prop;

            this.element.classList.add(prop);
        }

        oQuestionList.prototype.buildList = function () {
            var listcontainer = this.element.querySelector('.m-list-optionlist');
            return listcontainer.querySelectorAll('.m-option-base');
        }

        oQuestionList.prototype.disableTabIndex = function (list) {
            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i].querySelector('input');
                item.tabIndex = -1;
            }
        }

        oQuestionList.prototype.jumpToLetter = function (event) {
            if (event.detail.questionName !== this.questionName) {
                return;
            }

            var char = String.fromCharCode(event.detail.keypressed).toLowerCase();

            for (var i = 0; i < this.list.length; i++) {
                var itemlabel = this.list[i].querySelector('.a-label-option');
                if (itemlabel.innerHTML.toLowerCase().indexOf(char) === 0) {
                    itemlabel.click();
                    return;
                }
            }
        }

        oQuestionList.prototype.clearEntries = function () {
            var enableExclusive = new CustomEvent(this.group + '_enableExclusive', {
                bubbles: true,
                detail: this
            });

            this.element.dispatchEvent(enableExclusive);
        }

        oQuestionList.prototype.displayicon = function (prop) {
            if (prop === true) {
                this.element.classList.add('display-icons');
            }
        }

        oQuestionList.prototype.onesize = function (props) {
            this.isOnesize = props['state'];
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