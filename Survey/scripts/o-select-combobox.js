define(['component'],
    function (component) {

        /**
         * Molecule: Question option list
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oSelectComboBox(id, group) {
            component.call(this, id, group);

            this.tallest = 0;
            this.widest = 0;
            this.maxwidth = '';
            this.keypressed = null;
            this.isJumpingToLetter = false;
            this.emptyplaceholder = 'no items to display';
            this.notenoughcharactersplaceholder = 'begin typing to display the list';
            this.element = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] input.a-input-combobox');
            this.wrapper = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"]');
            this.listcontainer = document.querySelector('div[class*=o-question-response][data-questiongroup="' + this.group + '"] ul');
        }

        oSelectComboBox.prototype = Object.create(component.prototype);
        oSelectComboBox.prototype.constructor = oSelectComboBox;

        oSelectComboBox.prototype.init = function () {
            this.configureProperties();
            this.addCharRestrictionPlaceholder();
            this.setWidth();
            this.configureIncomingEventListeners();
            this.configureLocalEventListeners();
            this.configurationComplete();
        }

        oSelectComboBox.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener(this.group + "_requestSize", this, false);
            document.addEventListener('click', this, false);
        }

        oSelectComboBox.prototype.configureLocalEventListeners = function () {
            this.element.addEventListener('keypress', this, false);
            this.element.addEventListener('keyup', this, false);
            this.element.addEventListener('change', this, false);
        }

        oSelectComboBox.prototype.handleEvent = function (event) {
            switch (event.type) {
                case 'resize':
                case this.group + '_requestSize':
                    this.onResize();
                    break;
                case 'change':
                    this.onChange(event);
                    break;
                case 'focusout':
                    this.hideList(event);
                    break;
                case 'click':
                    this.onClick(event);
                    break;
                case 'keypress':
                    this.getKeyPressed(event);
                    this.onKeypress(event);
                    break;
                case 'keyup':
                    this.getKeyPressed(event);
                    this.onKeyup();
                    this.onChange(event);
                    break;
            }
        }

        oSelectComboBox.prototype.onChange = function (event) {
            event.stopImmediatePropagation();
            this.broadcastChange();
        }

        oSelectComboBox.prototype.jumptofirstletter = function (prop) {
            if (prop === true) {
                this.isJumpingToLetter = true;
            }
        }

        oSelectComboBox.prototype.getKeyPressed = function (event) {
            if (event.keyCode) {
                this.keypressed = event.keyCode;
            } else if (event.which) {
                this.keypressed = event.which;
            } else if (event.key) {
                this.keypressed = event.key;
            } else {
                this.keypressed = event.code;
            }
        }

        oSelectComboBox.prototype.onKeypress = function () {

            if (this.isJumpingToLetter) {
                this.processKeyJump();
            }

        }

        oSelectComboBox.prototype.onKeyup = function () {
            this.showList();
        }

        oSelectComboBox.prototype.processKeyJump = function () {
            var keyEvent = new CustomEvent(this.group + '_jumpToLetter', {bubbles: true, detail: this});
            document.dispatchEvent(keyEvent);
        }


        oSelectComboBox.prototype.noitemsinlist = function (prop) {
            this.emptyplaceholder = prop;
        }

        oSelectComboBox.prototype.notenoughcharacters = function (prop) {
            this.notenoughcharactersplaceholder = prop;
        }

        oSelectComboBox.prototype.placeholder = function (prop) {
            this.element.placeholder = prop;
        }

        oSelectComboBox.prototype.addCharRestrictionPlaceholder = function () {
            var placeholderelement = document.createElement('div');
            placeholderelement.classList.add('a-list-placeholder-restriction');
            placeholderelement.innerHTML = this.notenoughcharactersplaceholder;
            //this.element.appendChild(placeholderelement);
        }

        oSelectComboBox.prototype.onClick = function (event) {
            if (event.target === this.element) {
                this.toggleList(event);
                return;
            }

            if (!this.element.classList.contains('visible')) {
                return;
            }

            if (event.target === this.listcontainer
                || (this.listcontainer.contains(event.target))) {
                event.stopImmediatePropagation();
                this.selectOption(event);
                return;
            }

            this.hideList();
        }

        oSelectComboBox.prototype.selectOption = function (event) {
            var selectedOption = event.target;
            this.element.value = selectedOption.innerText;
            this.hideList();
        }

        oSelectComboBox.prototype.showList = function () {
            this.element.classList.add('visible');
        }

        oSelectComboBox.prototype.hideList = function () {
            this.element.classList.remove('visible');
        }

        oSelectComboBox.prototype.toggleList = function (event) {
            this.element.classList.toggle('visible');
        }

        oSelectComboBox.prototype.setWidth = function () {
            // determine whether a manual width has been set
            var inputelement = this.element;
            var inputelementwidth = inputelement.style.width;
            if (inputelementwidth.length > 0) {
                this.element.classList.add('manual-width');
                this.element.style.width = this.element.offsetWidth + 'px';
            }
            var dims = getComputedStyle(inputelement);
            this.listcontainer.style.width = dims.width;
        }

        oSelectComboBox.prototype.listsize = function (prop) {
            // todo: how do we calculate this as height changes?
            var height = 27 * prop + 7;
            this.element.style.maxHeight = height + 'px';
        }

        oSelectComboBox.prototype.displayicon = function (prop) {
            if (prop === true) {
                this.element.classList.add('display-icons');
            }
        }

        oSelectComboBox.prototype.setMaxWidth = function (maxwidth) {
            var buttonpadding = 52;
            this.maxwidth = maxwidth;
            this.element.style.maxWidth = "calc(" + maxwidth + " + " + buttonpadding + "px)";
        }

        oSelectComboBox.prototype.onResize = function () {

            var children = this.element.querySelectorAll(".m-option-base, .a-button-option");
            this.tallest = 0;
            this.widest = 0;

            var beginresize = new CustomEvent(this.group + '_beginResize', {
                bubbles: true,
                detail: this
            });
            document.dispatchEvent(beginresize);

            for (var i = 0; i < children.length; i++) {
                var element = children[i];
                var dims = getComputedStyle(element);
                var elementheight = parseFloat(dims.height);
                var elementwidth = parseFloat(dims.width);
                var contentheight = elementheight;
                var contentwidth = elementwidth;

                contentheight = Math.ceil(contentheight);
                contentwidth = Math.ceil(contentwidth);

                if (isNaN(contentwidth) || isNaN(contentheight)) {
                    continue;
                }

                if (contentheight > this.tallest) this.tallest = contentheight;
                if (contentwidth > this.widest) this.widest = contentwidth;
            }

            var endresize = new CustomEvent(this.group + '_endResize', {
                bubbles: true,
                detail: this
            });
            document.dispatchEvent(endresize);
        }

        return oSelectComboBox;

    });