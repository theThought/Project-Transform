define(['o-question'], function (oQuestion) {
    function oQuestionTScale(id, group) {
        oQuestion.call(this, id, group);

        this.backgroundDiv = document.querySelector('.m-t-scale');

        var properties = this.fetchProperties(group);
        if (properties && properties.background) {
            this.setBackgroundAndAria(properties.background);
        }

        // Assuming you have checkboxes as part of your oQuestionTScale
        // You might need to adapt this to fit your actual HTML structure and requirements
        this.initPersonIcons();
    }

    oQuestionTScale.prototype = Object.create(oQuestion.prototype);
    oQuestionTScale.prototype.constructor = oQuestionTScale;

    oQuestionTScale.prototype.fetchProperties = function(group) {
        return app.getProperties(group); 
    };

    
    oQuestionTScale.prototype.setBackgroundAndAria = function(backgroundProps) {
        if (this.backgroundDiv) {
            if (backgroundProps.image) {
                this.backgroundDiv.style.backgroundImage = 'url(' + backgroundProps.image + ')';
            }
            if (backgroundProps.caption) {
                this.backgroundDiv.setAttribute('aria-label', backgroundProps.caption);
            }
        }
    };


    oQuestionTScale.prototype.initPersonIcons = function() {
        var self = this; 
        var checkboxes = document.querySelectorAll('.person-checkbox');
        checkboxes.forEach(function(checkbox, index) {
            checkbox.addEventListener('change', function() {
                self.updatePersonIcons(index + 1);
            });
        });
    };

    oQuestionTScale.prototype.updatePersonIcons = function(clickedIndex) {
        var checkboxes = document.querySelectorAll('.person-checkbox');
        var persons = document.querySelectorAll('.person');
        
        var isActive = checkboxes[clickedIndex - 1].checked;
        var allActive = true;

        for (var i = 0; i < clickedIndex; i++) {
            if (!checkboxes[i].checked) {
                allActive = false;
                break;
            }
        }

        if (isActive && allActive) {
            for (var i = 0; i < clickedIndex; i++) {
                checkboxes[i].checked = false;
                persons[i].className = persons[i].className.replace(' active', '');
            }
        } else {
            for (var i = 0; i < clickedIndex; i++) {
                checkboxes[i].checked = true;
                if (persons[i].className.indexOf('active') === -1) {
                    persons[i].className += ' active';
                }
            }
        }

        for (var i = clickedIndex; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
            persons[i].className = persons[i].className.replace(' active', '');
        }

        for (var i = 0; i < persons.length; i++) {
            if (persons[i].className.indexOf('active') !== -1) {
                count++;
            }
        }
        
    };

    return oQuestionTScale;
});