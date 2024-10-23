define(['component'],
    function (component) {

        function oQuestionMedia(id, group) {
            component.call(this, id, group);

            this.container = document.querySelector('div.o-question-response[data-questiongroup="' + this.group + '"]')
            this.wrapper = this.container.querySelector('.o-question-media-external-wrapper');
            this.messagecontainer = this.container.querySelector('.o-label-message');
            this.trigger = this.container.querySelector('input[type=button]');
            this.element = document.querySelector('input#' + this.id);
            this.api = 'barcode';
        }

        oQuestionMedia.prototype = Object.create(component.prototype);
        oQuestionMedia.prototype.constructor = oQuestionMedia;

        oQuestionMedia.prototype.init = function () {
            this.configureProperties();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        oQuestionMedia.prototype.configureLocalEventListeners = function () {
            this.trigger.addEventListener("click", this, false);
        }

        oQuestionMedia.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick();
                    break;
            }
        }

        oQuestionMedia.prototype.onClick = async function () {
            switch (this.api) {
                case 'barcode':
                    this.callBarcodeScan();
                    break;
                case 'picture':
                    this.callPictureCapture();
                    break;
            }

        }

        oQuestionMedia.prototype.callBarcodeScan = async function () {
            try {
                const data = await window.theDiary.scanBarcode("us_alcohol_consumption", true);
                this.clearMessage();
                this.setBarcodeData(data);
            } catch (error) {
                this.setMessage(error.message);
            }
        }

        oQuestionMedia.prototype.callPictureCapture = async function () {
            try {
                const data = await window.theDiary.takePicture(true);
                this.clearMessage();
                this.setPictureData(data);
                this.displayImage(data);
            } catch (error) {
                this.setMessage(error.message);
            }
        }

        oQuestionMedia.prototype.action = function (prop) {
            this.api = prop;
        }

        oQuestionMedia.prototype.captions = function (props) {
            if (typeof props.start === 'undefined') {
                return;
            }

            if (typeof props.start.icon !== "undefined") {
                this.setButtonImage(props.start.icon);
            }

            if (typeof props.start.text !== 'undefined') {
                this.setButtonText(props.start.text);
            }
        }

        oQuestionMedia.prototype.setButtonText = function (text) {
            if (!text.length) {
                return;
            }

            this.trigger.value = text;
            this.trigger.style.width = 'auto';
        }

        oQuestionMedia.prototype.setButtonImage = function (props) {
            this.trigger.classList.add('a-button-image');
            this.trigger.style.background = 'url("' + props.source + '") center';
            this.trigger.style.width = props.width;
            this.trigger.style.height = props.height;
        }

        oQuestionMedia.prototype.setBarcodeData = function (data) {
            if (isEmpty(data.product)) {
                this.clearValue();
                return;
            }

            this.element.value = JSON.stringify(data.product);
            this.broadcastChange();
        }

        oQuestionMedia.prototype.setPictureData = function (data) {
            this.element.value = JSON.stringify(data);
            this.broadcastChange();
        }

        oQuestionMedia.prototype.displayImage = function (data) {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(data.file);
            this.frame.style.background = "center / cover url('"+ imageUrl + "')";
        }

        oQuestionMedia.prototype.clearValue = function () {
            this.element.value = '';
            this.broadcastChange();
        }

        oQuestionMedia.prototype.setMessage = function (message) {
            if (this.properties.captions[message]) {
                this.messagecontainer.innerHTML = this.properties.captions[message].text;
            } else {
                this.messagecontainer.innerHTML = message;
            }
        }

        oQuestionMedia.prototype.clearMessage = function () {
            this.messagecontainer.innerHTML = '';
        }

        return oQuestionMedia;

    });