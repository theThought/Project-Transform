define(['component'],
    function (component) {

        /**
         * Atom: Value label for slider
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function mSliderDateThumb(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup=' + this.group + '] div.m-slider-date-thumb');
            this.slider = document.querySelector('div[data-questiongroup=' + this.group + '] input[type=range]');
        }

        mSliderDateThumb.prototype = Object.create(component.prototype);
        mSliderDateThumb.prototype.constructor = mSliderDateThumb;

        mSliderDateThumb.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();

            // initialise the value - cannot be called as we don't know the thumbvalue element is ready
            this.updatePosition({element: this.slider});
            this.configurationComplete();
        }

        mSliderDateThumb.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + '_updateValue', this, false);
        }

        mSliderDateThumb.prototype.handleEvent = function (event) {
            switch (event.type) {
                case this.group + '_updateValue':
                    this.updateValue(event.detail);
                    break;
            }
        }

        mSliderDateThumb.prototype.updatePosition = function (eventDetail) {
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

        mSliderDateThumb.prototype.updateValue = function (eventDetail) {
            this.updatePosition(eventDetail);
            this.updateDate(eventDetail);
            this.updateTime(eventDetail);
        }

        mSliderDateThumb.prototype.updateDate = function (eventDetail) {
            var selectedDate = new Date(eventDetail.dateelement.value);
            var options = { weekday: "long" };
            var dayOfWeek = new Intl.DateTimeFormat("en-GB", options).format(selectedDate);
            this.element.querySelector('.a-label-date').innerHTML = dayOfWeek;
        }

        mSliderDateThumb.prototype.updateTime = function (eventDetail) {
            var hours = new Date(eventDetail.dateelement.value).getHours();
            var minutes = '0' + new Date(eventDetail.dateelement.value).getMinutes();
            var time = hours + ':' + minutes.slice(-2);
            this.element.querySelector('.a-label-time').innerHTML = time;
        }

        return mSliderDateThumb;

    });