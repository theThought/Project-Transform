define(['component'],
    function (component) {

        function aButtonBarcode(id, group) {
            component.call(this, id, group);

            this.container = document.querySelector('div.o-question-response[data-questiongroup="' + this.group + '"]')
            this.errorcontainer = this.container.querySelector('.o-label-message-error.external-warning');
            this.element = document.querySelector('input#' + this.id);
        }

        aButtonBarcode.prototype = Object.create(component.prototype);
        aButtonBarcode.prototype.constructor = aButtonBarcode;

        aButtonBarcode.prototype.init = function () {
            this.configureProperties();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        aButtonBarcode.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener("click", this, false);
        }

        aButtonBarcode.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick();
                    break;
            }
        }

        aButtonBarcode.prototype.onClick = async function () {
            try {
                const data = await window.theDiary.scanBarcode("us_alcohol_consumption", true);
                this.setValue(data);
            } catch (error) {
                this.setError(error.message);
            }
        }

        aButtonBarcode.prototype.captions = function (props) {
            if (typeof props.icon === 'undefined') {
                return;
            }

            this.element.classList.add('a-button-image');
            this.element.style.background = 'url("' + props.icon.source + '") center';
            this.element.style.width = props.icon.width;
            this.element.style.height = props.icon.height;
        }

        aButtonBarcode.prototype.setValue = function (data) {
            this.element.setAttribute('data-barcode', JSON.stringify(data.product));
            this.broadcastBarcodeDataChange(data.product);
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