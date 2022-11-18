/*
  functionality:


  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Atom: aInputReadWriteEdit
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

            this.hideQuestion();
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.writeInitialValue();
            this.configurationComplete();
        }

        aInputReadWriteEdit.prototype = Object.create(component.prototype);
        aInputReadWriteEdit.prototype.constructor = aInputReadWriteEdit;

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
            // Opera 8.0+
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

            // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';

            // Safari 3.0+ "[object HTMLElementConstructor]"
            var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
                return p.toString() === "[object SafariRemoteNotification]";
            })(!window['safari'] || (typeof safari !== 'undefined' || window['safari'].pushNotification));

            var isSafariMobile = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/false || !!document.documentMode;

            // Edge 20+
            var isEdge = !isIE && !!window.StyleMedia;

            // Chrome 1 - 79
            var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

            // Edge (based on chromium) detection
            var isEdgeChromium = (navigator.userAgent.indexOf("Edg") !== -1);

            var browser = 'Unrecognised';

            if (isOpera) {
                browser = 'Opera';
            }
            if (isFirefox) {
                browser = 'Firefox';
            }
            if (isChrome) {
                browser = 'Chrome';
            }
            if (isSafari || isSafariMobile) {
                browser = 'Safari';
            }
            if (isIE) {
                browser = 'IE';
            }
            if (isEdge) {
                browser = 'Edge';
            }
            if (isEdgeChromium) {
                browser = 'Edge Chromium';
            }

            return browser;
        }

        aInputReadWriteEdit.prototype.detectBrowserVersion = function () {
            return '';
        }

        aInputReadWriteEdit.prototype.detectOS = function () {
            var userAgent = window.navigator.userAgent;
            var platform = window.navigator.platform;
            var macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
            var windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
            var iosPlatforms = ['iPhone', 'iPad', 'iPod'];
            var os = null;

            if (macosPlatforms.indexOf(platform) !== -1) {
                os = 'Mac OS';
            } else if (iosPlatforms.indexOf(platform) !== -1) {
                os = 'iOS';
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
                os = 'Windows';
            } else if (/Android/.test(userAgent)) {
                os = 'Android';
            } else if (/Linux/.test(platform)) {
                os = 'Linux';
            }

            return os;
        }

        aInputReadWriteEdit.prototype.detectOSVersion = function () {
            return '';
        }

        aInputReadWriteEdit.prototype.detectDisplay = function () {
            return screen.width + 'x' + screen.height;
        }

        return aInputReadWriteEdit;

    });