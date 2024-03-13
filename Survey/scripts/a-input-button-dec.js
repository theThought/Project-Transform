define(['component'],
    function (component) {

        /**
         * Atom: Decrement Button
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputButtonDec(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"] button.a-button-preterminator');
            this.defaultsymbol = '&laquo;'; // default << appearance
        }

        aInputButtonDec.prototype = Object.create(component.prototype);
        aInputButtonDec.prototype.constructor = aInputButtonDec;

        aInputButtonDec.prototype.init = function () {
            this.symbol(this.defaultsymbol);
            this.configureProperties();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        aInputButtonDec.prototype.symbol = function (symbol) {
            this.element.innerHTML = symbol;
        }

        aInputButtonDec.prototype.configureLocalEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            this.element.addEventListener("click", this, false);
        }

        aInputButtonDec.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
            }
        }

        aInputButtonDec.prototype.onClick = function () {
            var decrementValueEvent = new CustomEvent(this.group + '_decrementValue', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(decrementValueEvent);
        }

        return aInputButtonDec;

    });