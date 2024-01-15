define(['component'], function (component) {

    function aLabelThumbValueVertical(id, group) {
        component.call(this, id, group);

        // For vertical slider
        this.verticalElement = document.querySelector('div.o-question-vnumberslider[data-questiongroup=' + this.group + '] div.a-label-thumbvalue');
        this.verticalSlider = document.querySelector('div.o-question-vnumberslider[data-questiongroup=' + this.group + '] input[type=range]');
    }

    aLabelThumbValueVertical.prototype = Object.create(component.prototype);
    aLabelThumbValueVertical.prototype.constructor = aLabelThumbValueVertical;

    aLabelThumbValueVertical.prototype.init = function () {
        this.configureProperties();
        this.configureIncomingEventListeners();

        // Check if the vertical slider exists before initializing
        if (this.verticalSlider) {
            this.updateValue({ element: this.verticalSlider });
        }

        this.configurationComplete();
    };

    aLabelThumbValueVertical.prototype.configureIncomingEventListeners = function () {
        // for each event listener there must be a corresponding event handler
        if (this.verticalSlider) {
            document.addEventListener(this.group + "_updateValue", this, false);
        }
    };

    aLabelThumbValueVertical.prototype.handleEvent = function (event) {
        switch (event.type) {
            case this.group + "_updateValue":
                this.updateValue(event.detail);
                break;
        }
    };

    aLabelThumbValueVertical.prototype.updateValue = function (eventDetail) {

        if (!eventDetail || !eventDetail.element) {
            // If eventDetail or eventDetail.element is null or undefined, do nothing
            return;
        }

        var direction = (document.dir === 'rtl') ? 'rtl' : 'ltr';
        var value = eventDetail.element.value;
        var elementToUpdate;

        elementToUpdate = this.verticalElement;
    
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
    };

    return aLabelThumbValueVertical;

});
