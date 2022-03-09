/*
  Functionality:


  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Organism: Horizontal Number Slider
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oQuestionHNumberSlider(id, group) {
            this.id = id;
            this.group = group;
            this.element = document.querySelector('input[data-questionid="' + this.id + '"]');
            this.wrapper = document.querySelector('div.o-question-hnumberslider[data-questiongroup="' + this.group + '"] div.m-numberslider-horizontal');
            this.organism = document.querySelector('div.o-question-hnumberslider[data-questiongroup="' + this.group + '"] div.o-question-hnumberslider-control');
            this.clickablearea = null;
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.value = (this.element.getAttribute('value').length) ? this.element.getAttribute('value'): 0;
            this.element.style.setProperty('--track-background-fill', 'linear-gradient(to right, #D0DAE6 0%, #D0DAE6 ' + this.value + '%, #fff ' + this.value + '%, white 100%)');

            this.properties = {};

            this.configureProperties();
            this.configureIncomingEventListeners();
            this.createClickableArea();
            this.setThumbVisibility();        }

        oQuestionHNumberSlider.prototype = Object.create(component.prototype);

        oQuestionHNumberSlider.prototype.configureIncomingEventListeners = function() {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("input", this, false);
            document.addEventListener("change", this, false);
            document.addEventListener("click", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener(this.group + "_dismissExclusive", this, false);
            document.addEventListener(this.group + "_incrementValue", this, false);
            document.addEventListener(this.group + "_decrementValue", this, false);
        }

        oQuestionHNumberSlider.prototype.handleEvent = function (event) {
            switch (event.type) {
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

        oQuestionHNumberSlider.prototype.setThumbVisibility = function () {
            if (this.element.getAttribute('value').length) {
                this.organism.classList.add('active');
                this.organism.classList.add('has-value');
                this.element.style.setProperty('--track-background-fill', 'linear-gradient(to right, #D0DAE6 0%, #D0DAE6 ' + this.element.value + '%, #fff ' + this.element.value + '%, white 100%)');
            }
        }

        oQuestionHNumberSlider.prototype.createClickableArea = function () {
            var clickableElement = document.createElement('div');
            clickableElement.className = 'a-style-sliderclickablearea';
            clickableElement.onclick = function () {};
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
            var step = this.properties.ticklabels ? this.properties.ticklabels * 10 : 10;

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
            document.dispatchEvent(updateEvent);
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

            // sets the step increment of the range control to the ticklabel interval
            // this.element.step = props;
        }

        oQuestionHNumberSlider.prototype.floodtovalue = function (val) {
            if (val === true) {
                this.element.classList.add('flood-to-value');
            }
        }

        oQuestionHNumberSlider.prototype.labels = function (props) {

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
                document.dispatchEvent(clickedEvent);

                this.element.disabled = false;
                this.organism.classList.remove('inactive');
                this.organism.classList.add('active');

                if (this.isExclusive) {
                    var enableExclusive = new CustomEvent(this.group + '_enableExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    document.dispatchEvent(enableExclusive);
                }

                this.element.style.setProperty('--track-background-fill', 'linear-gradient(to right, #D0DAE6 0%, #D0DAE6 ' + this.element.value + '%, #fff ' + this.element.value + '%, white 100%)');
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

    }
)
;