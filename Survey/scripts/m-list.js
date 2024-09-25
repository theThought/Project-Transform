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
            this.inputelement = document.querySelector('input.a-input-combobox[data-questiongroup="' + this.group + '"]');
            this.container = this.element.closest('div[data-questiongroup="' + this.group + '"]');

            this.filtermethod = 'contains';
            this.list = null;
            this.isExact = true;
            this.source = null;
            this.currentlistposition = -1;
            this.mincharacters = 0;
            this.defaultplaceholder = 'Select';
            this.hasbeendisplayed = false;
            this.width = 0;
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
            this.list = this.buildList();
            this.setWidth();
            this.setPosition();
            this.removeTabIndex();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        mList.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener('hideList', this.handleEvent.bind(this), false);
            document.addEventListener('showList', this.handleEvent.bind(this), false);
            document.addEventListener('toggleList', this.handleEvent.bind(this), false);
            document.addEventListener(this.group + '_requestListWidth', this.handleEvent.bind(this), false);
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
                case 'hideList':
                    this.hideList(event);
                    break;
                case 'mousedown':
                    this.onMousedown(event);
                    break;
                case 'showList':
                    this.showList(event);
                    break;
                case 'toggleList':
                    this.toggleList(event);
                    break;
                case this.group + '_requestListWidth':
                    this.notifyListWidth();
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

        mList.prototype.intialiseListForFirstDisplay = function (event) {
            this.indexList();
            this.restoreSelection(event);
            this.setCurrentListPosition();
            this.updateScrollPosition(this.getCurrentListPosition());
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

            var listEvent = new CustomEvent(this.group + '_updateListInput', {bubbles: true, detail: this});
            this.element.dispatchEvent(listEvent);
        }

        mList.prototype.restoreSelection = function () {
            var currentselection = this.element.querySelector('[data-value="' + this.inputelement.value + '"]');

            if (currentselection === null) {
                return;
            }

            this.setSelectedOptionByNode(currentselection);
        }

        mList.prototype.selectOption = function (selectedOption) {
            if (!this.element.classList.contains('visible')) {
                return;
            }

            this.setSelectedOptionByNode(selectedOption);
            this.hideList();
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
        }

        mList.prototype.setSelectedOptionByNode = function (selectedOption) {
            this.clearSelectedOption();

            selectedOption.classList.add('selected');
            selectedOption.setAttribute('data-selected', 'selected');
            this.setCurrentListPosition(selectedOption.getAttribute('data-list-position'));
        }

        mList.prototype.clearOptions = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            this.clearSelectedOption();
        }

        mList.prototype.clearSelectedOption = function () {
            var previousOption = this.container.querySelector('li.selected');
            if (previousOption !== null) {
                previousOption.removeAttribute('data-selected');
                previousOption.classList.remove('selected');
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

        mList.prototype.setWidth = function () {
            var droplistpadding = 32; // the drop list has 32px of padding, the input has 64px

            var droplistdims = getComputedStyle(this.element);
            var droplistwidth = parseFloat(droplistdims.width) - (droplistpadding);

            var initialwidth = droplistwidth;
            var entries = this.buildList();
            var entrycount = entries.length;
            var longestentry = '';

            for (var i = 0; i < entrycount; i++) {
                if (entries[i].classList.contains('a-list-placeholder-empty')) {
                    continue;
                }

                if (entries[i].classList.contains('a-list-placeholder-restriction')) {
                    continue;
                }

                if (entries[i].textContent.length > longestentry.length) {
                    longestentry = this.sanitiseText(entries[i].textContent);
                }
            }

            // get the approximate text width
            var textwidth = this.getWidthOfText(longestentry);

            var containerstyles = getComputedStyle(this.container.closest('question'));
            var maxavailablewidth = parseFloat(containerstyles.width);

            var newwidth = Math.min(Math.max(droplistwidth, textwidth), maxavailablewidth);

            if (newwidth !== initialwidth) {
                this.notifyWidthChange()
            }

            this.element.style.width = newwidth + droplistpadding + 'px';
            this.width = newwidth;
            this.notifyListWidth();
        }

        mList.prototype.getWidthOfText = function (text) {
            var tmp = document.createElement("span");
            tmp.style.whiteSpace = 'nowrap';
            tmp.innerHTML = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            this.container.appendChild(tmp);
            var width = parseFloat(tmp.getBoundingClientRect().width);
            this.container.removeChild(tmp);
            return width;
        }

        mList.prototype.listsize = function (prop) {
            var height = (27 * prop);
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

        mList.prototype.setCurrentListPosition = function (position) {
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

        mList.prototype.getCurrentListPosition = function () {
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

        mList.prototype.setDropListDirection = function () {
            // reset to default direction before performing checks
            this.container.classList.remove('direction-up');
            this.container.classList.add('direction-down');
            this.element.style.maxHeight = (this.userspecifiedheight > 0) ? this.userspecifiedheight + 'px' : '';
            this.element.style.removeProperty('bottom');
            var paddingAllowance = 10;

            var footer = document.getElementsByClassName('footer')[0];
            var viewportBounds = this.checkViewportBounds(this.element);
            var footerCollision = this.checkCollision(this.element, footer);

            var distanceToTop = this.element.getBoundingClientRect().top;
            var distanceToBottom = window.innerHeight - this.element.getBoundingClientRect().bottom;

            if (distanceToTop > distanceToBottom && (viewportBounds.bottom || footerCollision)) {
                this.container.classList.remove('direction-down');
                this.container.classList.add('direction-up');

                if (distanceToTop < Math.max(this.userspecifiedheight, this.element.getBoundingClientRect().height)) {
                    this.element.style.maxHeight = distanceToTop - paddingAllowance + 'px';
                }

            } else if (distanceToBottom < Math.max(this.userspecifiedheight, this.element.getBoundingClientRect().height)) {
                this.element.style.maxHeight = distanceToBottom - paddingAllowance + 'px';
            }
        }

        mList.prototype.notifyWidthChange = function () {
            var widthEvent = new CustomEvent('widthEvent', {bubbles: true, detail: this});
            this.element.dispatchEvent(widthEvent);
        }

        mList.prototype.notifyListWidth = function () {
            var widthEvent = new CustomEvent(this.group + '_listWidth', {bubbles: true, detail: this.width});
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
            this.setCurrentListPosition();
            this.list = this.buildList();

            switch (this.filtermethod) {
                case 'starts':
                    this.filterListStarts(eventdetail.element.value);
                    break;
                case 'contains':
                    this.filterListContains(eventdetail.element.value);
                    break;
            }
        }

        mList.prototype.filterListStarts = function (inputstring) {
            var exactmatch = false;
            var droplistparentnode = this.element.parentNode;
            droplistparentnode.removeChild(this.element);

            if (inputstring.length < this.mincharacters) {
                this.clearOptions();
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
                    this.clearOptions();
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
                this.clearOptions();
                this.displayEmptyMessage(true);
            } else {
                this.displayEmptyMessage(false);
            }

            if (this.isExact && !exactmatch) {
                this.clearOptions();
            }

            droplistparentnode.appendChild(this.element);
            this.list = this.buildVisibleList();

            if (this.isExact && exactmatch) {
                var listEvent = new CustomEvent(this.group + '_updateListInput', {bubbles: true, detail: this});
                this.element.dispatchEvent(listEvent);
            }
        }

        mList.prototype.filterListContains = function (inputstring) {
            var exactmatch = false;

            if (inputstring.length < this.mincharacters) {
                this.clearOptions();
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
                    this.clearOptions();
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
                this.clearOptions();
                this.displayEmptyMessage(true);
            } else {
                this.displayEmptyMessage(false);
            }

            if (this.isExact && !exactmatch) {
                this.clearOptions();
            }

            droplistparentnode.appendChild(this.element);
            this.list = this.buildVisibleList();

            if (this.isExact && exactmatch) {
                var listEvent = new CustomEvent(this.group + '_updateListInput', {bubbles: true, detail: this});
                this.element.dispatchEvent(listEvent);
            }
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