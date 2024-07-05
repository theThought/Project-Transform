define(['component'],
    function (component) {

        function aInputTimeRecent(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup=' + this.group + '] .a-input-time-recent input');
        }

        aInputTimeRecent.prototype = Object.create(component.prototype);
        aInputTimeRecent.prototype.constructor = aInputTimeRecent;

        aInputTimeRecent.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        aInputTimeRecent.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + '_updateValue', this, false);
        }

        aInputTimeRecent.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('keyup', this, false);
        }

        aInputTimeRecent.prototype.handleEvent = function (event) {
            switch (event.type) {
                case this.group + '_updateValue':
                    this.updateValue(event.detail);
                    break;
                case 'keyup':
                    this.onChange();
                    break;
            }
        }

        aInputTimeRecent.prototype.onChange = function () {
            var broadcastTimeChange = new CustomEvent(this.group + '_broadcastTimeChange', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(broadcastTimeChange);
        }

        aInputTimeRecent.prototype.updateValue = function (eventDetail) {
            var hours = '0' + new Date(eventDetail.dateelement.value).getHours();
            var minutes = '0' + new Date(eventDetail.dateelement.value).getMinutes();
            this.element.value = hours.slice(-2) + ':' + minutes.slice(-2);
        }

        return aInputTimeRecent;

    });