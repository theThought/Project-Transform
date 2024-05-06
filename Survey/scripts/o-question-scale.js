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
            oQuestion.prototype.init.call(this);

            this.setScaleRange();
            this.createScaleUnits();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
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
            var value = event.target.getAttribute('data-value');
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
            this.container.querySelector('.m-scale-unit[data-value="' + value + '"]').classList.add('current-value');
        }

        oQuestionScale.prototype.show = function (showProperties) {
            // this could have multiple entries so here is the local routing for sub-options of 'show'
            if (showProperties.terminators !== 'undefined') {
                this.showTerminators();
            }
        }

        oQuestionScale.prototype.showTerminators = function () {
            console.log('Display terminators');
        }

        oQuestionScale.prototype.values = function (valuesProperties) {
            var valuesPosition = valuesProperties.position;
            console.log('Values position: ' + valuesPosition);
        }

        oQuestionScale.prototype.labels = function (labelProperties) {
            var preLabel = labelProperties.pre;
            var postLabel = labelProperties.post;

            console.log('Configure pre-label ' + preLabel);
            console.log('Configure post-label ' + postLabel);
        }

        oQuestionScale.prototype.background = function (backgroundProperties) {
            var imageProperties = backgroundProperties.image;
            var imageURL = imageProperties.url;
            var imageWidth = imageProperties.width;
            var imageHeight = imageProperties.height;

            var caption = backgroundProperties.caption;

            var imageXOffset = backgroundProperties.offset.x;
            var imageYOffset = backgroundProperties.offset.y;

            var singleStateImage = this.container.querySelector('.m-image-singlestate');

            if (singleStateImage) {
                singleStateImage.src = backgroundProperties.image.url;
                singleStateImage.alt = backgroundProperties.caption || '';
                singleStateImage.style = 'transform:translate(' + this.properties.background.offset.x + 'px, ' + this.properties.background.offset.y + 'px); width:' + this.properties.background.image.width + 'px; height:' + this.properties.background.image.height + 'px; ';
            }
        }

        oQuestionScale.prototype.unit = function (unitProperties) {
            var imageProperties = unitProperties.image;
            var imageURL = imageProperties.url;
            var imageWidth = imageProperties.width;
            var imageHeight = imageProperties.height;

            var caption = unitProperties.caption;

            var imageXOffset = unitProperties.offset.x;
            var imageYOffset = unitProperties.offset.y;

            if (imageURL === "undefined") {
                return;
            }

            //var scaleUnits = this.container.querySelectorAll('.m-scale-unit');
        }

        oQuestionScale.prototype.updateScaleUnitDisplay = function (checkbox, isActive) {
            var unitLabel = checkbox.closest('.m-scale-unit');
            var img = unitLabel.querySelector('.a-image-multistate');
            img.src = isActive ? this.properties.activeUnit.image.url : this.properties.unit.image.url;
        }

        oQuestionScale.prototype.incrementValue = function (checkboxes, event) {
            var currentValue = parseInt(this.element.value);
            var max = this.element.max ? parseInt(this.element.max) : 10;

            if (currentValue < max) {
                this.setValue(this.element.value + 1);
            }
        }

        oQuestionScale.prototype.decrementValue = function (checkboxes, event) {
            var currentValue = parseInt(this.element.value);
            var min = this.element.min ? parseInt(this.element.min) : 1;

            if (currentValue > min) {
                this.setValue(this.element.value - 1);
            }
        }

        return oQuestionScale;
    });
