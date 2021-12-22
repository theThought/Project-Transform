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
            this.output = null;
            this.isExclusive = false;
        }

        oQuestionHNumberSlider.prototype.Init = function () {
            this.element = document.querySelector('input[data-questionid="' + this.id + '"]');
            this.element.type = 'range';

            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;

            this.prepareHTML();
            this.properties = app.properties[this.group];
            this.configureProperties();

            document.addEventListener("input", this, false);
            document.addEventListener("change", this, false);
            document.addEventListener("click", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener(this.group + "_dismissExclusive", this, false);
        }

        oQuestionHNumberSlider.prototype.prepareHTML = function () {
            var parent = this.element.parentNode;

            var wrapperelement = document.createElement('div');
            wrapperelement.className = 'slider-wrapper active';
            var wrapper = parent.insertBefore(wrapperelement, this.element);
            wrapper.appendChild(this.element);

            var borderelement = document.createElement('div');
            borderelement.className = 'slider-border';
            wrapper.insertBefore(borderelement, this.element);

            this.wrapper = wrapper;
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

            }
        }

        oQuestionHNumberSlider.prototype.showMarks = function () {
            var wrapper = this.wrapper;
            var markselement = document.createElement('div');
            var step = this.properties.ticklabels ? this.properties.ticklabels*10 : 10;
            markselement.className = 'slider-marks';

            markselement.style.background = 'repeating-linear-gradient(90deg, ' +
                '#8797C8 0, ' +
                '#8797C8 1px, ' +
                'transparent 0, ' +
                'transparent calc(' + step + '% - 4px)) ' +
                'calc(.5*40px) 0/100% no-repeat';

            wrapper.insertBefore(markselement, this.element);
        }

        oQuestionHNumberSlider.prototype.showValue = function () {
            var parent = this.wrapper;
            var valueelement = document.createElement('div');
            valueelement.className = 'a-label-value';
            parent.insertBefore(valueelement, this.element);
            this.output = valueelement;
            this.updateValue(this.element.value);
        }

        oQuestionHNumberSlider.prototype.updateValue = function (val) {
            if (this.output !== null) {
                this.output.innerHTML = val;
                var min = this.element.min ? this.element.min : 0;
                var max = this.element.max ? this.element.max : 100;
                var positionValue = Number((val - min) * 100 / (max - min));
                var newPosition = 0 - (positionValue * .45);
                this.output.style.left = 'calc(' + positionValue + '% + ' + newPosition + 'px)';
            }
        }

        oQuestionHNumberSlider.prototype.showTerminators = function () {

        }

        oQuestionHNumberSlider.prototype.ticklabels = function (props) {
            this.element.step = props;
        }

        oQuestionHNumberSlider.prototype.floodtovalue = function (props) {
            if (props === true) {
                this.element.classList.add('flood-to-value');
            }
        }

        oQuestionHNumberSlider.prototype.labels = function (val) {
            var parent = this.wrapper.parentNode;
            var wrapperelement = document.createElement('div');
            wrapperelement.className = 'o-input-questionhnumberslider';
            var wrapper = parent.insertBefore(wrapperelement, this.wrapper);
            wrapper.appendChild(this.wrapper);

            if (val['pre']) {
                var preelement = document.createElement('span');
                preelement.className = 'a-label-prelabel';
                var precontent = document.createTextNode(val['pre']);
                preelement.appendChild(precontent);

                wrapper.insertBefore(preelement, this.wrapper);
            }

            if (val['post']) {
                var postelement = document.createElement('span');
                postelement.className = 'a-label-postlabel';
                var postcontent = document.createTextNode(val['post']);
                postelement.appendChild(postcontent);

                wrapper.insertBefore(postelement, this.wrapper.nextSibling);
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
            }
        }

        oQuestionHNumberSlider.prototype.onInput = function (event) {

            if (event.target === this.element) {

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
                this.updateValue(this.element.value);
            }

        }

        oQuestionHNumberSlider.prototype.onEnableExclusive = function (event) {
            this.wrapper.classList.remove('active');
        }

        oQuestionHNumberSlider.prototype.onDismissExclusive = function (event) {
            this.wrapper.classList.add('active');
        }

        return oQuestionHNumberSlider;

    });