define(['o-question'],
    function (oQuestion) {

        /**
         * Organism: Date Slider
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oQuestionDateTimeRecent(id, group) {
            oQuestion.call(this, id, group);

            this.container = document.querySelector('div.o-question-response[data-questiongroup="' + this.group + '"]')
            this.element = this.container.querySelector('input[data-questionid="' + this.id + '"]');
            this.wrapper = this.container.querySelector('div[class^="m-slider-horizontal"]');
            this.organism = this.container.querySelector('div[class*="-slider"]');
            this.hiddenelement = null;
            this.dateelement = null;
            this.clickablearea = null;
            this.date = '';
            this.mindate = '';
            this.maxdate = '';
            this.ranges = [];
            this.currentRange = 0;
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
            this.value = 0;
            this.range = 0;
            this.floodtovaluecolor = getComputedStyle(document.documentElement).getPropertyValue('--track-background-fill');
            this.isRTL = document.dir === 'rtl';
        }

        oQuestionDateTimeRecent.prototype = Object.create(oQuestion.prototype);
        oQuestionDateTimeRecent.prototype.constructor = oQuestionDateTimeRecent;

        oQuestionDateTimeRecent.prototype.init = function () {
            oQuestion.prototype.init.call(this);

            this.ranges = this.buildRanges();
            this.hideOriginalInputElement();
            this.createTimeRangeElement();
            this.createDateElement();
            this.storeInitialValue();
            this.configureIncomingEventListeners();
            this.createClickableArea();
            this.setThumbVisibility();
            this.buildMarks();
            this.buildTickLabels();
            this.updateFloodFill();
            this.configurationComplete();
        }

        oQuestionDateTimeRecent.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener('input', this, false);
            document.addEventListener('change', this, false);
            document.addEventListener('clearEntries', this, false);
            document.addEventListener('restoreEntries', this, false);
            document.addEventListener('click', this, false);
            document.addEventListener('broadcastChange', this, false);
            document.addEventListener(this.group + '_requestValue', this, false);
            document.addEventListener(this.group + '_broadcastTimeChange', this, false);
            document.addEventListener(this.group + '_broadcastDateChange', this, false);
            document.addEventListener(this.group + '_enableExclusive', this, false);
            document.addEventListener(this.group + '_dismissExclusive', this, false);
            document.addEventListener(this.group + '_incrementValue', this, false);
            document.addEventListener(this.group + '_decrementValue', this, false);
        }

        oQuestionDateTimeRecent.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'clearEntries':
                    this.clearEntriesFromExternal(event);
                    break;
                case 'restoreEntries':
                    this.restoreEntries(event);
                    break;
                case 'click':
                case 'change':
                    this.onInput(event);
                    break;
                case this.group + '_enableExclusive':
                    this.onEnableExclusive(event);
                    break;
                case this.group + '_dismissExclusive':
                    this.onDismissExclusive(event);
                    break;
                case this.group + '_incrementValue':
                    this.incrementValue();
                    break;
                case this.group + '_decrementValue':
                    this.decrementValue();
                    break;
                case 'broadcastChange':
                    this.processVisibilityRulesFromExternalTrigger(event);
                    break;
                case this.group + '_broadcastTimeChange':
                    this.receiveTimeChange(event);
                    break;
                case this.group + '_broadcastDateChange':
                    this.receiveDateChange(event);
                    break;
                case this.group + '_requestValue':
                    this.updateValue();
                    break;
            }
        }

        oQuestionDateTimeRecent.prototype.buildRanges = function () {
            var dateArray = [];
            var maxDate = new Date(this.maxdate);
            var minDate = new Date(this.mindate);
            var dateObject = {};

            if (maxDate.toDateString() === minDate.toDateString()) {
                dateObject.minutes = this.dateToMinutes(maxDate) - this.dateToMinutes(minDate);
                dateObject.endpoint = maxDate;
                dateArray.push(dateObject);
                return dateArray;
            }

            while (maxDate >= minDate) {
                dateObject = {};
                var dateStart = new Date(maxDate.toDateString());

                if (dateStart < minDate) {
                    var lowbound = this.dateToMinutes(minDate);
                    minDate.setHours(23, 59);
                    var ubound = this.dateToMinutes(minDate);
                    dateObject.minutes = (ubound-lowbound);
                    dateObject.endpoint = minDate;
                    dateArray.push(dateObject);
                    break;
                }

                dateObject.minutes = this.dateToMinutes(maxDate);
                dateObject.endpoint = maxDate;
                dateArray.push(dateObject);

                var nextDate = maxDate.addDays(-1);
                nextDate.setHours(23, 59);
                maxDate = nextDate;
            }

            return dateArray;
        }

        oQuestionDateTimeRecent.prototype.hideOriginalInputElement = function () {
            this.element.type = 'hidden';
            this.hiddenelement = this.element;
        }

        oQuestionDateTimeRecent.prototype.createTimeRangeElement = function () {
            var newelement = this.element.cloneNode();
            newelement.value = '';
            newelement.type = 'range';
            newelement.name = '';
            newelement.max = 0;
            newelement.min = 0 - this.ranges[this.currentRange].minutes;
            newelement.id = '';
            this.element = this.wrapper.insertBefore(newelement, this.element);
        }

        oQuestionDateTimeRecent.prototype.createDateElement = function () {
            var newelement = document.createElement('INPUT');
            newelement.type = 'text';
            newelement.style.display = 'none';
            newelement.min = this.ranges[this.currentRange].endpoint;
            newelement.max = this.ranges[this.currentRange].endpoint;
            newelement.defaultValue = this.ranges[this.currentRange].endpoint;
            this.dateelement = this.wrapper.insertBefore(newelement, this.element);
        }

        oQuestionDateTimeRecent.prototype.storeInitialValue = function () {
            if (typeof this.hiddenelement.value === 'undefined' || this.hiddenelement.value.length === 0) {
                return;
            }

            this.initialValue = this.hiddenelement.getAttribute('value');
            var initialDate = new Date(this.initialValue);
            var minutesToInitialDate = this.dateToMinutes(initialDate);
            var minutesToEndpoint = this.dateToMinutes(new Date(this.ranges[this.currentRange].endpoint));
            var initialTime = initialDate.getHours() + ":" + initialDate.getMinutes();
            this.element.value = 0 - (minutesToEndpoint - minutesToInitialDate);

            this.processDateChange(initialDate);
            this.processTimeChange(initialTime);
        }

        oQuestionDateTimeRecent.prototype.setHiddenValue = function (valuestring) {
            this.hiddenelement.value = valuestring;
        }

        oQuestionDateTimeRecent.prototype.clearEntries = function () {
            // do not clear items that are still initialising
            if (this.isInitialising) {
                return;
            }

            this.element.value = '';
            this.setHiddenValue('');
            this.value = 0;
            this.updateValue();
            this.organism.classList.remove('has-value');
            this.organism.classList.remove('active');
            this.updateFloodFill();
            this.broadcastChange();
        }

        oQuestionDateTimeRecent.prototype.restoreEntries = function (event) {
            if (event.detail.questionName !== this.questionName || !this.restoreValues || this.initialValue === null) {
                return;
            }

            this.element.value = this.initialValue;
            this.value = this.initialValue;
            this.updateValue();
            this.organism.classList.add('has-value');
            this.organism.classList.add('active');
            this.updateFloodFill();
            this.broadcastChange();
        }

        // Format date as YYYY-MM-DD
        oQuestionDateTimeRecent.prototype.dateToISOLocal = function (date) {
            var localDate = new Date(date - date.getTimezoneOffset() * 60000);
            return localDate.toISOString().slice(0, -1);
        }

        oQuestionDateTimeRecent.prototype.dateToMinutes = function (date) {
            // hours are worth 60 minutes
            return (+date.getHours()) * 60 + (+date.getMinutes());
        }

        // Convert range slider value to date string
        oQuestionDateTimeRecent.prototype.rangeToDate = function () {
            var newDate = new Date(this.dateelement.defaultValue);
            newDate.setMinutes(newDate.getMinutes() + Number(this.element.value));
            this.dateelement.value = this.dateToISOLocal(newDate);
        }

        oQuestionDateTimeRecent.prototype.setThumbVisibility = function () {
            if (this.element.getAttribute('value').length) {
                this.organism.classList.add('active');
                this.organism.classList.add('has-value');
                this.updateFloodFill();
            }
        }

        oQuestionDateTimeRecent.prototype.validation = function (props) {
            this.min(props.min);
            this.max(props.max);
        }

        oQuestionDateTimeRecent.prototype.min = function (prop) {
            this.mindate = prop;
        }

        oQuestionDateTimeRecent.prototype.max = function (prop) {
            this.maxdate = prop;
        }

        oQuestionDateTimeRecent.prototype.receiveTimeChange = function (eventDetail) {
            var time = eventDetail.detail.element.value;
            this.processTimeChange(time);
        }

        oQuestionDateTimeRecent.prototype.processTimeChange = function (time) {
            // convert time into minutes
            var date = new Date(this.dateelement.value);
            time = time.split(':');
            var hours = parseInt(time[0]);
            var minutes = parseInt(time[1]);
            date.setHours(hours);
            date.setMinutes(minutes);
            var diffMinutes = 0 - (this.dateToMinutes(new Date(this.dateelement.max)) - this.dateToMinutes(date));
            // check whether minutes are within the range
            if (diffMinutes >= this.element.min && diffMinutes <= this.element.max) {
                this.element.value = diffMinutes;
                this.onInput(true);
            } else {
                console.log('We cannot set the value.');
            }
        }

        oQuestionDateTimeRecent.prototype.receiveDateChange = function (eventDetail) {
            var date = new Date(eventDetail.detail.element.value);
            this.processDateChange(date);
        }

        oQuestionDateTimeRecent.prototype.processDateChange = function (date) {
            // get the time currently set on the element
            var currentDate = new Date(this.dateelement.value);

            for (var i = 0; i < this.ranges.length; i++) {
                var rangeDate = this.ranges[i].endpoint.toDateString();
                if (rangeDate === date.toDateString()) {
                    this.currentRange = i;
                    break;
                }
            }

            this.dateelement.min = this.ranges[this.currentRange].endpoint;
            this.dateelement.max = this.ranges[this.currentRange].endpoint;
            this.dateelement.defaultValue = this.ranges[this.currentRange].endpoint;

            var convertedValue = 0 - (this.dateToMinutes(new Date(this.dateelement.max)) - this.dateToMinutes(currentDate));
            this.element.min = 0 - this.ranges[this.currentRange].minutes;

            if (convertedValue >= this.element.min && convertedValue <= this.element.max) {
                this.element.value = convertedValue;
            }

            this.buildMarks();
            this.buildTickLabels();
            this.onInput(true);
        }

        oQuestionDateTimeRecent.prototype.updateFloodFill = function () {
            var min = this.element.min ? parseInt(this.element.min) : 0;
            var max = this.element.max ? parseInt(this.element.max) : 100;
            var val = Number(this.element.value);
            var orientation = (this.container.classList.contains('o-question-slider-date-vertical') ? 'vertical' : 'horizontal');

            var percentage = (Math.abs(val - min) / Math.abs(max - min)) * 100;
            var paddingadjustmentinpixels = (orientation === 'horizontal') ? 20 : 16;
            var adjustmentcalc = paddingadjustmentinpixels - (2 * paddingadjustmentinpixels) * (percentage / 100);
            var percentagefill = 'calc(' + percentage + '% + ' + adjustmentcalc + 'px)';

            this.element.style.setProperty('--track-background-fill',
                'linear-gradient(to right, ' + this.floodtovaluecolor + ' 0%, ' + this.floodtovaluecolor + ' ' + percentagefill + ', transparent ' + percentagefill + ', transparent 100%)');

            if (this.isRTL) {
                this.element.style.setProperty('--track-background-fill',
                    'linear-gradient(to left, ' + this.floodtovaluecolor + ' 0%, ' + this.floodtovaluecolor + ' ' + percentagefill + ', transparent ' + percentagefill + ', transparent 100%)');
            }
        }

        oQuestionDateTimeRecent.prototype.createClickableArea = function () {
            var clickableElement = document.createElement('div');
            clickableElement.className = 'a-style-sliderclickablearea';
            clickableElement.onclick = function () {
            };
            this.clickablearea = this.wrapper.insertBefore(clickableElement, this.element);
        }

        oQuestionDateTimeRecent.prototype.show = function (props) {
            if (props.terminators === true) {
                this.showTerminators();
            }
        }

        oQuestionDateTimeRecent.prototype.buildMarks = function () {
            if (!this.properties.show || !this.properties.show.marks) {
                return;
            }

            var marksElement = document.querySelector('div[data-questiongroup="' + this.group + '"] div.m-style-slidermarks');
            marksElement.innerHTML = '';

            var min = this.element.min ? parseInt(this.element.min) : (0 - 1440);
            var max = this.element.max ? parseInt(this.element.max) : 0;

            if (parseInt(this.properties.ticklabels) === this.properties.ticklabels) {
                this.buildMarksInMinutes(marksElement, min, max, this.properties.ticklabels);
            } else {
                this.buildMarksAsPercent(marksElement, min, max, this.properties.ticklabels);
            }
        }

        oQuestionDateTimeRecent.prototype.buildMarksInMinutes = function (marksElement, min, max, step) {
            step = isNaN(parseInt(step)) ? 60 : parseInt(step);

            // check whether requested tick label range works with available times
            var check = min / step;

            if (parseInt(check) !== check) {
                step = Math.round(min / Math.round(check));
            }

            if (step === 0) {
                step = Math.floor(((max - min) / 100) * 10);
            }

            step = Math.max(step, 1);

            for (var i = min; i < max; i = i + step) {
                marksElement.innerHTML = marksElement.innerHTML + '<i>|</i>';
            }

            marksElement.innerHTML = marksElement.innerHTML + '<i>|</i>';
        }

        oQuestionDateTimeRecent.prototype.buildMarksAsPercent = function (marksElement, min, max, step) {
            step = isNaN(parseFloat(step)) ? 60 : parseFloat(step);

            if (step === 0) {
                step = 25;
            }

            step = (Math.abs(min) / 100) * step;
            step = Math.round(step);
            step = Math.max(step, 1);

            for (var i = min; i < max; i = i + step) {
                marksElement.innerHTML = marksElement.innerHTML + '<i>|</i>';
            }

            marksElement.innerHTML = marksElement.innerHTML + '<i>|</i>';
        }

        oQuestionDateTimeRecent.prototype.buildTickLabels = function () {
            if (!this.properties.ticklabels) {
                return;
            }

            // add a class to the parent which adds additional space for the thumb
            this.organism.classList.add('has-tick-labels');

            var labelsElement = document.querySelector('div[data-questiongroup="' + this.group + '"] div.m-label-ticklabels');
            labelsElement.innerHTML = '';

            var min = this.element.min ? parseInt(this.element.min) : (0 - 1440);
            var max = this.element.max ? parseInt(this.element.max) : 0;

            if (parseInt(this.properties.ticklabels) === this.properties.ticklabels) {
                this.buildTickLabelsInMinutes(labelsElement, min, max, this.properties.ticklabels);
            } else {
                this.buildTickLabelsAsPercent(labelsElement, min, max, this.properties.ticklabels);
            }
        }

        oQuestionDateTimeRecent.prototype.buildTickLabelsInMinutes = function (labelsElement, min, max, step) {
            step = isNaN(parseInt(step)) ? 60 : parseInt(step);

            // check whether requested tick label range works with available times
            var check = min / step;

            if (parseInt(check) !== check) {
                step = Math.round(min / Math.round(check));
            }

            var newDate = new Date();
            var hours = '';
            var minutes = '';
            var timelabel = '';

            if (step === 0) {
                step = Math.floor(((max - min) / 100) * 10);
            }

            step = Math.max(step, 1);

            for (var i = min; i < max; i = i + step) {
                newDate = new Date(this.ranges[this.currentRange].endpoint);
                newDate.setMinutes(newDate.getMinutes() + Number(i));
                hours = '0' + newDate.getHours();
                minutes = '0' + newDate.getMinutes();
                timelabel = hours.slice(-2) + ':' + minutes.slice(-2);
                labelsElement.innerHTML = labelsElement.innerHTML + '<span>' + timelabel + '</span>';
            }

            newDate = new Date(this.ranges[this.currentRange].endpoint);
            hours = '0' + newDate.getHours();
            minutes = '0' + newDate.getMinutes();
            timelabel = hours.slice(-2) + ':' + minutes.slice(-2);
            labelsElement.innerHTML = labelsElement.innerHTML + '<span>' + timelabel + '</span>';
        }

        oQuestionDateTimeRecent.prototype.buildTickLabelsAsPercent = function (labelsElement, min, max, step) {
            step = isNaN(parseFloat(step)) ? 25 : parseFloat(step);

            var newDate = new Date();
            var hours = '';
            var minutes = '';
            var timelabel = '';

            if (step === 0) {
                step = 25
            }

            step = (Math.abs(min) / 100) * step;
            step = Math.round(step);
            step = Math.max(step, 1);

            for (var i = min; i < max; i = i + step) {
                newDate = new Date(this.ranges[this.currentRange].endpoint);
                newDate.setMinutes(newDate.getMinutes() + Number(i));
                hours = '0' + newDate.getHours();
                minutes = '0' + newDate.getMinutes();
                timelabel = hours.slice(-2) + ':' + minutes.slice(-2);
                labelsElement.innerHTML = labelsElement.innerHTML + '<span>' + timelabel + '</span>';
            }

            newDate = new Date(this.ranges[this.currentRange].endpoint);
            hours = '0' + newDate.getHours();
            minutes = '0' + newDate.getMinutes();
            timelabel = hours.slice(-2) + ':' + minutes.slice(-2);
            labelsElement.innerHTML = labelsElement.innerHTML + '<span>' + timelabel + '</span>';
        }

        oQuestionDateTimeRecent.prototype.showValue = function () {
            this.organism.classList.add('has-thumb-value');
        }

        oQuestionDateTimeRecent.prototype.updateValue = function () {
            var updateEvent = new CustomEvent(this.group + '_updateValue', {bubbles: true, detail: this});
            this.element.dispatchEvent(updateEvent);
            this.broadcastChange();
        }

        oQuestionDateTimeRecent.prototype.showTerminators = function () {
            this.organism.classList.add('has-terminators');
        }

        oQuestionDateTimeRecent.prototype.floodtovalue = function (val) {
            if (val === true) {
                this.element.classList.add('flood-to-value');
            }
        }

        oQuestionDateTimeRecent.prototype.step = function (prop) {
            this.element.step = prop;
        }

        oQuestionDateTimeRecent.prototype.labels = function (props) {
            if (props.pre) {
                var preElement = document.createElement('span');
                preElement.className = 'a-label-outer-prelabel';
                var preContent = document.createTextNode(props.pre);
                preElement.appendChild(preContent);

                this.organism.classList.add('has-pre-label');
                this.organism.insertBefore(preElement, this.organism.firstChild);
            }

            if (props.post) {
                var postElement = document.createElement('span');
                postElement.className = 'a-label-outer-postlabel';
                var postContent = document.createTextNode(props.post);
                postElement.appendChild(postContent);

                this.organism.classList.add('has-post-label');
                this.organism.appendChild(postElement);
            }
        }

        oQuestionDateTimeRecent.prototype.thumb = function (props) {
            if (props.image) {
                this.setThumbImage(props.image);
            }

            if (props.width) {
                this.setThumbWidth(props.width);
            }

            if (props.height) {
                this.setThumbHeight(props.height);
            }
        }

        oQuestionDateTimeRecent.prototype.setThumbImage = function (prop) {
            this.element.style.setProperty('--track-thumb-image', 'url(' + prop + ')');
        }

        oQuestionDateTimeRecent.prototype.setThumbWidth = function (prop) {
            this.element.style.setProperty('--track-thumb-width', prop + 'px');
        }

        oQuestionDateTimeRecent.prototype.setThumbHeight = function (prop) {
            this.element.style.setProperty('--track-thumb-height', prop + 'px');
        }

        oQuestionDateTimeRecent.prototype.onInput = function (event) {

            if (event.target === this.element || event.target === this.clickablearea || event === true) {
                var thumbimage = getComputedStyle(this.element).getPropertyValue('--track-thumb-image');
                thumbimage = thumbimage.replace('-readonly', '');
                this.element.style.setProperty('--track-thumb-image', thumbimage);

                this.organism.classList.add('has-value');
                this.rangeToDate();
                this.setHiddenValue(this.dateelement.value);

                // handle self-generated events
                var clickedEvent = new CustomEvent(this.group + '_textFocus', {bubbles: true, detail: this});
                this.element.dispatchEvent(clickedEvent);

                this.element.disabled = false;
                this.organism.classList.remove('inactive');
                this.organism.classList.add('active');

                if (this.isExclusive) {
                    var enableExclusive = new CustomEvent(this.group + '_enableExclusive', {
                        bubbles: true,
                        detail: this
                    });
                    this.element.dispatchEvent(enableExclusive);
                }

                this.updateFloodFill();
                this.updateValue();
            }

        }

        oQuestionDateTimeRecent.prototype.incrementValue = function () {
            var currentValue = parseInt(this.element.value);
            var max = this.element.max ? parseInt(this.element.max) : 100;

            if (currentValue < max) {
                this.element.value++;
            }

            this.onInput(true);
        }

        oQuestionDateTimeRecent.prototype.decrementValue = function () {
            var currentValue = parseInt(this.element.value);
            var min = this.element.min ? parseInt(this.element.min) : 0;

            if (currentValue > min) {
                this.element.value--;
            }

            this.onInput(true);
        }

        oQuestionDateTimeRecent.prototype.onEnableExclusive = function () {
            this.organism.classList.remove('active');
            this.organism.classList.add('inactive');
            this.value = this.element.value;
            this.setHiddenValue('');
            this.element.disabled = true;
            var thumbimage = getComputedStyle(this.element).getPropertyValue('--track-thumb-image');
            thumbimage = thumbimage.replace('.svg', '-readonly.svg')
            this.element.style.setProperty('--track-thumb-image', thumbimage);
        }

        oQuestionDateTimeRecent.prototype.onDismissExclusive = function () {
            this.organism.classList.remove('inactive');
            this.organism.classList.add('active');
            this.element.disabled = false;
            this.element.value = this.value;
            this.setHiddenValue(this.value);
            var thumbimage = getComputedStyle(this.element).getPropertyValue('--track-thumb-image');
            thumbimage = thumbimage.replace('-readonly', '');
            this.element.style.setProperty('--track-thumb-image', thumbimage);
        }

        return oQuestionDateTimeRecent;

    });