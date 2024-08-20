define(['component'],
    function (component) {

        function oQuestionMedia(id, group) {
            component.call(this, id, group);

            this.container = document.querySelector('div.o-question-response[data-questiongroup="' + this.group + '"]')
            this.wrapper = this.container.querySelector('.o-question-media-external-wrapper');
            this.errorcontainer = this.container.querySelector('.o-label-message-error.external-warning');
            this.trigger = this.container.querySelector('input[type=button]');
            this.element = document.querySelector('input#' + this.id);
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
            try {
                const data = await window.theDiary.scanBarcode("us_alcohol_consumption", true);
                this.clearError();
                this.setValue(data);
            } catch (error) {
                this.setError(error.message);
            }
        }

        oQuestionMedia.prototype.captions = function (props) {
            if (typeof props.icon === 'undefined') {
                return;
            }

            this.trigger.classList.add('a-button-image');
            this.trigger.style.background = 'url("' + props.icon.source + '") center';
            this.trigger.style.width = props.icon.width;
            this.trigger.style.height = props.icon.height;
        }

        oQuestionMedia.prototype.setValue = function (data) {
            if (typeof data.product === 'undefined') {
                this.clearValue();
                return;
            }

            this.element.value = JSON.stringify(data.product);
            this.broadcastChange();
        }

        oQuestionMedia.prototype.clearValue = function () {
            this.element.value = '';
            this.broadcastChange();
        }

        oQuestionMedia.prototype.setError = function (message) {
            this.errorcontainer.innerHTML = message;
        }

        oQuestionMedia.prototype.clearError = function () {
            this.errorcontainer.innerHTML = '';
        }

        return oQuestionMedia;

    });