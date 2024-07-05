define(['component'],
    function (component) {

        function aInputDateRecent(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup=' + this.group + '] .a-input-date-recent input');
            this.hiddenelement = null;
            this.mindate = '';
            this.maxdate = '';
            this.ranges = [];
        }

        aInputDateRecent.prototype = Object.create(component.prototype);
        aInputDateRecent.prototype.constructor = aInputDateRecent;

        aInputDateRecent.prototype.init = function () {
            this.configureProperties();
            this.ranges = this.buildRanges();
            this.hideOriginalInputElement();
            this.buildList();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();

            // initialise the value - cannot be called as we don't know the thumbvalue element is ready
            this.configurationComplete();
        }

        aInputDateRecent.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + '_updateValue', this, false);
        }

        aInputDateRecent.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('change', this, false);
        }

        aInputDateRecent.prototype.handleEvent = function (event) {
            switch (event.type) {
                case this.group + '_updateValue':
                    this.updateValue(event.detail);
                    break;
                case 'change':
                    this.onChange();
                    break;
            }
        }

        aInputDateRecent.prototype.onChange = function () {
            var broadcastDateChange = new CustomEvent(this.group + '_broadcastDateChange', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(broadcastDateChange);
        }

        aInputDateRecent.prototype.buildRanges = function () {
            var dateArray = [];
            var maxDate = new Date(this.maxdate);
            maxDate = new Date(maxDate.toDateString());
            var minDate = new Date(this.mindate);
            minDate = new Date(minDate.toDateString());
            var dateObject = {};

            while (maxDate >= minDate) {
                dateObject = {};
                dateObject.dayname = maxDate.toLocaleDateString(navigator.language, { weekday: 'long' });
                dateObject.endpoint = maxDate.toDateString();
                dateArray.push(dateObject);
                maxDate = maxDate.addDays(-1);
            }

            return dateArray;
        }

        aInputDateRecent.prototype.hideOriginalInputElement = function () {
            this.element.type = 'hidden';
            this.hiddenelement = this.element;
        }

        aInputDateRecent.prototype.buildList = function () {
            var newelement = document.createElement('SELECT');
            var dateoptions = '';

            for (var i = 0; i < this.ranges.length; i++) {
                dateoptions += '<option value="' + this.ranges[i].endpoint + '">' + this.ranges[i].dayname + '</option>';
            }
            newelement.innerHTML = dateoptions;

            this.element = this.element.parentNode.insertBefore(newelement, this.element);
        }

        aInputDateRecent.prototype.validation = function (props) {
            this.min(props.min);
            this.max(props.max);
        }

        aInputDateRecent.prototype.min = function (prop) {
            this.mindate = prop;
        }

        aInputDateRecent.prototype.max = function (prop) {
            this.maxdate = prop;
        }

        aInputDateRecent.prototype.updateValue = function (eventDetail) {
            var selectedDate = new Date(eventDetail.dateelement.value);
            this.element.value = selectedDate.toDateString();
        }

        return aInputDateRecent;

    });