define(
    function () {

        function page(id, group) {
            this.id = id;
            this.group = group;
            this.element = document.querySelector('body>form');

            this.configureProperties();
        }

        page.prototype.configureProperties = function (propertiesName) {
            propertiesName = (typeof propertiesName === 'undefined') ? app.extractQuestionName(this.group) : propertiesName;

            this.properties = app.getProperties(propertiesName);
            this.properties.registered = true;

            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        page.prototype.sidebyside = function (width) {
            var questionelements = this.element.getElementsByClassName('o-question-information');

            for (var i = 0; i < questionelements.length; i++) {
                questionelements[i].style.flexBasis = width + '%';
            }
        }

        return page;

    });