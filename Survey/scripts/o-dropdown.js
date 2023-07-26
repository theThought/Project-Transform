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
            this.hiddenelement = null;
            this.mincharacters = 0;
            this.keypressed = null;
            this.keybuffer = '';
            this.list = null;
            this.currentlistposition = -1;
            this.isExact = true;
            this.filtermethod = 'contains';
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
            this.setCurrentListPosition();
            this.updateScrollPosition(this.getCurrentListPosition());
            this.manualWidth = this.checkManualWidth();
            this.cloneInputElement();
            this.restoreSelection();
            this.configureProperties();
            this.setWidth();
            this.setWrapperType();
            this.setInputType();
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
        }

        oDropdown.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('keydown', this, false);
            this.element.addEventListener('keyup', this, false);
            this.element.addEventListener('change', this, false);
            this.element.addEventListener('focusin', this, false);
            this.element.addEventListener('focusout', this, false);
            this.element.addEventListener('cut', this, false);
        }

        oDropdown.prototype.handleEvent = function (event) {
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
                case "focusin":
                    this.onFocusIn();
                    break;
                case 'focusout':
                    this.onFocusOut(event);
                    break;
            }
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
            this.defaultplaceholder = prop;
            this.element.placeholder = this.defaultplaceholder;
        }

        oDropdown.prototype.checkManualWidth = function () {
            return this.element.style.width.length > 0;
        }

        oDropdown.prototype.setWidth = function () {
            // respect manual width if set
            if (this.manualWidth) {
                this.droplist.classList.add('manual-width');
                this.droplist.style.width = 'calc(' + this.element.style.width + ' + 16px + 16px)';
                return;
            }

            // we must set the size in order for the browser to recalculate the width of the component
            this.element.size = Math.max(this.defaultplaceholder.length, 1);
            var dims = getComputedStyle(this.element);
            var inputwidth = parseFloat(dims.width);
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

        oDropdown.prototype.indexList = function () {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].setAttribute('data-list-position', i);
            }
        }

        oDropdown.prototype.buildVisibleList = function () {
            return this.droplist.querySelectorAll('li:not(.filter-hidden):not([class^="a-list-placeholder-"])');
        }

        oDropdown.prototype.sanitiseText = function (string) {
            string = string.replace(/[\r\n\t]/mg, ' ');
            string = string.replace(/\s\s+/mg, ' ');
            return string.trim();
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
                        this.jumpToLetter();
                        break;
            }

            this.showList();
        }

        oDropdown.prototype.clearKeyBuffer = function () {
            this.keybuffer = '';
        }

        oDropdown.prototype.navigateUp = function () {
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
                this.onFocusIn();
                this.broadcastChange();
            }

            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        oDropdown.prototype.navigateDown = function () {
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
                this.onFocusIn();
                this.broadcastChange();
            }

            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        oDropdown.prototype.updateScrollPosition = function (position) {
            this.droplist.scrollTop = 0;//set to top
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
                    this.currentlistposition = parseInt(currentvisiblelist[i].getAttribute('data-list-position'));
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
                    this.clearOptions();
                    this.clearKeyBuffer();
                    this.element.value = '';
            }
        }

        oDropdown.prototype.selectOption = function (event) {
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
            this.onFocusIn();
            this.hideList();
            this.onChange(event);
        }

        oDropdown.prototype.setSelectedOption = function (selectedOption) {
            selectedOption.classList.add('selected');
            selectedOption.setAttribute('data-selected', 'selected');
            this.element.value = this.sanitiseText(selectedOption.innerText);
            this.element.classList.add('exact');
            this.setHiddenValue(selectedOption.getAttribute('data-value'));
            this.setCurrentListPosition(selectedOption.getAttribute('data-list-position'));
        }

        oDropdown.prototype.clearOptions = function () {
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

        oDropdown.prototype.restoreOptions = function () {

        }

        oDropdown.prototype.showList = function () {
            this.element.classList.add('list-visible');
            this.droplist.classList.add('visible');
        }

        oDropdown.prototype.hideList = function () {
            //this.setCurrentListPosition();
            this.element.classList.remove('list-visible');
            this.droplist.classList.remove('visible');
        }

        oDropdown.prototype.toggleList = function () {
            //this.setCurrentListPosition();
            this.element.classList.toggle('list-visible');
            this.droplist.classList.toggle('visible');
        }

        oDropdown.prototype.setCurrentListPosition = function (position) {
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

        oDropdown.prototype.getCurrentListPosition = function () {
            return parseInt(this.currentlistposition);
        }

        oDropdown.prototype.jumpToLetter = function (event) {
            if (!this.isjumpingtoletter) {
                return;
            }

            var searchstring = this.keybuffer;
            var list = this.buildVisibleList();
            this.debug(searchstring);

            for (var i = 0; i < list.length; i++) {
                var curitem = list[i];
                var itemlabel = this.sanitiseText(curitem.innerText.toLowerCase());
                if (itemlabel.indexOf(searchstring) === 0) {
                    if (curitem.classList.contains('selected') && searchstring.length === 1) {
                        continue;
                    } else {
                        this.updateScrollPosition(i);
                        this.updateSelectedEntry(i);
                        this.setSelectedOption(curitem);
                        this.onFocusIn();
                        this.broadcastChange();
                        this.setCurrentListPosition(curitem.getAttribute('data-list-position'));
                        return;
                    }
                }
            }
        }

        return oDropdown;

    });