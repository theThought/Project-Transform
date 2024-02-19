define(['component'],
    function (component) {

        /**
         * Atom: Increment Button
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputButtonInc(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"] button.a-button-postterminator');
            this.defaultsymbol = '&raquo;' // default >> appearance
        }

        aInputButtonInc.prototype = Object.create(component.prototype);
        aInputButtonInc.prototype.constructor = aInputButtonInc;

        aInputButtonInc.prototype.init = function () {
            this.symbol(this.defaultsymbol)
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configurationComplete();
        }

        aInputButtonInc.prototype.symbol = function (symbol) {
            this.element.innerHTML = symbol;
        }

        aInputButtonInc.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("click", this, false);
        }

        aInputButtonInc.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick(event);
                    break;
            }
        }

        aInputButtonInc.prototype.onClick = function (event) {
            if (event.target === this.element) {

                var incrementValueEvent = new CustomEvent(this.group + '_incrementValue', {
                    bubbles: true,
                    detail: this
                });
                this.element.dispatchEvent(incrementValueEvent);
            }
        }

        return aInputButtonInc;

    });