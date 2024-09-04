define(['component'],
    function (component) {

        function aButtonBarcode(id, group) {
            component.call(this, id, group);

            this.container = document.querySelector('div.o-question-response[data-questiongroup="' + this.group + '"]')
            this.errorcontainer = this.container.querySelector('.o-label-message-error.external-warning');
            this.element = document.querySelector('input#' + this.id);
            this.noMatchTextContainer = null;
        }

        aButtonBarcode.prototype = Object.create(component.prototype);
        aButtonBarcode.prototype.constructor = aButtonBarcode;

        aButtonBarcode.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        aButtonBarcode.prototype.scan = function (props) {
            this.captions(props.captions);
        }

        aButtonBarcode.prototype.configureIncomingEventListeners = function () {
            document.addEventListener("clearExternalMessages", this, false);
        }

        aButtonBarcode.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener("click", this, false);
        }

        aButtonBarcode.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick();
                    break;
                case "clearExternalMessages":
                    this.clearMessages(event);
                    break;
            }
        }

        aButtonBarcode.prototype.onClick = async function () {
            try {
                const data = await window.theDiary.scanBarcode("us_alcohol_consumption", true);
                this.setValue(data);
            } catch (error) {
                console.warn(error.message);
            }
        }

        aButtonBarcode.prototype.clearMessages = function (event) {
            if (event.detail.group !== this.group) {
                return;
            }

            this.hideNoMatchMessage();
        }

        aButtonBarcode.prototype.captions = function (props) {
            if (typeof props.start === 'undefined') {
                return;
            }

            if (typeof props.start.icon !== "undefined") {
                this.setButtonImage(props.start.icon);
            }

            if (typeof props.start.text !== 'undefined') {
                this.setButtonText(props.start.text);
            }

            if (typeof props.empty !== 'undefined') {
                this.setEmptyText(props.empty.text);
            }

            if (typeof props.nomatch !== 'undefined') {
                this.setNoMatchText(props.nomatch.text);
            }
        }

        aButtonBarcode.prototype.setButtonImage = function (props) {
            this.element.classList.add('a-button-image');
            this.element.style.background = 'url("' + props.source + '") center';
            this.element.style.width = props.width;
            this.element.style.height = props.height;
        }

        aButtonBarcode.prototype.setButtonText = function (text) {
            if (!text.length) {
                return;
            }

            this.element.value = text;
            this.element.style.width = 'auto';
        }

        aButtonBarcode.prototype.setEmptyText = function (text) {
            var emptyTextContainer = this.container.querySelector('.a-label-message-external-empty');
            emptyTextContainer.innerHTML = this.replaceHTMLPlaceholder(text);
        }

        aButtonBarcode.prototype.setNoMatchText = function (text) {
            this.noMatchTextContainer = this.container.querySelector('.a-label-message-external-nomatch');
            this.noMatchTextContainer.classList.add('hidden');
            this.noMatchTextContainer.innerHTML = this.replaceHTMLPlaceholder(text);
        }

        aButtonBarcode.prototype.displayNoMatchMessage = function () {
            this.noMatchTextContainer.classList.remove('hidden');
        }

        aButtonBarcode.prototype.hideNoMatchMessage = function () {
            this.noMatchTextContainer.classList.add('hidden');
        }

        aButtonBarcode.prototype.setValue = function (data) {
            if (isEmpty(data.product)) {
                this.displayNoMatchMessage();
                this.element.setAttribute('data-barcode', JSON.stringify(data.barcode));
                this.broadcastBarcodeDataChange(data);
            } else {
                this.hideNoMatchMessage();
                this.element.setAttribute('data-barcode', JSON.stringify(data.product));
                this.broadcastBarcodeDataChange(data.product);
            }
        }

        aButtonBarcode.prototype.clearValue = function () {
            this.element.setAttribute('data-barcode', '');
            this.broadcastBarcodeDataChange();
        }

        aButtonBarcode.prototype.setError = function (message) {
            alert(message);
        }

        aButtonBarcode.prototype.broadcastBarcodeDataChange = function (data) {
            var broadcastChange = new CustomEvent('broadcastBarcodeDataChange', {bubbles: true, detail: data});
            this.element.dispatchEvent(broadcastChange);
        }

        return aButtonBarcode;

    });