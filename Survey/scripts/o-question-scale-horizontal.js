define(['o-question'], function (oQuestion) {
    /**
     * Organism: Scale
     *
     * @constructor
     * @param {String} id - element id
     * @param {String} group - question group
     */
    function oQuestionScaleHorizontal(id, group) {
        oQuestion.call(this, id, group);

        this.container = document.querySelector('.o-question-scale-horizontal[data-questiongroup="' + this.group + '"]');
        this.element = this.container.querySelector('input[data-questionid="' + this.id + '"]');
        this.wrapper = this.container.querySelector('div[class^="o-question-scale-"]');
        this.organism = this.container.querySelector('div[class*="-control"]');        
        this.isRTL = document.dir === 'rtl';
        this.properties = this.fetchProperties(group);
        
        if (this.properties && this.properties.background) {
            this.setImageAndAlt(this.properties.background);
        }
        
        this.initializeScaleUnits();
        this.setupEventListeners();
    }

    oQuestionScaleHorizontal.prototype = Object.create(oQuestion.prototype);
    oQuestionScaleHorizontal.prototype.constructor = oQuestionScaleHorizontal;

    oQuestionScaleHorizontal.prototype.init = function () {
        oQuestion.prototype.init.call(this);
    }

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
    }

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
                this.incrementValue();
                break;
            case this.group + '_decrementValue':
                this.decrementValue();
                break;
            case 'broadcastChange':
                this.processVisibilityRulesFromExternalTrigger(event);
                break;
        }
    }

    oQuestionScaleHorizontal.prototype.fetchProperties = function(group) {
        return app.getProperties(group);
    };

    oQuestionScaleHorizontal.prototype.setImageAndAlt = function(backgroundProps) {
        var singleStateImage = this.container.querySelector('.m-image-singlestate');
        if (singleStateImage) {
            if (backgroundProps.image && backgroundProps.image.url) { 
                singleStateImage.src = backgroundProps.image.url;
            }
            if (backgroundProps.caption) {
                singleStateImage.alt = backgroundProps.caption;
            }
        }
    };

    oQuestionScaleHorizontal.prototype.initializeScaleUnits = function() {
        var scaleUnits = this.container.querySelectorAll('.m-scale-unit');
        var properties = this.properties;
        
        scaleUnits.forEach(function(unit) {
            var img = unit.querySelector('.a-image-multistate');
            img.src = properties.unit.image.url;
        });
    };

    oQuestionScaleHorizontal.prototype.setupEventListeners = function() {
        var checkboxes = this.container.querySelectorAll('.scale-checkbox');
        var handleCheckboxChange = this.handleCheckboxChange.bind(this, checkboxes); 

        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', handleCheckboxChange);
        });

        var preTerminator = this.container.querySelector('.a-button-preterminator');
        var postTerminator = this.container.querySelector('.a-button-postterminator');

        preTerminator.addEventListener('click', this.handlePreTerminatorClick.bind(this, checkboxes));
        postTerminator.addEventListener('click', this.handlePostTerminatorClick.bind(this, checkboxes));
    };

    oQuestionScaleHorizontal.prototype.handlePreTerminatorClick = function(checkboxes, event) {
        console.log('pre clicked');
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = (index + 1) === value;
            this.updateScaleUnitDisplay(checkbox, checkbox.checked);
       });
    };

    oQuestionScaleHorizontal.prototype.handlePostTerminatorClick = function(checkboxes, event) {
        console.log('post clicked');
        var currentValue = this.getCurrentCheckboxValue(checkboxes);
        if (currentValue < checkboxes.length) {
            this.setCheckboxValue(checkboxes, currentValue + 1);
        }
    };

    oQuestionScaleHorizontal.prototype.getCurrentCheckboxValue = function(checkboxes) {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                return parseInt(checkboxes[i].value);
            }
        }
        return 0; // Default to 0 if none are checked
    };

    oQuestionScaleHorizontal.prototype.setCheckboxValue = function(checkboxes, value) {
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = (index + 1) === value;
            this.updateScaleUnitDisplay(checkbox, checkbox.checked);
       });
        console.log('check the set');
        console.log(checkboxes);
        console.log(value);
    };

    oQuestionScaleHorizontal.prototype.updateScaleUnitDisplay = function(checkbox, isActive) {
        var unitLabel = checkbox.closest('.m-scale-unit');
        var img = unitLabel.querySelector('.a-image-multistate');
        var properties = this.properties;
        img.src = isActive ? properties.activeUnit.image.url : properties.unit.image.url;
    };

    oQuestionScaleHorizontal.prototype.handleCheckboxChange = function(checkboxes, event) {
       // this.setCheckboxValue(checkboxes, selectedValue);
        
        var selectedValue = parseInt(event.target.value);
        checkboxes.forEach((checkbox, index) => {
            
            var isActive = index < selectedValue || parseInt(checkbox.value) === selectedValue;
            checkbox.checked = isActive;
            this.updateScaleUnitDisplay(checkbox, isActive);


            console.log(selectedValue);
            console.log('selectedValue');
        });
    };

    oQuestionScaleHorizontal.prototype.labels = function (props) {
        if (props.pre) {
            var preElement = document.createElement('span');
            preElement.className = 'a-label-outer-prelabel';
            var preContent = document.createTextNode(props.pre);
            preElement.appendChild(preContent);
            this.organism.classList.add('has-pre-label');
            this.organism.insertBefore(preElement, this.organism.firstChild);
        }
        if (props.post) {
            var postElement = document.createElement('span');
            postElement.className = 'a-label-outer-postlabel';
            var postContent = document.createTextNode(props.post);
            postElement.appendChild(postContent);
            this.organism.classList.add('has-post-label');
            this.organism.appendChild(postElement);
        }
    };

    oQuestionScaleHorizontal.prototype.values = function (props) {
        this.element.min = props.min;
        this.element.max = props.max;
    };

    oQuestionScaleHorizontal.prototype.show = function (props) {
        if (props.terminators === true) {
            this.showTerminators();
        }
    };

    oQuestionScaleHorizontal.prototype.showTerminators = function () {
        this.organism.classList.add('has-terminators');
    };

    return oQuestionScaleHorizontal;
});
