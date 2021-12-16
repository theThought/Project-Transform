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
            document.addEventListener("click", this, false);
            document.addEventListener(this.group + "_enableExclusive", this, false);
            document.addEventListener(this.group + "_dismissExclusive", this, false);
        }

        oQuestionHNumberSlider.prototype.prepareHTML = function () {
            var parent = this.element.parentNode;

            var wrapperelement = document.createElement('div');
            wrapperelement.className = 'slider-wrapper';
            var wrapper = parent.insertBefore(wrapperelement, this.element);
            wrapper.appendChild(this.element);

            var borderelement = document.createElement('div');
            borderelement.className = 'slider-border';
            wrapper.insertBefore(borderelement, this.element);
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

        oQuestionHNumberSlider.prototype.ticklabels = function (props) {
            this.element.step = props;
        }

        oQuestionHNumberSlider.prototype.floodtovalue = function (props) {
            if (props === true) {
                this.element.classList.add('flood-to-value');
            }
        }

        oQuestionHNumberSlider.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
                case "input":
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
                if (this.isExclusive) {
                    var enableExclusive = new CustomEvent(this.group + '_enableExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    document.dispatchEvent(enableExclusive);
                }

                this.element.style.setProperty('--track-background-fill','linear-gradient(to right, #D0DAE6 0%, #D0DAE6 ' + this.element.value + '%, #fff ' + this.element.value + '%, white 100%)');

            }

        }

        oQuestionHNumberSlider.prototype.onClick = function (event) {

        }

        oQuestionHNumberSlider.prototype.onEnableExclusive = function (event) {

        }

        oQuestionHNumberSlider.prototype.onDismissExclusive = function (event) {

        }

        return oQuestionHNumberSlider;

    });