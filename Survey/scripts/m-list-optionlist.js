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
            this.emptyplaceholder = 'no items to display';
            this.notenoughcharactersplaceholder = 'begin typing to display the list';
            this.buttonelement = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] > div');
            this.element = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] div.m-list-optionlist');
        }

        mListOptionList.prototype = Object.create(component.prototype);
        mListOptionList.prototype.constructor = mListOptionList;

        mListOptionList.prototype.init = function () {
            this.configureProperties();
            this.addEmptyPlaceholder();
            this.addCharRestrictionPlaceholder();
            this.setWidth();
            this.configureIncomingEventListeners();
            this.configureOnesize();
            this.configurationComplete();
        }

        mListOptionList.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + "_requestSize", this, false);
        }

        mListOptionList.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'resize':
                case this.group + '_requestSize':
                    this.onResize();
                    break;
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
            placeholderelement.innerHTML = this.emptyplaceholder;
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
            var inputelement = this.buttonelement.getElementsByClassName('a-input-list-dropdown')[0];
            var inputelementwidth = inputelement.style.width;
            if (inputelementwidth.length > 0) {
                this.element.classList.add('manual-width');
                this.element.style.width = this.buttonelement.offsetWidth + 'px';
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