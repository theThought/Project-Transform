define(['component'],
    function (component) {

        function aInputThumbBottom(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup=' + this.group + '] .a-input-thumbbottom input');
            this.hiddenelement = null;
            this.mindate = '';
            this.maxdate = '';
            this.ranges = [];
        }

        aInputThumbBottom.prototype = Object.create(component.prototype);
        aInputThumbBottom.prototype.constructor = aInputThumbBottom;

        aInputThumbBottom.prototype.init = function () {
            this.configureProperties();
            this.ranges = this.buildRanges();
            this.hideOriginalInputElement();
            this.createList();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        aInputThumbBottom.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + '_updateValue', this, false);
        }

        aInputThumbBottom.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('change', this, false);
        }

        aInputThumbBottom.prototype.handleEvent = function (event) {
            switch (event.type) {
                case this.group + '_updateValue':
                    this.updateValue(event.detail);
                    break;
                case 'change':
                    this.onChange();
                    break;
            }
        }

        aInputThumbBottom.prototype.onChange = function () {
            var broadcastDateChange = new CustomEvent(this.group + '_broadcastDateChange', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(broadcastDateChange);
        }

        aInputThumbBottom.prototype.buildRanges = function () {
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

        aInputThumbBottom.prototype.hideOriginalInputElement = function () {
            this.element.type = 'hidden';
            this.hiddenelement = this.element;
        }

        aInputThumbBottom.prototype.createList = function () {
            var newelement = document.createElement('SELECT');
            var datelist = '';

            for (var i = 0; i < this.ranges.length; i++) {
                datelist += '<option value="' + this.ranges[i].endpoint + '">' + this.ranges[i].dayname + '</option>';
            }
            newelement.innerHTML = datelist;

            this.element = this.element.parentNode.insertBefore(newelement, this.element);
        }

        aInputThumbBottom.prototype.validation = function (props) {
            this.min(props.min);
            this.max(props.max);
        }

        aInputThumbBottom.prototype.min = function (prop) {
            this.mindate = prop;
        }

        aInputThumbBottom.prototype.max = function (prop) {
            this.maxdate = prop;
        }

        aInputThumbBottom.prototype.updateValue = function (eventDetail) {
            var selectedDate = new Date(eventDetail.dateelement.value);
            this.element.value = selectedDate.toDateString();
        }

        return aInputThumbBottom;

    });