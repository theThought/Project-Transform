define(['component'],
    function (component) {

        /**
         * Atom: Character count element for text input areas
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aLabelCharacterCount(id, group) {
            component.call(this, id, group);
        }

        aLabelCharacterCount.prototype = Object.create(component.prototype);
        aLabelCharacterCount.prototype.constructor = aLabelCharacterCount;

        aLabelCharacterCount.prototype.init = function () {
            this.configureProperties();
            this.configurationComplete();
        }

        return aLabelCharacterCount;

    });