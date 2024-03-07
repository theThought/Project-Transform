define(['o-question'],
    function (oQuestion) {
        function oQuestionTScale(id, group) {
            
            oQuestion.call(this, id, group);

            this.backgroundDiv = document.querySelector('.background');

            var properties = this.fetchProperties(group);
            if (properties && properties.background && properties.background.image) {
                this.setBackgroundImage(properties.background.image);
            }
        }

        oQuestionTScale.prototype = Object.create(oQuestion.prototype);
        oQuestionTScale.prototype.constructor = oQuestionTScale;


        oQuestionTScale.prototype.fetchProperties = function(group) {
            return app.getProperties(group);
        };

        // Method to set the background image
        oQuestionTScale.prototype.setBackgroundImage = function(imageUrl) {

            console.log(imageUrl);
            if (this.backgroundDiv) {
                this.backgroundDiv.style.backgroundImage = 'url(' + imageUrl + ')';
                // this.backgroundDiv.style.backgroundSize = 'cover';
                // this.backgroundDiv.style.backgroundPosition = 'center';
            }
        };

        return oQuestionTScale;
    });
