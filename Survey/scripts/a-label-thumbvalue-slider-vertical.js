define(['component'], function (component) {
    console.log('I am getting fired??');
    // Constructor function
    function aLabelThumbValueVertical(id, group) {
        component.call(this, id, group);

        // For vertical slider
        this.verticalSlider = document.querySelector(`div.o-question-slider-vertical[data-questiongroup=${this.group}] input[type=range]`);
        this.verticalElement = document.querySelector(`div.o-question-slider-vertical[data-questiongroup=${this.group}] div.a-label-thumbvalue`);
        // Check if the HTML direction is set to RTL
        this.isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    }
//test
    // Inheritance setup
    aLabelThumbValueVertical.prototype = Object.create(component.prototype);
    aLabelThumbValueVertical.prototype.constructor = aLabelThumbValueVertical;

    // Initialization method
    aLabelThumbValueVertical.prototype.init = function () {
        console.log(`${this.isRTL} is it isRTL???`);
        this.configureProperties();
        this.configureIncomingEventListeners();

        // Check if the vertical slider exists before initializing
        if (this.verticalSlider) {
            this.updateValue({ element: this.verticalSlider });
        }

        this.configurationComplete();
    };

    // Event listener setup
    aLabelThumbValueVertical.prototype.configureIncomingEventListeners = function () {
        // For each event listener, there must be a corresponding event handler
        if (this.verticalSlider) {
            document.addEventListener(`${this.group}_updateValue`, this, false);
        }
    };

    // Event handler
    aLabelThumbValueVertical.prototype.handleEvent = function (event) {
        if (event.type === `${this.group}_updateValue`) {
            this.updateValue(event.detail);
        }
    };

    // Update value method
    aLabelThumbValueVertical.prototype.updateValue = function (eventDetail) {
        if (!eventDetail || !eventDetail.element) {
            // If eventDetail or eventDetail.element is null or undefined, do nothing
            return;
        }

        // Destructuring for cleaner code
        const { value, min = 0, max = 100 } = eventDetail.element;
        const thumbWidth = 40;
        const range = max - min;

        // Calculation of position and offsets
        const position = ((value - min) / range) * 100;
        const positionOffset = Math.round(thumbWidth * position / 100) - (thumbWidth / 2);
        const positionPaddingOffset = Math.round(12 * position / 100) - 6;

        // Element to update
        const elementToUpdate = this.verticalElement;

        // Applying styles and updating content
        if(this.isRTL) {
            console.log(this.isRTL);
            elementToUpdate.style.right = `calc(${position}% - ${positionOffset}px - ${positionPaddingOffset}px)`;
            elementToUpdate.innerHTML = value;
        } else {
            elementToUpdate.style.left = `calc(${position}% - ${positionOffset}px - ${positionPaddingOffset}px)`;

            elementToUpdate.innerHTML = value;
        }
    };

    return aLabelThumbValueVertical;

});