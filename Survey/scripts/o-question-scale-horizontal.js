define(['o-question'], function (oQuestion) {
    function oQuestionScaleHorizontal(id, group) {
        oQuestion.call(this, id, group);

        this.container = document.querySelector('.o-question-scale-horizontal[data-questiongroup="' + this.group + '"]');
        this.inputElement = this.container.querySelector('input[data-questionid="' + this.id + '"]');
        this.wrapper = this.container.querySelector('div[class^="o-question-scale-"]');
        this.organism = this.container.querySelector('div[class*="-control"]');
        this.labelElements = this.container.querySelectorAll('.a-label-datavalue');
        this.isRTL = document.dir === 'rtl';
    
        this.fetchProperties(group, this.initialiseComponent.bind(this));
    }

    oQuestionScaleHorizontal.prototype = Object.create(oQuestion.prototype);
    oQuestionScaleHorizontal.prototype.constructor = oQuestionScaleHorizontal;

    oQuestionScaleHorizontal.prototype.initialiseComponent = function (properties) {
        this.properties = properties;
        if (this.properties && this.properties.background) {
            this.setImageAndAlt(this.properties.background);
        }

        this.initialiseScaleUnits();
        this.setupEventListeners();
        this.setDataValueVisibility();
        
    };

    oQuestionScaleHorizontal.prototype.init = function () {
        oQuestion.prototype.init.call(this);
    };

    oQuestionScaleHorizontal.prototype.configureIncomingEventListeners = function () {
        document.addEventListener('input', this, false);
        document.addEventListener('change', this, false);
        document.addEventListener('clearEntries', this, false);
        document.addEventListener('restoreEntries', this, false);
        document.addEventListener('click', this, false);
        document.addEventListener('broadcastChange', this, false);
        document.addEventListener(this.group + '_enableExclusive', this, false);
        document.addEventListener(this.group + '_dismissExclusive', this, false);
        document.addEventListener(this.group + '_incrementValue', this, false);
        document.addEventListener(this.group + '_decrementValue', this, false);
    };

    oQuestionScaleHorizontal.prototype.handleEvent = function (event) {
        switch (event.type) {
            case 'clearEntries':
                this.clearEntriesFromExternal(event);
                break;
            case 'restoreEntries':
                this.restoreEntries(event);
                break;
            case 'click':
            case 'input':
            case 'change':
                this.onInput(event);
                break;
            case this.group + '_enableExclusive':
                this.onEnableExclusive(event);
                break;
            case this.group + '_dismissExclusive':
                this.onDismissExclusive(event);
                break;
            case this.group + '_incrementValue':
                this.incrementValue(event);
                break;
            case this.group + '_decrementValue':
                this.decrementValue(event);
                break;
            case 'broadcastChange':
                this.processVisibilityRulesFromExternalTrigger(event);
                break;
        }
    };

    oQuestionScaleHorizontal.prototype.fetchProperties = function (group, callback) {
            var properties = app.getProperties(group); 
            callback(properties);
    };

    oQuestionScaleHorizontal.prototype.setImageAndAlt = function (backgroundProps) {
      
        var singleStateImage = this.container.querySelector('.m-image-singlestate');
        if (singleStateImage) {
            singleStateImage.src = backgroundProps.image.url;
            singleStateImage.alt = backgroundProps.caption || '';
            singleStateImage.style = 'transform:translate(' + this.properties.background.offset.x + 'px, ' + this.properties.background.offset.y + 'px); width:' + this.properties.background.image.width + 'px; height:' + this.properties.background.image.height + 'px; ';
        }
    };

    oQuestionScaleHorizontal.prototype.initialiseScaleUnits = function () {
        var scaleUnits = this.container.querySelectorAll('.m-scale-unit');
        
        scaleUnits.forEach((unit) => {
            var img = unit.querySelector('.a-image-multistate');
            img.src = this.properties.unit.image.url;
            img.style = 'transform:translate(' + this.properties.unit.offset.x + 'px, ' + this.properties.unit.offset.y + 'px); width:' + this.properties.unit.image.width + 'px; height:' + this.properties.unit.image.height + 'px; ';
            img.alt = this.properties.unit.caption;
        });
    };

    oQuestionScaleHorizontal.prototype.setupEventListeners = function () {
        var checkboxes = this.container.querySelectorAll('.scale-checkbox');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', this.handleCheckboxChange.bind(this, checkboxes));
        });

        var preTerminator = this.container.querySelector('.a-button-preterminator');
        preTerminator.addEventListener('click', this.handlePreTerminatorClick.bind(this, checkboxes));

        var postTerminator = this.container.querySelector('.a-button-postterminator');
        postTerminator.addEventListener('click', this.handlePostTerminatorClick.bind(this, checkboxes));
    };

    oQuestionScaleHorizontal.prototype.setDataValueVisibility = function () {
        this.labelElements.forEach((element) => {
            element.classList.add('showValue');
        });
    };

    oQuestionScaleHorizontal.prototype.handleCheckboxChange = function (checkboxes, event) {
        var selectedValue = parseInt(event.target.value);
        checkboxes.forEach((checkbox, index) => {
            var isActive = (index + 1) <= selectedValue;
            checkbox.checked = isActive;
            this.updateScaleUnitDisplay(checkbox, isActive);
            this.labelElements[index].classList.toggle('highlighted', isActive);
        });
    };

    oQuestionScaleHorizontal.prototype.updateScaleUnitDisplay = function (checkbox, isActive) {
        var unitLabel = checkbox.closest('.m-scale-unit');
        var img = unitLabel.querySelector('.a-image-multistate');
        img.src = isActive ? this.properties.activeUnit.image.url : this.properties.unit.image.url;

    };

    oQuestionScaleHorizontal.prototype.handlePreTerminatorClick = function (checkboxes, event) {
        var value = parseInt(event.target.getAttribute('data-value'));
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = (index + 1) === value;
            this.updateScaleUnitDisplay(checkbox, checkbox.checked);
        });
    };

    oQuestionScaleHorizontal.prototype.handlePostTerminatorClick = function (checkboxes, event) {
        var currentValue = this.getCurrentCheckboxValue(checkboxes);
        if (currentValue < checkboxes.length) {
            this.setCheckboxValue(checkboxes, currentValue + 1);
        }
    };

    oQuestionScaleHorizontal.prototype.getCurrentCheckboxValue = function (checkboxes) {
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                return i + 1;
            }
        }
        return 0;
    };

    oQuestionScaleHorizontal.prototype.setCheckboxValue = function (checkboxes, value) {
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = (index + 1) === value;
            this.updateScaleUnitDisplay(checkbox, checkbox.checked);
        });
    };

    return oQuestionScaleHorizontal;
});
