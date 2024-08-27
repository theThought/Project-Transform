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
        this.getListItems = document.querySelector('.a-list');
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
        this.listtype = 'openendsearch';
        this.defaultplaceholder = 'Select';
        this.isjumpingtoletter = false;
        this.manualWidth = false;
        this.userspecifiedheight = 0;
        this.keytimer = null;
        this.keytimerlimit = 500;
        this.buttonElement = null;
        this.matchedWord = null;
        this.tabPressed = false;
        this.mousePressed = false;
        this.hasScan = false;
        this.template = {};
    }

    oQuestionOpenendSearch.prototype = Object.create(oQuestion.prototype);
    oQuestionOpenendSearch.prototype.constructor = oQuestionOpenendSearch;

    oQuestionOpenendSearch.prototype.init = function () {
        this.configureProperties();
        this.template = this.buildJsonTemplate();
        this.list = this.buildList();
        this.indexList();
        this.manualWidth = this.checkManualWidth();
        this.cloneInputElement();
        this.configureTagContainer();
        this.setCurrentListPosition();
        this.updateScrollPosition(this.getCurrentListPosition());
        this.createButtonElement();
        this.setPosition();
        this.setTabIndex();
        this.setWrapperType();
        this.configureInitialVisibility();
        this.processVisibilityRules();
        this.configureInitialFilter();
        this.configureIncomingEventListeners();
        this.configureLocalEventListeners();
        this.fetchList();
        this.getDataFromSource();
        this.wordMatching();
        this.filterList();
        this.setupSpecialListener();
        this.ensureSpecialOrder();
        this.addMessageContainers();
        this.addBarcodeScanButton();
        this.getInitialValue();
        this.restoreSelection();
        this.configurationComplete();
        this.placeCheckBox();
    };

    oQuestionOpenendSearch.prototype.placeCheckBox = function(){
        if (this.special && this.buttonElement) {
            this.buttonElement.insertAdjacentElement('afterend', this.special);
        }
    }

    oQuestionOpenendSearch.prototype.buildJsonTemplate = function () {
        if (typeof this.properties.list.valuefrom !== 'object') {
            return;
        }

        var template = {match: {}, nomatch: {}};
        var i, pair, map;

        map = this.properties.list.valuefrom.match || [];
        for (i = 0; i < map.length; i++) {
            pair = map[i];
            template.match[pair.property.toLowerCase()] = pair.from.toLowerCase();
        }

        // the nomatch is deliberately inverted, as we want to retrieve a destination from a method
        map = this.properties.list.valuefrom.nomatch || [];
        for (i = 0; i < map.length; i++) {
            pair = map[i];
            template.nomatch[pair.from.toLowerCase()] = pair.property.toLowerCase();
        }

        return template;
    };

    oQuestionOpenendSearch.prototype.setSelectedOption = function (selectedOption) {
        selectedOption.classList.add('selected');
        selectedOption.setAttribute('data-selected', 'selected');
        var dataItem = selectedOption.getAttribute('data-item');
        var value;
        try {
            value = JSON.parse(dataItem);
        } catch (e) {
            value = dataItem;
        }
        console.log(value);
    
        if (typeof this.template !== 'undefined') {
            var filledTemplate = this.fillTemplateWithValues(value);
            this.setHiddenValue(filledTemplate);
            
            // Use the dynamic property based on descriptionfrom??
            var descriptionField = filledTemplate[this.properties.list.descriptionfrom];
            console.log(this.properties.list.descriptionfrom);
            

            this.addTag(descriptionField || Object.values(filledTemplate)[0]);
            this.value = filledTemplate;
        } else if (typeof value === 'object') {
            // Dynamically reference the descriptionfrom property??
            var descriptionField = value[this.properties.list.descriptionfrom];
            
            this.setHiddenValue(descriptionField);
            this.addTag(descriptionField);
            this.value = descriptionField;
            console.log('is obj');
            console.log(descriptionField);
        } else {
            this.setHiddenValue(value);
            this.addTag(value);
            this.value = value;
        }
    
        this.broadcastChange();
    };
    

    oQuestionOpenendSearch.prototype.fillTemplateWithValues = function (value) {
        var filledTemplate = JSON.parse(JSON.stringify(this.template.match));

        if (typeof value === "object") {
            for (var key in filledTemplate) {
                filledTemplate[key] = value[filledTemplate[key]];
            }
        }

        return filledTemplate;
    };

    oQuestionOpenendSearch.prototype.addMessageContainers = function () {
        var noMatchTextContainer = document.createElement('div');
        noMatchTextContainer.className = 'a-label-message-external-nomatch';
        this.container.querySelector('.l-selection-and-scan').appendChild(noMatchTextContainer);
        var emptyTextContainer = document.createElement('div');
        emptyTextContainer.className = 'a-label-message-external-empty';
        this.container.querySelector('.l-selection-and-scan').appendChild(emptyTextContainer);
    };

    oQuestionOpenendSearch.prototype.setHiddenValue = function (value) {
        if (typeof value === 'object' && value !== null) {
            this.hiddenelement.value = JSON.stringify(value);
            this.hiddenelement.setAttribute('data-value', JSON.stringify(value));
        } else {
            if (typeof this.template === 'object') {
                this.hiddenelement.value = JSON.stringify({[this.template.nomatch.search]: value});
                this.hiddenelement.setAttribute('data-value', JSON.stringify({[this.template.nomatch.search]: value}));
            } else {
                this.hiddenelement.value = value;
                this.hiddenelement.setAttribute('data-value', value);
            }
        }
    };

    oQuestionOpenendSearch.prototype.broadcastChange = function () {
        var elementTempValue = this.element.value;
        this.element.value = this.hiddenelement.value;
        oQuestion.prototype.broadcastChange.call(this);
        this.element.value = elementTempValue;
    };

    oQuestionOpenendSearch.prototype.onFocusIn = function (event) {
        if (this.tabPressed) {
            this.tabPressed = false;
        } else if (this.mousePressed) {
            this.mousePressed = false;
        }
        var focusEvent = new CustomEvent(this.group + '_textFocus', { bubbles: true, detail: this });
        this.element.dispatchEvent(focusEvent);
        if (this.element.value.length === 0 && this.mincharacters === 0) {
            this.showList();
        }
    };
    

    oQuestionOpenendSearch.prototype.fetchList = function () {
        var listElement = document.querySelector('#' + this.droplist.id);
    };

    oQuestionOpenendSearch.prototype.getDroplistHeight = function () {
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
        document.addEventListener("broadcastBarcodeDataChange", this.handleEvent.bind(this), false);
        document.addEventListener(this.group + '_optionVisibility', this.handleEvent.bind(this), false);
    };

    oQuestionOpenendSearch.prototype.configureLocalEventListeners = function () {
        this.element.addEventListener('input', this.handleEvent.bind(this), false);
        this.element.addEventListener('keydown', this.handleEvent.bind(this), false);
        this.element.addEventListener('mousedown', this.handleEvent.bind(this), false);
        this.element.addEventListener('keyup', this.handleEvent.bind(this), false);
        this.element.addEventListener('change', this.handleEvent.bind(this), false);
        this.element.addEventListener('focusin', this.handleEvent.bind(this), false);
        this.element.addEventListener('focusout', this.handleEvent.bind(this), false);
        this.element.addEventListener('cut', this.handleEvent.bind(this), false);
        this.container.addEventListener('scroll', this.handleEvent.bind(this), false);
        this.droplist.addEventListener('scroll', this.hideKeyboard.bind(this), false);
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
                this.onMousedown(event);
                this.onClick(event);
                break;
            case 'keydown':
                this.onKeydown(event);
                break;
            case 'keyup':
                this.onKeyup(event);
                this.onChange(event);
                break;
            case 'focusin':
            case 'input':
                this.onFocusIn(event);
                this.ensureSpecialOrder();
                break;
            case 'focusout':
                this.onFocusOut(event);
                break;
            case 'broadcastBarcodeDataChange':
                this.processBarcodeData(event);
                break;
            case 'broadcastChange':
                this.processVisibilityRulesFromExternalTrigger(event);
                break;
            case 'scroll':
                this.updateDroplistPosition(event);
                break;
        }
    };

    oQuestionOpenendSearch.prototype.processBarcodeData = function (event) {
        if (event.detail === null) {
            return;
        }
        this.setHiddenValue(event.detail);
        this.addTag(event.detail.description);
        this.broadcastChange();
    }

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
        // this.droplistwrapper.style.maxHeight = height + 'px';
        // this.droplistwrapper.style.minHeight = height + 'px';
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
        this.buttonElement = buttonElement;
        buttonElement.setAttribute('data-checked', 'true');
        buttonElement.setAttribute('data-value', 'true');
        var self = this;
        this.element.addEventListener('input', function () {
            self.currentInputValue = self.element.value.trim();
        });
        buttonElement.addEventListener('click', function (event) {
            event.preventDefault();
            var inputValue = self.element.value.trim();
            if (inputValue.length > 0) {
                self.addTag(inputValue);
                self.setHiddenValue(inputValue);
                self.element.value = '';
                self.broadcastChange();
                self.hideList();
            }
        });
    
        if (this.special) {
            if (document.body.contains(this.special)) {
                buttonElement.insertAdjacentElement('afterend', this.special);
            } 
        }
    };
    

    oQuestionOpenendSearch.prototype.getDataFromSource = function () {
        var listElement = document.querySelector('#' + this.droplist.id);
        var direction = this.properties.direction || 'standard-list';
        if (direction === 'horizontal') {
            listElement.classList.add('horizontal-list');
            listElement.classList.remove('vertical-list');
        } else if (direction === 'vertical') {
            listElement.classList.add('vertical-list');
            listElement.classList.remove('horizontal-list');
        } else {
            listElement.classList.remove('vertical-list');
            listElement.classList.remove('horizontal-list');
            listElement.classList.add('standard-list');
        }
        var html = '';
        for (var i = 0; i < barcodelist.list.length; i++) {
            var item = barcodelist.list[i];
            var flexClass = item.image ? 'flex-container' : '';
            var uniqueId = 'checkbox-' + i;
            html += '<li class="a-option-list ' + flexClass + '" id="' + item.id + '" data-list-position="' + i + '" data-questiongroup="' + this.group + '" data-value="' + (item.name || item.caption) + '" tabindex="0">';
            if (item.image) {
                html += '<label for="' + uniqueId + '" class="flex-label" data-value="' + (item.name || item.caption) + '">';
                html += '<img src="' + item.image + '" alt="' + item.caption + '" class="list-image" data-value="' + (item.name || item.caption) + '">';
                html += item.caption + '</label>';
            } else {
                html += '<label for="' + uniqueId + '" class="flex-label" data-value="' + (item.name || item.caption) + '">';
                html += item.name + '</label>';
            }
            html += '</li>';
        }
        listElement.innerHTML = html;
        var listItems = listElement.querySelectorAll('li');
        listItems.forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.stopPropagation();
                var value = item.getAttribute('data-value');
                this.addTag(value);
            }.bind(this));
            var label = item.querySelector('label');
            if (label) {
                label.addEventListener('click', function (e) {
                    e.stopPropagation();
                    var value = label.getAttribute('data-value');
                    this.addTag(value);
                }.bind(this));
            }
            var img = item.querySelector('img');
            if (img) {
                img.addEventListener('click', function (e) {
                    e.stopPropagation();
                    var value = img.getAttribute('data-value');
                    if (!value) {
                        value = img.parentElement.getAttribute('data-value');
                    }
                    this.addTag(value);
                }.bind(this));
            }
        }.bind(this));
    };

    oQuestionOpenendSearch.prototype.gettingWords = function () {
        var wordsArray = [];
        var seenWords = {};
        for (var i = 0; i < barcodelist.list.length; i++) {
            var item = barcodelist.list[i];
            var text = item.caption || item.name;
            if (item && typeof text === 'string') {
                var words = text.split(' ');
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
            var itemName = (item.caption || item.name).toLowerCase();
            if (item && typeof itemName === 'string') {
                var allMatch = inputWords.every(function (word) {
                    return itemName.includes(word);
                });
                if (allMatch) {
                    matchingWords.push(item.caption || item.name);
                }
            }
        }
        if (matchingWords.length > 0 && lowerCaseInput.length >= 3) {
            this.matchedWord = matchingWords[0];
            this.showList();
        } else {
            this.matchedWord = null;
            this.updateItemCount(0);
        }
        return matchingWords;
    };

    oQuestionOpenendSearch.prototype.wordMatching = function () {
        var inputElement = this.element;
        if (inputElement) {
            var self = this;
            inputElement.addEventListener('input', function (event) {
                var inputValue = event.target.value.trim();
                var filteredWords = self.filterWordContains(inputValue);
                var matches = Array.from(self.list).some(function (item) {
                    return item.innerText.toLowerCase() === inputValue.toLowerCase();
                });
                if (!matches && inputValue.length >= 3) {
                    self.buttonElement.disabled = false;
                } else {
                    self.buttonElement.disabled = true;
                }
                if (inputValue.length < 3) {
                    self.buttonElement.disabled = true;
                }
            });
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
        var droplistWrapperPadding = 35;
        this.element.style.width = Math.max(droplistwidth, inputwidth) + errormargin - padding + 'px';
        //this.droplistwrapper.style.width = Math.max(droplistwidth, inputwidth) + droplistWrapperPadding - padding + 'px';
        this.droplist.style.width = Math.max(droplistwidth, inputwidth) - droplistWrapperPadding - padding + 'px';
        this.messages.style.width = Math.max(droplistwidth, inputwidth) + errormargin - messagePadding + 'px';
        this.manualWidth = true;
    };

    oQuestionOpenendSearch.prototype.restoreSelection = function () {
        var hiddenValue = this.hiddenelement.value;
        if (!hiddenValue) return;
        var parsedValue;
        try {
            parsedValue = JSON.parse(hiddenValue);
        } catch (e) {
            parsedValue = hiddenValue;
        }
        var selectedOption = null;
        if (typeof parsedValue === 'object') {
            var listItems = this.droplist.querySelectorAll('li');
            for (var i = 0; i < listItems.length; i++) {
                var item = listItems[i];
                var itemData = item.getAttribute('data-item');
                try {
                    var itemObject = JSON.parse(itemData);
                    if (JSON.stringify(itemObject) === JSON.stringify(parsedValue)) {
                        selectedOption = item;
                        break;
                    }
                } catch (e) {}
            }
        } else {
            selectedOption = this.droplist.querySelector('[data-item="' + CSS.escape(parsedValue) + '"]');
        }
        if (selectedOption) {
            this.setSelectedOption(selectedOption);
        } else if (typeof parsedValue === 'object') {
            this.addTag(parsedValue.description || parsedValue.value || parsedValue);
        } else {
            this.addTag(parsedValue);
        }
    };

    oQuestionOpenendSearch.prototype.setWrapperType = function () {
        this.wrapper.classList.add('list-combobox');
        this.wrapper.classList.add('o-combobox');
    };

    oQuestionOpenendSearch.prototype.getInitialValue = function () {
        if (this.hiddenelement) {
            const hiddenValue = this.hiddenelement.value;
            if (hiddenValue) {
                try {
                    const parsedValue = JSON.parse(hiddenValue);
                    this.addTag(parsedValue.description || parsedValue.value || parsedValue);
                    this.setHiddenValue(parsedValue);
                    this.value = parsedValue;
                    this.element.value = '';
                } catch (e) {
                    this.addTag(hiddenValue);
                    this.value = hiddenValue;
                    this.element.value = '';
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
        var listItems = this.droplist.querySelectorAll('li');
        var listClass = this.droplist.classList;
        for (var i = 0; i < listItems.length; i++) {
            var item = listItems[i];
            var itemData = {};
            if (listClass.contains('vertical-list') || listClass.contains('horizontal-list')) {
                itemData.value = item.id;
            } else if (listClass.contains('standard-list')) {
                itemData.value = item.innerText;
            }
            var originalObject = barcodelist.list[i];
            item.setAttribute('data-item', JSON.stringify(originalObject));
        }
        return listItems;
    };

    oQuestionOpenendSearch.prototype.buildListFromHtml = function () {
        var item = this.droplist.querySelector('li');
        if (item) {
            return JSON.parse(item.getAttribute('data-item'));
        }
        return null;
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

    oQuestionOpenendSearch.prototype.onFocusOut = function (event) {
        if (event.relatedTarget === null) {
            return;
        }
        if (!this.wrapper.contains(event.relatedTarget)) {
            event.stopImmediatePropagation();
            this.hideList();
        }
        this.tabPressed = false;
        this.mousePressed = false;
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
        this.getKeyPressed(event);
        switch (this.keypressed) {
            case 9:
                this.tabPressed = true;
                this.clearKeyBuffer();
                break;
            case 38:
                event.preventDefault();
                this.navigateUp();
                break;
            case 40:
                event.preventDefault();
                this.navigateDown();
                break;
            case 13:
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
        if (this.keypressed === 9) {
            this.messages.style.display = 'none';
            this.showList();
            this.tabPressed = true;
            this.mousePressed = false;
        }
        clearTimeout(this.keyupTimer);
        var self = this;
        this.keyupTimer = setTimeout(function () {
            self.processKeyup(event);
        }, 200);
    };

    oQuestionOpenendSearch.prototype.processKeyup = function (event) {
        switch (this.keypressed) {
            case 27:
                this.hideList();
                return;
            case 38:
                this.clearKeyBuffer();
                this.navigateUp();
                break;
            case 40:
                this.clearKeyBuffer();
                this.navigateDown();
                break;
            case 9:
                this.toggleList();
                break;
            case null:
                break;
            case 13:
                return;
            default:
                this.filterList();
                break;
        }
    };

    oQuestionOpenendSearch.prototype.onMousedown = function (event) {
        this.mousePressed = true;
        this.tabPressed = false;
    };

    oQuestionOpenendSearch.prototype.clearKeyBuffer = function () {
        this.keybuffer = '';
    };

    oQuestionOpenendSearch.prototype.navigateUp = function () {
        if (this.currentlistposition > 0) {
            this.currentlistposition--;
            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
            this.list[this.currentlistposition].focus();
        }
    };

    oQuestionOpenendSearch.prototype.navigateDown = function () {
        if (this.currentlistposition < this.list.length - 1) {
            this.currentlistposition++;
            this.updateSelectedEntry(this.currentlistposition);
            this.updateScrollPosition(this.currentlistposition);
            this.list[this.currentlistposition].focus();
        }
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
        while (selectedOption && selectedOption.tagName !== 'LI') {
            selectedOption = selectedOption.parentElement;
        }
        if (!selectedOption) {
            return;
        }
        this.setSelectedOption(selectedOption);
        this.element.value = '';
        this.hideList();
        this.onFocusIn();
        this.onChange(event);
        var image = selectedOption.querySelector('img');
        if (image) {
            var visibleItemCount = 1;
            this.element.classList.add('list-visible');
            this.droplist.classList.add('visible');
            document.querySelector('.m-list-external').classList.add('visible');
            this.updateItemCount(visibleItemCount);
        }
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

    oQuestionOpenendSearch.prototype.showList = function () {
        this.setDropListDirection();
        this.element.classList.add('list-visible');
        this.droplist.classList.add('visible');
        this.getDroplistHeight();
        this.messages.style.paddingTop = this.droplist.offsetHeight + 'px';
        this.updateItemCount(this.buildVisibleList().length);
    };

    oQuestionOpenendSearch.prototype.hideList = function () {
        this.element.classList.remove('list-visible');
        this.droplist.classList.remove('visible');
        this.messages.style.paddingTop = '0px';
        this.updateItemCount(0);
    };

    oQuestionOpenendSearch.prototype.toggleList = function () {
        this.setDropListDirection();
        this.element.classList.toggle('list-visible');
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
        if (!document.querySelector('.horizontal-list, .vertical-list, .standard-list')) {
            return;
        }
        this.setCurrentListPosition();
        this.list = this.buildList();
        var inputstring = this.element.value;
        if (inputstring.length < 3 && this.mincharacters > 0) {
            this.notenoughcharacters(this.properties.notenoughcharacters);
            this.messages.classList.add('charrestriction');
            this.hideList();
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
        var visibleItems = this.buildVisibleList();
        if (visibleItems.length > 0) {
            this.clearPlaceholderMessages();
            this.showList();
        } else {
            this.noitemsinlist(this.properties.noitemsinlist);
            this.hideList();
        }
        this.updateItemCount(visibleItems.length);
    };

    oQuestionOpenendSearch.prototype.filterListStarts = function (inputstring) {
        var visibleitems = 0;
        inputstring = inputstring.toLowerCase();
        var elementsToModify = [];
        this.list.forEach(function (item) {
            var itemlabel = this.sanitiseText(item.innerText.toLowerCase());
            if (itemlabel.startsWith(inputstring)) {
                elementsToModify.push({ item: item, hidden: false });
                visibleitems++;
            } else {
                elementsToModify.push({ item: item, hidden: true });
            }
        }.bind(this));
        elementsToModify.forEach(function (elementData) {
            if (elementData.hidden) {
                elementData.item.classList.add('filter-hidden');
            } else {
                elementData.item.classList.remove('filter-hidden');
            }
        });
        this.updateItemCount(visibleitems);
        this.togglePlaceholderVisibility(visibleitems === 0);
    };

    oQuestionOpenendSearch.prototype.filterListContains = function (inputstring) {
        var exactmatch = false;
        var visibleitems = 0;
        inputstring = inputstring.toLowerCase();
        var elementsToModify = [];
        this.list.forEach(function (item) {
            var itemlabel = this.sanitiseText(item.innerText.toLowerCase());
            if (itemlabel.includes(inputstring)) {
                elementsToModify.push({ item: item, hidden: false, selected: itemlabel === inputstring });
                visibleitems++;
            } else {
                elementsToModify.push({ item: item, hidden: true, selected: false });
            }
        }.bind(this));
        elementsToModify.forEach(function (elementData) {
            if (elementData.hidden) {
                elementData.item.classList.add('filter-hidden');
            } else {
                elementData.item.classList.remove('filter-hidden');
            }
            if (elementData.selected) {
                elementData.item.classList.add('selected');
                elementData.item.setAttribute('data-selected', 'selected');
            } else {
                elementData.item.classList.remove('selected');
                elementData.item.removeAttribute('data-selected');
            }
        });
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

    oQuestionOpenendSearch.prototype.scan = function (props) {
        this.hasScan = props.state;
    }

    oQuestionOpenendSearch.prototype.updateItemCount = function (count) {
        var itemCountElement = document.querySelector('.m-openend-search-count .a-label-counter');
        var itemPromptElement = document.querySelector('.m-openend-search-count .a-label-counter-prompt');
        if (itemCountElement && itemPromptElement) {
            var itemCountParent = itemCountElement.parentNode;
            if (this.droplist.classList.contains('visible')) {
                if (typeof count === 'number' && count > 0) {
                    if (this.properties && this.properties.prompts && this.properties.prompts.listcount) {
                        itemCountElement.textContent = count;
                        itemPromptElement.textContent = this.properties.prompts.listcount;
                    } else {
                        itemCountElement.textContent = count;
                        itemPromptElement.textContent = "items";
                    }
                    itemCountParent.style.borderTop = '1px solid #000066';
                } else if (count === 0) {
                    itemCountElement.textContent = '';
                    itemPromptElement.textContent = "";
                    itemCountParent.style.borderTop = '';
                }
                itemCountParent.classList.remove('hidden');
            } else {
                itemCountElement.textContent = '';
                itemPromptElement.textContent = '';
                itemCountParent.classList.add('hidden');
                itemCountParent.style.borderTop = '';
            }
        }
    };

    oQuestionOpenendSearch.prototype.configureTagContainer = function () {
        var container = document.createElement('div');
        container.className = 'l-selection-and-scan';
        var tagContainer = document.createElement('div');
        tagContainer.className = 'o-question-selected';
        container.appendChild(tagContainer);
        var inputElement = this.wrapper.querySelector('input');
        this.wrapper.insertBefore(container, inputElement);
    };

    oQuestionOpenendSearch.prototype.addBarcodeScanButton = function () {
        if (!this.hasScan) {
            return;
        }
        var scanButton = document.createElement('input');
        scanButton.type = 'button';
        scanButton.classList.add('start-external');
        scanButton.setAttribute('data-questiongroup', this.group);
        var id = this.id + '_scanbutton';
        scanButton.id = id;
        this.container.querySelector('.l-selection-and-scan').insertAdjacentElement('afterbegin', scanButton);
        app.registerComponent('a-button-barcode', id, this.group);
    };

    oQuestionOpenendSearch.prototype.addTag = function (label) {
        if (!label) return;
        var displayLabel;
        if (typeof label === 'object') {
            displayLabel = label.name || label.value || label;
        } else {
            displayLabel = label;
        }
        var container = document.querySelector('.o-question-selected');
        if (!container) {
            container = document.createElement('div');
            container.className = 'o-question-selected';
            var inputElement = this.wrapper.querySelector('input');
            this.wrapper.insertBefore(container, inputElement);
        }
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        if (this.buttonElement) {
            this.buttonElement.disabled = true;
        }
        var tag = document.createElement('div');
        tag.className = 'm-tag-answer';
        tag.setAttribute('data-value', displayLabel);
        tag.setAttribute('value', displayLabel);
        tag.innerHTML = '<span> ' + displayLabel + '</span><button class="delete-tag">X</button>';
        container.appendChild(tag);

        this.clearExternalMessages();

        var deleteButton = tag.querySelector('.delete-tag');
        deleteButton.addEventListener('click', function () {
            container.removeChild(tag);
            this.element.value = '';
            this.element.setAttribute('data-value', '');
            this.hiddenelement.value = '';
            this.hiddenelement.setAttribute('data-value', '');
            this.broadcastChange();
            this.element.focus();
            this.clearFilters();
            this.updateItemCount(this.buildVisibleList().length);
        }.bind(this));
    };

    oQuestionOpenendSearch.prototype.clearExternalMessages = function () {
        var clearExternalMessages = new CustomEvent('clearExternalMessages', {bubbles: true, detail: this});
        this.element.dispatchEvent(clearExternalMessages);
    }

    oQuestionOpenendSearch.prototype.clearFilters = function () {
        this.list.forEach(function (item) {
            item.classList.remove('filter-hidden');
        });
        this.clearPlaceholderMessages();
    };

    oQuestionOpenendSearch.prototype.showAllImageItems = function () {
        var visibleItemCount = 0;
        this.list.forEach(function (item) {
            if (item.querySelector('img')) {
                item.style.display = '';
                visibleItemCount++;
            }
        });
        this.element.classList.add('list-visible');
        this.droplist.classList.add('visible');
        document.querySelector('.m-list-external').classList.add('visible');
        this.updateItemCount(visibleItemCount);
        this.getDroplistHeight();
    };

    oQuestionOpenendSearch.prototype.removeTag = function (tag) {
        if (tag) {
            if (tag.parentNode) {
                tag.parentNode.removeChild(tag);
            }
            if (this.element) {
                this.element.value = '';
            }
            if (this.hiddenelement) {
                this.hiddenelement.value = '';
            }
            this.showAllImageItems();
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
        this.element.focus();
    };

    oQuestionOpenendSearch.prototype.setupSpecialListener = function () {
        if (this.special) {
            var checkbox = this.special.querySelector('input[type="checkbox"]');
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-checked') {
                        var isChecked = this.special.getAttribute('data-checked') === 'true';
                        if (isChecked) {
                            this.itemCountElement.textContent = '';
                        }
                    }
                }.bind(this));
            }.bind(this));
            observer.observe(this.special, { attributes: true });
        }
    };

    oQuestionOpenendSearch.prototype.ensureSpecialOrder = function () {
      
        if (this.special && !this.special.hasBeenMoved) {
            const parentNode = this.wrapper.parentNode;
            if (parentNode) {
                parentNode.insertBefore(this.special, this.wrapper.nextSibling);
                this.special.hasBeenMoved = true; 
            }
        }
    };
    

    oQuestionOpenendSearch.prototype.hideKeyboard = function () {
        this.element.blur();
    };

    return oQuestionOpenendSearch;
});
