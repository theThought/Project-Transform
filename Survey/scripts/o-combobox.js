define(['component'],
    function (component) {

        /**
         * Organism: Input combo-box with list
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oCombobox(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('input.a-input-combobox[data-questionid="' + this.id + '"]');
            this.droplist = document.querySelector('input.a-input-combobox[data-questionid="' + this.id + '"] + ul');
            this.wrapper = document.querySelector('div[class*=o-combobox][data-questiongroup="' + this.group + '"]');
            this.hiddenelement = null;
            this.mincharacters = 0;
            this.keypressed = null;
            this.keybuffer = '';
            this.list = null;
            this.currentlistposition = -1;
            this.isExact = true;
            this.filtermethod = 'contains';
            this.listtype = 'combobox';
            this.defaultplaceholder = 'Select';
            this.isjumpingtoletter = false;
            this.manualWidth = false;
            this.keytimer = null;
            this.keytimerlimit = 500; // time in milliseconds at which the buffer is cleared
        }

        oCombobox.prototype = Object.create(component.prototype);
        oCombobox.prototype.constructor = oCombobox;

        oCombobox.prototype.init = function () {
            this.list = this.buildList();
            this.indexList();
            this.setCurrentListPosition();
            this.updateScrollPosition(this.getCurrentListPosition());
            this.manualWidth = this.checkManualWidth();
            this.cloneInputElement();
            this.restoreSelection();
            this.configureProperties();
            this.setWidth();
            this.setWrapperType();
            this.configureInitialFilter();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        oCombobox.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener('mousedown', this, false);
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("restoreEntries", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
        }

        oCombobox.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('input', this, false);
            this.element.addEventListener('keydown', this, false);
            this.element.addEventListener('keyup', this, false);
            this.element.addEventListener('change', this, false);
            this.element.addEventListener('focusin', this, false);
            this.element.addEventListener('focusout', this, false);
            this.element.addEventListener('cut', this, false);
        }

        oCombobox.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'cut':
                    this.onCut(event);
                    break;
                case 'clearEntries':
                    this.clearOptions();
                    this.clearEntries(event);
                    break;
                case 'restoreEntries':
                    this.restoreOptions();
                    this.restoreEntries(event);
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
            }
        }

        oCombobox.prototype.exact = function (prop) {
            if (prop === false) {
                this.isExact = false;
            }
        }

        oCombobox.prototype.filtertype = function (prop) {
            this.filtermethod = prop;
        }

        oCombobox.prototype.jumptofirstletter = function (prop) {
            if (prop === true) {
                this.isjumpingtoletter = true;
            }
        }

        oCombobox.prototype.listsize = function (prop) {
            var height = (27 * prop);
            this.droplist.style.maxHeight = height + 'px';
        }

        oCombobox.prototype.mincharactersforlist = function (prop) {
            this.mincharacters = prop;
        }

        oCombobox.prototype.notenoughcharacters = function (prop) {
            var placeholderelement = document.createElement('li');
            placeholderelement.classList.add('a-list-placeholder-restriction');
            placeholderelement.innerHTML = prop;
            this.droplist.appendChild(placeholderelement);
        }

        oCombobox.prototype.noitemsinlist = function (prop) {
            var placeholderelement = document.createElement('li');
            placeholderelement.classList.add('a-list-placeholder-empty');
            placeholderelement.innerHTML = prop;
            this.droplist.appendChild(placeholderelement);
        }

        oCombobox.prototype.placeholder = function (prop) {
            this.defaultplaceholder = this.decodeHTML(prop);
            this.element.placeholder = this.defaultplaceholder;
        }

        oCombobox.prototype.checkManualWidth = function () {
            return this.element.style.width.length > 0;
        }

        oCombobox.prototype.setWidth = function () {
            // respect manual width if set
            if (this.manualWidth) {
                this.droplist.classList.add('manual-width');
                this.droplist.style.width = 'calc(' + this.element.style.width + ' + 16px + 16px)';
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

        oCombobox.prototype.restoreSelection = function () {
            var currentselection = this.droplist.querySelector('[data-value="' + this.element.value + '"]');

            if (currentselection === null) {
                return;
            }

            this.setSelectedOption(currentselection);
        }

        oCombobox.prototype.setWrapperType = function () {
                this.wrapper.classList.add('list-combobox');
        }

        oCombobox.prototype.cloneInputElement = function () {
            var newelement = this.element.cloneNode();
            newelement.id = '';
            newelement.name = '';
            this.element.type = 'hidden';
            this.hiddenelement = this.element;
            this.element = this.wrapper.insertBefore(newelement, this.droplist);
        }

        oCombobox.prototype.buildList = function () {
            return this.droplist.querySelectorAll('li');
        }

        oCombobox.prototype.indexList = function () {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].setAttribute('data-list-position', i);
            }
        }

        oCombobox.prototype.buildVisibleList = function () {
            return this.droplist.querySelectorAll('li:not(.filter-hidden):not([class^="a-list-placeholder-"])');
        }

        oCombobox.prototype.configureInitialFilter = function () {

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

        oCombobox.prototype.filterList = function () {
            this.setCurrentListPosition();

            switch (this.filtermethod) {
                case 'starts':
                    this.filterListStarts(this.element.value);
                    break;
                case 'contains':
                    this.filterListContains(this.element.value);
                    break;
            }
        }

        oCombobox.prototype.filterListStarts = function (inputstring) {
            var exactmatch = false;

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
        }

        oCombobox.prototype.filterListContains = function (inputstring) {
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
        }

        oCombobox.prototype.togglePlaceholderVisibility = function (visibility) {
            if (visibility) {
                this.droplist.classList.add('empty');
            } else {
                this.droplist.classList.remove('empty');
            }
        }

        oCombobox.prototype.sanitiseText = function (textstring) {
            textstring = textstring.replace(/[\r\n\t]/mg, ' ');
            textstring = textstring.replace(/\s\s+/mg, ' ');
            return textstring.trim();
        }

        oCombobox.prototype.onChange = function (event) {
            event.stopImmediatePropagation();
            this.broadcastChange();
        }

        oCombobox.prototype.onFocusIn = function () {
            var focusEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
            this.element.dispatchEvent(focusEvent);
        }

        oCombobox.prototype.onFocusOut = function (event) {

            if (event.relatedTarget === null) {
                return;
            }

            if (!this.wrapper.contains(event.relatedTarget)) {
                event.stopImmediatePropagation();
                this.hideList();
            }
        }

        oCombobox.prototype.onCut = function (event) {
            this.selectOption(event);
        }

        oCombobox.prototype.getKeyPressed = function (event) {
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

        oCombobox.prototype.onKeydown = function (event) {
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

        oCombobox.prototype.onKeyup = function () {
            switch (this.keypressed) {
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
                    var that = this;
                    this.keytimer = setTimeout(function () {
                        that.clearKeyBuffer()
                    }, this.keytimerlimit);
                    this.filterList();
                    break;
            }

            this.showList();
        }

        oCombobox.prototype.clearKeyBuffer = function () {
            this.keybuffer = '';
        }

        oCombobox.prototype.navigateUp = function () {
            var list = this.buildVisibleList();
            var firstitem = list[0];
            var firstpos = parseInt(firstitem.getAttribute('data-list-position'));

            if (this.currentlistposition === firstpos) {
                return;
            }

            if (this.currentlistposition === -1) {
                this.currentlistposition = firstpos;
            } else {
                this.currentlistposition--;
            }

            if (this.listtype === 'dropdown') {
                this.setSelectedOption(this.list[this.currentlistposition]);
                this.broadcastChange();
            }

            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        oCombobox.prototype.navigateDown = function () {
            var list = this.buildVisibleList();
            var lastitem = list[list.length - 1];
            var lastpos = parseInt(lastitem.getAttribute('data-list-position'));

            if (this.currentlistposition === lastpos) {
                return;
            }

            if (this.currentlistposition === -1) {
                this.currentlistposition = parseInt(list[0].getAttribute('data-list-position'));
            } else {
                this.currentlistposition++;
            }

            if (this.listtype === 'dropdown') {
                this.setSelectedOption(this.list[this.currentlistposition]);
                this.broadcastChange();
            }

            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        oCombobox.prototype.updateScrollPosition = function (position) {
            this.droplist.scrollTop = 0;//set to top
            var currentitem = this.buildVisibleList()[position];

            if (typeof currentitem === "undefined") {
                return;
            }

            var scrollposition = currentitem.offsetTop - this.droplist.clientHeight;
            this.droplist.scrollTop = scrollposition + 100;
        }

        oCombobox.prototype.updateSelectedEntry = function (position) {
            var currentvisiblelist = this.buildVisibleList();

            for (var i = 0; i < currentvisiblelist.length; i++) {
                var curitemposition = parseInt(currentvisiblelist[i].getAttribute('data-list-position'));
                if (curitemposition === position) {
                    currentvisiblelist[i].classList.add('selected');
                    currentvisiblelist[i].setAttribute('data-selected', 'selected');
                    this.currentlistposition = parseInt(currentvisiblelist[i].getAttribute('data-list-position'));
                } else {
                    currentvisiblelist[i].classList.remove('selected');
                    currentvisiblelist[i].removeAttribute('data-selected');
                }
            }
        }

        oCombobox.prototype.onClick = function (event) {
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

        oCombobox.prototype.onEnableExclusive = function (event) {
            if (this.element !== event.detail.element) {
                    this.clearOptions();
                    this.clearKeyBuffer();
                    this.element.value = '';
                    this.filterList();
            }
        }

        oCombobox.prototype.selectOption = function (event) {
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

            this.clearOptions();
            this.setSelectedOption(selectedOption);
            this.hideList();
            this.onFocusIn();
            this.onChange(event);
        }

        oCombobox.prototype.setSelectedOption = function (selectedOption) {
            selectedOption.classList.add('selected');
            selectedOption.setAttribute('data-selected', 'selected');
            this.element.value = this.sanitiseText(selectedOption.innerText);
            this.element.classList.add('exact');
            this.setHiddenValue(selectedOption.getAttribute('data-value'));
            this.setCurrentListPosition(selectedOption.getAttribute('data-list-position'));
        }

        oCombobox.prototype.clearOptions = function () {
            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                item.classList.remove('selected');
                item.removeAttribute('data-selected');
            }

            this.setHiddenValue('');
            this.element.classList.remove('exact');
            this.broadcastChange();
        }

        oCombobox.prototype.setHiddenValue = function (valuestring) {
            this.hiddenelement.value = valuestring;
        }

        oCombobox.prototype.restoreOptions = function () {

        }

        oCombobox.prototype.showList = function () {
            this.element.classList.add('list-visible');
            this.droplist.classList.add('visible');
        }

        oCombobox.prototype.hideList = function () {
            //this.setCurrentListPosition();
            this.element.classList.remove('list-visible');
            this.droplist.classList.remove('visible');
        }

        oCombobox.prototype.toggleList = function () {
            //this.setCurrentListPosition();
            this.element.classList.toggle('list-visible');
            this.droplist.classList.toggle('visible');
        }

        oCombobox.prototype.setCurrentListPosition = function (position) {
            if (typeof position !== 'undefined') {
                this.currentlistposition = parseInt(position);
                return;
            }

            var selecteditem = this.droplist.querySelector('[data-selected="selected"]');

            if (selecteditem === null) {
                this.currentlistposition = -1;
            } else {
                this.currentlistposition = parseInt(selecteditem.getAttribute('data-list-position'));
            }
        }

        oCombobox.prototype.getCurrentListPosition = function () {
            return parseInt(this.currentlistposition);
        }

        return oCombobox;

    });