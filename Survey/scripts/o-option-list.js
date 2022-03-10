/*
  functionality:

  balancing space for each option

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

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

            this.configureProperties();
            this.configurationComplete();
        }

        oOptionList.prototype = Object.create(component.prototype);
        oOptionList.prototype.constructor = oOptionList;

        return oOptionList;

    });