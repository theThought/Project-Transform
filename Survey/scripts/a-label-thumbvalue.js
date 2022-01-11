/*
  functionality:


  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    function () {

        /**
         * Atom: Value label for slider
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aLabelThumbValue(id, group) {
            this.id = id;
            this.group = group;
            this.element = null;
            this.slider = null;
        }

        aLabelThumbValue.prototype.Init = function () {
            this.element = document.querySelector('div[data-questionid="' + this.id + '"]');
            this.slider = document.querySelector('input[name="' + this.group + '"]');

            document.addEventListener(this.group + "_updateValue", this, false);

            // initialise the value - cannot be called as we don't know the thumbvalue element is ready
            this.updateValue({element: this.slider});
        }

        aLabelThumbValue.prototype.handleEvent = function (event) {
            switch (event.type) {
                case this.group + "_updateValue":
                    this.updateValue(event.detail);
                    break;
            }
        }

        aLabelThumbValue.prototype.updateValue = function (eventDetail) {
            this.element.innerHTML = eventDetail.element.value;

            var min = eventDetail.element.min ? eventDetail.element.min : 0;
            var max = eventDetail.element.max ? eventDetail.element.max : 100;
            var thumbWidth = 40;
            var range = max - min;

            var position = Number(((eventDetail.element.value - min) / range) * 100);
            var positionOffset = Math.round(thumbWidth * position / 100) - (thumbWidth / 2);
            var positionPaddingOffset = Math.round(12 * position / 100) - 6;

            this.element.style.left = 'calc(' + position + '% - ' + positionOffset + 'px - ' + positionPaddingOffset + 'px)';
        }

        return aLabelThumbValue;

    });