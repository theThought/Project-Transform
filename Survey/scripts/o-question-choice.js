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
         * Organism: Question Class
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oQuestionChoice(id, group) {
            this.id = id;
            this.group = group;
        }

        oQuestionChoice.prototype.Init = function () {
            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"]');
            this.properties = app.properties[this.group];
            this.configureProperties();
        }

        oQuestionChoice.prototype.configureProperties = function () {
            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        oQuestionChoice.prototype.balance = function(prop) {
            if (prop === true) {
                this.element.classList.add('balance');
            }
        }

        oQuestionChoice.prototype.onesize = function(props) {
            if (props['state'] === true) {
                this.element.classList.add('one-size');
            }
        }

        oQuestionChoice.prototype.handleEvent = function (event) {
            switch (event.type) {
            }
        }

        return oQuestionChoice;

    });