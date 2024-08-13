define(['component'],
    function (component) {

        function oQuestionMedia(id, group) {
            component.call(this, id, group);

            this.container = document.querySelector('div.o-question-response[data-questiongroup="' + this.group + '"]')
            this.wrapper = this.container.querySelector('.o-question-media-external-wrapper');
            this.errorcontainer = this.container.querySelector('.o-label-message-error.external-warning');
            this.element = this.container.querySelector('input[type=button]');
            this.hiddenelement = document.querySelector('input#' + this.id);
        }

        oQuestionMedia.prototype = Object.create(component.prototype);
        oQuestionMedia.prototype.constructor = oQuestionMedia;

        oQuestionMedia.prototype.init = function () {
            this.configureProperties();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.requestInitialSize();
            this.configurationComplete();
        }

        oQuestionMedia.prototype.configureIncomingEventListeners = function () {
        }

        oQuestionMedia.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener("click", this, false);
        }

        oQuestionMedia.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "click":
                    this.onClick();
                    break;
            }
        }

        oQuestionMedia.prototype.onClick = async function () {
            this.errorcontainer.innerHTML = '';
            try {
                const data = await window.theDiary.scanBarcode("us_alcohol_consumption", true);
                const {barcode, file, meta, product} = data;
                this.hiddenelement.value = JSON.stringify(data);
                this.displayData(data);
            } catch (error) {
                this.errorcontainer.innerHTML = error.message;
            }
        }

        oQuestionMedia.prototype.displayData = function (data) {
            const barcodeinput = document.getElementById('_Q1');
            const descriptioninput = document.getElementById('_Q2');
            const productinput = document.getElementById('_Q3');
            barcodeinput.value = descriptioninput.value = '';
            barcodeinput.value = data.barcode ?? '';
            descriptioninput.value = data.product.description ?? '';
            productinput.value = data.product.category ?? '';
        }

        return oQuestionMedia;

    });