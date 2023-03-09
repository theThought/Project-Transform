define(['component'],
    function (component) {

        /**
         * Organism: Question combo-box with list
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oSelectComboBox(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] input.a-input-combobox');
            this.droplist = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] ul');
            this.wrapper = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"]');
            this.tallest = 0;
            this.widest = 0;
            this.mincharacters = 0;
            this.maxwidth = '';
            this.keypressed = null;
            this.isJumpingToLetter = false;
            this.list = null;
            this.filtermethod = 'contains';
            this.noitemsplaceholder = 'no items to display';
            this.notenoughcharactersplaceholder = 'begin typing to display the list';
        }

        oSelectComboBox.prototype = Object.create(component.prototype);
        oSelectComboBox.prototype.constructor = oSelectComboBox;

        oSelectComboBox.prototype.init = function () {
            this.list = this.buildList();
            this.configureProperties();
            this.setWidth();
            this.configureInitialFilter();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        oSelectComboBox.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener('click', this, false);
            document.addEventListener("clearEntries", this, false);
        }

        oSelectComboBox.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('keypress', this, false);
            this.element.addEventListener('keyup', this, false);
            this.element.addEventListener('change', this, false);
        }

        oSelectComboBox.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'clearEntries':
                    this.clearOptions();
                    this.clearEntries(event);
                    break;
                case 'change':
                    this.onChange(event);
                    break;
                case 'click':
                    this.onClick(event);
                    break;
                case 'keypress':
                    this.getKeyPressed(event);
                    this.onKeypress(event);
                    break;
                case 'keyup':
                    this.getKeyPressed(event);
                    this.onKeyup();
                    this.onChange(event);
                    break;
            }
        }

        oSelectComboBox.prototype.buildList = function () {
            return this.droplist.querySelectorAll('li');
        }

        oSelectComboBox.prototype.configureInitialFilter = function () {
            if (this.element.value.length) {
                this.filterListStarts(this.element.value);
                return;
            }

            if (this.mincharacters > 0) {
                this.droplist.classList.add('charrestriction');
                this.filterListStarts('');
            }
        }

        oSelectComboBox.prototype.filterList = function () {
            switch (this.filtermethod) {
                case 'starts':
                    this.filterListStarts(this.element.value);
                    break;
                case 'contains':
                    this.filterListContains(this.element.value);
                    break;
            }
        }

        oSelectComboBox.prototype.filterListStarts = function (string) {

            if (string.length < this.mincharacters) {
                this.droplist.classList.add('charrestriction');
                string = '';
            } else {
                this.droplist.classList.remove('charrestriction');
            }

            string = string.toLowerCase();
            var visibleitems = this.list.length;

            for (var i = 0; i < this.list.length; i++) {
                var itemlabel = this.list[i].innerText.toLowerCase();
                if (itemlabel.indexOf(string) === 0) {
                    this.list[i].classList.remove('filter-hidden');
                } else {
                    this.list[i].classList.add('filter-hidden');
                    visibleitems--;
                }
            }

            if (visibleitems === 0) {
                this.togglePlaceholderVisibility(true);
            } else {
                this.togglePlaceholderVisibility(false);
            }
        }

        oSelectComboBox.prototype.filterListContains = function (string) {

            if (string.length < this.mincharacters) {
                this.droplist.classList.add('charrestriction');
                return;
            } else {
                this.droplist.classList.remove('charrestriction');
            }

            string = string.toLowerCase();
            var visibleitems = this.list.length;

            for (var i = 0; i < this.list.length; i++) {
                var itemlabel = this.list[i].innerText.toLowerCase();
                if (itemlabel.indexOf(string) !== -1) {
                    this.list[i].classList.remove('filter-hidden');
                } else {
                    this.list[i].classList.add('filter-hidden');
                    visibleitems--;
                }
            }

            if (visibleitems === 0) {
                this.togglePlaceholderVisibility(true);
            } else {
                this.togglePlaceholderVisibility(false);
            }
        }

        oSelectComboBox.prototype.togglePlaceholderVisibility = function (visibility) {
            if (visibility) {
                this.droplist.classList.add('empty');
            } else {
                this.droplist.classList.remove('empty');
            }
        }

        oSelectComboBox.prototype.onChange = function (event) {
            event.stopImmediatePropagation();
            this.broadcastChange();
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

        oSelectComboBox.prototype.onClick = function (event) {
            if (event.target === this.element) {
                this.toggleList();
                return;
            }

            if (!this.element.classList.contains('visible')) {
                return;
            }

            if (event.target === this.droplist
                || (this.droplist.contains(event.target))) {
                event.stopImmediatePropagation();
                this.clearOptions();
                this.selectOption(event);
                return;
            }

            this.hideList();
        }

        oSelectComboBox.prototype.selectOption = function (event) {
            var selectedOption = event.target;
            event.target.classList.add('selected');
            this.element.value = selectedOption.innerText;
            this.hideList();
        }

        oSelectComboBox.prototype.clearOptions = function () {
            this.list.forEach(function (item) {
                item.classList.remove('selected');
            });
        }

        oSelectComboBox.prototype.hideList = function () {
            this.element.classList.remove('visible');
        }

        oSelectComboBox.prototype.toggleList = function () {
            this.element.classList.toggle('visible');
        }

        oSelectComboBox.prototype.setWidth = function () {
            // determine whether a manual width has been set
            if (this.element.length > 0) {
                this.element.classList.add('manual-width');
                this.element.style.width = this.element.offsetWidth + 'px';
            }

            // set the width of the drop list to the width of the input
            var dims = getComputedStyle(this.element);
            this.droplist.style.width = dims.width;
        }

        oSelectComboBox.prototype.onKeypress = function () {
            if (this.isJumpingToLetter) {
                this.processKeyJump();
            }
        }

        oSelectComboBox.prototype.onKeyup = function () {
            // potentially add logic to determine what sort of input this is
            this.filterList();
        }

        oSelectComboBox.prototype.processKeyJump = function () {
            // may not need implementing for combo-boxes
        }

        oSelectComboBox.prototype.jumptofirstletter = function (prop) {
            if (prop === true) {
                this.isJumpingToLetter = true;
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
            // todo: how do we calculate this as height changes?
            var height = 27 * prop + 7;
            this.element.style.maxHeight = height + 'px';
        }

        oSelectComboBox.prototype.mincharactersforlist = function (prop) {
            this.mincharacters = prop;
        }

        return oSelectComboBox;

    });