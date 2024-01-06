define(['component'], 
    function (component) {

    function aLabelThumbValue(id, group) {
        component.call(this, id, group);

        // For horizontal slider
        this.horizontalElement = document.querySelector('div.o-question-hnumberslider[data-questiongroup=' + this.group + '] div.a-label-thumbvalue');
        this.horizontalSlider = document.querySelector('div.o-question-hnumberslider[data-questiongroup=' + this.group + '] input[type=range]');

        // For vertical slider
        this.verticalElement = document.querySelector('div.o-question-vnumberslider[data-questiongroup=' + this.group + '] div.a-label-thumbvalue');
        this.verticalSlider = document.querySelector('div.o-question-vnumberslider[data-questiongroup=' + this.group + '] input[type=range]');
    }

    aLabelThumbValue.prototype = Object.create(component.prototype);
    aLabelThumbValue.prototype.constructor = aLabelThumbValue;

    aLabelThumbValue.prototype.init = function () {
        this.configureProperties();
        this.configureIncomingEventListeners();

        // Check if the horizontal slider exists before initializing
        if (this.horizontalSlider) {
            this.updateValue({ element: this.horizontalSlider });
        }

        this.configurationComplete();
    };

    aLabelThumbValue.prototype.configureIncomingEventListeners = function () {
        // for each event listener there must be a corresponding event handler
        document.addEventListener(this.group + "_updateValue", this, false);
    };

    aLabelThumbValue.prototype.handleEvent = function (event) {
        switch (event.type) {
            case this.group + "_updateValue":
                this.updateValue(event.detail);
                break;
        }
    };

    aLabelThumbValue.prototype.updateValue = function (eventDetail) {
        if (!eventDetail || !eventDetail.element) {
            // If eventDetail or eventDetail.element is null or undefined, do nothing
            return;
        }

        var direction = (document.dir === 'rtl') ? 'rtl' : 'ltr';
        var value = eventDetail.element.value;
        var elementToUpdate;

        if (eventDetail.element === this.horizontalSlider) {
            elementToUpdate = this.horizontalElement;
        } else if (eventDetail.element === this.verticalSlider) {
            elementToUpdate = this.verticalElement;
        }

        if (elementToUpdate) {
            elementToUpdate.innerHTML = value;

            var min = eventDetail.element.min ? eventDetail.element.min : 0;
            var max = eventDetail.element.max ? eventDetail.element.max : 100;
            var thumbWidth = 40;
            var range = max - min;

            var position = Number(((value - min) / range) * 100);
            var positionOffset = Math.round(thumbWidth * position / 100) - (thumbWidth / 2);
            var positionPaddingOffset = Math.round(12 * position / 100) - 6;

            if (direction === 'rtl') {
                elementToUpdate.style.right = 'calc(' + position + '% - ' + positionOffset + 'px - ' + positionPaddingOffset + 'px)';
            } else {
                elementToUpdate.style.left = 'calc(' + position + '% - ' + positionOffset + 'px - ' + positionPaddingOffset + 'px)';
            }
        }
    };

    return aLabelThumbValue;

});
