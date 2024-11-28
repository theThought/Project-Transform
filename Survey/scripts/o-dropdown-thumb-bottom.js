define(['component'],
    function (component) {

        function oDropdownThumbBottom(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup=' + this.group + '] .o-dropdown-thumbbottom input');
            this.hiddenelement = null;
            this.mindate = '';
            this.maxdate = '';
            this.ranges = [];
        }

        oDropdownThumbBottom.prototype = Object.create(component.prototype);
        oDropdownThumbBottom.prototype.constructor = oDropdownThumbBottom;

        oDropdownThumbBottom.prototype.init = function () {
            this.configureProperties();
            this.ranges = this.buildRanges();
            this.hideOriginalInputElement();
            this.createDateList();
            this.setValue(this.hiddenelement.value);
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        oDropdownThumbBottom.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + '_updateValue', this.handleEvent.bind(this), false);
        }

        oDropdownThumbBottom.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('change', this.handleEvent.bind(this), false);
        }

        oDropdownThumbBottom.prototype.handleEvent = function (event) {
            switch (event.type) {
                case this.group + '_updateValue':
                    this.setValue(event.detail.dateelement.value);
                    break;
                case 'change':
                    this.onChange();
                    break;
            }
        }

        oDropdownThumbBottom.prototype.buildRanges = function () {
            var dateArray = [];
            var maxDate = new Date(this.maxdate);
            maxDate = new Date(maxDate.toDateString());
            var minDate = new Date(this.mindate);
            minDate = new Date(minDate.toDateString());
            var dateObject = {};

            while (maxDate >= minDate) {
                dateObject = {};
                dateObject.dayname = maxDate.toLocaleDateString(navigator.language, { weekday: 'short' });
                dateObject.endpoint = maxDate.toDateString();
                dateArray.push(dateObject);
                maxDate = maxDate.addDays(-1);
            }

            return dateArray;
        }

        oDropdownThumbBottom.prototype.hideOriginalInputElement = function () {
            this.element.type = 'hidden';
            this.hiddenelement = this.element;
        }

        oDropdownThumbBottom.prototype.createDateList = function () {
            var dateselectdropdown = document.createElement('SELECT');
            dateselectdropdown.innerHTML = '';

            for (var i = 0; i < this.ranges.length; i++) {
                dateselectdropdown.innerHTML += '<option value="' + this.ranges[i].endpoint + '">' + this.ranges[i].dayname + '</option>';
            }

            this.element = this.element.parentNode.insertBefore(dateselectdropdown, this.element);
        }

        oDropdownThumbBottom.prototype.validation = function (props) {
            this.min(props.min);
            this.max(props.max);
        }

        oDropdownThumbBottom.prototype.min = function (prop) {
            this.mindate = prop;
        }

        oDropdownThumbBottom.prototype.max = function (prop) {
            this.maxdate = prop;
        }

        oDropdownThumbBottom.prototype.onChange = function () {
            var broadcastDateChange = new CustomEvent(this.group + '_broadcastDateChange', {
                bubbles: true,
                detail: this
            });
            this.element.dispatchEvent(broadcastDateChange);
        }

        oDropdownThumbBottom.prototype.setValue = function (dateString) {
            if (!dateString.length) {
                return;
            }

            var selectedDate = new Date(dateString);
            this.element.value = selectedDate.toDateString();
        }

        return oDropdownThumbBottom;

    });