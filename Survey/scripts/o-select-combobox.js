define(['component'],
    function (component) {

        /**
         * Organism: Input combo-box with list
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oSelectComboBox(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('input.a-input-combobox[data-questionid="' + this.id + '"]');
            this.droplist = document.querySelector('input.a-input-combobox[data-questionid="' + this.id + '"] + ul');
            this.wrapper = document.querySelector('div[class*=o-select-combobox][data-questiongroup="' + this.group + '"]');
            this.hiddenelement = null;
            this.mincharacters = 0;
            this.keypressed = null;
            this.list = null;
            this.currentlistposition = -1;
            this.isExact = true;
            this.filtermethod = 'contains';
            this.noitemsplaceholder = 'no items to display';
            this.notenoughcharactersplaceholder = 'begin typing to display the list';
        }

        oSelectComboBox.prototype = Object.create(component.prototype);
        oSelectComboBox.prototype.constructor = oSelectComboBox;

        oSelectComboBox.prototype.init = function () {
            this.list = this.buildList();
            this.cloneInputElement();
            this.configureProperties();
            this.setWidth();
            this.configureInitialFilter();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        oSelectComboBox.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener('mousedown', this, false);
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("restoreEntries", this, false);
        }

        oSelectComboBox.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('keydown', this, false);
            this.element.addEventListener('keyup', this, false);
            this.element.addEventListener('change', this, false);
            this.element.addEventListener('focusout', this, false);
            this.element.addEventListener('cut', this, false);
        }

        oSelectComboBox.prototype.handleEvent = function (event) {
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
                case 'focusout':
                    this.onFocusOut(event);
                    break;
            }
        }

        oSelectComboBox.prototype.cloneInputElement = function () {
            var newelement = this.element.cloneNode();
            newelement.id = '';
            newelement.name = '';
            this.element.type = 'hidden';
            this.hiddenelement = this.element;
            this.element = this.wrapper.insertBefore(newelement, this.droplist);
        }

        oSelectComboBox.prototype.exact = function (prop) {
            if (prop === false) {
                this.isExact = false;
            }
        }

        oSelectComboBox.prototype.buildList = function () {
            return this.droplist.querySelectorAll('li');
        }

        oSelectComboBox.prototype.buildVisibleList = function () {
            return this.droplist.querySelectorAll('li:not(.filter-hidden):not([class^="a-list-placeholder-"])');
        }

        oSelectComboBox.prototype.configureInitialFilter = function () {
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

        oSelectComboBox.prototype.filterList = function () {
            this.resetCurrentListPosition();

            switch (this.filtermethod) {
                case 'starts':
                    this.filterListStarts(this.element.value);
                    break;
                case 'contains':
                    this.filterListContains(this.element.value);
                    break;
            }
        }

        oSelectComboBox.prototype.filterListStarts = function (inputstring) {
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

                if (this.hiddenelement.value.length) {
                    this.hiddenelement.value = '';
                    this.broadcastChange();
                }
            }

        }

        oSelectComboBox.prototype.filterListContains = function (inputstring) {
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

                if (this.hiddenelement.value.length) {
                    this.hiddenelement.value = '';
                    this.broadcastChange();
                }
            }

        }

        oSelectComboBox.prototype.togglePlaceholderVisibility = function (visibility) {
            if (visibility) {
                this.droplist.classList.add('empty');
            } else {
                this.droplist.classList.remove('empty');
            }
        }

        oSelectComboBox.prototype.sanitiseText = function (string) {
            string = string.replace(/[\r\n\t]/mg, ' ');
            string = string.replace(/\s\s+/mg, ' ');
            return string.trim();
        }

        oSelectComboBox.prototype.onChange = function (event) {
            event.stopImmediatePropagation();
            this.broadcastChange();
        }

        oSelectComboBox.prototype.onFocusOut = function (event) {

            if (event.relatedTarget === null) {
                return;
            }

            if (!this.wrapper.contains(event.relatedTarget)) {
                event.stopImmediatePropagation();
                this.hideList();
            }
        }

        oSelectComboBox.prototype.onCut = function (event) {
            this.selectOption(event);
        }

        oSelectComboBox.prototype.getKeyPressed = function (event) {
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

        oSelectComboBox.prototype.onKeydown = function (event) {
            switch (this.keypressed) {
                case 9: // tab key
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
            }
        }

        oSelectComboBox.prototype.onKeyup = function () {
            switch (this.keypressed) {
                case 38: // up arrow
                    this.navigateUp();
                    break;
                case 40: // down arrow
                    this.navigateDown();
                    break;
                case 13: // enter key
                    return;
                default:
                    this.filterList();
            }

            this.showList();
        }

        oSelectComboBox.prototype.navigateUp = function () {
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

        oSelectComboBox.prototype.navigateDown = function () {
            if (this.currentlistposition === this.buildVisibleList().length - 1) {
                return;
            }

            this.currentlistposition++;

            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
        }

        oSelectComboBox.prototype.updateScrollPosition = function (position) {
            this.droplist.scrollTop = 0;//set to top
            var currentitem = this.buildVisibleList()[position];
            var scrollposition = currentitem.offsetTop - this.droplist.clientHeight;
            this.droplist.scrollTop = scrollposition + 100;
        }

        oSelectComboBox.prototype.updateSelectedEntry = function (position) {
            var currentvisiblelist = this.buildVisibleList();

            for (var i = 0; i < currentvisiblelist.length; i++) {
                if (position === i) {
                    currentvisiblelist[i].classList.add('selected');
                    currentvisiblelist[i].setAttribute('data-selected', 'selected');
                } else {
                    currentvisiblelist[i].classList.remove('selected');
                    currentvisiblelist[i].removeAttribute('data-selected');
                }

                this.broadcastChange();
            }
        }

        oSelectComboBox.prototype.onClick = function (event) {
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

        oSelectComboBox.prototype.selectOption = function (event) {
            var selectedOption = event.target;

            if (event.type === 'keydown') {
                selectedOption = this.buildVisibleList()[this.currentlistposition];
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
            this.setSelectedOption(selectedOption)
            this.hideList();
            this.onChange(event);
        }

        oSelectComboBox.prototype.setSelectedOption = function (selectedOption) {
            selectedOption.classList.add('selected');
            selectedOption.setAttribute('data-selected', 'selected');
            this.element.value = this.sanitiseText(selectedOption.innerText);
            this.hiddenelement.value = selectedOption.getAttribute('data-value');
        }

        oSelectComboBox.prototype.clearOptions = function () {
            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                item.classList.remove('selected');
                item.removeAttribute('data-selected');
            }
            this.broadcastChange();
        }

        oSelectComboBox.prototype.restoreOptions = function () {

        }

        oSelectComboBox.prototype.showList = function () {
            this.element.classList.add('list-visible');
            this.droplist.classList.add('visible');
        }

        oSelectComboBox.prototype.hideList = function () {
            this.resetCurrentListPosition();
            this.element.classList.remove('list-visible');
            this.droplist.classList.remove('visible');
        }

        oSelectComboBox.prototype.toggleList = function () {
            this.resetCurrentListPosition();
            this.element.classList.toggle('list-visible');
            this.droplist.classList.toggle('visible');
        }

        oSelectComboBox.prototype.resetCurrentListPosition = function () {
            this.currentlistposition = -1;
        }

        oSelectComboBox.prototype.setWidth = function () {
            // set the width of the drop list to the width of the input
            if (this.element.style.width.length > 0) {
                this.droplist.classList.add('manual-width');
                this.droplist.style.width = 'calc(' + this.element.style.width + ' + 44px + 16px)';
            }
        }

        oSelectComboBox.prototype.filtertype = function (prop) {
            this.filtermethod = prop;
        }

        oSelectComboBox.prototype.placeholder = function (prop) {
            this.element.placeholder = prop;
        }

        oSelectComboBox.prototype.noitemsinlist = function (prop) {
            var placeholderelement = document.createElement('li');
            placeholderelement.classList.add('a-list-placeholder-empty');
            placeholderelement.innerHTML = prop;
            this.droplist.appendChild(placeholderelement);
        }

        oSelectComboBox.prototype.notenoughcharacters = function (prop) {
            var placeholderelement = document.createElement('li');
            placeholderelement.classList.add('a-list-placeholder-restriction');
            placeholderelement.innerHTML = prop;
            this.droplist.appendChild(placeholderelement);
        }

        oSelectComboBox.prototype.listsize = function (prop) {
            var height = (27 * prop);
            this.droplist.style.maxHeight = height + 'px';
        }

        oSelectComboBox.prototype.mincharactersforlist = function (prop) {
            this.mincharacters = prop;
        }

        return oSelectComboBox;

    });