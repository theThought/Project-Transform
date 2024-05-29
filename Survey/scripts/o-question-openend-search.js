define(['o-question'], function (oQuestion) {
    function oQuestionOpenendSearch(id, group) {
        oQuestion.call(this, id, group);

        this.element = document.querySelector('.a-input-openend-search[data-questionid="' + this.id + '"]');
        this.droplist = document.querySelector('.a-input-openend-search[data-questionid="' + this.id + '"] + ul');
        this.wrapper = document.querySelector('div[class*=o-openend-search][data-questiongroup="' + this.group + '"]');
        this.container = this.element.closest('div[data-questiongroup="' + this.group + '"]');

        this.itemCountElement = document.querySelector('.m-openend-search-count');
        this.itemPlaceHolderEmpty = document.querySelector('.a-list-placeholder-empty');

        this.isOpenendSearch = document.querySelector('ul.m-list-external');
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
        this.calculateDroplistHeight();
        this.createButtonElement();
        this.getDataFromSource();
        this.gettingWords();
        this.filterWordContains();
        this.wordMatching();
        this.updateItemCount();
        this.configureTagContainer();
        this.addTag();
        this.removeTag();
    };

    oQuestionOpenendSearch.prototype.configureIncomingEventListeners = function () {
        document.addEventListener('mousedown', this, false);
        document.addEventListener("clearEntries", this, false);
        document.addEventListener("restoreEntries", this, false);
        document.addEventListener(this.group + "_enableExclusive", this, false);
        document.addEventListener("broadcastChange", this, false);
        document.addEventListener(this.group + '_optionVisibility', this, false);
    };

    oQuestionOpenendSearch.prototype.configureLocalEventListeners = function () {
        this.element.addEventListener('input', this, false);
        this.element.addEventListener('keydown', this, false);
        this.element.addEventListener('keyup', this, false);
        this.element.addEventListener('change', this, false);
        this.element.addEventListener('focusin', this, false);
        this.element.addEventListener('focusout', this, false);
        this.element.addEventListener('cut', this, false);
        this.container.addEventListener('scroll', this, false);
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
                //this.setWidth();
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
    };

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
    };

    oQuestionOpenendSearch.prototype.mincharactersforlist = function (prop) {
        this.mincharacters = prop; 
    };

    oQuestionOpenendSearch.prototype.notenoughcharacters = function (prop) {
        this.clearPlaceholderMessages();
        
        // Create and configure the placeholder element
        var placeholderelement = document.createElement('li');
        placeholderelement.classList.add('a-list-placeholder-restriction');
        placeholderelement.innerHTML = prop;
        
        // Append the placeholder element to the droplist
        this.droplist.appendChild(placeholderelement);
        
        // Append the item count element to the droplist right after the placeholder element
        this.droplist.appendChild(this.itemCountElement);

        
    };
    
    oQuestionOpenendSearch.prototype.noitemsinlist = function (prop) {
        this.clearPlaceholderMessages();
    
        // Create and configure the placeholder element
        var placeholderelement = document.createElement('li');
        placeholderelement.classList.add('a-list-placeholder-empty');
        placeholderelement.innerHTML = prop;
        
        // Append the placeholder element to the droplist
        this.droplist.appendChild(placeholderelement);
            
        // Append the item count element to the droplist right after the placeholder element
        this.droplist.appendChild(this.itemCountElement);
    };
    
    oQuestionOpenendSearch.prototype.clearPlaceholderMessages = function () {
        var restrictionMessage = this.droplist.querySelector('.a-list-placeholder-restriction');
        if (restrictionMessage) {
            this.droplist.removeChild(restrictionMessage);
        }
        var emptyMessage = this.droplist.querySelector('.a-list-placeholder-empty');
        if (emptyMessage) {
            this.droplist.removeChild(emptyMessage);
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
        buttonElement.addEventListener('click', function (event) {
            event.preventDefault();

            var inputValue = self.element.value.trim();
            if (inputValue.length > 0) {
                self.addTag(inputValue);
                self.element.value = ''; // Clear the input field
                self.hideList(); // Hide the dropdown list
            }
        });
    };

    oQuestionOpenendSearch.prototype.getDataFromSource = function () {
        var listElement = document.querySelector('#' + this.droplist.id);

        var html = '';

        for (var i = 0; i < barcodelist.list.length; i++) {
            var item = barcodelist.list[i];
            html += '<li class="a-option-list" id="' + this.id + '" data-list-position="' + [i] + '" data-questiongroup="' + this.group + '" data-value="' + item.name + '">' + item.name + '</li>';
        }

        listElement.innerHTML = html;
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
                    if (word.length > 4 && !seenWords[word]) {
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
        var matchingWords = wordsArray.filter(function (word) {
            return word.includes(inputstring);
        });

        if (matchingWords.length > 0) {
            this.matchedWord = matchingWords[0];
            this.buttonElement.disabled = false;
        } else {
            this.matchedWord = null;
            this.buttonElement.disabled = true;
        }
        
        // Return the array of matching words for further use
        return matchingWords;
    };
    
    oQuestionOpenendSearch.prototype.wordMatching = function () {
        var inputElement = this.element;
        if (inputElement) {
            var self = this;
            inputElement.addEventListener('input', function (event) {
                    var inputValue = event.target.value;
                    var filteredWords = self.filterWordContains(inputValue);
                    
                    console.log('height only');
                    console.log(self.isOpenendSearch.style.maxHeight);
                    
                

                    if (filteredWords.length > 1 ) {
                        self.filterWordContains(inputValue);
                        self.itemCountElement.style.visibility = 'visible';
                        self.itemCountElement.style.top = '419px';                        
                        self.itemCountElement.style.width = self.isOpenendSearch.style.width;                        
                    } else if (filteredWords.length < 1 ){
                        
                        
                        self.matchedWord = null;
                        self.buttonElement.disabled = true;  
                        
                    } else {
                        
                    }
                
                var matches = Array.from(self.list).some(function (item) {
                    return item.innerText.toLowerCase() === inputValue.toLowerCase();
                });
    
                self.buttonElement.disabled = matches && inputValue.length === 0;
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

        this.element.style.width = Math.max(droplistwidth, inputwidth) + errormargin - padding + 'px';
        this.droplist.style.width = Math.max(droplistwidth, inputwidth) + errormargin - padding + 'px';

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
        if (typeof this.hiddenelement.value !== 'undefined') {
            this.initialValue = this.hiddenelement.value;
        }
    };

    oQuestionOpenendSearch.prototype.cloneInputElement = function () {
        var newelement = this.element.cloneNode();
        newelement.id = '';
        newelement.name = '';
        this.element.type = 'hidden';
        this.hiddenelement = this.element;
        this.element = this.wrapper.insertBefore(newelement, this.droplist);
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

    oQuestionOpenendSearch.prototype.onKeyup = function () {
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

        this.showList();
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
        this.droplist.scrollTop = 0; // set to top
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
            this.element.value = ''; // Clear the input field when selecting an item from the list
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
        this.element.value = ''; // Clear the input field when selecting an item
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
    };

    oQuestionOpenendSearch.prototype.hideList = function () {
        this.element.classList.remove('list-visible');
        this.droplist.classList.remove('visible');
        
    };

    oQuestionOpenendSearch.prototype.toggleList = function () {
        this.setDropListDirection();
        this.element.classList.toggle('list-visible');
    };

    oQuestionOpenendSearch.prototype.setDropListDirection = function () {
        this.wrapper.classList.remove('direction-up');
        this.wrapper.classList.add('direction-down');
        // this.droplist.style.maxHeight = (this.userspecifiedheight > 0) ? this.userspecifiedheight + 'px' : '';
        // fixing the height so I can use this on mobile too. 
        this.droplist.style.maxHeight = '200px';
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

    oQuestionOpenendSearch.prototype.filterList = function () {
        this.setCurrentListPosition();
        this.list = this.buildList();

        var inputstring = this.element.value;

        if (inputstring.length < this.mincharacters) {
            this.showList();
            this.notenoughcharacters(this.properties.notenoughcharacters);
            this.droplist.classList.add('charrestriction');
            this.updateItemCount(0);
            return;
        } else {
            this.droplist.classList.remove('charrestriction');
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
    };

    oQuestionOpenendSearch.prototype.filterListStarts = function (inputstring) {
        var exactmatch = false;
        var visibleitems = 0;
        inputstring = inputstring.toLowerCase();

        var droplistparentnode = this.droplist.parentNode;
        droplistparentnode.removeChild(this.droplist);

        this.list.forEach(function (item) {
            var itemlabel = this.sanitiseText(item.innerText.toLowerCase());

            if (itemlabel.startsWith(inputstring)) {
                item.classList.remove('filter-hidden');
                visibleitems++;
            } else {
                item.classList.add('filter-hidden');
            }
        }.bind(this));

        droplistparentnode.appendChild(this.droplist);
        this.updateItemCount(visibleitems);
        this.togglePlaceholderVisibility(visibleitems === 0);
    };

    oQuestionOpenendSearch.prototype.filterListContains = function (inputstring) {
        var exactmatch = false;
        var visibleitems = 0;
        inputstring = inputstring.toLowerCase();

        var droplistparentnode = this.droplist.parentNode;
        droplistparentnode.removeChild(this.droplist);

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

        droplistparentnode.appendChild(this.droplist);
        this.updateItemCount(visibleitems);
        if (visibleitems === 0) {
            this.noitemsinlist(this.properties.noitemsinlist);
        }
        this.togglePlaceholderVisibility(visibleitems === 0);
    };

    oQuestionOpenendSearch.prototype.togglePlaceholderVisibility = function (visibility) {
        if (visibility) {
            this.droplist.classList.add('empty');
        } else {
            this.droplist.classList.remove('empty');
        }
    };

    oQuestionOpenendSearch.prototype.updateItemCount = function (count) {    
        var itemCountElement = document.querySelector('.m-openend-search-count .a-label-counter');
        var itemPromptElement = document.querySelector('.m-openend-search-count .a-label-counter-prompt');

        if (itemCountElement && itemPromptElement) {
            if (count > 0) {
                if (this.properties && this.properties.prompts && this.properties.prompts.listcount) {
                    itemCountElement.textContent = count;
                    itemPromptElement.textContent = this.properties.prompts.listcount;
                } else {
                    itemCountElement.textContent = count;
                    itemPromptElement.textContent = "items";
                }
                itemCountElement.parentNode.classList.remove('hidden');
            } else {
                itemCountElement.parentNode.classList.add('hidden');
            }
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
        } else {
            var container = document.querySelector('.o-question-selected');
            var tag = document.createElement('div');
            tag.className = 'm-tag-answer';
            // Set the data-value attribute with the user-entered value and not from the list!
            tag.setAttribute('data-value', label); 
            tag.setAttribute('value', label); 
            tag.innerHTML = '<span> ' + label + '</span><button class="delete-tag">X</button>';
            container.appendChild(tag);
    
            console.log('User-entered value:', label); 
        
            var deleteButton = tag.querySelector('.delete-tag');
            deleteButton.addEventListener('click', function () {
                this.removeTag(tag);
                this.buttonElement.disabled = true;
    
                for (var i = 0; i < this.list.length; i++) {
                    var item = this.list[i];
                    item.classList.remove('selected');
                    item.removeAttribute('data-selected');
                }
                this.element.classList.remove('exact');
            }.bind(this));
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

            if (this.itemCountElement) {
                this.itemCountElement.textContent = "No matches found";
                this.itemCountElement.classList.remove('hidden');
            } else {    
                console.error('Item count element not found');
            }
        }
    };

    oQuestionOpenendSearch.prototype.calculateDroplistHeight = function() {
        var self = this;
        var initialHeight = window.innerHeight;  // Capture the initial window height
    
        function handleScrollToTop() {
            window.scrollTo(0, 0);
        }
    
        function checkKeyboard() {
            var currentHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            var isKeyboardVisible = initialHeight - currentHeight > 200;  
            var currentWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
            console.log("Current device width:", currentWidth);
    
    
    
    
            if (isKeyboardVisible) {
                // self.droplist.style.backgroundColor = 'yellow';
                self.droplist.style.height = "100px";
                self.itemCountElement.style.top = '320px';
            } else if (currentHeight < 900) {
                self.droplist.style.height = "200px";
                // self.droplist.style.backgroundColor = 'pink';
                self.itemCountElement.style.top = '419px';
            } else {
                self.droplist.style.height = "800px";
                // self.droplist.style.backgroundColor = 'gray';
                self.itemCountElement.style.top = '419px';
            }
        }
    
        // Initial check when the function is first called
        checkKeyboard();
    
        const visualViewport = window.visualViewport;
    
        if (visualViewport) {
            let viewportWidth = window.innerWidth;
            let viewportHeight = window.innerHeight;
    
            visualViewport.addEventListener("resize", function(event) {
                const target = event.target;
                if (viewportWidth !== target.width) {
                    viewportWidth = window.innerWidth;
                    viewportHeight = window.innerHeight;
                }
    
                if (viewportHeight - target.height > 10) {
                    handleScrollToTop();
                }
    
                checkKeyboard();
            });
        }
    
        document.addEventListener("touchend", handleScrollToTop);
    
        window.addEventListener('resize', function() {
            checkKeyboard();
        });
    }
    return oQuestionOpenendSearch;
});
