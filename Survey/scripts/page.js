define(
    function () {

        function page(id, group) {
            this.id = id;
            this.group = group;
            this.element = document.querySelector('body>form');

            this.configureProperties();
            this.detectOS();
            this.detectDisplay();
            this.detectBrowser();
        }

        page.prototype.detectBrowser = function () {
            // Opera 8.0+
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
            // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';
            // Safari 3.0+ "[object HTMLElementConstructor]"
            var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
                return p.toString() === "[object SafariRemoteNotification]";
            })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
            // Edge 20+
            var isEdge = !isIE && !!window.StyleMedia;
            // Chrome 1 - 79
            var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
            // Edge (based on chromium) detection
            var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

            if (isFirefox) {
                console.info('Browser is Firefox');
            }
            if (isChrome) {
                console.info('Browser is Chrome');
            }
            if (isSafari) {
                console.info('Browser is Safari');
            }
            if (isOpera) {
                console.info('Browser is Opera');
            }
            if (isIE) {
                console.info('Browser is IE');
            }
            if (isEdge) {
                console.info('Browser is Edge');
            }
            if (isEdgeChromium) {
                console.info('Browser is EdgeChromium');
            }

            console.info('Reported user agent: ' + window.navigator.userAgent);
        }

        page.prototype.detectOS = function () {
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

            console.info('Operating system: ' + os);
        }

        page.prototype.detectDisplay = function () {
            console.info('Screen dimensions: ' + screen.width + 'x' + screen.height);
        }

        page.prototype.configureProperties = function (propertiesName) {
            propertiesName = (typeof propertiesName === 'undefined') ? app.extractQuestionName(this.group) : propertiesName;

            this.properties = app.getProperties(propertiesName);
            this.properties.registered = true;

            for (var prop in this.properties) {
                if (this.properties.hasOwnProperty(prop)
                    && typeof this[prop] === 'function') {
                    this[prop](this.properties[prop]);
                }
            }
        }

        page.prototype.sidebyside = function (width) {
            var questioninformation = this.element.getElementsByClassName('o-question-information');
            var questioninstruction = this.element.getElementsByClassName('o-question-errorandinstruction');

            for (var i = 0; i < questioninformation.length; i++) {
                questioninformation[i].style.flexBasis = width + '%';
                questioninformation[i].style.msFlex = '0 0 ' + width + '%';
            }

            for (var i = 0; i < questioninstruction.length; i++) {
                questioninstruction[i].style.maxWidth = width + '%';
            }

        }

        return page;

    });