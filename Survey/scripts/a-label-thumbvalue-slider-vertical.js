define(['component'], 
    function(component) {

    /**
     * Atom: Value label for vertical sliders
     *
     * @constructor
     * @param {String} id - element id
     * @param {String} group - question group
     */

    function aLabelThumbValueVertical(id, group) {
        component.call(this, id, group);
        
        // For vertical slider
        this.verticalSlider = document.querySelector('div.o-question-slider-vertical[data-questiongroup=' + this.group + '] input[type=range]');
        this.verticalElement = document.querySelector('div.o-question-slider-vertical[data-questiongroup=' + this.group + '] div.a-label-thumbvalue');
        // Check if the HTML direction is set to RTL
        this.isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    }
    
    aLabelThumbValueVertical.prototype = Object.create(component.prototype);
    aLabelThumbValueVertical.prototype.constructor = aLabelThumbValueVertical;

    aLabelThumbValueVertical.prototype.init = function() {
        this.configureProperties();
        this.configureIncomingEventListeners();

        if (this.verticalSlider) {
            this.updateValue({ element: this.verticalSlider });
        }

        this.configurationComplete();
    };

    aLabelThumbValueVertical.prototype.configureIncomingEventListeners = function() {
        var self = this;
        // For each event listener, there must be a corresponding event handler
        if (this.verticalSlider) {
            document.addEventListener(this.group + '_updateValue', function(event) {
                self.handleEvent.call(self, event);
            }, false);
        }
    };

    aLabelThumbValueVertical.prototype.handleEvent = function(event) {
        if (event.type === this.group + '_updateValue') {
            this.updateValue(event.detail);
        }
    };

    aLabelThumbValueVertical.prototype.updateValue = function(eventDetail) {
        if (!eventDetail || !eventDetail.element) {
            return;
        }

        var value = eventDetail.element.value;
        var min = eventDetail.element.min || 0;
        var max = eventDetail.element.max || 100;
        var thumbWidth = 40;
        console.log(thumbWidth);
        var range = max - min;
        console.log(range);

        // Calculation of position and offsets
        var position = ((value - min) / range) * 100;
        var positionOffset = Math.round(thumbWidth * position / 100) - (thumbWidth / 2);
        var positionPaddingOffset = Math.round(12 * position / 100) - 6;

        // Element to update
        var elementToUpdate = this.verticalElement;

        // Applying styles and updating content
        if(this.isRTL) {
            console.log(this.isRTL);
            elementToUpdate.style.right = 'calc(' + position + '% - ' + positionOffset + 'px - ' + positionPaddingOffset + 'px)';
            elementToUpdate.innerHTML = value;
        } else {
            console.log('running calc');
            elementToUpdate.style.left = 'calc(' + position + '% - ' + positionOffset + 'px - ' + positionPaddingOffset + 'px)';
            elementToUpdate.innerHTML = value;
        }
    };

    return aLabelThumbValueVertical;
});
