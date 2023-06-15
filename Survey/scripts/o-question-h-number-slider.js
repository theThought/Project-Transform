define(['o-question'],
    function (oQuestion) {

        /**
         * Organism: Horizontal Number Slider
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oQuestionHNumberSlider(id, group) {
            oQuestion.call(this, id, group);

            this.element = document.querySelector('input[data-questionid="' + this.id + '"]');
            this.wrapper = document.querySelector('div.o-question-hnumberslider[data-questiongroup="' + this.group + '"] div.m-numberslider-horizontal');
            this.organism = document.querySelector('div.o-question-hnumberslider[data-questiongroup="' + this.group + '"] div.o-question-hnumberslider-control');
            this.clickablearea = null;
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.value = (this.element.getAttribute('value').length) ? this.element.getAttribute('value') : 0;
        }

        oQuestionHNumberSlider.prototype = Object.create(oQuestion.prototype);
        oQuestionHNumberSlider.prototype.constructor = oQuestionHNumberSlider;

        oQuestionHNumberSlider.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.createClickableArea();
            this.setThumbVisibility();
            this.setInitialFloodToValue();
            this.configurationComplete();
            this.updateValue();
        }

        oQuestionHNumberSlider.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("input", this, false);
            document.addEventListener("change", this, false);
            document.addEventListener("clearEntries", this, false);
            document.addEventListener("restoreEntries", this, false);
            document.addEventListener("click", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener(this.group + "_dismissExclusive", this, false);
            document.addEventListener(this.group + "_incrementValue", this, false);
            document.addEventListener(this.group + "_decrementValue", this, false);
        }

        oQuestionHNumberSlider.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'clearEntries':
                    this.clearEntries(event);
                    break;
                case 'restoreEntries':
                    this.restoreEntries(event);
                    break;
                case "click":
                case "input":
                case "change":
                    this.onInput(event);
                    break;
                case this.group + "_enableExclusive":
                    this.onEnableExclusive(event);
                    break;
                case this.group + "_dismissExclusive":
                    this.onDismissExclusive(event);
                    break;
                case this.group + "_incrementValue":
                    this.incrementValue();
                    break;
                case this.group + "_decrementValue":
                    this.decrementValue();
                    break;
            }
        }

        oQuestionHNumberSlider.prototype.clearEntries = function (event) {
            if (event.detail.questionName === this.questionName) {
                this.element.value = "";
                this.value = 0;
                this.updateValue();
                this.organism.classList.remove('has-value');
                this.organism.classList.remove('active');
                this.setInitialFloodToValue();
                this.broadcastChange();
            }
        }

        oQuestionHNumberSlider.prototype.restoreEntries = function (event) {
            if (event.detail.questionName !== this.questionName
                || !this.restoreValues || this.initialValue === null) {
                return;
            }

            this.element.value = this.initialValue;
            this.value = this.initialValue;
            this.updateValue();
            this.organism.classList.add('has-value');
            this.organism.classList.add('active');
            this.setInitialFloodToValue();
            this.broadcastChange();
        }

        oQuestionHNumberSlider.prototype.setThumbVisibility = function () {
            if (this.element.getAttribute('value').length) {
                this.organism.classList.add('active');
                this.organism.classList.add('has-value');
                this.updateFloodFill();
            }
        }

        oQuestionHNumberSlider.prototype.setInitialFloodToValue = function () {
            this.element.style.setProperty('--track-background-fill', 'linear-gradient(to right, #D0DAE6 0%, #D0DAE6 ' + this.value + '%, #fff ' + this.value + '%, white 100%)');
        }

        oQuestionHNumberSlider.prototype.updateFloodFill = function () {
            this.element.style.setProperty('--track-background-fill', 'linear-gradient(to right, #D0DAE6 0%, #D0DAE6 ' + this.element.value + '%, #fff ' + this.element.value + '%, white 100%)');
        }

        oQuestionHNumberSlider.prototype.createClickableArea = function () {
            var clickableElement = document.createElement('div');
            clickableElement.className = 'a-style-sliderclickablearea';
            clickableElement.onclick = function () {
            };
            this.clickablearea = this.wrapper.insertBefore(clickableElement, this.element);
        }

        oQuestionHNumberSlider.prototype.values = function (props) {
            this.element.min = props['min'];
            this.element.max = props['max'];
        }

        oQuestionHNumberSlider.prototype.show = function (props) {
            if (props['marks'] === true) {
                this.showMarks();
            }

            if (props['value'] === true) {
                this.showValue();
            }

            if (props['terminators'] === true) {
                this.showTerminators();
            }
        }

        oQuestionHNumberSlider.prototype.showMarks = function () {
            var marksElement = document.querySelector('div.o-question-hnumberslider[data-questiongroup="' + this.group + '"] div.m-style-slidermarks');

            var min = this.element.min ? parseInt(this.element.min) : 0;
            var max = this.element.max ? parseInt(this.element.max) : 100;
            var step = (this.properties.step) ? parseInt(this.properties.step) + parseFloat(this.properties.step / 40) : 100/Math.abs(min - max);

            marksElement.style.background = 'repeating-linear-gradient(90deg, ' +
                '#8797C8 0, ' +
                '#8797C8 1px, ' +
                'transparent 0, ' +
                'transparent calc(' + step + '% - 4px)) ' +
                'calc(.5*40px) 0/100% no-repeat';

        }

        oQuestionHNumberSlider.prototype.showValue = function () {
            this.organism.classList.add('has-thumb-value');
        }

        oQuestionHNumberSlider.prototype.updateValue = function () {
            var updateEvent = new CustomEvent(this.group + '_updateValue', {bubbles: true, detail: this});
            this.element.dispatchEvent(updateEvent);
            this.broadcastChange();
        }

        oQuestionHNumberSlider.prototype.showTerminators = function () {
            this.organism.classList.add('has-terminators');
        }

        oQuestionHNumberSlider.prototype.ticklabels = function () {
            // add a class to the parent which adds additional space for the thumb
            this.organism.classList.add('has-tick-labels');

            var labelsElement = document.querySelector('div.o-question-hnumberslider[data-questiongroup="' + this.group + '"] div.m-label-ticklabels');

            var min = this.element.min ? parseInt(this.element.min) : 0;
            var max = this.element.max ? parseInt(this.element.max) : 100;

            var step = isNaN(parseInt(this.properties.ticklabels)) ? 10 : parseInt(this.properties.ticklabels);
            if (step === 0) step = Math.floor(((max - min) / 100) * 10);

            for (var i = min; i <= max; i = i + step) {
                labelsElement.innerHTML = labelsElement.innerHTML + '<span>' + i + '</span>';
            }
        }

        oQuestionHNumberSlider.prototype.floodtovalue = function (val) {
            if (val === true) {
                this.element.classList.add('flood-to-value');
            }
        }

        oQuestionHNumberSlider.prototype.step = function (prop) {
            this.element.step = prop;
        }

        oQuestionHNumberSlider.prototype.labels = function (props) {

            if (props['pre']) {
                var preElement = document.createElement('span');
                preElement.className = 'a-label-outer-prelabel';
                var preContent = document.createTextNode(props['pre']);
                preElement.appendChild(preContent);

                this.organism.classList.add('has-pre-label');
                this.organism.insertBefore(preElement, this.organism.firstChild);
            }

            if (props['post']) {
                var postElement = document.createElement('span');
                postElement.className = 'a-label-outer-postlabel';
                var postContent = document.createTextNode(props['post']);
                postElement.appendChild(postContent);

                this.organism.classList.add('has-post-label');
                this.organism.appendChild(postElement);
            }
        }

        oQuestionHNumberSlider.prototype.old_labels = function (props) {

            if (props['pre']) {
                var preElement = document.createElement('span');
                preElement.className = 'a-label-prelabel';
                var preContent = document.createTextNode(props['pre']);
                preElement.appendChild(preContent);

                this.organism.classList.add('has-pre-label');
                this.wrapper.insertBefore(preElement, this.element);
            }

            if (props['post']) {
                var postElement = document.createElement('span');
                postElement.className = 'a-label-postlabel';
                var postContent = document.createTextNode(props['post']);
                postElement.appendChild(postContent);

                this.organism.classList.add('has-post-label');
                this.wrapper.insertBefore(postElement, this.element.nextSibling);
            }
        }

        oQuestionHNumberSlider.prototype.onInput = function (event) {

            if (event.target === this.element || event.target === this.clickablearea || event === true) {

                this.organism.classList.add('has-value');

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

        oQuestionHNumberSlider.prototype.incrementValue = function () {
            var currentValue = parseInt(this.element.value);
            var maxValue = parseInt(this.element.max);

            if (currentValue < maxValue) {
                this.element.value++;
            }

            this.onInput(true);
        }

        oQuestionHNumberSlider.prototype.decrementValue = function () {
            var currentValue = parseInt(this.element.value);
            var maxValue = parseInt(this.element.min);

            if (currentValue > maxValue) {
                this.element.value--;
            }

            this.onInput(true);
        }

        oQuestionHNumberSlider.prototype.onEnableExclusive = function (event) {
            this.organism.classList.remove('active');
            this.organism.classList.add('inactive');
            this.value = this.element.value;
            this.element.disabled = true;
        }

        oQuestionHNumberSlider.prototype.onDismissExclusive = function (event) {
            this.organism.classList.add('active');
            this.organism.classList.remove('inactive');
            this.element.disabled = false;
            this.element.value = this.value;
        }

        return oQuestionHNumberSlider;

    });