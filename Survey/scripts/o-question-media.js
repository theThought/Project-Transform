define(['component'],
    function (component) {

        function oQuestionMedia(id, group) {
            component.call(this, id, group);

            this.container = document.querySelector('div.o-question-response[data-questiongroup="' + this.group + '"]')
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
            try {
                const input = document.getElementById('_Q1');
                const data = await window.theDiary.scanBarcode("us_alcohol_consumption", true);
                const {barcode, file, meta, product} = data;
                this.hiddenelement.value = data;
                console.log(data);
            } catch (error) {
                alert(error.message)
            }
        }

        return oQuestionMedia;

    });