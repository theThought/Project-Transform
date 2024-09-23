define(['o-question'],
    function (oQuestion) {

        /**
         * Organism: Number Slider
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oQuestionSlider(id, group) {
            oQuestion.call(this, id, group);

            this.container = document.querySelector('div.o-question-response[data-questiongroup="' + this.group + '"]')
            this.element = this.container.querySelector('input[data-questionid="' + this.id + '"]');
            this.wrapper = this.container.querySelector('div[class^="m-slider-"]');
            this.organism = this.container.querySelector('div[class*="-control"]');
            this.hiddenelement = null;
            this.clickablearea = null;
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.value = (this.element.getAttribute('value').length) ? this.element.getAttribute('value') : 0;
            this.floodtovaluecolor = getComputedStyle(document.documentElement).getPropertyValue('--track-background-fill');
            this.isRTL = document.dir === 'rtl';
        }

        oQuestionSlider.prototype = Object.create(oQuestion.prototype);
        oQuestionSlider.prototype.constructor = oQuestionSlider;

        oQuestionSlider.prototype.init = function () {
            oQuestion.prototype.init.call(this);

            this.cloneInputElement();
            this.storeInitialValue();
            this.configureIncomingEventListeners();
            this.createClickableArea();
            this.setThumbVisibility();
            this.updateFloodFill();
            this.configurationComplete();
        }

        oQuestionSlider.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
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

        oQuestionSlider.prototype.handleEvent = function (event) {
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

        oQuestionSlider.prototype.cloneInputElement = function () {
            var newelement = this.element.cloneNode();
            newelement.name = '';
            this.element.type = 'hidden';
            this.element.value = this.element.getAttribute('data-value');
            this.hiddenelement = this.element;
            this.element.id = '';
            this.element = this.wrapper.insertBefore(newelement, this.element);
        }

        oQuestionSlider.prototype.storeInitialValue = function () {
            if (typeof this.hiddenelement.value !== 'undefined' && this.hiddenelement.value.length) {
                this.initialValue = this.hiddenelement.getAttribute('value');
                this.element.value = this.hiddenelement.getAttribute('value');
            }
        }

        oQuestionSlider.prototype.setHiddenValue = function (valuestring) {
            this.hiddenelement.value = valuestring;
        }

        oQuestionSlider.prototype.clearEntries = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            this.element.value = '';
            this.setHiddenValue('');
            this.value = 0;
            this.updateValue();
            this.organism.classList.remove('has-value');
            this.organism.classList.remove('active');
            this.updateFloodFill();
            this.broadcastChange();
        }

        oQuestionSlider.prototype.restoreEntries = function (event) {
            if (event.detail.questionName !== this.questionName || !this.restoreValues || this.initialValue === null) {
                return;
            }

            this.element.value = this.initialValue;
            this.value = this.initialValue;
            this.updateValue();
            this.organism.classList.add('has-value');
            this.organism.classList.add('active');
            this.updateFloodFill();
            this.broadcastChange();
        }

        oQuestionSlider.prototype.setThumbVisibility = function () {
            if (this.element.getAttribute('value').length) {
                this.organism.classList.add('active');
                this.organism.classList.add('has-value');
                this.updateFloodFill();
            }
        }

        oQuestionSlider.prototype.updateFloodFill = function () {
            var min = this.hiddenelement.min ? parseInt(this.element.min) : 0;
            var max = this.hiddenelement.max ? parseInt(this.element.max) : 100;
            var val = Number(this.hiddenelement.value);
            var orientation = (this.container.classList.contains('o-question-slider-vertical') ? 'vertical' : 'horizontal');

            var percentage = (Math.abs(val - min) / Math.abs(max - min)) * 100;
            var paddingadjustmentinpixels = (orientation === 'horizontal') ? 20 : 16;
            var adjustmentcalc = paddingadjustmentinpixels - (2 * paddingadjustmentinpixels) * (percentage / 100);
            var percentagefill = 'calc(' + percentage + '% + ' + adjustmentcalc + 'px)';

            this.element.style.setProperty('--track-background-fill',
                'linear-gradient(to right, ' + this.floodtovaluecolor + ' 0%, ' + this.floodtovaluecolor + ' ' + percentagefill + ', transparent ' + percentagefill + ', transparent 100%)');

            if (this.isRTL) {
                this.element.style.setProperty('--track-background-fill',
                    'linear-gradient(to left, ' + this.floodtovaluecolor + ' 0%, ' + this.floodtovaluecolor + ' ' + percentagefill + ', transparent ' + percentagefill + ', transparent 100%)');
            }
        }

        oQuestionSlider.prototype.createClickableArea = function () {
            var clickableElement = document.createElement('div');
            clickableElement.className = 'a-style-sliderclickablearea';
            clickableElement.onclick = function () {
            };
            this.clickablearea = this.wrapper.insertBefore(clickableElement, this.element);
        }

        oQuestionSlider.prototype.values = function (props) {
            this.element.min = props.min;
            this.element.max = props.max;
        }

        oQuestionSlider.prototype.show = function (props) {
            if (props.marks === true) {
                this.showMarks();
            }

            if (props.value === true) {
                this.showValue();
            }

            if (props.terminators === true) {
                this.showTerminators();
            }
        }

        oQuestionSlider.prototype.showMarks = function () {
            var marksElement = document.querySelector('div[data-questiongroup="' + this.group + '"] div.m-style-slidermarks');

            var min = this.element.min ? parseInt(this.element.min) : 0;
            var max = this.element.max ? parseInt(this.element.max) : 100;
            var step = isNaN(parseInt(this.properties.ticklabels)) ? 1 : parseInt(this.properties.ticklabels);

            if (step === 0) {
                step = Math.floor(((max - min) / 100) * 10);
            }

            for (var i = min; i <= max; i = i + step) {
                marksElement.innerHTML = marksElement.innerHTML + '<i>|</i>';
            }

        }

        oQuestionSlider.prototype.ticklabels = function () {
            // add a class to the parent which adds additional space for the thumb
            this.organism.classList.add('has-tick-labels');

            var labelsElement = document.querySelector('div[data-questiongroup="' + this.group + '"] div.m-label-ticklabels');

            var min = this.element.min ? parseInt(this.element.min) : 0;
            var max = this.element.max ? parseInt(this.element.max) : 100;
            var step = isNaN(parseInt(this.properties.ticklabels)) ? 10 : parseInt(this.properties.ticklabels);

            if (step === 0) {
                step = Math.floor(((max - min) / 100) * 10);
            }

            for (var i = min; i <= max; i = i + step) {
                labelsElement.innerHTML = labelsElement.innerHTML + '<span>' + i + '</span>';
            }
        }

        oQuestionSlider.prototype.showValue = function () {
            this.organism.classList.add('has-thumb-value');
        }

        oQuestionSlider.prototype.updateValue = function () {
            var updateEvent = new CustomEvent(this.group + '_updateValue', {bubbles: true, detail: this});
            this.element.dispatchEvent(updateEvent);
            this.broadcastChange();
        }

        oQuestionSlider.prototype.showTerminators = function () {
            this.organism.classList.add('has-terminators');
        }

        oQuestionSlider.prototype.floodtovalue = function (val) {
            if (val === true) {
                this.element.classList.add('flood-to-value');
            }
        }

        oQuestionSlider.prototype.step = function (prop) {
            this.element.step = prop;
        }

        oQuestionSlider.prototype.labels = function (props) {
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
        }

        oQuestionSlider.prototype.thumb = function (props) {
            if (props.image) {
                this.setThumbImage(props.image);
            }

            if (props.width) {
                this.setThumbWidth(props.width);
            }

            if (props.height) {
                this.setThumbHeight(props.height);
            }
        }

        oQuestionSlider.prototype.setThumbImage = function (prop) {
            this.element.style.setProperty('--track-thumb-image', 'url(' + prop + ')');
        }

        oQuestionSlider.prototype.setThumbWidth = function (prop) {
            this.element.style.setProperty('--track-thumb-width', prop + 'px');
        }

        oQuestionSlider.prototype.setThumbHeight = function (prop) {
            this.element.style.setProperty('--track-thumb-height', prop + 'px');
        }

        oQuestionSlider.prototype.onInput = function (event) {

            if (event.target === this.element || event.target === this.clickablearea || event === true) {
                var thumbimage = getComputedStyle(this.element).getPropertyValue('--track-thumb-image');
                thumbimage = thumbimage.replace('-readonly', '');
                this.element.style.setProperty('--track-thumb-image', thumbimage);

                this.organism.classList.add('has-value');
                this.setHiddenValue(this.element.value);

                // handle self-generated events
                var clickedEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
                this.element.dispatchEvent(clickedEvent);

                this.element.disabled = false;
                this.organism.classList.remove('inactive');
                this.organism.classList.add('active');

                if (this.isExclusive) {
                    var enableExclusive = new CustomEvent(this.group + '_enableExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    this.element.dispatchEvent(enableExclusive);
                }

                this.updateFloodFill();
                this.updateValue();
            }

        }

        oQuestionSlider.prototype.incrementValue = function () {
            var currentValue = parseInt(this.element.value);
            var max = this.element.max ? parseInt(this.element.max) : 100;

            if (currentValue < max) {
                this.element.value++;
            }

            this.onInput(true);
        }

        oQuestionSlider.prototype.decrementValue = function () {
            var currentValue = parseInt(this.element.value);
            var min = this.element.min ? parseInt(this.element.min) : 0;

            if (currentValue > min) {
                this.element.value--;
            }

            this.onInput(true);
        }

        oQuestionSlider.prototype.onEnableExclusive = function () {
            this.organism.classList.remove('active');
            this.organism.classList.add('inactive');
            this.value = this.element.value;
            this.setHiddenValue('');
            this.element.disabled = true;
            var thumbimage = getComputedStyle(this.element).getPropertyValue('--track-thumb-image');
            thumbimage = thumbimage.replace('.svg','-readonly.svg')
            this.element.style.setProperty('--track-thumb-image', thumbimage);

        }

        oQuestionSlider.prototype.onDismissExclusive = function () {
            this.organism.classList.remove('inactive');
            this.organism.classList.add('active');
            this.element.disabled = false;
            this.element.value = this.value;
            this.setHiddenValue(this.value);
            var thumbimage = getComputedStyle(this.element).getPropertyValue('--track-thumb-image');
            thumbimage = thumbimage.replace('-readonly', '');
            this.element.style.setProperty('--track-thumb-image', thumbimage);
        }

        return oQuestionSlider;

    });