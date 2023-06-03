define(['component', 'ua-parser.min'],
    function (component, uaparser) {

        /**
         * Atom: Hidden item for gathering/storing data
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function aInputReadWriteEdit(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('input[data-questionid="' + this.id + '"]');
            this.storagedestination = '';
            this.storagename = '';
            this.parser = uaparser();

        }

        aInputReadWriteEdit.prototype = Object.create(component.prototype);
        aInputReadWriteEdit.prototype.constructor = aInputReadWriteEdit;

        aInputReadWriteEdit.prototype.init = function () {
            this.hideQuestion();
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.writeInitialValue();
            this.configurationComplete();
        }

        aInputReadWriteEdit.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            // these are for testing purposes - as hidden items it is not envisaged that data will change
            document.addEventListener("change", this, false);
            document.addEventListener("keyup", this, false);
        }

        aInputReadWriteEdit.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "keyup":
                case "change":
                    this.onChange(event);
                    break;
            }
        }

        aInputReadWriteEdit.prototype.hideQuestion = function () {
            var container = this.element.closest('div.o-question-container');
            container.style.display = 'none';
        }

        aInputReadWriteEdit.prototype.write = function (props) {
            this.storagedestination = props.destination;
            this.storagename = props.name;
        }

        aInputReadWriteEdit.prototype.read = function (props) {
            switch (props.source) {
                case 'UserAgent':
                    this.element.value = this.readFromUserAgent(props.value);
                    break;
                case 'LocalStorage':
                    this.element.value = this.readFromLocalStorage(props.value);
                    break;
            }
        }

        aInputReadWriteEdit.prototype.writeInitialValue = function () {
            this.onChange();
        }

        aInputReadWriteEdit.prototype.onChange = function () {
            if (!this.storagedestination.length) {
                return;
            }

            switch (this.storagedestination) {
                case 'LocalStorage':
                    this.writeToLocalStorage();
                    break;
                default:
                    this.debug('An attempt was made to write to an unsupported location', 2);
                    break;
            }
        }

        aInputReadWriteEdit.prototype.readFromUserAgent = function (value) {
            var returnValue = '';

            switch (value) {
                case 'Browser':
                    returnValue = this.detectBrowser();
                    break;
                case 'BrowserVersion':
                    returnValue = this.detectBrowserVersion();
                    break;
                case 'OperatingSystem':
                    returnValue = this.detectOS();
                    break;
                case 'OperatingSystemVersion':
                    returnValue = this.detectOSVersion();
                    break;
                case 'Display':
                    returnValue = this.detectDisplay();
                    break;
                default:
                    this.debug('A request was made for an unknown user agent item', 2);
            }

            return returnValue;
        }

        aInputReadWriteEdit.prototype.readFromLocalStorage = function (value) {
            return localStorage.getItem(value);
        }

        aInputReadWriteEdit.prototype.writeToLocalStorage = function () {
            localStorage.setItem(this.storagename, this.element.value);
        }

        aInputReadWriteEdit.prototype.detectBrowser = function () {
            return this.parser.browser.name;
        }

        aInputReadWriteEdit.prototype.detectBrowserVersion = function () {
            return this.parser.browser.version;
        }

        aInputReadWriteEdit.prototype.detectOS = function () {
            return this.parser.os.name;
        }

        aInputReadWriteEdit.prototype.detectOSVersion = function () {
            return this.parser.os.version;
        }

        aInputReadWriteEdit.prototype.detectDisplay = function () {
            return screen.width + 'x' + screen.height;
        }

        return aInputReadWriteEdit;

    });