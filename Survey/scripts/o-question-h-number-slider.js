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
            document.addEventListener(this.group + "_incrementValue", this, false);
            document.addEventListener(this.group + "_decrementValue", this, false);
        }

        oQuestionHNumberSlider.prototype.prepareHTML = function () {
            var slider_border = document.createElement('div');
            slider_border.className = 'slider-border';

            var slider_wrapper = document.createElement('div');
            slider_wrapper.className = 'slider-wrapper active';

            var slider_organism = document.createElement('div');
            slider_organism.className = 'o-input-questionhnumberslider';

            var parent = this.element.parentNode;

            parent.insertBefore(slider_border, this.element);

            slider_wrapper = parent.insertBefore(slider_wrapper, slider_border);
            slider_wrapper.appendChild(slider_border);
            slider_wrapper.appendChild(this.element);

            slider_organism = parent.insertBefore(slider_organism, slider_wrapper);
            slider_organism.appendChild(slider_wrapper);

            this.wrapper = slider_wrapper;
            this.organism = slider_organism;
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
            var element_marks = document.createElement('div');
            var step = this.properties.ticklabels ? this.properties.ticklabels * 10 : 10;
            element_marks.className = 'slider-marks';

            element_marks.style.background = 'repeating-linear-gradient(90deg, ' +
                '#8797C8 0, ' +
                '#8797C8 1px, ' +
                'transparent 0, ' +
                'transparent calc(' + step + '% - 4px)) ' +
                'calc(.5*40px) 0/100% no-repeat';

            wrapper.insertBefore(element_marks, this.element);
        }

        oQuestionHNumberSlider.prototype.showValue = function () {
            var parent = this.wrapper;
            parent.classList.add('thumb-value');
            var valueelement = document.createElement('div');
            valueelement.className = 'a-label-value';
            parent.insertBefore(valueelement, this.element);
            this.output = valueelement;
            this.updateValue(this.element.value);
        }

        oQuestionHNumberSlider.prototype.updateValue = function (current_value) {
            if (this.output !== null) {
                this.output.innerHTML = current_value;

                var min = this.element.min ? this.element.min : 0;
                var max = this.element.max ? this.element.max : 100;

                var position_value = Number((current_value - min) * 100 / (max - min));
                var new_position = 0 - (position_value * .45);

                this.output.style.left = 'calc(' + position_value + '% + ' + new_position + 'px)';
            }
        }

        oQuestionHNumberSlider.prototype.showTerminators = function () {

            var preelement = document.createElement('button');
            preelement.type = 'button';
            preelement.setAttribute("data-questionid", this.id + '_DEC');
            preelement.className = 'a-button-preterminator';
            var precontent = document.createTextNode('<');
            preelement.appendChild(precontent);

            this.organism.insertBefore(preelement, this.wrapper);
            app.registerComponent('aInputButtonDec', this.id + '_DEC', this.group);

            var postelement = document.createElement('button');
            postelement.type = 'button';
            postelement.setAttribute("data-questionid", this.id + '_INC');
            postelement.className = 'a-button-postterminator';
            var postcontent = document.createTextNode('>');
            postelement.appendChild(postcontent);

            this.organism.insertBefore(postelement, this.wrapper.nextSibling);
            app.registerComponent('aInputButtonInc', this.id + '_INC', this.group);
        }

        oQuestionHNumberSlider.prototype.ticklabels = function (props) {

            // binds the step increment of the range control to the ticklabel interval
            // this.element.step = props;
        }

        oQuestionHNumberSlider.prototype.floodtovalue = function (props) {
            if (props === true) {
                this.element.classList.add('flood-to-value');
            }
        }

        oQuestionHNumberSlider.prototype.labels = function (val) {

            if (val['pre']) {
                var preelement = document.createElement('span');
                preelement.className = 'a-label-prelabel';
                var precontent = document.createTextNode(val['pre']);
                preelement.appendChild(precontent);

                this.organism.insertBefore(preelement, this.wrapper);
            }

            if (val['post']) {
                var postelement = document.createElement('span');
                postelement.className = 'a-label-postlabel';
                var postcontent = document.createTextNode(val['post']);
                postelement.appendChild(postcontent);

                this.organism.insertBefore(postelement, this.wrapper.nextSibling);
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

        oQuestionHNumberSlider.prototype.incrementValue = function () {
            var current_value = parseInt(this.element.value);
            var max_value = parseInt(this.element.max);

            if (current_value < max_value) {
                this.element.value++;
                this.onInput(true);
            }
        }

        oQuestionHNumberSlider.prototype.decrementValue = function () {
            var current_value = parseInt(this.element.value);
            var min_value = parseInt(this.element.min);

            if (current_value > min_value) {
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

    });