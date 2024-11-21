define(['component'],
    function (component) {

        /**
         * @constructor
         * @param id {string} Unique question ID allocated by Dimensions to this control.
         * @param group {string} User-specified name plus generated prefix/suffix to identify grouped elements.
         */
        function mList(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup=' + this.group + '] ul.m-list');
            this.inputelement = document.querySelector('input[data-questiongroup="' + this.group + '"]');
            this.container = this.element.closest('div.o-question-response[data-questiongroup="' + this.group + '"]');

            this.filtermethod = 'contains';
            this.list = null;
            this.controltype = '';
            this.isExact = true;
            this.source = null;
            this.currentlistposition = -1;
            this.mincharacters = 0;
            this.hasbeendisplayed = false;
            this.userspecifiedheight = null;
            this.width = 0;
            this.height = 0;
            this.containerScrollTop = 0;
            this.containerScrollLeft = 0;
            this.documentScrollTop = 0;
            this.documentScrollLeft = 0;
            this.controlHeight = 39; // height of control component in PX
        }

        mList.prototype = Object.create(component.prototype);
        mList.prototype.constructor = mList;

        /**
         * Initialises this component.
         *
         * Saves the initial value, sets up event listeners and handles any other tasks
         * that are required as the component is constructed. Broadcasts a 'complete'
         * event once all tasks are completed.
         */
        mList.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.list = this.buildList();
            this.setListType();
            this.calculateWidth();
            this.controlHeight = this.calculateControlHeight();
            this.setPosition();
            this.removeTabIndex();
            this.configurationComplete();
        }

        mList.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener('clearEntries', this.handleEvent.bind(this), false);
            document.addEventListener('hideList', this.handleEvent.bind(this), false);
            document.addEventListener('scroll', this.handleEvent.bind(this), true);
            document.addEventListener('showList', this.handleEvent.bind(this), false);
            document.addEventListener('toggleList', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_enableExclusive', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_listWidth', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_requestListWidth', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_requestValue', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_sendKeyToList', this.handleEvent.bind(this), false);
        }

        mList.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('mousedown', this.handleEvent.bind(this), false);
        }

        /**
         * Bind listeners for events that are broadcast from other components on the page.
         */
        mList.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'clearEntries':
                    this.clearEntriesFromExternal(event);
                    break;
                case 'hideList':
                    this.hideList(event);
                    break;
                case 'mousedown':
                    this.onMousedown(event);
                    break;
                case 'scroll':
                    this.updateListPosition(event.target)
                    break;
                case 'showList':
                    this.showList(event);
                    break;
                case 'toggleList':
                    this.toggleList(event);
                    break;
                case this.group + '_enableExclusive':
                    this.enableExclusive();
                    break;
                case this.group + '_listWidth':
                    this.setWidthFromControl(event);
                    break;
                case this.group + '_requestListWidth':
                    this.notifyElementWidth();
                    break;
                case this.group + '_requestValue':
                    this.notifyListInput();
                    break;
                case this.group + '_sendKeyToList':
                    this.processKeyStroke(event);
                    break;
            }
        }

        /**
         * Sets whether the list will automatically return the
         * value from an entry if the label matches the user's input.
         *
         * Automagically called by the property setter function.
         * @param prop {boolean}
         */
        mList.prototype.exact = function (prop) {
            if (prop === false) {
                this.isExact = false;
            }
        }

        mList.prototype.clearEntriesFromExternal = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            this.clearSelectedOption();
        }

        mList.prototype.setListType = function () {
            if (this.container.classList.contains('o-question-dropdown')) {
                this.controltype = 'droplist';
                this.filtermethod = 'jump';
            } else {
                this.controltype = 'combobox';
            }

            this.element.setAttribute('aria-label', 'options');
        }

        /**
         * Clears the list's value in response to an exclusive
         * option (generally checkbox) being selected in the group
         */
        mList.prototype.enableExclusive = function () {
            this.setListIndex(-1);
            this.clearSelectedOption();
        }

        mList.prototype.intialiseListForFirstDisplay = function (event) {
            this.indexList();
            this.restoreSelection(event);
            this.setListIndex();
            this.updateScrollPosition(this.getListIndex());
        }

        /**
         * Sets the minimum number of characters to be entered before
         * the list is displayed to the user.
         *
         * Automagically called by the property setter function.
         * @param prop {int}
         */
        mList.prototype.mincharactersforlist = function (prop) {
            this.mincharacters = prop;
        }

        mList.prototype.filtertype = function (prop) {
            this.filtermethod = prop;
        }

        /**
         * Sets whether the list will jump to the entry that
         * starts with the letter matching the user's keystroke.
         *
         * Automagically called by the property setter function.
         * @param prop {boolean}
         */
        mList.prototype.jumptofirstletter = function (prop) {
            if (prop === true) {
                this.filtertype = 'jump';
            }
        }

        mList.prototype.processKeyStroke = function (event) {
            switch (event.detail.keypressed) {
                case 35: // end key
                    this.navigateLast();
                    break;
                case 36: // home key
                    this.navigateFirst();
                    break;
                case 38: // up arrow
                    this.navigateUp();
                    break;
                case 40: // down arrow
                    this.navigateDown();
                    break;
                case 9: // tab key
                case 13: // enter
                case null:
                    break;
                default:
                    this.filterList(event.detail);
                    break;
            }
        }

        mList.prototype.onMousedown = function (event) {
            var selectedOption = event.target;

            if (selectedOption.tagName !== 'LI') {
                return;
            }

            // hide the list if a restricted option is selected
            if (selectedOption.classList.contains('a-list-placeholder-restriction')) {
                this.hideList();
                return;
            }

            // hide the list if a restricted option is selected
            if (selectedOption.classList.contains('a-list-placeholder-empty')) {
                this.hideList();
                return;
            }

            if (this.element.contains(selectedOption)) {
                event.stopImmediatePropagation();
                this.setSelectedOptionByNode(selectedOption);
            }

            if (!this.container.contains(event.target)) {
                this.hideList();
            }

            this.notifyListInput();
        }

        mList.prototype.restoreSelection = function () {
            var currentselection = this.element.querySelector('[data-value="' + this.inputelement.value + '"]');

            if (currentselection === null) {
                return;
            }

            this.setSelectedOptionByNode(currentselection);
        }

        mList.prototype.setSelectedOptionByIndex = function (index) {
            this.clearSelectedOption();

            var currentvisiblelist = this.buildVisibleList();
            var currententry = currentvisiblelist[index];

            if (typeof currententry === 'undefined') {
                return;
            }

            currententry.classList.add('selected');
            currententry.setAttribute('data-selected', 'selected');
            currententry.setAttribute('aria-selected', 'true');
        }

        mList.prototype.setSelectedOptionByNode = function (selectedOption) {
            this.clearSelectedOption();

            selectedOption.classList.add('selected');
            selectedOption.setAttribute('data-selected', 'selected');
            selectedOption.setAttribute('aria-selected', 'true');
            this.setListIndex(selectedOption.getAttribute('data-list-position'));
        }

        mList.prototype.clearSelectedOption = function () {
            var selectedOption = this.element.querySelector('li.selected');

            if (selectedOption !== null) {
                selectedOption.removeAttribute('data-selected');
                selectedOption.removeAttribute('aria-selected');
                selectedOption.classList.remove('selected');
            }
        }

        mList.prototype.removeTabIndex = function () {
            this.element.setAttribute('tabindex', '-1');
        }

        /**
         * Required to prevent body overflow issues where a long droplist is positioned
         * near the bottom of a page and the page height accommodates the droplist even
         * though it is invisible and absolutely positioned and should not contribute.
         *
         * @return {void}
         */
        mList.prototype.setPosition = function () {
            this.element.style.bottom = '0';
        }

        mList.prototype.notenoughcharacters = function (prop) {
            var placeholderelement = document.createElement('li');
            placeholderelement.classList.add('a-list-placeholder-restriction');
            placeholderelement.innerHTML = prop;
            this.element.appendChild(placeholderelement);
        }

        mList.prototype.noitemsinlist = function (prop) {
            var placeholderelement = document.createElement('li');
            placeholderelement.classList.add('a-list-placeholder-empty');
            placeholderelement.innerHTML = prop;
            this.element.appendChild(placeholderelement);
        }

        /**
         * Calculates the width of the list.
         */
        mList.prototype.calculateWidth = function () {
            var elementdims = getComputedStyle(this.element);
            var listwidth = Math.ceil(parseFloat(elementdims.width));
            var width = Math.min(listwidth, this.getContainerWidth());

            this.setWidth(width);
            this.requestControlWidth();
        }

        mList.prototype.getContainerWidth = function () {
            var padding = 32;
            var containerdims = getComputedStyle(this.container.closest('question'));
            return Math.floor(parseFloat(containerdims.width) - padding);
        }

        mList.prototype.setWidth = function (width) {
            // we are setting the overall width based on the width of the text and must add padding
            this.element.style.width = width + 'px';
            this.width = width;
            this.notifyElementWidth();
        }

        mList.prototype.setWidthFromControl = function (event) {
            if (event.detail.element === this.element) {
                return;
            }

            if (event.detail.width > this.width) {
                console.log('Setting list width from control ' + this.id);
                var padding = 32;
                var newwidth = Math.min(event.detail.width + padding, this.getContainerWidth());

                this.element.style.width = newwidth + 'px';
                this.width = newwidth;
            }
        }

        /**
         * Return the height of the control component from the CSS variables
         *
         * @returns {int}
         */
        mList.prototype.calculateControlHeight = function () {
            var height = getComputedStyle(document.documentElement).getPropertyValue('--combobox-height');
            var paddingTop = getComputedStyle(document.documentElement).getPropertyValue('--combobox-padding-top');
            var paddingBottom = getComputedStyle(document.documentElement).getPropertyValue('--combobox-padding-bottom');

            return parseInt(height) + parseInt(paddingTop) + parseInt(paddingBottom);
        }

        mList.prototype.listsize = function (prop) {
            // first list item is 35px high, subsequent are 27, end padding is 8
            var height = 35 + (27 * (prop - 1)) + 8;
            this.userspecifiedheight = height;
            this.element.style.maxHeight = height + 'px';
        }

        mList.prototype.buildList = function () {
            return this.element.querySelectorAll('li:not([class^="a-list-placeholder-"])');
        }

        mList.prototype.buildVisibleList = function () {
            return this.element.querySelectorAll('li:not(.filter-hidden):not([class^="a-list-placeholder-"])');
        }

        mList.prototype.indexList = function () {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].setAttribute('data-list-position', i);
            }
        }

        mList.prototype.setListIndex = function (position) {
            if (typeof position !== 'undefined') {
                this.currentlistposition = parseInt(position);
                return;
            }

            var selectedOption = this.container.querySelector('li.selected');

            if (selectedOption === null) {
                this.currentlistposition = -1;
            } else {
                this.currentlistposition = selectedOption.getAttribute('data-list-position');
            }
        }

        mList.prototype.getListIndex = function () {
            return parseInt(this.currentlistposition);
        }

        mList.prototype.updateScrollPosition = function (position) {
            this.element.scrollTop = 0;//set to top
            var currentitem = this.buildVisibleList()[position];

            if (typeof currentitem === "undefined") {
                return;
            }

            var scrollposition = currentitem.offsetTop - this.element.clientHeight;
            this.element.scrollTop = scrollposition + 100;
        }

        mList.prototype.updateListPosition = function (target) {
            if (target === this.element) {
                return;
            }

            if (target !== document && !target.contains(this.element)) {
                return;
            }

            var scrollLeft = null;
            var scrollTop = null;

            if (typeof target.scrollLeft !== 'undefined') {
                scrollLeft = target.scrollLeft;
                if (scrollLeft !== this.containerScrollLeft) {
                    this.containerScrollLeft = scrollLeft;
                    this.element.style.marginLeft = 0 - scrollLeft + 'px';
                    return;
                }
            } else {
                scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
                if (scrollLeft !== this.documentScrollLeft) {
                    this.documentScrollLeft = scrollLeft;
                    this.element.style.marginLeft = 0 - scrollLeft + 'px';
                    return;
                }
            }

            if (typeof target.scrollTop !== 'undefined') {
                scrollTop = target.scrollTop;

                if (this.container.classList.contains('direction-up')) {
                    scrollTop += this.height + this.controlHeight;
                }

                if (scrollTop !== this.containerScrollTop) {
                    this.containerScrollTop = scrollTop;
                    this.element.style.marginTop = 0 - scrollTop + 'px';
                }
            } else {
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

                if (this.container.classList.contains('direction-up')) {
                    scrollTop += this.height + this.controlHeight;
                }

                if (scrollTop !== this.documentScrollTop) {
                    this.documentScrollTop = scrollTop;
                    this.element.style.marginTop = -1 - scrollTop + 'px';
                }
            }
        }

        mList.prototype.setDropListDirection = function () {
            // reset to default direction before performing checks
            if (this.element.getBoundingClientRect().height > 0) {
                this.height = this.element.getBoundingClientRect().height;
            }

            var tempMargin = this.element.style.marginTop || '';

            this.container.classList.remove('direction-up');
            this.container.classList.add('direction-down');
            this.element.style.marginTop = '';
            this.element.style.maxHeight = (this.userspecifiedheight > 0) ? this.userspecifiedheight + 'px' : '';
            this.element.style.removeProperty('bottom');
            //var paddingAllowance = 10;

            var footer = document.getElementsByClassName('footer')[0];
            var viewportBounds = this.checkViewportBounds(this.element);
            var footerCollision = this.checkCollision(this.element, footer);

            var distanceToTop = this.element.getBoundingClientRect().top;
            var distanceToBottom = window.innerHeight - this.element.getBoundingClientRect().bottom;

            this.element.style.marginTop = tempMargin;

            if (distanceToTop > distanceToBottom && (viewportBounds.bottom || footerCollision)) {
                this.container.classList.remove('direction-down');
                this.container.classList.add('direction-up');

                if (distanceToTop < Math.max(this.userspecifiedheight, this.height)) {
                    // temporarily removed - limits max height of element to ensure it will fit in available space
                    //  this.element.style.maxHeight = distanceToTop - paddingAllowance + 'px';
                }

            } else if (distanceToBottom < Math.max(this.userspecifiedheight, this.height)) {
                // temporarily removed - limits max height of element to ensure it will fit in available space
                //  this.element.style.maxHeight = distanceToBottom - paddingAllowance + 'px';
            }

            this.updateListPosition(document);
        }

        mList.prototype.navigateFirst = function () {
            this.currentlistposition = 0;
            this.setSelectedOptionByIndex(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        mList.prototype.navigateLast = function () {
            this.currentlistposition = this.list.length - 1;
            this.setSelectedOptionByIndex(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        mList.prototype.navigateUp = function () {
            if (this.currentlistposition === 0) {
                return;
            }

            if (this.currentlistposition === -1) {
                this.currentlistposition = 0;
            } else {
                this.currentlistposition--;
            }

            this.setSelectedOptionByIndex(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        mList.prototype.navigateDown = function () {
            var lastpos = this.list.length - 1;

            if (this.currentlistposition === lastpos) {
                return;
            }

            if (this.currentlistposition === -1) {
                this.currentlistposition = 0;
            } else {
                this.currentlistposition++;
            }

            this.setSelectedOptionByIndex(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        mList.prototype.showList = function (event) {
            if (this.group === event.detail.group) {

                if (!this.hasbeendisplayed) {
                    this.intialiseListForFirstDisplay(event);
                    this.hasbeendisplayed = true;
                }

                this.setDropListDirection();
                this.element.classList.add('visible');
            } else {
                this.hideList(event);
            }
        }

        mList.prototype.hideList = function (event) {
            if (typeof event !== 'undefined' && event.detail.group !== this.group) {
                return;
            }

            this.element.classList.remove('visible');
        }

        mList.prototype.toggleList = function (event) {
            if (event.detail.group !== this.group) {
                return;
            }

            if (!this.hasbeendisplayed) {
                this.intialiseListForFirstDisplay(event);
                this.hasbeendisplayed = true;
            }

            this.setDropListDirection();
            this.element.classList.toggle('visible');
        }

        mList.prototype.listsource = function (prop) {
            this.source = prop;
        }

        mList.prototype.notifyElementWidth = function () {
            if (!this.width) {
                this.calculateWidth();
                return;
            }

            var widthEvent = new CustomEvent(this.group + '_listWidth', {bubbles: true, detail: this});
            this.element.dispatchEvent(widthEvent);
        }

        mList.prototype.requestControlWidth = function () {
            var widthEvent = new CustomEvent(this.group + '_requestControlWidth', {bubbles: true, detail: this});
            this.element.dispatchEvent(widthEvent);
        }

        /**
         * Removes any undesirable characters from the user-supplied label.
         * @param {string} textstring
         * @returns {string}
         */
        mList.prototype.sanitiseText = function (textstring) {
            textstring = textstring.replace(/[\r\n\t]/mg, ' ');
            textstring = textstring.replace(/\s\s+/mg, ' ');
            return textstring.trim();
        }

        mList.prototype.filterList = function (eventdetail) {
            this.setListIndex();
            this.list = this.buildList();

            switch (this.filtermethod) {
                case 'starts':
                    this.filterListStarts(eventdetail.element.value);
                    break;
                case 'contains':
                    this.filterListContains(eventdetail.element.value);
                    break;
                case 'jump':
                    this.jumpToLetter(eventdetail.keybuffer);
            }
        }

        mList.prototype.jumpToLetter = function (inputstring) {
            if (!inputstring.length) {
                return;
            }

            var list = this.buildVisibleList();
            var currentfirstletter = '';

            if (this.currentlistposition !== -1) {
                currentfirstletter = list[this.currentlistposition].textContent.substring(0, 1).toLowerCase();
            }

            var listpasses = 0;

            for (var i = 0; i < list.length; i++) {
                var currentitem = list[i];
                var currentitemlabel = this.sanitiseText(currentitem.innerText.toLowerCase());

                if (currentitemlabel.indexOf(inputstring) === 0) {
                    if ((listpasses === 0 && currentfirstletter === inputstring.substring(0, 1) && i < this.currentlistposition) ||
                        (currentitem.classList.contains('selected') && inputstring.length === 1)) {
                        // this is required if we've reached the end of the list and landed on an active item
                        // as the last element -- we will need to loop back for another pass at this point
                        if (listpasses === 0 && i === list.length - 1) {
                            listpasses = 1;
                            i = 0;
                        }
                        continue;

                    } else {
                        this.setSelectedOptionByIndex(i);
                        this.setListIndex(i);
                        this.notifyListInput();
                        return;
                    }
                }

                // this is required to reiterate the list for a second time in case we started part way
                // through with an existing selection
                if (listpasses === 0 && i === list.length - 1) {
                    listpasses = 1;
                    i = 0;
                }
            }
        }

        mList.prototype.filterListStarts = function (inputstring) {
            var exactmatch = false;
            var droplistparentnode = this.element.parentNode;
            droplistparentnode.removeChild(this.element);

            if (inputstring.length < this.mincharacters) {
                this.clearSelectedOption();
                this.displayEmptyMessage(false);
                this.displayMinCharacterMessage(true);
                inputstring = '';
            } else {
                this.displayMinCharacterMessage(false);
            }

            inputstring = inputstring.toLowerCase();
            var visibleitems = this.list.length;

            for (var i = 0; i < this.list.length; i++) {
                var itemlabel = this.sanitiseText(this.list[i].innerText.toLowerCase());

                if (itemlabel === inputstring && this.isExact) {
                    exactmatch = true;
                    this.clearSelectedOption();
                    this.setSelectedOptionByNode(this.list[i]);
                }

                if (itemlabel.indexOf(inputstring) === 0) {
                    this.list[i].classList.remove('filter-hidden');
                } else {
                    this.list[i].classList.add('filter-hidden');
                    visibleitems--;
                }
            }

            if (visibleitems === 0) {
                this.clearSelectedOption();
                this.displayEmptyMessage(true);
            } else {
                this.displayEmptyMessage(false);
            }

            if (this.isExact && !exactmatch) {
                this.clearSelectedOption();
            }

            droplistparentnode.appendChild(this.element);
            this.list = this.buildVisibleList();

            if (this.isExact && exactmatch) {
                this.notifyListInput();
            }
        }

        mList.prototype.filterListContains = function (inputstring) {
            var exactmatch = false;

            if (inputstring.length < this.mincharacters) {
                this.clearSelectedOption();
                this.displayEmptyMessage(false);
                this.displayMinCharacterMessage(true);
                return;
            } else {
                this.displayMinCharacterMessage(false);
            }

            inputstring = inputstring.toLowerCase();
            var visibleitems = this.list.length;
            var droplistparentnode = this.element.parentNode;
            droplistparentnode.removeChild(this.element);

            for (var i = 0; i < this.list.length; i++) {
                var itemlabel = this.sanitiseText(this.list[i].innerText.toLowerCase());

                if (itemlabel === inputstring && this.isExact) {
                    exactmatch = true;
                    this.clearSelectedOption();
                    this.setSelectedOptionByNode(this.list[i]);
                }

                if (itemlabel.indexOf(inputstring) !== -1) {
                    this.list[i].classList.remove('filter-hidden');
                } else {
                    this.list[i].classList.add('filter-hidden');
                    visibleitems--;
                }
            }

            if (visibleitems === 0) {
                this.clearSelectedOption();
                this.displayEmptyMessage(true);
            } else {
                this.displayEmptyMessage(false);
            }

            if (this.isExact && !exactmatch) {
                this.clearSelectedOption();
            }

            droplistparentnode.appendChild(this.element);
            this.list = this.buildVisibleList();

            if (this.isExact && exactmatch) {
                this.notifyListInput();
            }
        }

        mList.prototype.notifyListInput = function () {
            var listEvent = new CustomEvent(this.group + '_updateListInput', {bubbles: true, detail: this});
            this.element.dispatchEvent(listEvent);
        }

        mList.prototype.displayMinCharacterMessage = function (visibility) {
            if (visibility) {
                this.element.classList.add('charrestriction');
            } else {
                this.element.classList.remove('charrestriction');
            }
        }

        mList.prototype.displayEmptyMessage = function (visibility) {
            if (visibility) {
                this.element.classList.add('empty');
            } else {
                this.element.classList.remove('empty');
            }
        }

        return mList;

    });