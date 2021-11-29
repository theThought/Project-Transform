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
         */

        function oQuestion(id) {
            this.id = id;
            this.element = document.querySelector('div[data-questiongroup="' + this.id + '"]');
        }

        oQuestion.prototype.Init = function () {
            this.properties = app.properties[this.id];
            this.configureProperties();
        }

        oQuestion.prototype.configureProperties = function () {
            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        oQuestion.prototype.balance = function(prop) {
            if (prop === 'true') {
                this.element.classList.add('balance');
            }
        }

        oQuestion.prototype.onesize = function(prop) {
            if (prop === 'true') {
                this.element.classList.add('one-size');
            }
        }

        oQuestion.prototype.handleEvent = function (event) {
            switch (event.type) {
            }
        }

        return oQuestion;

    });