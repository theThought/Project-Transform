define(['component'],
    function (component) {

        /**
         * Organism: Input combo-box with list
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oOpenendSearch(id, group) {
            component.call(this, id, group);
            
            this.element = document.querySelector('input.a-input-openend-search[data-questionid="' + this.id + '"]');
            this.droplist = document.querySelector('input.a-input-openend-search[data-questionid="' + this.id + '"] + ul');
            this.wrapper = document.querySelector('div[class*=o-openendsearch][data-questiongroup="' + this.group + '"]');
            this.container = this.element.closest('div[data-questiongroup="' + this.group + '"]');
            
            this.hiddenelement = null;
            this.mincharacters = 0;
            this.keypressed = null;
            this.keybuffer = '';
            
            this.list = null;
            this.location = null;
            this.source = null;
            this.valuefrom = null;
            this.descriptionfrom = null;

            this.currentlistposition = -1;
            this.isExact = true;
            this.filtermethod = 'contains';
            this.listtype = 'combobox';

            this.defaultplaceholder = 'Select';
            this.isjumpingtoletter = false;
            this.manualWidth = false;
            this.userspecifiedheight = 0;
            this.keytimer = null;
            this.keytimerlimit = 500; // time in milliseconds at which the buffer is cleared
        }

        oOpenendSearch.prototype = Object.create(component.prototype);
        oOpenendSearch.prototype.constructor = oOpenendSearch;

        oOpenendSearch.prototype.init = function () {
            
                this.list = this.buildList();
                this.indexList();
                this.manualWidth = this.checkManualWidth();
                this.cloneInputElement();
                this.restoreSelection();
                this.setCurrentListPosition();
                this.updateScrollPosition(this.getCurrentListPosition());
                this.configureProperties();
                this.storeInitialValue();
                
                this.setWidth();
                this.setPosition();
                this.setTabIndex();
                this.setWrapperType();
                this.configureInitialVisibility();
                this.processVisibilityRules();
                this.configureInitialFilter();
                this.configureIncomingEventListeners();
                this.configureLocalEventListeners();
                this.configurationComplete();
              
        };

        oOpenendSearch.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener('mousedown', this, false);
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("restoreEntries", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener("broadcastChange", this, false);
            document.addEventListener(this.group + '_optionVisibility', this, false);
        }

        oOpenendSearch.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('input', this, false);
            this.element.addEventListener('keydown', this, false);
            this.element.addEventListener('keyup', this, false);
            this.element.addEventListener('change', this, false);
            this.element.addEventListener('focusin', this, false);
            this.element.addEventListener('focusout', this, false);
            this.element.addEventListener('cut', this, false);
            this.container.addEventListener('scroll', this, false);
        }

        oOpenendSearch.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'cut':
                    this.onCut(event);
                    break;
                case 'clearEntries':
                    this.clearEntriesFromExternal(event);
                    break;
                case 'restoreEntries':
                    this.restoreEntries(event);
                    this.setWidth();
                    this.restoreSelection();
                    break;
                case this.group + '_optionVisibility':
                    this.receiveOptionVisibilityChange(event);
                    break;
                case 'change':
                    this.onChange(event);
                    break;
                case this.group + '_enableExclusive':
                    this.onEnableExclusive(event);
                    break;
                case 'mousedown':
                    this.onClick(event);
                    break;
                case 'keydown':
                    this.getKeyPressed(event);
                    this.onKeydown(event);
                    break;
                case 'keyup':
                    this.onKeyup();
                    this.onChange(event);
                    break;
                case 'focusin':
                case 'input':
                    this.onFocusIn();
                    break;
                case 'focusout':
                    this.onFocusOut(event);
                    break;
                case 'broadcastChange':
                    this.processVisibilityRulesFromExternalTrigger(event);
                    break;
                case 'scroll':
                    this.updateDroplistPosition(event);
                    break;
            }
        }

        oOpenendSearch.prototype.receiveOptionVisibilityChange = function (event) {
            if (this.hiddenelement.value === event.detail.itemValue) {
                this.clearEntries();
            }
        }

        oOpenendSearch.prototype.updateDroplistPosition = function () {
            this.droplist.style.marginLeft = 0 - this.container.scrollLeft + 'px';
        }

        oOpenendSearch.prototype.exact = function (prop) {
            if (prop === false) {
                this.isExact = false;
            }
        }

        oOpenendSearch.prototype.filtertype = function (prop) {
            this.filtermethod = prop;
        }

        oOpenendSearch.prototype.jumptofirstletter = function (prop) {
            if (prop === true) {
                this.isjumpingtoletter = true;
            }
        }

        oOpenendSearch.prototype.listsize = function (prop) {
            var height = (27 * prop);
            this.userspecifiedheight = height;
            this.droplist.style.maxHeight = height + 'px';
        }

        oOpenendSearch.prototype.mincharactersforlist = function (prop) {
            this.mincharacters = prop;
        }

        oOpenendSearch.prototype.notenoughcharacters = function (prop) {
            var placeholderelement = document.createElement('li');
            placeholderelement.classList.add('a-list-placeholder-restriction');
            placeholderelement.innerHTML = prop;
            this.droplist.appendChild(placeholderelement);
        }

        oOpenendSearch.prototype.noitemsinlist = function (prop) {
            var placeholderelement = document.createElement('li');
            placeholderelement.classList.add('a-list-placeholder-empty');
            placeholderelement.innerHTML = prop;
            this.droplist.appendChild(placeholderelement);
        }

        oOpenendSearch.prototype.placeholder = function (prop) {
            this.defaultplaceholder = this.decodeHTML(prop);
            this.element.placeholder = this.defaultplaceholder;
        }

        oOpenendSearch.prototype.makeAvailable = function () {
            component.prototype.makeAvailable.call(this);
            this.setWidth();
            this.manualWidth = true;
        }

        oOpenendSearch.prototype.setPosition = function () {
            // this function is required to prevent body overflow issues where a long droplist is
            // positioned near the bottom of a page and the page height accommodates the droplist
            // even though it is invisible and absolutely positioned and should not contribute
            this.droplist.style.bottom = '0';
        }

        oOpenendSearch.prototype.setTabIndex = function () {
            this.droplist.setAttribute('tabindex', '-1');
        }

        oOpenendSearch.prototype.checkManualWidth = function () {
            return this.element.style.width.length > 0;
        }

        oOpenendSearch.prototype.setWidth = function () {
            // respect manual width if set - 16px + 16px accounts for element padding
            if (this.manualWidth) {
                this.element.classList.add('manual-width');
                this.droplist.classList.add('manual-width');
                this.droplist.style.width = 'calc(' + this.element.style.width + ' + 16px + 16px)';
                return;
            }

            // we must set the size in order for the browser to recalculate the width of the component
            this.element.size = Math.max(this.defaultplaceholder.length, 1);
            var inputdims = getComputedStyle(this.element);
            var inputwidth = parseFloat(inputdims.width);
            if (isNaN(inputwidth)) {
                inputwidth = 0;
            }
            var droplistdims = getComputedStyle(this.droplist);
            var droplistwidth = parseFloat(droplistdims.width);
            var padding = 32; // the droplist does not have padding included
            var errormargin = 4; // element.size is font-specific and needs a little safety margin

            this.element.style.width = Math.max(droplistwidth, inputwidth) + errormargin - padding + 'px';
            this.droplist.style.width = Math.max(droplistwidth, inputwidth) + errormargin - padding + 'px';

            this.manualWidth = true;
        }

        oOpenendSearch.prototype.restoreSelection = function () {
            var currentselection = this.droplist.querySelector('[data-value="' + this.element.value + '"]');

            if (currentselection === null) {
                return;
            }

            this.setSelectedOption(currentselection);
        }

        oOpenendSearch.prototype.setWrapperType = function () {
            this.wrapper.classList.add('list-combobox');
        }

        oOpenendSearch.prototype.storeInitialValue = function () {
            if (typeof this.hiddenelement.value !== 'undefined') {
                this.initialValue = this.hiddenelement.value;
            }
        }     

        oOpenendSearch.prototype.cloneInputElement = function () {
            var newelement = this.element.cloneNode();
            newelement.id = '';
            newelement.name = '';
            this.element.type = 'hidden';
            this.hiddenelement = this.element;
            this.element = this.wrapper.insertBefore(newelement, this.droplist);
        }

        oOpenendSearch.prototype.buildList = function () {
            return this.droplist.querySelectorAll('li');
        }
        
        oOpenendSearch.prototype.buildListFromHtml = function () {
            return this.droplist.querySelector('li');
        }

        oOpenendSearch.prototype.buildVisibleList = function () {
            return this.droplist.querySelectorAll('li:not(.filter-hidden):not([class^="a-list-placeholder-"])');
        }

        oOpenendSearch.prototype.indexList = function () {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].setAttribute('data-list-position', i);
            }
        }

        oOpenendSearch.prototype.sanitiseText = function (textstring) {
            textstring = textstring.replace(/[\r\n\t]/mg, ' ');
            textstring = textstring.replace(/\s\s+/mg, ' ');
            return textstring.trim();
        }

        oOpenendSearch.prototype.onChange = function (event) {
            event.stopImmediatePropagation();
            this.broadcastChange();
        }

        oOpenendSearch.prototype.onFocusIn = function () {
            var focusEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
            this.element.dispatchEvent(focusEvent);
        }

        oOpenendSearch.prototype.onFocusOut = function (event) {
            if (event.relatedTarget === null) {
                return;
            }

            if (!this.wrapper.contains(event.relatedTarget)) {
                event.stopImmediatePropagation();
                this.hideList();
            }
        }

        oOpenendSearch.prototype.onCut = function (event) {
            this.selectOption(event);
        }

        oOpenendSearch.prototype.getKeyPressed = function (event) {
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

        oOpenendSearch.prototype.onKeydown = function (event) {
            switch (this.keypressed) {
                case 9: // tab key
                    this.clearKeyBuffer();
                    this.hideList();
                    break;
                case 38: // up arrow
                case 40: // down arrow
                    event.preventDefault(); // prevent caret from moving
                    break;
                case 13: // enter key
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    this.selectOption(event);
                    break;
                default:
                    this.keybuffer += String.fromCharCode(this.keypressed).toLowerCase();
            }
            
        }

        oOpenendSearch.prototype.onKeyup = function () {
            switch (this.keypressed) {
                case 27: // escape key
                    this.toggleList();
                    return;
                case 38: // up arrow
                    this.clearKeyBuffer();
                    this.navigateUp();
                    break;
                case 40: // down arrow
                    this.clearKeyBuffer();
                    this.navigateDown();
                    break;
                case 9: // tab key
                case null:
                    break
                case 13: // enter key
                    return;
                default:
                    clearInterval(this.keytimer);
                    var self = this;
                    this.keytimer = setTimeout(function () {
                        self.clearKeyBuffer()
                    }, this.keytimerlimit);
                    this.filterList();
                    break;
            }

            this.showList();
        }

        oOpenendSearch.prototype.clearKeyBuffer = function () {
            this.keybuffer = '';
        }

        oOpenendSearch.prototype.navigateUp = function () {
            if (this.currentlistposition === 0) {
                return;
            }

            if (this.currentlistposition === -1) {
                this.currentlistposition = 0;
            } else {
                this.currentlistposition--;
            }

            if (this.listtype === 'dropdown') {
                this.setSelectedOption(this.list[this.currentlistposition]);
                this.onFocusIn();
                this.broadcastChange();
            }

            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        oOpenendSearch.prototype.navigateDown = function () {
            var lastpos = this.list.length - 1;

            if (this.currentlistposition === lastpos) {
                return;
            }

            if (this.currentlistposition === -1) {
                this.currentlistposition = 0;
            } else {
                this.currentlistposition++;
            }

            if (this.listtype === 'dropdown') {
                this.setSelectedOption(this.list[this.currentlistposition]);
                this.onFocusIn();
                this.broadcastChange();
            }

            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        oOpenendSearch.prototype.updateScrollPosition = function (position) {
            this.droplist.scrollTop = 0;//set to top
            var currentitem = this.buildVisibleList()[position];

            if (typeof currentitem === "undefined") {
                return;
            }

            var scrollposition = currentitem.offsetTop - this.droplist.clientHeight;
            this.droplist.scrollTop = scrollposition + 100;
        }

        oOpenendSearch.prototype.updateSelectedEntry = function (position) {
            var currentvisiblelist = this.buildVisibleList();

            for (var i = 0; i < currentvisiblelist.length; i++) {
                if (i === position) {
                    currentvisiblelist[i].classList.add('selected');
                    currentvisiblelist[i].setAttribute('data-selected', 'selected');
                    this.currentlistposition = i;
                } else {
                    currentvisiblelist[i].classList.remove('selected');
                    currentvisiblelist[i].removeAttribute('data-selected');
                }
            }
        }

        oOpenendSearch.prototype.onClick = function (event) {
            if (event.target === this.element) {
                this.toggleList();
                return;
            }

            if (!this.droplist.classList.contains('visible')) {
                return;
            }

            if (this.droplist.contains(event.target)) {
                event.stopImmediatePropagation();
                this.selectOption(event);
                return;
            }

            this.hideList();
        }

        oOpenendSearch.prototype.onEnableExclusive = function (event) {
            if (this.element !== event.detail.element) {
                this.clearOptions();
                this.clearKeyBuffer();
                this.element.value = '';
                this.filterList();
            }
        }

        oOpenendSearch.prototype.selectOption = function (event) {
            this.keybuffer = '';
            var selectedOption = event.target;

            if (!this.element.classList.contains('list-visible')) {
                return;
            }

            if (event.type === 'keydown') {
                selectedOption = this.list[this.currentlistposition];
            }

            // ignore clicks on the drop-list background or scrollbar
            if (event.target === this.droplist) {
                return;
            }

            if (typeof selectedOption === 'undefined') {
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

            //this.clearEntries();
            this.setSelectedOption(selectedOption);
            this.hideList();
            this.onFocusIn();
            this.onChange(event);
        }

        oOpenendSearch.prototype.setSelectedOption = function (selectedOption) {
            selectedOption.classList.add('selected');
            selectedOption.setAttribute('data-selected', 'selected');
            this.element.value = this.sanitiseText(selectedOption.innerText);
            this.element.classList.add('exact');
            this.setHiddenValue(selectedOption.getAttribute('data-value'));
        }

        oOpenendSearch.prototype.clearEntries = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            // call the parent (super) method
            component.prototype.clearEntries.call(this);
            this.clearOptions();
            this.filterList();
        }

        oOpenendSearch.prototype.clearOptions = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                item.classList.remove('selected');
                item.removeAttribute('data-selected');
            }

            this.element.classList.remove('exact');

            if (this.hiddenelement.value) {
                this.setHiddenValue('');
                this.broadcastChange();
            }
        }

        oOpenendSearch.prototype.setHiddenValue = function (valuestring) {
            this.hiddenelement.value = valuestring;
        }

        oOpenendSearch.prototype.showList = function () {
            this.setDropListDirection();
            this.element.classList.add('list-visible');
            this.droplist.classList.add('visible');
        }

        oOpenendSearch.prototype.hideList = function () {
            this.element.classList.remove('list-visible');
            this.droplist.classList.remove('visible');
        }

        oOpenendSearch.prototype.toggleList = function () {
            this.setDropListDirection();
            this.element.classList.toggle('list-visible');
            this.droplist.classList.toggle('visible');
        }

        oOpenendSearch.prototype.setDropListDirection = function () {
            // reset to default direction before performing checks
            this.wrapper.classList.remove('direction-up');
            this.wrapper.classList.add('direction-down');
            this.droplist.style.maxHeight = (this.userspecifiedheight > 0) ? this.userspecifiedheight + 'px' : '';
            this.droplist.style.removeProperty('bottom');
            var paddingAllowance = 10;

            var footer = document.getElementsByClassName('footer')[0];
            var viewportBounds = this.checkViewportBounds(this.droplist);
            var footerCollision = this.checkCollision(this.droplist, footer);

            var distanceToTop = this.element.getBoundingClientRect().top;
            var distanceToBottom = window.innerHeight - this.element.getBoundingClientRect().bottom;

            if (distanceToTop > distanceToBottom && (viewportBounds.bottom || footerCollision)) {
                this.wrapper.classList.remove('direction-down');
                this.wrapper.classList.add('direction-up');

                if (distanceToTop < Math.max(this.userspecifiedheight, this.droplist.getBoundingClientRect().height)) {
                    this.droplist.style.maxHeight = distanceToTop - paddingAllowance + 'px';
                }

            } else if (distanceToBottom < Math.max(this.userspecifiedheight, this.droplist.getBoundingClientRect().height)) {
                this.droplist.style.maxHeight = distanceToBottom - paddingAllowance + 'px';
            }
        }

        oOpenendSearch.prototype.setCurrentListPosition = function (position) {
            if (typeof position !== 'undefined') {
                this.currentlistposition = parseInt(position);
                return;
            }

            var selectedpos = null;

            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].classList.contains('selected')) {
                    selectedpos = i;
                }
            }

            if (selectedpos === null) {
                this.currentlistposition = -1;
            } else {
                this.currentlistposition = selectedpos;
            }
        }

        oOpenendSearch.prototype.getCurrentListPosition = function () {
            return parseInt(this.currentlistposition);
        }

        oOpenendSearch.prototype.configureInitialFilter = function () {
            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                if (item.getAttribute('data-selected')) {
                    this.element.value = this.sanitiseText(item.innerText);
                    item.setAttribute('data-selected', 'selected');
                    item.classList.add('selected');
                    this.filterList();
                }
            }

            if (!this.element.value.length && this.mincharacters > 0) {
                this.droplist.classList.add('charrestriction');
                this.filterListStarts('');
            }
        }

        oOpenendSearch.prototype.filterList = function () {
            this.setCurrentListPosition();
            this.list = this.buildList();

            switch (this.filtermethod) {
                case 'starts':
                    this.filterListStarts(this.element.value);
                    break;
                case 'contains':
                    this.filterListContains(this.element.value);
                    break;
            }
        }

        oOpenendSearch.prototype.filterListStarts = function (inputstring) {
            var exactmatch = false;
            var droplistparentnode = this.droplist.parentNode;
            droplistparentnode.removeChild(this.droplist);

            if (inputstring.length < this.mincharacters) {
                this.clearOptions();
                this.droplist.classList.add('charrestriction');
                inputstring = '';
            } else {
                this.droplist.classList.remove('charrestriction');
            }

            inputstring = inputstring.toLowerCase();
            var visibleitems = this.list.length;

            for (var i = 0; i < this.list.length; i++) {
                var itemlabel = this.sanitiseText(this.list[i].innerText.toLowerCase());

                if (itemlabel === inputstring && this.isExact) {
                    exactmatch = true;
                    this.clearOptions();
                    this.setSelectedOption(this.list[i]);
                    this.broadcastChange();
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
                this.togglePlaceholderVisibility(true);
            } else {
                this.togglePlaceholderVisibility(false);
            }

            if (this.isExact && !exactmatch) {
                this.clearOptions();
            }

            droplistparentnode.appendChild(this.droplist);
            this.list = this.buildVisibleList();
        }

        oOpenendSearch.prototype.filterListContains = function (inputstring) {
            var exactmatch = false;

            if (inputstring.length < this.mincharacters) {
                this.clearOptions();
                this.droplist.classList.add('charrestriction');
                return;
            } else {
                this.droplist.classList.remove('charrestriction');
            }

            inputstring = inputstring.toLowerCase();
            var visibleitems = this.list.length;
            var droplistparentnode = this.droplist.parentNode;
            droplistparentnode.removeChild(this.droplist);

            for (var i = 0; i < this.list.length; i++) {
                var itemlabel = this.sanitiseText(this.list[i].innerText.toLowerCase());

                if (itemlabel === inputstring && this.isExact) {
                    exactmatch = true;
                    this.clearOptions();
                    this.setSelectedOption(this.list[i]);
                    this.broadcastChange();
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
                this.togglePlaceholderVisibility(true);
            } else {
                this.togglePlaceholderVisibility(false);
            }

            if (this.isExact && !exactmatch) {
                this.clearOptions();
            }

            droplistparentnode.appendChild(this.droplist);
            this.list = this.buildVisibleList();
        }

        oOpenendSearch.prototype.togglePlaceholderVisibility = function (visibility) {
            if (visibility) {
                this.droplist.classList.add('empty');
            } else {
                this.droplist.classList.remove('empty');
            }
        }

        return oOpenendSearch;

    });