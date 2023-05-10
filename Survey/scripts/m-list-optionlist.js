define(['component'],
    function (component) {

        /**
         * Molecule: Question option list
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function mListOptionList(id, group) {
            component.call(this, id, group);

            this.tallest = 0;
            this.widest = 0;
            this.maxwidth = '';
            this.isOnesize = false;
            this.keypressed = null;
            this.noitemsplaceholder = 'no items to display';
            this.notenoughcharactersplaceholder = 'begin typing to display the list';
            this.inputelement = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] .a-input-list-dropdown')
            this.buttonelement = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] > div');
            this.element = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] div.m-list-optionlist');
            this.list = null;
            this.currentlistposition = -1;
        }

        mListOptionList.prototype = Object.create(component.prototype);
        mListOptionList.prototype.constructor = mListOptionList;

        mListOptionList.prototype.init = function () {
            this.configureProperties();
            this.addEmptyPlaceholder();
            this.addCharRestrictionPlaceholder();
            this.setWidth();
            this.list = this.buildList();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configureOnesize();
            this.configurationComplete();
        }

        mListOptionList.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("restoreEntries", this, false);
            document.addEventListener(this.group + "_requestSize", this, false);
        }

        mListOptionList.prototype.configureLocalEventListeners = function () {
            this.buttonelement.addEventListener('keydown', this, false);
            this.buttonelement.addEventListener('keyup', this, false);
        }

        mListOptionList.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'resize':
                case this.group + '_requestSize':
                    this.onResize();
                    break;
                case 'keydown':
                    this.getKeyPressed(event);
                    this.onKeydown(event);
                    break;
                case 'keyup':
                    this.onKeyup(event);
                    break;
                case "clearEntries":
                    this.clearEntries(event);
                    break;
                case "restoreEntries":
                    this.restoreEntries(event);
                    break;
            }
        }

        mListOptionList.prototype.clearEntries = function (event) {
            if (event.detail.questionName !== this.questionName) {
                return;
            }

            this.currentlistposition = -1;
        }

        mListOptionList.prototype.restoreEntries = function (event) {
            if (event.detail.questionName !== this.questionName) {
                return;
            }

            this.currentlistposition = -1;
        }

        mListOptionList.prototype.buildList = function () {
            return this.element.querySelectorAll('.m-option-base');
        }

        mListOptionList.prototype.hideList = function () {
            this.buttonelement.classList.remove('show-list', 'focused');
            this.inputelement.blur();
        }

        mListOptionList.prototype.getKeyPressed = function (event) {
            if (event.keyCode) {
                this.keypressed = event.keyCode;
            } else if (event.which) {
                this.keypressed = event.which;
            } else if (event.key) {
                this.keypressed = event.key;
            } else {
                this.keypressed = event.code;
            }
        }

        mListOptionList.prototype.onKeydown = function (event) {
            switch (this.keypressed) {
                case 38: // up arrow
                case 40: // down arrow
                    event.preventDefault(); // prevent caret from moving
                    break;
                case 13: // enter key
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    this.hideList();
                    break;
            }
        }

        mListOptionList.prototype.onKeyup = function (event) {
            switch (this.keypressed) {
                case 38: // up arrow
                    this.navigateUp();
                    break;
                case 40: // down arrow
                    this.navigateDown();
                    break;
                case 13: // enter key
                    return;
            }
        }

        mListOptionList.prototype.navigateUp = function () {
            if (this.currentlistposition < 1) {
                return;
            }

            this.currentlistposition--;

            if (this.currentlistposition === -1) {
                return;
            }

            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        mListOptionList.prototype.navigateDown = function () {
            if (this.currentlistposition === this.list.length - 1) {
                return;
            }

            this.currentlistposition++;

            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        mListOptionList.prototype.updateScrollPosition = function (position) {
            this.element.scrollTop = 0; //set to top
            var currentitem = this.list[position];
            var scrollposition = currentitem.offsetTop - this.element.clientHeight;
            this.element.scrollTop = scrollposition + 100;
        }

        mListOptionList.prototype.updateSelectedEntry = function (position) {
            for (var i = 0; i < this.list.length; i++) {
                if (position === i) {
                    this.inputelement.value = this.list[i].querySelector('.a-label-option').innerHTML;
                    this.list[i].querySelector('input').checked = true;
                    this.list[i].classList.add('selected');
                    this.list[i].setAttribute('data-selected', 'selected');
                } else {
                    this.list[i].querySelector('input').checked = false;
                    this.list[i].classList.remove('selected');
                    this.list[i].removeAttribute('data-selected');
                }

                this.broadcastChange();
            }
        }


        mListOptionList.prototype.noitemsinlist = function (prop) {
            this.emptyplaceholder = prop;
        }

        mListOptionList.prototype.notenoughcharacters = function (prop) {
            this.notenoughcharactersplaceholder = prop;
        }

        mListOptionList.prototype.addEmptyPlaceholder = function () {
            var placeholderelement = document.createElement('div');
            placeholderelement.classList.add('a-list-placeholder-empty');
            placeholderelement.innerHTML = this.noitemsplaceholder;
            this.element.appendChild(placeholderelement);
        }

        mListOptionList.prototype.addCharRestrictionPlaceholder = function () {
            var placeholderelement = document.createElement('div');
            placeholderelement.classList.add('a-list-placeholder-restriction');
            placeholderelement.innerHTML = this.notenoughcharactersplaceholder;
            this.element.appendChild(placeholderelement);
        }

        mListOptionList.prototype.setWidth = function () {
            // determine whether a manual width has been set
            if (this.inputelement.style.width.length > 0) {
                this.element.classList.add('manual-width');
                this.element.style.width = 'calc(' + this.inputelement.style.width + ' + 44px + 16px)';
            }
        }

        mListOptionList.prototype.listsize = function (prop) {
            // todo: how do we calculate this as height changes?
            var height = 27 * prop + 7;
            this.element.style.maxHeight = height + 'px';
        }

        mListOptionList.prototype.displayicon = function (prop) {
            if (prop === true) {
                this.element.classList.add('display-icons');
            }
        }

        mListOptionList.prototype.onesize = function (props) {
            this.isOnesize = props['state'];
        }

        mListOptionList.prototype.configureOnesize = function () {

            if (this.isOnesize) {
                window.addEventListener("resize", this, false);
                this.element.classList.add('one-size');

                if (!this.properties || !this.properties.onesize) {
                    return false;
                }

                if (typeof this.properties.onesize['max-width'] !== 'undefined') {
                    this.setMaxWidth(this.properties.onesize['max-width']);
                }

            }
        }

        mListOptionList.prototype.setMaxWidth = function (maxwidth) {
            var buttonpadding = 52;
            this.maxwidth = maxwidth;
            this.element.style.maxWidth = "calc(" + maxwidth + " + " + buttonpadding + "px)";
        }

        mListOptionList.prototype.onResize = function () {

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

                if (isNaN(contentwidth) || isNaN(contentheight)) {
                    continue;
                }

                if (contentheight > this.tallest) this.tallest = contentheight;
                if (contentwidth > this.widest) this.widest = contentwidth;
            }

            var endresize = new CustomEvent(this.group + '_endResize', {
                bubbles: true,
                detail: this
            });
            document.dispatchEvent(endresize);
        }

        return mListOptionList;

    });