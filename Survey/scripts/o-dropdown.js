define(['component'],
    function (component) {

        /**
         * Organism: Dropdown list
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oDropdown(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('input.a-input-dropdown[data-questionid="' + this.id + '"]');
            this.droplist = document.querySelector('input.a-input-dropdown[data-questionid="' + this.id + '"] + ul');
            this.wrapper = document.querySelector('div[class*=o-dropdown][data-questiongroup="' + this.group + '"]');
            this.container = this.droplist.closest('div.o-question-core>.o-question-response');
            this.hiddenelement = null;
            this.mincharacters = 0;
            this.keypressed = null;
            this.keybuffer = '';
            this.list = null;
            this.currentlistposition = -1;
            this.isExact = true;
            this.filtermethod = 'none';
            this.listtype = 'dropdown';
            this.defaultplaceholder = 'Select';
            this.isjumpingtoletter = true;
            this.manualWidth = false;
            this.keytimer = null;
            this.keytimerlimit = 500; // time in milliseconds at which the buffer is cleared
        }

        oDropdown.prototype = Object.create(component.prototype);
        oDropdown.prototype.constructor = oDropdown;

        oDropdown.prototype.init = function () {
            this.list = this.buildList();
            this.indexList();
            this.manualWidth = this.checkManualWidth();
            this.cloneInputElement();
            this.restoreSelection();
            this.setCurrentListPosition();
            this.updateScrollPosition(this.getCurrentListPosition());
            this.configureProperties();
            this.getInitialValue();
            this.setWidth();
            this.setWrapperType();
            this.configureInitialVisibility();
            this.processVisibilityRules();
            this.setInputType();
            this.setDropListDirection();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        oDropdown.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener('mousedown', this, false);
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("restoreEntries", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener("broadcastChange", this, false);
        }

        oDropdown.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('input', this, false);
            this.element.addEventListener('keydown', this, false);
            this.element.addEventListener('keyup', this, false);
            this.element.addEventListener('change', this, false);
            this.element.addEventListener('focusin', this, false);
            this.element.addEventListener('focusout', this, false);
            this.element.addEventListener('cut', this, false);
            this.container.addEventListener('scroll', this, false);
        }

        oDropdown.prototype.handleEvent = function (event) {
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
                case "focusin":
                case "input":
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

        oDropdown.prototype.updateDroplistPosition = function (event) {
            this.droplist.style.marginLeft = 0 - this.container.scrollLeft + 'px';
        }

        oDropdown.prototype.exact = function (prop) {
            if (prop === false) {
                this.isExact = false;
            }
        }

        oDropdown.prototype.filtertype = function (prop) {
            this.filtermethod = prop;
        }

        oDropdown.prototype.jumptofirstletter = function (prop) {
            if (prop === true) {
                this.isjumpingtoletter = true;
            }
        }

        oDropdown.prototype.listsize = function (prop) {
            var height = (27 * prop);
            this.droplist.style.maxHeight = height + 'px';
        }

        oDropdown.prototype.mincharactersforlist = function (prop) {
            this.mincharacters = prop;
        }

        oDropdown.prototype.notenoughcharacters = function (prop) {
            var placeholderelement = document.createElement('li');
            placeholderelement.classList.add('a-list-placeholder-restriction');
            placeholderelement.innerHTML = prop;
            this.droplist.appendChild(placeholderelement);
        }

        oDropdown.prototype.noitemsinlist = function (prop) {
            var placeholderelement = document.createElement('li');
            placeholderelement.classList.add('a-list-placeholder-empty');
            placeholderelement.innerHTML = prop;
            this.droplist.appendChild(placeholderelement);
        }

        oDropdown.prototype.placeholder = function (prop) {
            this.defaultplaceholder = this.decodeHTML(prop);
            this.element.placeholder = this.defaultplaceholder;
        }

        oDropdown.prototype.makeAvailable = function () {
            component.prototype.makeAvailable.call(this);
            this.setWidth();
            this.manualWidth = true;
        }

        oDropdown.prototype.checkManualWidth = function () {
            return this.element.style.width.length > 0;
        }

        oDropdown.prototype.setWidth = function () {
            // respect manual width if set - 48px + 16px accounts for element padding
            if (this.manualWidth) {
                this.element.classList.add('manual-width');
                this.droplist.classList.add('manual-width');
                this.droplist.style.width = 'calc(' + this.element.style.width + ' + 48px + 16px)';
                return;
            }

            // we must set the size in order for the browser to recalculate the width of the component
            this.element.size = Math.max(this.defaultplaceholder.length, 1);
            var inputdims = getComputedStyle(this.element);
            var inputwidth = parseFloat(inputdims.width);
            if (isNaN(inputwidth)) inputwidth = 0;
            var droplistdims = getComputedStyle(this.droplist);
            var droplistwidth = parseFloat(droplistdims.width);
            var padding = 32; // the droplist does not have padding included
            var errormargin = 4; // element.size is font-specific and needs a little safety margin

            this.element.style.width = Math.max(droplistwidth, inputwidth) + errormargin + 'px';
            this.droplist.style.width = Math.max(droplistwidth, inputwidth) + errormargin + padding + 'px';
        }

        oDropdown.prototype.restoreSelection = function () {
            var currentselection = this.droplist.querySelector('[data-value="' + this.element.value + '"]');

            if (currentselection === null) {
                return;
            }

            this.setSelectedOption(currentselection);
        }

        oDropdown.prototype.setWrapperType = function () {
            this.wrapper.classList.add('list-droplist');
        }

        oDropdown.prototype.getInitialValue = function () {
            if (typeof this.hiddenelement.value !== 'undefined') {
                this.initialValue = this.hiddenelement.value;
            }
        }

        oDropdown.prototype.setInputType = function () {
            this.element.readOnly = true;
        }

        oDropdown.prototype.cloneInputElement = function () {
            var newelement = this.element.cloneNode();
            newelement.id = '';
            newelement.name = '';
            this.element.type = 'hidden';
            this.hiddenelement = this.element;
            this.element = this.wrapper.insertBefore(newelement, this.droplist);
        }

        oDropdown.prototype.buildList = function () {
            return this.droplist.querySelectorAll('li');
        }

        oDropdown.prototype.buildVisibleList = function () {
            return this.droplist.querySelectorAll('li:not(.filter-hidden):not([class^="a-list-placeholder-"])');
        }

        oDropdown.prototype.indexList = function () {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].setAttribute('data-list-position', i);
            }
        }

        oDropdown.prototype.sanitiseText = function (textstring) {
            textstring = textstring.replace(/[\r\n\t]/mg, ' ');
            textstring = textstring.replace(/\s\s+/mg, ' ');
            return textstring.trim();
        }

        oDropdown.prototype.onChange = function (event) {
            event.stopImmediatePropagation();
            this.broadcastChange();
        }

        oDropdown.prototype.onFocusIn = function () {
            var focusEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
            this.element.dispatchEvent(focusEvent);
        }

        oDropdown.prototype.onFocusOut = function (event) {
            if (event.relatedTarget === null) {
                return;
            }

            if (!this.wrapper.contains(event.relatedTarget)) {
                event.stopImmediatePropagation();
                this.hideList();
            }
        }

        oDropdown.prototype.onCut = function (event) {
            this.selectOption(event);
        }

        oDropdown.prototype.getKeyPressed = function (event) {
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

        oDropdown.prototype.onKeydown = function (event) {
            switch (this.keypressed) {
                case 8: // backspace key
                    this.keybuffer = this.keybuffer.slice(0, -1);
                    break;
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

        oDropdown.prototype.onKeyup = function () {
            switch (this.keypressed) {
                case 27: // escape key
                    this.clearKeyBuffer();
                    this.clearFilter();
                    break;
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
                    if (this.filtermethod === 'none') {
                        clearInterval(this.keytimer);
                        var that = this;
                        this.keytimer = setTimeout(function () {
                            that.clearKeyBuffer()
                        }, this.keytimerlimit);
                    }

                    this.filterList();
                    this.jumpToLetter();
                    break;
            }

            this.showList();
        }

        oDropdown.prototype.clearKeyBuffer = function () {
            this.keybuffer = '';
        }

        oDropdown.prototype.navigateUp = function () {
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

        oDropdown.prototype.navigateDown = function () {
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

        oDropdown.prototype.updateScrollPosition = function (position) {
            this.droplist.scrollTop = 0; //set to top
            var currentitem = this.buildVisibleList()[position];

            if (typeof currentitem === "undefined") {
                return;
            }

            var scrollposition = currentitem.offsetTop - this.droplist.clientHeight;
            this.droplist.scrollTop = scrollposition + 100;
        }

        oDropdown.prototype.updateSelectedEntry = function (position) {
            var currentvisiblelist = this.buildVisibleList();

            for (var i = 0; i < currentvisiblelist.length; i++) {
                var curitemposition = parseInt(currentvisiblelist[i].getAttribute('data-list-position'));
                if (curitemposition === position) {
                    currentvisiblelist[i].classList.add('selected');
                    currentvisiblelist[i].setAttribute('data-selected', 'selected');
                    this.currentlistposition = i;
                } else {
                    currentvisiblelist[i].classList.remove('selected');
                    currentvisiblelist[i].removeAttribute('data-selected');
                }
            }
        }

        oDropdown.prototype.onClick = function (event) {
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

        oDropdown.prototype.onEnableExclusive = function (event) {
            if (this.element !== event.detail.element) {
                this.clearEntries();
                this.clearKeyBuffer();
                this.element.value = '';
            }
        }

        oDropdown.prototype.selectOption = function (event) {
            this.clearKeyBuffer();
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

            this.clearEntries();
            this.setSelectedOption(selectedOption);
            this.hideList();
            this.onFocusIn();
            this.onChange(event);
        }

        oDropdown.prototype.setSelectedOption = function (selectedOption) {
            selectedOption.classList.add('selected');
            selectedOption.setAttribute('data-selected', 'selected');
            this.element.value = this.sanitiseText(selectedOption.innerText);
            this.element.classList.add('exact');
            this.setHiddenValue(selectedOption.getAttribute('data-value'));
            this.setCurrentListPosition(this.currentlistposition);
        }

        oDropdown.prototype.clearEntries = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            // call the parent (super) method
            component.prototype.clearEntries.call(this);
            this.clearOptions();
        }

        oDropdown.prototype.clearOptions = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                item.classList.remove('selected');
                item.removeAttribute('data-selected');
            }

            this.setHiddenValue('');
            this.element.classList.remove('exact');
            this.broadcastChange();
        }

        oDropdown.prototype.setHiddenValue = function (valuestring) {
            this.hiddenelement.value = valuestring;
        }

        oDropdown.prototype.showList = function () {
            this.element.classList.add('list-visible');
            this.droplist.classList.add('visible');
        }

        oDropdown.prototype.hideList = function () {
            this.element.classList.remove('list-visible');
            this.droplist.classList.remove('visible');
            this.clearKeyBuffer();
            this.clearFilter();
        }

        oDropdown.prototype.toggleList = function () {
            this.element.classList.toggle('list-visible');
            this.droplist.classList.toggle('visible');
            this.clearKeyBuffer();
            this.clearFilter();
        }

        oDropdown.prototype.setDropListDirection = function () {
            if (this.checkCollision(this.droplist, document.getElementsByClassName('footer')[0])) {
                this.wrapper.classList.add('direction-up');
            } else {
                this.wrapper.classList.add('direction-down');
            }
        }

        oDropdown.prototype.setCurrentListPosition = function (position) {
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

        oDropdown.prototype.getCurrentListPosition = function () {
            return parseInt(this.currentlistposition);
        }

        oDropdown.prototype.clearFilter = function () {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].classList.remove('filter-hidden');
            }
        }

        oDropdown.prototype.filterListStarts = function (inputstring) {
            var exactmatch = false;
            var droplistparentnode = this.droplist.parentNode;
            droplistparentnode.removeChild(this.droplist);

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

        oDropdown.prototype.filterListContains = function (inputstring) {
            var exactmatch = false;
            var droplistparentnode = this.droplist.parentNode;
            droplistparentnode.removeChild(this.droplist);

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

        oDropdown.prototype.togglePlaceholderVisibility = function (visibility) {
            if (visibility) {
                this.droplist.classList.add('empty');
            } else {
                this.droplist.classList.remove('empty');
            }
        }

        oDropdown.prototype.filterList = function () {
            this.setCurrentListPosition();

            if (!this.keybuffer.length) {
                this.element.value = '';
                this.clearFilter();
                this.clearOptions();
                return;
            }

            switch (this.filtermethod) {
                case 'none':
                    break;
                case 'starts':
                    this.filterListStarts(this.keybuffer);
                    break;
                case 'contains':
                    this.filterListContains(this.keybuffer);
                    break;
            }
        }

        oDropdown.prototype.jumpToLetter = function (event) {
            if (!this.isjumpingtoletter) {
                return;
            }

            if (!this.keybuffer.length) {
                return;
            }

            var searchstring = this.keybuffer;
            var list = this.buildVisibleList();
            var currentfirstletter = this.element.value.substring(0, 1).toLowerCase();
            var listpasses = 0;

            for (var i = 0; i < list.length; i++) {
                var currentitem = list[i];
                var currentitemlabel = this.sanitiseText(currentitem.innerText.toLowerCase());

                if (currentitemlabel.indexOf(searchstring) === 0) {
                    if ((listpasses === 0 && currentfirstletter === searchstring.substring(0, 1) && i < this.currentlistposition) ||
                        (currentitem.classList.contains('selected') && searchstring.length === 1)) {
                        // this is required if we've reached the end of the list and landed on an active item
                        // as the last element -- we will need to loop back for another pass at this point
                        if (listpasses === 0 && i === list.length - 1) {
                            listpasses = 1;
                            i = 0;
                        }
                        continue;

                    } else {
                        this.updateScrollPosition(i);
                        this.updateSelectedEntry(i);
                        this.setSelectedOption(currentitem);
                        this.onFocusIn();
                        this.broadcastChange();
                        this.setCurrentListPosition(i);
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

        return oDropdown;

    });