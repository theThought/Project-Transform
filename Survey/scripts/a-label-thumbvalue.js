/*
  functionality:


  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Atom: Value label for slider
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aLabelThumbValue(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div.o-question-hnumberslider[data-questiongroup=' + this.group + '] div.a-label-thumbvalue');
            this.slider = document.querySelector('div.o-question-hnumberslider[data-questiongroup=' + this.group + '] input[type=range]');

            this.configureProperties();
            this.configureIncomingEventListeners();

            // initialise the value - cannot be called as we don't know the thumbvalue element is ready
            this.updateValue({element: this.slider});
            this.configurationComplete();
        }

        aLabelThumbValue.prototype = Object.create(component.prototype);
        aLabelThumbValue.prototype.constructor = aLabelThumbValue;

        aLabelThumbValue.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + "_updateValue", this, false);
        }

        aLabelThumbValue.prototype.handleEvent = function (event) {
            switch (event.type) {
                case this.group + "_updateValue":
                    this.updateValue(event.detail);
                    break;
            }
        }

        aLabelThumbValue.prototype.updateValue = function (eventDetail) {
            var value = eventDetail.element.value;
            this.element.innerHTML = value;

            var min = eventDetail.element.min ? eventDetail.element.min : 0;
            var max = eventDetail.element.max ? eventDetail.element.max : 100;
            var thumbWidth = 40;
            var range = max - min;

            var position = Number(((value - min) / range) * 100);
            var positionOffset = Math.round(thumbWidth * position / 100) - (thumbWidth / 2);
            var positionPaddingOffset = Math.round(12 * position / 100) - 6;

            this.element.style.left = 'calc(' + position + '% - ' + positionOffset + 'px - ' + positionPaddingOffset + 'px)';
        }

        return aLabelThumbValue;

    });