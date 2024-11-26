define(['component'],
    function (component) {

        function mSliderThumbInteractive(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup=' + this.group + '] div.m-slider-thumb-interactive');
        }

        mSliderThumbInteractive.prototype = Object.create(component.prototype);
        mSliderThumbInteractive.prototype.constructor = mSliderThumbInteractive;

        mSliderThumbInteractive.prototype.init = function () {
            this.configureProperties();
            this.setParentOverflow();
            this.configureIncomingEventListeners();
            this.requestValue();
            this.configurationComplete();
        }

        mSliderThumbInteractive.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + '_updateValue', this, false);
        }

        mSliderThumbInteractive.prototype.handleEvent = function (event) {
            switch (event.type) {
                case this.group + '_updateValue':
                    this.updatePosition(event.detail);
                    break;
            }
        }

        mSliderThumbInteractive.prototype.setParentOverflow = function () {
            var container = this.element.closest('div.o-question-container');
            var scrollContainer = container.querySelector('.o-question-response');
            scrollContainer.style.overflow = 'visible';
        }

        mSliderThumbInteractive.prototype.updatePosition = function (eventDetail) {
            var direction = (document.dir === 'rtl') ? 'rtl' : 'ltr';
            var value = eventDetail.element.value;

            var min = eventDetail.element.min ? eventDetail.element.min : 0;
            var max = eventDetail.element.max ? eventDetail.element.max : 100;
            var thumbWidth = 40;
            var range = max - min;

            var position = Number(((value - min) / range) * 100);
            var positionOffset = Math.round(thumbWidth * position / 100) - (thumbWidth / 2);
            var positionPaddingOffset = Math.round(12 * position / 100) - 6;

            if (direction === 'rtl') {
                this.element.style.right = 'calc(' + position + '% - ' + positionOffset + 'px - ' + positionPaddingOffset + 'px)';
            } else {
                this.element.style.left = 'calc(' + position + '% - ' + positionOffset + 'px - ' + positionPaddingOffset + 'px)';
            }
        }

        return mSliderThumbInteractive;

    });