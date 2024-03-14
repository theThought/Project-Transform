define(['o-question'], function (oQuestion) {
    function oQuestionScaleHorizontal(id, group) {
        oQuestion.call(this, id, group);
        
        

        this.singleStateImage = document.querySelector('.m-image-singlestate');

        var properties = this.fetchProperties(group);
        if (properties && properties.unit) {
            this.setImageAndAlt(properties.unit);
        }

        this.initPersonIcons();
    }

    oQuestionScaleHorizontal.prototype = Object.create(oQuestion.prototype);
    oQuestionScaleHorizontal.prototype.constructor = oQuestionScaleHorizontal;

    oQuestionScaleHorizontal.prototype.fetchProperties = function(group) {
        return app.getProperties(group); 
    };

    
    oQuestionScaleHorizontal.prototype.setImageAndAlt = function(unitProps) {
        if (this.singleStateImage) {
            if (unitProps.image) {
                this.singleStateImage.src = unitProps.image;
            }
            if (unitProps.caption) {
                this.singleStateImage.alt = unitProps.caption;
            }
        }
    };


    oQuestionScaleHorizontal.prototype.initPersonIcons = function() {
        var self = this; 
        var checkboxes = document.querySelectorAll('.person-checkbox');
        checkboxes.forEach(function(checkbox, index) {
            checkbox.addEventListener('change', function() {
                self.updatePersonIcons(index + 1);
            });
        });
    };

    oQuestionScaleHorizontal.prototype.updatePersonIcons = function(clickedIndex) {
        // Assuming you've updated this function according to your HTML structure.
        // Implementation details remain the same as your previous approach.
    };

    return oQuestionScaleHorizontal;
});
