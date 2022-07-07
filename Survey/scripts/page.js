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
            var questioninformation = this.element.getElementsByClassName('o-question-information');
            var questioninstruction = this.element.getElementsByClassName('o-question-errorandinstruction');

            for (var i = 0; i < questioninformation.length; i++) {
                questioninformation[i].style.flexBasis = width + '%';
                questioninformation[i].style.msFlex = '0 0 ' + width + '%';
            }

            for (var i = 0; i < questioninstruction.length; i++) {
                questioninstruction[i].style.maxWidth = width + '%';
            }

        }

        return page;

    });