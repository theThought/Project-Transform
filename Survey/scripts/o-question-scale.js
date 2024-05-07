define(['o-question'],
    function (oQuestion) {
        function oQuestionScale(id, group) {
            oQuestion.call(this, id, group);

            this.container = document.querySelector('.o-question-scale-horizontal[data-questiongroup="' + this.group + '"]');
            this.element = this.container.querySelector('input[data-questionid="' + this.id + '"]');
            this.isRTL = document.dir === 'rtl';
            this.min = 1;
            this.max = 10;
        }

        oQuestionScale.prototype = Object.create(oQuestion.prototype);
        oQuestionScale.prototype.constructor = oQuestionScale;

        oQuestionScale.prototype.init = function () {
            //oQuestion.prototype.init.call(this);

            this.setScaleRange();
            this.createScaleUnits();
            this.setClasses(this.element.value);
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configureProperties();
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

            this.container.querySelectorAll('.m-scale-unit').forEach(function (unit) {
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
                case this.group + '_incrementValue':
                    this.incrementValue(event);
                    break;
                case this.group + '_decrementValue':
                    this.decrementValue(event);
                    break;
                case 'broadcastChange':
                    this.processVisibilityRulesFromExternalTrigger(event);
                    break;
            }
        }

        oQuestionScale.prototype.onClick = function (event) {
            this.container.querySelectorAll('.m-scale-unit').forEach(function (unit) {
                unit.classList.remove('current-value');
            });
            var value = parseInt(event.target.getAttribute('data-value'));
            this.setValue(value);
        }

        oQuestionScale.prototype.setScaleRange = function () {
            this.min = (this.element.min) ? parseInt(this.element.min) : this.min;
            this.max = (this.element.max) ? parseInt(this.element.max) : this.max;
        }

        oQuestionScale.prototype.createScaleUnits = function () {
            var unitContainer = this.container.querySelector('.o-scale-unitcontainer');

            for (var i = this.min; i <= this.max; i++) {

                var scaleItem = document.createElement('div');
                var scaleLabel = document.createElement('span');
                scaleItem.classList.add('m-scale-unit');
                scaleItem.setAttribute('data-value', i);
                scaleLabel.classList.add('a-label');
                scaleLabel.setAttribute('data-value', i);
                scaleLabel.innerHTML = i;
                scaleItem.appendChild(scaleLabel);
                unitContainer.append(scaleItem);

                if (this.element.value === i) {
                    this.setValue(i);
                }
            }
        }

        oQuestionScale.prototype.setValue = function (value) {
            this.element.value = value;
            this.setClasses(value);
        }

        oQuestionScale.prototype.setClasses = function (value) {
            this.container.querySelectorAll('.m-scale-unit').forEach(function (unit) {
                var currentValue = parseInt(unit.getAttribute('data-value'));

                if (value < currentValue) {
                    unit.classList.remove('current-value');
                } else {
                    unit.classList.add('current-value');
                }
            });
        }

        oQuestionScale.prototype.show = function (showProperties) {
            // this could have multiple entries so here is the local routing for sub-options of 'show'
            if (showProperties.terminators !== 'undefined') {
                this.showTerminators(showProperties.terminators);
            }
        }

        oQuestionScale.prototype.showTerminators = function (prop) {
            if (prop) {
                this.container.classList.add('has-terminators');
            }
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
            var imageURL = imageProperties.url;
            var imageWidth = imageProperties.width;
            var imageHeight = imageProperties.height;

            var caption = backgroundProperties.caption;

            var imageXOffset = backgroundProperties.offset.x;
            var imageYOffset = backgroundProperties.offset.y;

            if (typeof imageURL === "undefined") {
                return;
            }

            this.container.classList.add('has-container-background');

            this.container.style.height = imageHeight;
            this.container.style.width = imageWidth;
            this.container.style.backgroundImage = 'url("' + imageURL + '")';
            this.container.style.backgroundPositionX = imageXOffset + 'px';
            this.container.style.backgroundPositionY = imageYOffset + 'px';
        }

        oQuestionScale.prototype.unit = function (unitProperties) {
            var imageProperties = unitProperties.image;
            var imageURL = imageProperties.url;
            var imageWidth = imageProperties.width;
            var imageHeight = imageProperties.height;

            var caption = unitProperties.caption;

            var imageXOffset = unitProperties.offset.x;
            var imageYOffset = unitProperties.offset.y;

            if (typeof imageURL === "undefined") {
                return;
            }

            this.container.classList.add('has-unit-background');
            var scaleUnits = this.container.querySelectorAll('.m-scale-unit');

            scaleUnits.forEach(function (unit) {
                unit.style.height = imageHeight;
                unit.style.width = imageWidth;
                unit.style.backgroundImage = 'url("' + imageURL + '")';
                unit.style.top = imageYOffset + 'px';
                unit.style.left = imageXOffset + 'px';
            });
        }

        oQuestionScale.prototype.incrementValue = function (checkboxes, event) {
            var currentValue = parseInt(this.element.value);

            if (isNaN(currentValue)) {
                currentValue = this.min - 1;
            }

            var max = this.element.max ? parseInt(this.element.max) : 10;

            if (currentValue < max) {
                this.setValue(currentValue + 1);
            }
        }

        oQuestionScale.prototype.decrementValue = function (checkboxes, event) {
            var currentValue = parseInt(this.element.value);
            var min = this.element.min ? parseInt(this.element.min) : 1;

            if (currentValue > min) {
                this.setValue(currentValue - 1);
            }
        }

        return oQuestionScale;
    });
