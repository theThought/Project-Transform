/*
  functionality:


  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Atom: aLabelCharacterCount
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aLabelCharacterCount(id, group) {
            component.call(this, id, group);

            this.configureProperties();
            this.configurationComplete();
        }

        aLabelCharacterCount.prototype = Object.create(component.prototype);
        aLabelCharacterCount.prototype.constructor = aLabelCharacterCount;

        return aLabelCharacterCount;

    });