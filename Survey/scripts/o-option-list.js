define(['component'],
    function (component) {

        /**
         * Organism: Option List
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oOptionList(id, group) {
            component.call(this, id, group);
        }

        oOptionList.prototype = Object.create(component.prototype);
        oOptionList.prototype.constructor = oOptionList;

        oOptionList.prototype.init = function () {
            this.configureProperties();
            this.configurationComplete();
        }

        return oOptionList;

    });