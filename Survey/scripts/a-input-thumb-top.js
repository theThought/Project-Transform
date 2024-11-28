define(['component'],
    function (component) {

        function aInputThumbTop(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup=' + this.group + '] .a-input-thumbtop input');
            this.keytimer = null;
            this.keytimerlimit = 500; // time in milliseconds before the action runs
        }

        aInputThumbTop.prototype = Object.create(component.prototype);
        aInputThumbTop.prototype.constructor = aInputThumbTop;

        aInputThumbTop.prototype.init = function () {
            this.configureProperties();
            this.formatValue();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        aInputThumbTop.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + '_updateValue', this.handleEvent.bind(this), false);
        }

        aInputThumbTop.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('keyup', this.handleEvent.bind(this), false);
        }

        aInputThumbTop.prototype.handleEvent = function (event) {
            switch (event.type) {
                case this.group + '_updateValue':
                    this.updateValue(event.detail);
                    break;
                case 'keyup':
                    this.onChange();
                    break;
            }
        }

        aInputThumbTop.prototype.onChange = function () {
            clearInterval(this.keytimer);

            if (this.element.value.length < 4) {
                return;
            }

            var self = this;
            this.keytimer = setTimeout(function() {
                self.broadcastChange();
            }, this.keytimerlimit);
        }

        aInputThumbTop.prototype.broadcastChange = function () {
            var broadcastTimeChange = new CustomEvent(this.group + '_broadcastTimeChange', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(broadcastTimeChange);
        }

        aInputThumbTop.prototype.updateValue = function (eventDetail) {
            var hours = '' + new Date(eventDetail.dateelement.value).getHours();
            var minutes = '0' + new Date(eventDetail.dateelement.value).getMinutes();
            this.element.value = hours.slice(-2) + ':' + minutes.slice(-2);
        }

        aInputThumbTop.prototype.formatValue = function () {
            if (!this.element.value.length) {
                return;
            }

            var initialDate = new Date(this.element.value);
            var hours = '0' + initialDate.getHours();
            var minutes = '0' + initialDate.getMinutes();
            this.element.value = hours.slice(-2) + ':' + minutes.slice(-2);
        }

        return aInputThumbTop;

    });