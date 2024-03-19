define(['o-question'], function (oQuestion) {
    function oQuestionScaleHorizontal(id, group) {
        oQuestion.call(this, id, group);
        
        this.properties = this.fetchProperties(group);
        if (this.properties && this.properties.background) {
            console.log(this.properties);
            this.setImageAndAlt(this.properties.background);
        }

        // Initialising the scale units and event listeners
        this.initializeScaleUnits();
        this.setupEventListeners();
    }

    oQuestionScaleHorizontal.prototype = Object.create(oQuestion.prototype);
    oQuestionScaleHorizontal.prototype.constructor = oQuestionScaleHorizontal;

    oQuestionScaleHorizontal.prototype.fetchProperties = function(group) {
        return app.getProperties(group);
    };

    oQuestionScaleHorizontal.prototype.setImageAndAlt = function(backgroundProps) {
        var singleStateImage = document.querySelector('.m-image-singlestate');
        if (singleStateImage) {
            if (backgroundProps.image) {
                singleStateImage.src = backgroundProps.image;
            }
            if (backgroundProps.caption) {
                singleStateImage.alt = backgroundProps.caption;
            }
        }
    };

    oQuestionScaleHorizontal.prototype.initializeScaleUnits = function() {
        var scaleUnits = document.querySelectorAll('.m-scale-unit');
        var properties = this.properties;
        scaleUnits.forEach(function(unit) {
            var img = unit.querySelector('.a-image-multistate');
            // Set initial src based on 'unit' property
            img.src = properties.unit.image;
        });
    };

    oQuestionScaleHorizontal.prototype.setupEventListeners = function() {
        var checkboxes = document.querySelectorAll('.scale-checkbox');
        var handleCheckboxChange = this.handleCheckboxChange.bind(this, checkboxes); 

        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    };

    oQuestionScaleHorizontal.prototype.handleCheckboxChange = function(checkboxes, event) {
        var selectedValue = parseInt(event.target.value);
        var activeCount = 0;
        var properties = this.properties; 

        checkboxes.forEach(function(cb, index) {
            var unitLabel = cb.closest('.m-scale-unit');
            var img = unitLabel.querySelector('.a-image-multistate');
            var isActive = index < selectedValue || parseInt(cb.value) === selectedValue;

            cb.checked = isActive;
            img.src = cb.checked ? properties.activeUnit.image : properties.unit.image;

            if (cb.checked) activeCount++;
        });
        //console.log(activeCount + ' checkboxes are selected.');
    };

    return oQuestionScaleHorizontal;
});
