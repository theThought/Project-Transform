define(['o-question'], function (oQuestion) {
    function mScaleUnit(id, group) {
        oQuestion.call(this, id, group);

        // Initialize properties
        this.unit = null;
        this.activeUnit = null;

        // Fetch and store properties, then initialize scale units
        this.fetchAndInitializeProperties(group);
    }

    mScaleUnit.prototype = Object.create(oQuestion.prototype);
    mScaleUnit.prototype.constructor = mScaleUnit;

    mScaleUnit.prototype.fetchAndInitializeProperties = function(group) {
        var properties = this.fetchProperties(group);
        if (properties) {
            this.unit = properties.unit;
            this.activeUnit = properties.activeUnit;
            this.initializeScaleUnits();
        }
    };

    mScaleUnit.prototype.fetchProperties = function(group) {
        return app.getProperties(group);
    };

    mScaleUnit.prototype.initializeScaleUnits = function() {
        var self = this;
        var scaleUnits = document.querySelectorAll('.o-scale-unitcontainer .m-scale-unit');
        scaleUnits.forEach(function(unit) {
            var value = unit.getAttribute('data-value');
            var imgElement = unit.querySelector('.a-image-multistate');
            
            if (imgElement) {
                // Set the default image and alt for each scale unit based on the value
                if (value === '1' && self.unit) { 
                    imgElement.src = self.unit.image;
                    imgElement.alt = 'Scale Icon ' + value; 
                }
                
                unit.querySelector('input[type="checkbox"]').addEventListener('change', function() {
                    if (this.checked) {
                        imgElement.src = self.activeUnit.image; 
                    } else {
                        imgElement.src = self.unit.image; 
                    }
                });
            }
        });
    };

    return mScaleUnit;
});
