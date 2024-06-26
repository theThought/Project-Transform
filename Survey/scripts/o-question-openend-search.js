define(['o-question'], function (oQuestion) {
    function oQuestionOpenendSearch(id, group) {
        oQuestion.call(this, id, group);

        this.element = document.querySelector('.a-input-openend-search[data-questionid="' + this.id + '"]');    
        this.droplistwrapper = document.querySelector('.o-list');
        this.droplist = document.querySelector('.o-list ul[data-questiongroup="' + this.group + '"]');
        this.wrapper = document.querySelector('div[class*=o-openend-search][data-questiongroup="' + this.group + '"]');
        this.container = this.element.closest('div[data-questiongroup="' + this.group + '"]');
        this.itemCountElement = document.querySelector('.m-openend-search-count');
        this.messages = document.querySelector('.m-list-messages');
        this.special = document.querySelector('.m-option-base');
        
        this.hiddenelement = null;
        this.mincharacters = 0;
        this.keypressed = null;
        this.keybuffer = '';
        this.searchableNames = [];

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
        this.keytimerlimit = 500; 

        this.buttonElement = null;
        this.matchedWord = null; 
    }

    oQuestionOpenendSearch.prototype = Object.create(oQuestion.prototype);
    oQuestionOpenendSearch.prototype.constructor = oQuestionOpenendSearch;

    oQuestionOpenendSearch.prototype.init = function () {
        this.list = this.buildList();
        this.indexList();
        this.manualWidth = this.checkManualWidth();
        this.cloneInputElement();
        this.restoreSelection();
        this.setCurrentListPosition();
        this.updateScrollPosition(this.getCurrentListPosition());
        this.configureProperties();

        this.createButtonElement(); // Create button element before getInitialValue
        this.getInitialValue();

        this.setPosition();
        this.setTabIndex();
        this.setWrapperType();
        this.configureInitialVisibility();
        this.processVisibilityRules();
        this.configureInitialFilter();
        this.configureIncomingEventListeners();
        this.configureLocalEventListeners();
        this.configurationComplete();

        this.getDataFromSource();
        this.wordMatching();

        this.configureTagContainer();
        this.filterList();
        // this.displaySavedTag();
    };

    oQuestionOpenendSearch.prototype.getDroplistHeight = function () {
        if (this.droplist) {
            var computedStyle = window.getComputedStyle(this.droplist);
            this.setMessagePaddingTop(computedStyle.height);
        } else {
            console.log('Droplist not found');
        }
    };

    oQuestionOpenendSearch.prototype.setMessagePaddingTop = function (height) {
        if (this.messages) {
            this.messages.style.paddingTop = height;
        }
    };

    oQuestionOpenendSearch.prototype.resetMessagePaddingTop = function () {
        if (this.messages) {
            this.messages.style.paddingTop = '20px';
        }
    };

    oQuestionOpenendSearch.prototype.setDropListDirection = function () {
        this.wrapper.classList.remove('direction-up');
        this.wrapper.classList.add('direction-down');
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

        this.getDroplistHeight();
    };

    oQuestionOpenendSearch.prototype.configureIncomingEventListeners = function () {
        document.addEventListener('mousedown', this.handleEvent.bind(this), false);
        document.addEventListener("clearEntries", this.handleEvent.bind(this), false);
        document.addEventListener("restoreEntries", this.handleEvent.bind(this), false);
        document.addEventListener(this.group + "_enableExclusive", this.handleEvent.bind(this), false);
        document.addEventListener("broadcastChange", this.handleEvent.bind(this), false);
        document.addEventListener(this.group + '_optionVisibility', this.handleEvent.bind(this), false);
    };

    oQuestionOpenendSearch.prototype.configureLocalEventListeners = function () {
        this.element.addEventListener('input', this.handleEvent.bind(this), false);
        this.element.addEventListener('keydown', this.handleEvent.bind(this), false);
        this.element.addEventListener('keyup', this.handleEvent.bind(this), false);
        this.element.addEventListener('change', this.handleEvent.bind(this), false);
        this.element.addEventListener('focusin', this.handleEvent.bind(this), false);
        this.element.addEventListener('focusout', this.handleEvent.bind(this), false);
        this.element.addEventListener('cut', this.handleEvent.bind(this), false);
        this.container.addEventListener('scroll', this.handleEvent.bind(this), false);
    };

    oQuestionOpenendSearch.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'cut':
                this.onCut(event);
                break;
            case 'clearEntries':
                this.clearEntriesFromExternal(event);
                break;
            case 'restoreEntries':
                this.restoreEntries(event);
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
                this.onKeyup(event);
                this.onChange(event);
                break;
            case 'focusin':
            case 'input':
                this.onFocusIn(event);
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
    };

    // Define necessary methods
    oQuestionOpenendSearch.prototype.receiveOptionVisibilityChange = function (event) {
        if (this.hiddenelement.value === event.detail.itemValue) {
            this.clearEntries();
        }
    };

    oQuestionOpenendSearch.prototype.updateDroplistPosition = function () {
        this.droplist.style.marginLeft = 0 - this.container.scrollLeft + 'px';
    };

    oQuestionOpenendSearch.prototype.exact = function (prop) {
        if (prop === false) {
            this.isExact = false;
        }
    };

    oQuestionOpenendSearch.prototype.filtertype = function (prop) {
        this.filtermethod = prop;
    };

    oQuestionOpenendSearch.prototype.jumptofirstletter = function (prop) {
        if (prop === true) {
            this.isjumpingtoletter = true;
        }
    };

    oQuestionOpenendSearch.prototype.listsize = function (prop) {
        var height = (27 * prop);
        this.userspecifiedheight = height;
        this.droplist.style.maxHeight = height + 'px';
        this.droplist.style.minHeight = height + 'px';
    };

    oQuestionOpenendSearch.prototype.mincharactersforlist = function (prop) {
        this.mincharacters = prop; 
    };

    oQuestionOpenendSearch.prototype.notenoughcharacters = function (prop) {
        this.clearPlaceholderMessages();
        
        var placeholderelement = document.createElement('div');
        placeholderelement.classList.add('a-list-placeholder-restriction');
        placeholderelement.innerHTML = prop;
        
        this.messages.appendChild(placeholderelement);
        this.messages.appendChild(this.itemCountElement);
    };

    oQuestionOpenendSearch.prototype.noitemsinlist = function (prop) {
        this.clearPlaceholderMessages();
    
        var placeholderelement = document.createElement('div');
        placeholderelement.classList.add('a-list-placeholder-empty');
        placeholderelement.innerHTML = prop;
    
        this.messages.appendChild(placeholderelement);
        this.messages.appendChild(this.itemCountElement);
    };

    oQuestionOpenendSearch.prototype.clearPlaceholderMessages = function () {
        var restrictionMessage = this.messages.querySelector('.a-list-placeholder-restriction');
        
        if (restrictionMessage) {
            this.messages.removeChild(restrictionMessage);
        }
        
        var emptyMessage = this.messages.querySelector('.a-list-placeholder-empty');
        
        if (emptyMessage) {
            this.messages.removeChild(emptyMessage);
        }
    };

    oQuestionOpenendSearch.prototype.createButtonElement = function () {
        var buttonElement = document.createElement('button');
        buttonElement.id = 'a-button-word-match';
        buttonElement.disabled = true;

        this.element.insertAdjacentElement('afterend', buttonElement);

        this.buttonElement = buttonElement; // Assign to this.buttonElement
        buttonElement.setAttribute('data-checked', 'true');
        buttonElement.setAttribute('data-value', 'true');

        var self = this;
        buttonElement.addEventListener('click', function (event) {
            event.preventDefault();

            var inputValue = self.element.value.trim();
            if (inputValue.length > 0) {
                self.addTag(inputValue);
                self.element.value = ''; 
                self.hideList(); 
            }
        });
    };

    oQuestionOpenendSearch.prototype.getDataFromSource = function () {
        var listElement = document.querySelector('#' + this.droplist.id);

        var html = '';
        var hasImage = false;

        for (var i = 0; i < barcodelist.list.length; i++) {
            var item = barcodelist.list[i];
            var flexClass = item.image ? 'flex-container' : '';
            var uniqueId = 'checkbox-' + i; 

            if (item.image) {
                hasImage = true;
            }

            html += '<li class="a-option-list ' + flexClass + '" id="' + this.id + '" data-list-position="' + i + '" data-questiongroup="' + this.group + '" data-value="' + item.name + '">';
            
            if (item.image) {
                html += '<input type="checkbox" id="' +  item.name + '" class="list-checkbox" data-value="' + item.name + '">';
                html += '<label for="' +  item.name + '" class="flex-label" data-value="' + item.name + '">';
                html += '<img src="' + item.image + '" alt="' + item.name + '" class="list-image" data-value="' + item.name + '">';
                html += item.name + '</label>';
            } else {
                html += item.name;
            }

            html += '</li>';
        }

        listElement.innerHTML = html;

        if (hasImage) {
            listElement.style.display = 'flex';
            listElement.style.flexWrap = 'wrap';
        }
    };

    oQuestionOpenendSearch.prototype.gettingWords = function () {
        var wordsArray = [];
        var seenWords = {};
    
        for (var i = 0; i < barcodelist.list.length; i++) {
            var item = barcodelist.list[i];
    
            if (item && typeof item.name === 'string') {
                var words = item.name.split(' ');
    
                for (var j = 0; j < words.length; j++) {
                    var word = words[j].toLowerCase();
                    if (word.length > 3 && !seenWords[word]) {
                        seenWords[word] = true;
                        wordsArray.push(word);
                    }
                }
            }
        }
    
        return wordsArray;
    };
    
    oQuestionOpenendSearch.prototype.filterWordContains = function (inputstring) {
        var wordsArray = this.gettingWords();
        var lowerCaseInput = inputstring.toLowerCase(); 
        var inputWords = lowerCaseInput.split(' ');
        var matchingWords = [];
    
        for (var i = 0; i < barcodelist.list.length; i++) {
            var item = barcodelist.list[i];
            if (item && typeof item.name === 'string') {
                var itemName = item.name.toLowerCase();
                var allMatch = inputWords.every(function (word) {
                    return itemName.includes(word);
                });
                if (allMatch) {
                    matchingWords.push(item.name);
                }
            }
        }
    
        if (matchingWords.length > 0 && lowerCaseInput.length >= 3) {
            this.matchedWord = matchingWords[0];
            this.showList();
        } else {
            this.matchedWord = null;
            this.hideList();
            this.updateItemCount(0);
        }
       
        return matchingWords;
    };
    
    oQuestionOpenendSearch.prototype.wordMatching = function () {
        var inputElement = this.element;
        if (inputElement) {
            var self = this;
            inputElement.addEventListener('input', function (event) {
                var inputValue = event.target.value;
                var filteredWords = self.filterWordContains(inputValue);
    
                if (filteredWords.length > 0 && inputValue.length >= 3) {
                    self.buttonElement.disabled = true;
                } else if (filteredWords.length < 1) {
                    self.matchedWord = null;
                    self.buttonElement.disabled = false;
                } else {
                    self.buttonElement.disabled = false;
                }
    
                var matches = Array.from(self.list).some(function (item) {
                    return item.innerText.toLowerCase() === inputValue.toLowerCase();
                });
    
                if (matches && inputValue.length === 0) {
                    self.buttonElement.disabled = true;
                }
            });
        } else {
            console.error('Input element not found or not an INPUT element');
        }
    };

    oQuestionOpenendSearch.prototype.placeholder = function (prop) {
        this.defaultplaceholder = this.decodeHTML(prop);
        this.element.placeholder = this.defaultplaceholder;
    };

    oQuestionOpenendSearch.prototype.makeAvailable = function () {
        oQuestion.prototype.makeAvailable.call(this);
        this.setWidth();
        this.manualWidth = true;
    };

    oQuestionOpenendSearch.prototype.setPosition = function () {
        this.droplist.style.bottom = '0';
    };

    oQuestionOpenendSearch.prototype.setTabIndex = function () {
        this.droplist.setAttribute('tabindex', '-1');
    };

    oQuestionOpenendSearch.prototype.checkManualWidth = function () {
        return this.element.style.width.length > 0;
    };

    oQuestionOpenendSearch.prototype.setWidth = function () {
        if (this.manualWidth) {
            this.element.classList.add('manual-width');
            this.droplist.classList.add('manual-width');
            this.droplist.style.width = 'calc(' + this.element.style.width + ' + 16px + 16px)';
            return;
        }

        this.element.size = Math.max(this.defaultplaceholder.length, 1);
        var inputdims = getComputedStyle(this.element);
        var inputwidth = parseFloat(inputdims.width);
        if (isNaN(inputwidth)) {
            inputwidth = 0;
        }
        var droplistdims = getComputedStyle(this.droplist);
        var droplistwidth = parseFloat(droplistdims.width);
        var padding = 32;
        var errormargin = 4;
        var messagePadding = 0;

        this.element.style.width = Math.max(droplistwidth, inputwidth) + errormargin - padding + 'px';
        this.droplist.style.width = Math.max(droplistwidth, inputwidth) + errormargin - padding + 'px';
        this.messages.style.width = Math.max(droplistwidth, inputwidth) + errormargin - messagePadding + 'px';

        this.manualWidth = true;
    };

    oQuestionOpenendSearch.prototype.restoreSelection = function () {
        var currentselection = this.droplist.querySelector('[data-value="' + this.element.value + '"]');

        if (currentselection === null) {
            return;
        }

        this.setSelectedOption(currentselection);
    };

    oQuestionOpenendSearch.prototype.setWrapperType = function () {
        this.wrapper.classList.add('list-combobox');
        this.wrapper.classList.add('o-combobox');
    };

    oQuestionOpenendSearch.prototype.getInitialValue = function () {
        if (this.hiddenelement) {
            const hiddenValue = this.hiddenelement.value;
            if (typeof hiddenValue !== 'undefined') {
                this.initialValue = hiddenValue;
                if (hiddenValue) {
                    console.log('Hidden input has a value: ', hiddenValue);
                    this.addTag(hiddenValue);
                    this.element.value = '';
                } else {
                    console.log('Hidden input is empty');
                }
            }
        }
        this.element.placeholder = this.defaultplaceholder;
    };
    
    oQuestionOpenendSearch.prototype.cloneInputElement = function () {
        var newelement = this.element.cloneNode();
        newelement.id = '';
        newelement.name = '';
        this.element.type = 'hidden';
        this.hiddenelement = this.element;
        this.element = this.wrapper.insertBefore(newelement, this.droplistwrapper);
    };

    oQuestionOpenendSearch.prototype.buildList = function () {
        return this.droplist.querySelectorAll('li');
    };

    oQuestionOpenendSearch.prototype.buildListFromHtml = function () {
        return this.droplist.querySelector('li');
    };

    oQuestionOpenendSearch.prototype.buildVisibleList = function () {
        return this.droplist.querySelectorAll('li:not(.filter-hidden):not([class^="a-list-placeholder-"])');
    };

    oQuestionOpenendSearch.prototype.indexList = function () {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].setAttribute('data-list-position', i);
        }
    };

    oQuestionOpenendSearch.prototype.sanitiseText = function (textstring) {
        textstring = textstring.replace(/[\r\n\t]/mg, ' ');
        textstring = textstring.replace(/\s\s+/mg, ' ');
        return textstring.trim();
    };

    oQuestionOpenendSearch.prototype.onChange = function (event) {
        event.stopImmediatePropagation();
        this.broadcastChange();
    };

    oQuestionOpenendSearch.prototype.onFocusIn = function () {
        var focusEvent = new CustomEvent(this.group + '_textFocus', { bubbles: true, detail: this });
        this.element.dispatchEvent(focusEvent);
    };

    oQuestionOpenendSearch.prototype.onFocusOut = function (event) {
        if (event.relatedTarget === null) {
            return;
        }

        if (!this.wrapper.contains(event.relatedTarget)) {
            event.stopImmediatePropagation();
            this.hideList();
        }
    };

    oQuestionOpenendSearch.prototype.onCut = function (event) {
        this.selectOption(event);
    };

    oQuestionOpenendSearch.prototype.getKeyPressed = function (event) {
        if (event.keyCode) {
            this.keypressed = event.keyCode;
        } else if (event.which) {
            this.keypressed = event.which;
        } else if (event.key) {
            this.keypressed = event.key;
        } else {
            this.keypressed = event.code;
        }
    };

    oQuestionOpenendSearch.prototype.onKeydown = function (event) {
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
                if (this.keypressed === 8 || this.keypressed === 46) {
                    this.clearKeyBuffer();
                }
        }
    };

    oQuestionOpenendSearch.prototype.onKeyup = function (event) {
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
                break;
            case 13: // enter key
                return;
            default:
                clearInterval(this.keytimer);
                var self = this;
                this.keytimer = setTimeout(function () {
                    self.clearKeyBuffer();
                }, this.keytimerlimit);
                this.filterList();
                break;
        }
    };

    oQuestionOpenendSearch.prototype.clearKeyBuffer = function () {
        this.keybuffer = '';
    };

    oQuestionOpenendSearch.prototype.navigateUp = function () {
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
    };

    oQuestionOpenendSearch.prototype.navigateDown = function () {
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
    };

    oQuestionOpenendSearch.prototype.updateScrollPosition = function (position) {
        this.droplist.scrollTop = 0; 
        var currentitem = this.buildVisibleList()[position];

        if (typeof currentitem === "undefined") {
            return;
        }

        var scrollposition = currentitem.offsetTop - this.droplist.clientHeight;
        this.droplist.scrollTop = scrollposition + 100;
    };

    oQuestionOpenendSearch.prototype.updateSelectedEntry = function (position) {
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
    };

    oQuestionOpenendSearch.prototype.onClick = function (event) {
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

        if (event.target.classList.contains('a-option-list')) {
            this.addTag(event.target.innerText);
            this.element.value = ''; 
            this.hideList();
        }
    };

    oQuestionOpenendSearch.prototype.onEnableExclusive = function (event) {
        if (this.element !== event.detail.element) {
            this.clearOptions();
            this.clearKeyBuffer();
            this.element.value = '';
            this.filterList();
        }
    };

    oQuestionOpenendSearch.prototype.selectOption = function (event) {
        this.keybuffer = '';
        var selectedOption = event.target;

        if (!this.element.classList.contains('list-visible')) {
            return;
        }

        if (event.type === 'keydown') {
            selectedOption = this.list[this.currentlistposition];
        }

        if (event.target === this.droplist) {
            return;
        }

        if (typeof selectedOption === 'undefined') {
            return;
        }

        if (selectedOption.classList.contains('a-list-placeholder-restriction')) {
            this.hideList();
            return;
        }

        if (selectedOption.classList.contains('a-list-placeholder-empty')) {
            this.hideList();
            return;
        }

        this.setSelectedOption(selectedOption);
        this.element.value = ''; 
        this.hideList();
        this.onFocusIn();
        this.onChange(event);
    };

    oQuestionOpenendSearch.prototype.setSelectedOption = function (selectedOption) {
        selectedOption.classList.add('selected');
        selectedOption.setAttribute('data-selected', 'selected');
        this.element.value = this.sanitiseText(selectedOption.innerText);
        this.element.classList.add('exact');
        this.setHiddenValue(selectedOption.getAttribute('data-value'));
        this.addTag(selectedOption.innerText);
    };

    oQuestionOpenendSearch.prototype.clearEntries = function () {
        if (this.isInitialising) {
            return;
        }

        oQuestion.prototype.clearEntries.call(this);
        this.clearOptions();
        this.filterList();
    };

    oQuestionOpenendSearch.prototype.clearOptions = function () {
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
    };

    oQuestionOpenendSearch.prototype.setHiddenValue = function (valuestring) {
        this.hiddenelement.value = valuestring;
    };

    oQuestionOpenendSearch.prototype.showList = function () {
        this.setDropListDirection();
        this.element.classList.add('list-visible');
        this.droplist.classList.add('visible');
        
        this.getDroplistHeight();
    };

    oQuestionOpenendSearch.prototype.hideList = function () {
        this.element.classList.remove('list-visible');
        this.droplist.classList.remove('visible');
        
        this.resetMessagePaddingTop();
    };

    oQuestionOpenendSearch.prototype.toggleList = function () {
        this.setDropListDirection();
        this.element.classList.toggle('list-visible');
    };

    oQuestionOpenendSearch.prototype.setDropListDirection = function () {
        this.wrapper.classList.remove('direction-up');
        this.wrapper.classList.add('direction-down');
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
    };

    oQuestionOpenendSearch.prototype.setCurrentListPosition = function (position) {
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
    };

    oQuestionOpenendSearch.prototype.getCurrentListPosition = function () {
        return parseInt(this.currentlistposition);
    };

    oQuestionOpenendSearch.prototype.configureInitialFilter = function () {
        for (var i = 0; i < this.list.length; i++) {
            var item = this.list[i];
            if (item.getAttribute('data-selected')) {
                this.element.value = this.sanitiseText(item.innerText);

                item.setAttribute('data-selected', 'selected');
                item.classList.add('selected');
                this.filterList();
            }
        }
    };

    oQuestionOpenendSearch.prototype.filterList = function (prop) {
        this.setCurrentListPosition();
        this.list = this.buildList();
        var inputstring = this.element.value;
    
        if (inputstring.length < 3 ) { 
            this.notenoughcharacters(this.properties.notenoughcharacters);
            this.messages.classList.add('charrestriction');
            return;
        } else {
            this.messages.classList.remove('charrestriction');
        }
    
        switch (this.filtermethod) {
            case 'starts':
                this.filterListStarts(inputstring);
                break;
            case 'contains':
                this.filterListContains(inputstring);
                break;
            case 'containsWord':
                this.filterWordContains(inputstring);
                break;
        }
    
        // Check if there are visible items after filtering
        var visibleItems = this.buildVisibleList();
        if (visibleItems.length > 0) {
            this.clearPlaceholderMessages();
        } else {
            this.noitemsinlist(this.properties.noitemsinlist);
        }
    };
        
    oQuestionOpenendSearch.prototype.filterListStarts = function (inputstring) {
        var visibleitems = 0;
        inputstring = inputstring.toLowerCase();
    
        var droplistparentnode = this.droplistwrapper.parentNode;
        droplistparentnode.removeChild(this.droplistwrapper);
    
        this.list.forEach(function (item) {
            var itemlabel = this.sanitiseText(item.innerText.toLowerCase());
            if (itemlabel.startsWith(inputstring)) {
                item.classList.remove('filter-hidden');
                visibleitems++;
            } else {
                item.classList.add('filter-hidden');
            }
        }.bind(this));
    
        droplistparentnode.appendChild(this.droplistwrapper);
        this.updateItemCount(visibleitems);
        this.togglePlaceholderVisibility(visibleitems === 0);
    };

    oQuestionOpenendSearch.prototype.filterListContains = function (inputstring) {
        var exactmatch = false;
        var visibleitems = 0;
        inputstring = inputstring.toLowerCase();
    
        var droplistparentnode = this.droplistwrapper.parentNode;
        droplistparentnode.removeChild(this.droplistwrapper);
    
        this.list.forEach(function (item) {
            var itemlabel = this.sanitiseText(item.innerText.toLowerCase());
            if (itemlabel.includes(inputstring)) {
                item.classList.remove('filter-hidden');
                visibleitems++;
                if (itemlabel === inputstring) {
                    item.classList.add('selected');
                    item.setAttribute('data-selected', 'selected');
                }
            } else {
                item.classList.add('filter-hidden');
                item.classList.remove('selected');
                item.removeAttribute('data-selected');
            }
        }.bind(this));
    
        droplistparentnode.appendChild(this.droplistwrapper);
        this.updateItemCount(visibleitems);
        if (visibleitems === 0) {
            this.noitemsinlist(this.properties.noitemsinlist);
        }
        this.togglePlaceholderVisibility(visibleitems === 0);
    };

    oQuestionOpenendSearch.prototype.togglePlaceholderVisibility = function (visibility) {
        if (visibility) {
            this.droplistwrapper.classList.add('empty');
        } else {
            this.droplistwrapper.classList.remove('empty');
        }
    };

    oQuestionOpenendSearch.prototype.updateItemCount = function (count) {

        var itemCountElement = document.querySelector('.m-openend-search-count .a-label-counter');
        var itemPromptElement = document.querySelector('.m-openend-search-count .a-label-counter-prompt');
    
        if (itemCountElement && itemPromptElement) {
            if (typeof count === 'number' && count > 0) {
                if (this.properties && this.properties.prompts && this.properties.prompts.listcount) {
                    itemCountElement.textContent = count;
                    itemPromptElement.textContent = this.properties.prompts.listcount;
                } else {
                    itemCountElement.textContent = count;
                    itemPromptElement.textContent = "items";
                }
            } else if (count === 0){
                itemCountElement.textContent = '';
                itemPromptElement.textContent = "";
            }
            itemCountElement.parentNode.classList.remove('hidden');   
        }
    };

    oQuestionOpenendSearch.prototype.configureTagContainer = function () {
        var container = document.createElement('div');
        container.className = 'o-question-selected';
        var inputElement = this.wrapper.querySelector('input');
        this.wrapper.insertBefore(container, inputElement);
    };

    oQuestionOpenendSearch.prototype.addTag = function (label) {
        if (typeof label === 'undefined' || label === null) {
            return;
        }
        
        var container = document.querySelector('.o-question-selected');
        if (!container) {
            console.error('Container element not found');
            return;
        }
        
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        if (this.buttonElement) {
            this.buttonElement.disabled = true;
        } else {
            console.error('Button element not found');
        }
        
        var tag = document.createElement('div');
        tag.className = 'm-tag-answer';
        tag.setAttribute('data-value', label); 
        tag.setAttribute('value', label); 
        tag.innerHTML = '<span> ' + label + '</span><button class="delete-tag">X</button>';
        container.appendChild(tag);
        this.updateItemCount(0);
    
        var deleteButton = tag.querySelector('.delete-tag');
        deleteButton.addEventListener('click', function () {
            this.updateItemCount(0);
            container.removeChild(tag);
    
            for (var i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                item.classList.remove('selected');
                item.removeAttribute('data-selected');
            }
            this.element.classList.remove('exact');
        }.bind(this));
    
        if (this.special) {
            console.log(this.special);
    
            var checkbox = this.special.querySelector('input[type="checkbox"]');
    
            if (checkbox && checkbox.checked) {
                container.removeChild(tag);
            }
            
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-checked') {
                        var isChecked = this.special.getAttribute('data-checked') === 'true';
                        if (isChecked) {
                            container.removeChild(tag);
                        }
                    }
                }.bind(this));
            }.bind(this));
            
            // Start observing the .m-option-base element
            observer.observe(this.special, { attributes: true });
        }
    };
    
    oQuestionOpenendSearch.prototype.removeTag = function (tag) {
        if (tag) {
            if (tag.parentNode) {
                tag.parentNode.removeChild(tag);
            } else {
                console.error('Parent node not found for tag');
            }

            if (this.element) {
                this.element.value = '';
            }

            if (this.hiddenelement) {
                this.hiddenelement.value = '';
            }
        }
    };

    oQuestionOpenendSearch.prototype.clearTags = function () {
        var container = document.querySelector('.o-question-selected');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        if (this.buttonElement) {
            this.buttonElement.disabled = true;
        }
    };

    return oQuestionOpenendSearch;
});
