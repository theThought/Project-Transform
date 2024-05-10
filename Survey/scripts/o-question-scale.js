define(['o-question'],
    function (oQuestion) {
        function oQuestionScale(id, group) {
            oQuestion.call(this, id, group);

            this.container = document.querySelector('.o-question-scale-horizontal[data-questiongroup="' + this.group + '"]');
            this.unitContainer = this.container.querySelector('.o-scale-unitcontainer');
            this.element = this.container.querySelector('input[data-questionid="' + this.id + '"]');
            this.min = 1;
            this.max = 10;
            this.step = 1;
            this.isExclusive = (this.element.getAttribute('data-exclusive') === 'true') || false;
        }

        oQuestionScale.prototype = Object.create(oQuestion.prototype);
        oQuestionScale.prototype.constructor = oQuestionScale;

        oQuestionScale.prototype.init = function () {
            this.setScaleRange();
            this.createScaleUnits();
            this.configureWidth();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configureProperties();
            this.setClasses(this.element.value);
            this.isInitialising = false;
        }

        oQuestionScale.prototype.configureIncomingEventListeners = function () {
            document.addEventListener('input', this, false);
            document.addEventListener('change', this, false);
            document.addEventListener('clearEntries', this, false);
            document.addEventListener('restoreEntries', this, false);
            document.addEventListener('broadcastChange', this, false);
            document.addEventListener(this.group + '_enableExclusive', this, false);
            document.addEventListener(this.group + '_dismissExclusive', this, false);
            document.addEventListener(this.group + '_incrementValue', this, false);
            document.addEventListener(this.group + '_decrementValue', this, false);
        }

        oQuestionScale.prototype.configureLocalEventListeners = function () {
            var self = this;

            this.unitContainer.querySelectorAll('.m-scale-unit').forEach(function (unit) {
                unit.addEventListener('click', self, false);
            });
        }

        oQuestionScale.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'clearEntries':
                    this.clearEntriesFromExternal(event);
                    break;
                case 'restoreEntries':
                    this.restoreEntries(event);
                    break;
                case 'click':
                    this.onClick(event);
                    break;
                case this.group + '_enableExclusive':
                    this.onEnableExclusive(event);
                    break;
                case this.group + '_dismissExclusive':
                    this.onDismissExclusive(event);
                    break;
                case 'broadcastChange':
                    this.processVisibilityRulesFromExternalTrigger(event);
                    break;
            }
        }

        oQuestionScale.prototype.onEnableExclusive = function (event) {
            if (event.target === this.element) {
                return;
            }

            this.placeholder = this.element.value;
            this.setValue();
        }

        oQuestionScale.prototype.onDismissExclusive = function () {
            this.setValue(this.placeholder);
        }

        oQuestionScale.prototype.onClick = function (event) {
            this.unitContainer.querySelectorAll('.m-scale-unit').forEach(function (unit) {
                unit.classList.remove('current-value');
            });
            var value = parseInt(event.target.getAttribute('data-value'));
            this.placeholder = value;
            this.setValue(value);
        }

        oQuestionScale.prototype.configureWidth = function () {
            if (this.element.style.width) {
                this.unitContainer.style.maxWidth = this.element.style.width;
            }
        }

        oQuestionScale.prototype.setScaleRange = function () {
            this.min = (this.element.min) ? parseInt(this.element.min) : this.min;
            this.max = (this.element.max) ? parseInt(this.element.max) : this.max;
            this.step = (this.element.step) ? parseInt(this.element.step) : this.step;
        }

        oQuestionScale.prototype.createScaleUnits = function () {
            for (var i = this.min; i <= this.max; i = i + this.step) {

                var scaleItem = document.createElement('div');
                var scaleLabel = document.createElement('span');
                scaleItem.classList.add('m-scale-unit');
                scaleItem.setAttribute('data-value', i);
                scaleLabel.classList.add('a-label');
                scaleLabel.setAttribute('data-value', i);
                scaleLabel.innerHTML = i;
                scaleItem.appendChild(scaleLabel);
                this.unitContainer.appendChild(scaleItem);

                if (this.element.value === i) {
                    this.setValue(i);
                }
            }
        }

        oQuestionScale.prototype.setValue = function (value) {
            if (this.element.value === value) {
                return;
            }

            this.element.value = value;
            this.setClasses(value);

            if (this.isExclusive) {
                var enableExclusive = new CustomEvent(this.group + '_enableExclusive', {
                    bubbles: true,
                    detail: this
                });
                this.element.dispatchEvent(enableExclusive);
            }

            this.broadcastChange();
        }

        oQuestionScale.prototype.setClasses = function (value) {
            value = parseInt(value);
            var self = this;

            this.unitContainer.querySelectorAll('.m-scale-unit').forEach(function (unit) {
                var currentUnitValue = parseInt(unit.getAttribute('data-value'));

                if (currentUnitValue <= value) {
                    unit.classList.add('current-value');
                    if (typeof self.properties.unit !== 'undefined') {
                        unit.style.backgroundPositionX = '-' + self.properties.unit.image.width;
                    }
                } else {
                    unit.classList.remove('current-value');
                    unit.style.backgroundPositionX = '0';
                }
            });
        }

        oQuestionScale.prototype.values = function (valuesProperties) {
            var valuesPosition = valuesProperties.position;

            if (valuesPosition === "inside") {
                this.container.classList.add('values-inside');
            }
        }

        oQuestionScale.prototype.labels = function (labelProperties) {
            var preLabel = labelProperties.pre;
            var postLabel = labelProperties.post;

            if (typeof preLabel === 'undefined' && typeof postLabel === 'undefined') {
                return;
            }

            var labelContainer = document.createElement('div');
            labelContainer.classList.add('o-label-container');

            if (this.element.style.width) {
                labelContainer.style.maxWidth = this.element.style.width;
            }

            if (preLabel.length) {
                var preElement = document.createElement('div');
                preElement.className = 'a-label-prelabel';
                var preContentText = preLabel;
                preContentText = preContentText.replace(/%lt%/g, '<');
                preContentText = preContentText.replace(/%gt%/g, '>');
                preElement.innerHTML = preContentText;

                labelContainer.append(preElement);
            }

            if (postLabel.length) {
                var postElement = document.createElement('div');
                postElement.className = 'a-label-postlabel';
                var postContentText = postLabel;
                postContentText = postContentText.replace(/%lt%/g, '<');
                postContentText = postContentText.replace(/%gt%/g, '>');
                postElement.innerHTML = postContentText;

                labelContainer.appendChild(postElement);
            }

            this.container.appendChild(labelContainer);
        }

        oQuestionScale.prototype.background = function (backgroundProperties) {
            var imageProperties = backgroundProperties.image;

            if (typeof imageProperties === 'undefined') {
                return;
            }

            var imageURL = imageProperties.url;

            if (typeof imageURL === "undefined") {
                return;
            }

            var imageWidth = (typeof imageProperties.width === 'undefined') ? '' : imageProperties.width;
            var imageHeight = (typeof imageProperties.height === 'undefined') ? '' : imageProperties.height;
            var imageOffsetX = '0';
            var imageOffsetY = '0';

            var caption = (typeof imageProperties.caption === 'undefined') ? '' : backgroundProperties.caption;

            if (typeof imageProperties.offset !== 'undefined') {
                imageOffsetX = (typeof imageProperties.offset.x === 'undefined') ? '0' : backgroundProperties.offset.x;
                imageOffsetY = (typeof imageProperties.offset.y === 'undefined') ? '0' : backgroundProperties.offset.y;
            }

            this.container.classList.add('has-container-background');

            this.container.style.height = imageHeight;
            this.container.style.width = imageWidth;
            this.container.style.backgroundImage = 'url("' + imageURL + '")';
            this.container.style.backgroundPositionX = imageOffsetX + 'px';
            this.container.style.backgroundPositionY = imageOffsetY + 'px';
            this.container.ariaLabel = caption;
        }

        oQuestionScale.prototype.unit = function (unitProperties) {
            var imageProperties = unitProperties.image;

            if (typeof imageProperties === 'undefined') {
                return;
            }

            var imageURL = imageProperties.url;
            var imageWidth = imageProperties.width;
            var imageHeight = imageProperties.height;
            var imageOffsetX = '0';
            var imageOffsetY = '0';

            var caption = (typeof imageProperties.caption === 'undefined') ? '' : unitProperties.caption;

            if (typeof imageProperties.offset !== 'undefined') {
                imageOffsetX = (typeof imageProperties.offset.x === 'undefined') ? '0' : unitProperties.offset.x;
                imageOffsetY = (typeof imageProperties.offset.y === 'undefined') ? '0' : unitProperties.offset.y;
            }

            if (typeof imageURL === "undefined") {
                return;
            }

            this.container.classList.add('has-unit-background');
            var scaleUnits = this.container.querySelectorAll('.m-scale-unit');

            scaleUnits.forEach(function (unit) {
                unit.style.left = imageOffsetX + 'px';
                unit.style.top = imageOffsetY + 'px';
                unit.style.height = imageHeight;
                unit.style.width = imageWidth;
                unit.style.backgroundImage = 'url("' + imageURL + '")';
                unit.ariaLabel = caption;
            });
        }

        return oQuestionScale;
    });
