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
            this.setWidth();
            this.setPosition();
            this.list = this.buildList();
            this.indexList();
            this.setCurrentListPosition();
            this.updateScrollPosition(this.getCurrentListPosition());
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configureOnesize();
            this.configurationComplete();
        }

        mListOptionList.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("restoreEntries", this, false);
            document.addEventListener(this.group + "_requestSize", this, false);
            document.addEventListener(this.group + "_droplistSize", this, false);
            document.addEventListener(this.group + "_jumpToLetter", this, false);
        }

        mListOptionList.prototype.configureLocalEventListeners = function () {
            this.buttonelement.addEventListener('keydown', this, false);
            this.buttonelement.addEventListener('keyup', this, false);
        }

        mListOptionList.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "resize":
                case this.group + "_requestSize":
                    this.onResize();
                    break;
                case "keydown":
                    this.getKeyPressed(event);
                    this.onKeydown(event);
                    break;
                case "keyup":
                    this.onKeyup(event);
                    break;
                case "restoreEntries":
                    this.restoreEntries(event);
                    break;
                case this.group + "_droplistSize":
                    this.setWidth();
                    this.setPosition();
                    break;
                case this.group + "_jumpToLetter":
                    this.jumpToLetter(event);
                    break;
            }
        }

        mListOptionList.prototype.jumpToLetter = function (event) {
            if (event.detail.questionName !== this.questionName) {
                return;
            }

            var char = String.fromCharCode(event.detail.keypressed).toLowerCase();
            var curchar = this.inputelement.value.substring(0,1).toLowerCase();

            for (var i = 0; i < this.list.length; i++) {
                var itemlabel = this.list[i].querySelector('.a-label-option');
                var firstletter = itemlabel.innerHTML.substring(0, 1).toLowerCase();

                if (firstletter === char) {
                    var input = itemlabel.parentNode.parentNode.querySelector('input');

                    if (input.checked) {
                        continue;
                    } else if (firstletter === curchar && this.list[i].getAttribute('data-list-position') < this.getCurrentListPosition()) {
                        continue;
                    } else {
                        this.setCurrentListPosition(this.list[i].getAttribute('data-list-position'));
                        itemlabel.parentNode.parentNode.querySelector('input').checked = true;
                        return;
                    }
                }
            }
        }

        mListOptionList.prototype.displayicon = function (prop) {
            if (prop === true) {
                this.element.classList.add('display-icons');
            }
        }

        mListOptionList.prototype.clearEntries = function () {
            // call the parent (super) method
            component.prototype.clearEntries.call(this);

            this.setCurrentListPosition(-1);
        }

        mListOptionList.prototype.restoreEntries = function (event) {
            if (event.detail.questionName !== this.questionName) {
                return;
            }

            this.setCurrentListPosition();
        }

        mListOptionList.prototype.buildList = function () {
            return this.element.querySelectorAll('.m-option-base');
        }

        mListOptionList.prototype.indexList = function () {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].setAttribute('data-list-position', i);
                this.list[i].querySelector('input').tabIndex = -1;
            }
        }

        mListOptionList.prototype.setCurrentListPosition = function (position) {
            if (typeof position !== 'undefined') {
                this.currentlistposition = parseInt(position);
                return;
            }

            for (var i = 0; i < this.list.length; i++) {
                var curelement = this.list[i];
                var element = curelement.querySelector('input:checked');

                if (element !== null) {
                    this.currentlistposition = i;
                    return;
                }
            }
        }

        mListOptionList.prototype.getCurrentListPosition = function () {
            return parseInt(this.currentlistposition);
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
                case 13: // enter key
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    this.hideList();
                    break;
                case 38: // up arrow
                    this.navigateUp();
                    break;
                case 40: // down arrow
                    this.navigateDown();
                    break;
            }
        }

        mListOptionList.prototype.onKeyup = function () {
            switch (this.keypressed) {
                case 13:
                case 38:
                case 40:
                    break;
                default:
                    this.updateSelectedEntry(this.getCurrentListPosition());
                    this.updateScrollPosition(this.getCurrentListPosition());
            }
        }

        mListOptionList.prototype.navigateUp = function () {
            if (this.getCurrentListPosition() < 1) {
                return;
            }

            this.setCurrentListPosition(this.getCurrentListPosition()-1);

            if (this.getCurrentListPosition() === -1) {
                return;
            }

            this.updateSelectedEntry(this.getCurrentListPosition());
            this.updateScrollPosition(this.getCurrentListPosition());
        }

        mListOptionList.prototype.navigateDown = function () {
            if (this.getCurrentListPosition() === this.list.length - 1) {
                return;
            }

            this.setCurrentListPosition(this.getCurrentListPosition()+1);
            this.updateSelectedEntry(this.getCurrentListPosition());
            this.updateScrollPosition(this.getCurrentListPosition());
        }

        mListOptionList.prototype.updateScrollPosition = function (position) {
            if (position === -1) {
                return;
            }

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

        mListOptionList.prototype.setWidth = function () {
            if (this.inputelement.style.width.length > 0) {
                if (this.inputelement.style.width.indexOf('em') !== -1) {
                    this.element.style.width = 'calc(' + this.inputelement.style.width + ' + 44px + 16px)';
                } else {
                    this.element.style.width = this.inputelement.style.width;
                }
            }
        }

        mListOptionList.prototype.setPosition = function () {
            var inputposition = this.inputelement.parentNode.offsetLeft;
            this.element.style.left = inputposition + 'px';
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
            this.element.dispatchEvent(beginresize);

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
            this.element.dispatchEvent(endresize);
        }

        return mListOptionList;

    });