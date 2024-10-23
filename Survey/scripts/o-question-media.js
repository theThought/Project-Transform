define(['component'],
    function (component) {

        function oQuestionMedia(id, group) {
            component.call(this, id, group);

            this.container = document.querySelector('div.o-question-response[data-questiongroup="' + this.group + '"]')
            this.wrapper = this.container.querySelector('.o-question-media-external-wrapper');
            this.messagecontainer = this.container.querySelector('.o-buttonandmessage-message');
            this.trigger = this.container.querySelector('input[type=button]');
            this.frame = this.container.querySelector('div.o-media-frame');
            this.element = document.querySelector('input#' + this.id);
            this.api = 'barcode';
        }

        oQuestionMedia.prototype = Object.create(component.prototype);
        oQuestionMedia.prototype.constructor = oQuestionMedia;

        oQuestionMedia.prototype.init = function () {
            component.prototype.init.call(this);
            this.configureProperties();
            this.configureLocalEventListeners();
            this.createImagePlaceholder();
            this.setInitialMessage();
            this.checkForExistingMedia();
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

        oQuestionMedia.prototype.setInitialMessage = function () {
            if (typeof this.properties.messages.empty === 'undefined') {
                return;
            }

            this.setMessage('empty');
        }

        oQuestionMedia.prototype.checkForExistingMedia = async function () {
            if (this.api !== "picture" || !this.value) {
                this.hideImageLoader();
                return;
            }

            const data = JSON.parse(this.value);
            const url = data.url;

            if (typeof url !== 'string') {
                return;
            }

            try {
                this.displayImageLoader();
                const data = await window.theDiary.getPictureFromUrl(url)
                this.displayImage(data);
            } catch (error) {
                this.hideImageLoader();
                this.setMessage(error.message);
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
                this.setMessage('success');
                this.setPictureData(data);
                this.displayImage(data.file);
            } catch (error) {
                this.setMessage(error.message);
            }
        }

        oQuestionMedia.prototype.action = function (props) {
            this.api = props.type;

            this.button(props.button);
        }

        oQuestionMedia.prototype.button = function (props) {
            if (typeof props.icon !== "undefined") {
                this.setButtonImage(props.icon);
            }

            if (typeof props.caption !== "undefined") {
                this.setButtonText(props.caption);
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
            this.trigger.classList.add("a-button-image");
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

        oQuestionMedia.prototype.displayImage = function (file) {
            this.hideImageLoader();
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(file);
            this.frame.style.background = "center / cover url('"+ imageUrl + "')";
        }

        oQuestionMedia.prototype.createImagePlaceholder = function () {
            if (typeof this.properties.frame !== "undefined") {
                this.frame.style.backgroundImage = 'url("' + this.properties.frame.background.source + '")';
                this.frame.style.backgroundSize = 'cover';
                this.frame.style.backgroundPosition = 'center';
            }

            var loaderContainer = document.createElement("div");
            loaderContainer.classList.add("m-image-loader");
            this.frame.appendChild(loaderContainer);
        }

        oQuestionMedia.prototype.displayImageLoader = function () {
            this.container.querySelector(".m-image-loader").style.display = "block";
        }

        oQuestionMedia.prototype.hideImageLoader = function () {
            this.container.querySelector(".m-image-loader").style.display = "none";
        }

        oQuestionMedia.prototype.clearValue = function () {
            this.element.value = '';
            this.broadcastChange();
        }

        oQuestionMedia.prototype.setMessage = function (message) {
            if (this.properties.messages[message]) {
                this.messagecontainer.innerHTML = this.properties.messages[message];
            } else {
                this.messagecontainer.innerHTML = message;
            }
        }

        oQuestionMedia.prototype.clearMessage = function () {
            this.messagecontainer.innerHTML = '';
        }

        return oQuestionMedia;

    });