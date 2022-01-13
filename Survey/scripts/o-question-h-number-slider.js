/*
  Functionality:


  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    function () {

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
            this.element = null;
            this.wrapper = null;
            this.organism = null;
            this.isExclusive = false;
        }

        oQuestionHNumberSlider.prototype.Init = function () {
            this.element = document.querySelector('input[data-questionid="' + this.id + '"]');
            this.element.type = 'range';

            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;

            this.prepareHTML();
            this.properties = app.properties[this.group];
            this.configureProperties();

            this.setThumbVisibility();

            document.addEventListener("input", this, false);
            document.addEventListener("change", this, false);
            document.addEventListener("click", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener(this.group + "_dismissExclusive", this, false);
            document.addEventListener(this.group + "_incrementValue", this, false);
            document.addEventListener(this.group + "_decrementValue", this, false);
        }

        oQuestionHNumberSlider.prototype.prepareHTML = function () {
            var sliderBorder = document.createElement('div');
            sliderBorder.className = 'slider-border';

            var sliderWrapper = document.createElement('div');
            sliderWrapper.className = 'slider-wrapper';

            var sliderOrganism = document.createElement('div');
            sliderOrganism.className = 'o-input-questionhnumberslider';

            var parent = this.element.parentNode;

            parent.insertBefore(sliderBorder, this.element);

            sliderWrapper = parent.insertBefore(sliderWrapper, sliderBorder);
            sliderWrapper.appendChild(sliderBorder);
            sliderWrapper.appendChild(this.element);

            sliderOrganism = parent.insertBefore(sliderOrganism, sliderWrapper);
            sliderOrganism.appendChild(sliderWrapper);

            this.wrapper = sliderWrapper;
            this.organism = sliderOrganism;
        }

        oQuestionHNumberSlider.prototype.setThumbVisibility = function () {
            if (this.element.hasAttribute('value')) {
                this.wrapper.classList.add('active');
                this.organism.classList.add('has-value');
            }
        }

        oQuestionHNumberSlider.prototype.configureProperties = function () {
            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
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
            var wrapper = this.wrapper;
            var marksElement = document.createElement('div');
            var step = this.properties.ticklabels ? this.properties.ticklabels * 10 : 10;
            marksElement.className = 'slider-marks';

            marksElement.style.background = 'repeating-linear-gradient(90deg, ' +
                '#8797C8 0, ' +
                '#8797C8 1px, ' +
                'transparent 0, ' +
                'transparent calc(' + step + '% - 4px)) ' +
                'calc(.5*40px) 0/100% no-repeat';

            wrapper.insertBefore(marksElement, this.element);
        }

        oQuestionHNumberSlider.prototype.showValue = function () {
            // add a class to the parent which adds additional space for the thumb
            this.organism.classList.add('has-thumb-value');

            var parent = this.wrapper;
            var valueElement = document.createElement('div');
            valueElement.className = 'a-label-thumbvalue';
            valueElement.setAttribute("data-questionid", this.id + '_VAL');

            parent.insertBefore(valueElement, this.element);
            app.registerComponent('aLabelThumbValue', this.id + '_VAL', this.group);
        }

        oQuestionHNumberSlider.prototype.updateValue = function () {
            var updateEvent = new CustomEvent(this.group + '_updateValue', {bubbles: true, detail: this});
            document.dispatchEvent(updateEvent);
        }

        oQuestionHNumberSlider.prototype.showTerminators = function () {
            var preElement = document.createElement('button');
            preElement.type = 'button';
            preElement.setAttribute("data-questionid", this.id + '_DEC');
            preElement.className = 'a-button-preterminator';
            var preContent = document.createTextNode('<');
            preElement.appendChild(preContent);

            this.organism.insertBefore(preElement, this.wrapper);
            app.registerComponent('aInputButtonDec', this.id + '_DEC', this.group);

            var postElement = document.createElement('button');
            postElement.type = 'button';
            postElement.setAttribute("data-questionid", this.id + '_INC');
            postElement.className = 'a-button-postterminator';
            var postContent = document.createTextNode('>');
            postElement.appendChild(postContent);

            this.organism.insertBefore(postElement, this.wrapper.nextSibling);
            app.registerComponent('aInputButtonInc', this.id + '_INC', this.group);
        }

        oQuestionHNumberSlider.prototype.ticklabels = function (props) {
            // add a class to the parent which adds additional space for the thumb
            this.organism.classList.add('has-tick-labels');

            var wrapper = this.wrapper;

            var labelsElement = document.createElement('div');
            labelsElement.className = 'a-label-ticklabels';

            var min = this.element.min ? parseInt(this.element.min) : 0;
            var max = this.element.max ? parseInt(this.element.max) : 100;

            var step = isNaN(parseInt(this.properties.ticklabels)) ? 10 : parseInt(this.properties.ticklabels);
            if (step === 0) step = Math.floor(((max-min)/100) * 10);

            for (var i = min; i <= max; i = i + step) {
                    labelsElement.innerHTML = labelsElement.innerHTML + '<span>' + i + '</span>';
                }

                wrapper.insertBefore(labelsElement, this.element.nextSibling);

                // sets the step increment of the range control to the ticklabel interval
                // this.element.step = props;
            }

            oQuestionHNumberSlider.prototype.floodtovalue = function (props) {
                if (props === true) {
                    this.element.classList.add('flood-to-value');
                }
            }

            oQuestionHNumberSlider.prototype.labels = function (val) {

                if (val['pre']) {
                    var preElement = document.createElement('span');
                    preElement.className = 'a-label-prelabel';
                    var preContent = document.createTextNode(val['pre']);
                    preElement.appendChild(preContent);

                    this.organism.classList.add('has-pre-label');
                    this.organism.insertBefore(preElement, this.wrapper);
                }

                if (val['post']) {
                    var postElement = document.createElement('span');
                    postElement.className = 'a-label-postlabel';
                    var postContent = document.createTextNode(val['post']);
                    postElement.appendChild(postContent);

                    this.organism.classList.add('has-post-label');
                    this.organism.insertBefore(postElement, this.wrapper.nextSibling);
                }
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

            oQuestionHNumberSlider.prototype.onInput = function (event) {

                if (event.target === this.element || event === true) {

                    this.organism.classList.add('has-value');

                    // handle self-generated events
                    var clickedEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
                    document.dispatchEvent(clickedEvent);

                    this.wrapper.classList.add('active');

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
                    this.onInput(true);
                }
            }

            oQuestionHNumberSlider.prototype.decrementValue = function () {
                var currentValue = parseInt(this.element.value);
                var maxValue = parseInt(this.element.min);

                if (currentValue > maxValue) {
                    this.element.value--;
                    this.onInput(true);
                }
            }

            oQuestionHNumberSlider.prototype.onEnableExclusive = function (event) {
                this.wrapper.classList.remove('active');
            }

            oQuestionHNumberSlider.prototype.onDismissExclusive = function (event) {
                this.wrapper.classList.add('active');
            }

            return oQuestionHNumberSlider;

        }
    )
        ;