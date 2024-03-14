define(['o-question'], function (oQuestion) {
    function oQuestionScaleHorizontal(id, group) {
        oQuestion.call(this, id, group);
        
        this.singleStateImage = document.querySelector('.m-image-singlestate');

        var properties = this.fetchProperties(group);
        if (properties && properties.background) {
            console.log(properties);
            console.log(properties.background);
            this.setImageAndAlt(properties.background);
        }
    }

    oQuestionScaleHorizontal.prototype = Object.create(oQuestion.prototype);
    oQuestionScaleHorizontal.prototype.constructor = oQuestionScaleHorizontal;

    oQuestionScaleHorizontal.prototype.fetchProperties = function(group) {
        return app.getProperties(group); 
    };

    oQuestionScaleHorizontal.prototype.setImageAndAlt = function(backgroundProps) {
        if (this.singleStateImage) {
            if (backgroundProps.image) {
                this.singleStateImage.src = backgroundProps.image;
            }
            if (backgroundProps.caption) {
                this.singleStateImage.alt = backgroundProps.caption;
            }
        }
    };

    return oQuestionScaleHorizontal;
});
