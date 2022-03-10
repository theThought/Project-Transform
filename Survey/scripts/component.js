/*
  functionality:

  character countdown

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(
    function () {

        /**
         * Base component class
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function component(id, group) {
            this.id = id;
            this.group = group;
            this.properties = {};
        }

        component.prototype.configureProperties = function () {
            var propertiesName = this.group.toLowerCase();

            if (!app.properties[propertiesName]) {
                return false;
            }

            this.properties = app.getProperties(propertiesName);

            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        return component;

    });