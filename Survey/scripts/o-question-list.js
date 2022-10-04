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
            this.listtype = null;
            this.mincharacters = 0;
            this.element = document.querySelector('div[class*=o-question-list][data-questiongroup="' + this.group + '"]');
            this.inputelement = document.querySelector('div[data-questiongroup="' + this.group + '"] input.a-input-list-dropdown');

            this.list = this.buildList();
            this.disableTabIndex(this.list);
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureOnesize();
            this.configureInitialFilter();
            this.configurationComplete();
        }

        oQuestionList.prototype = Object.create(oQuestion.prototype);
        oQuestionList.prototype.constructor = oQuestionList;

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
                case this.group + "_filterList":
                    this.filterList(event);
                    break;
            }
        }

        oQuestionList.prototype.configureInitialFilter = function () {
            if (this.listtype !== 'combobox') {
                return;
            }

            if (this.inputelement.value.length) {
                this.filterListStarts(this.inputelement.value);
                return;
            }

            if (this.mincharacters > 0) {
                this.element.classList.add('charrestriction');
                this.filterListStarts('');
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

        oQuestionList.prototype.filterList = function (event) {
            if (event.detail.questionName !== this.questionName) {
                return;
            }

            switch (event.detail.filtermethod) {
                case 'starts':
                    this.filterListStarts(event.detail.element.value);
                    break;
                case 'contains':
                    this.filterListContains(event.detail.element.value);
                    break;
            }
        }

        oQuestionList.prototype.filterListContains = function (string) {

            if (string.length < this.mincharacters) {
                this.element.classList.add('charrestriction');
                return;
            }

            string = string.toLowerCase();
            var visibleitems = this.list.length;

            for (var i = 0; i < this.list.length; i++) {
                var itemlabel = this.list[i].querySelector('.a-label-option').innerHTML.toLowerCase();
                if (itemlabel.indexOf(string.toLowerCase()) !== -1) {
                    this.list[i].classList.remove('filter-hidden');
                } else {
                    this.list[i].classList.add('filter-hidden');
                    visibleitems--;
                }
            }

            if (visibleitems === 0) {
                //this.clearEntries();
                this.togglePlaceholderVisibility(true);
            } else {
                this.togglePlaceholderVisibility(false);
            }
        }

        oQuestionList.prototype.filterListStarts = function (string) {

            if (string.length < this.mincharacters) {
                //this.clearEntries();
                this.element.classList.add('charrestriction');
                string = '';
            } else {
                this.element.classList.remove('charrestriction');
            }

            if (string.length === 0) {
                //this.clearEntries();
            }

            string = string.toLowerCase();
            var visibleitems = this.list.length;

            for (var i = 0; i < this.list.length; i++) {
                var itemlabel = this.list[i].querySelector('.a-label-option').innerHTML.toLowerCase();
                if (itemlabel.indexOf(string) === 0) {
                    this.list[i].classList.remove('filter-hidden');
                } else {
                    this.list[i].classList.add('filter-hidden');
                    visibleitems--;
                }
            }

            if (visibleitems === 0) {
                //this.clearEntries();
                this.togglePlaceholderVisibility(true);
            } else {
                this.togglePlaceholderVisibility(false);
            }
        }

        oQuestionList.prototype.togglePlaceholderVisibility = function (visibility) {
            if (visibility) {
                this.element.classList.add('empty');
            } else {
                this.element.classList.remove('empty');
            }
        }

        oQuestionList.prototype.clearEntries = function () {
            var enableExclusive = new CustomEvent(this.group + '_enableExclusive', {
                bubbles: true,
                detail: this
            });

            document.dispatchEvent(enableExclusive);
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