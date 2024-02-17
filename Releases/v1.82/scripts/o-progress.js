define(['component'],
    function (component) {

        /**
         * Organism: Complex Progress Bar
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oProgress(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div.overall-progress.complex#' + this.id);
            this.currentsectionnumber = 1;
        }

        oProgress.prototype = Object.create(component.prototype);
        oProgress.prototype.constructor = oProgress;

        oProgress.prototype.init = function () {
            this.configureProperties();
        }

        oProgress.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
        }

        oProgress.prototype.handleEvent = function (event) {
            switch (event.type) {
                // event handlers to match incoming event listeners
            }
        }

        oProgress.prototype.currentsection = function (prop) {
            this.currentsectionnumber = prop;
        }

        oProgress.prototype.addSectionTitle = function (title) {
            var wrapper = this.element;
            var firstsection = wrapper.firstChild;
            var titleelement = document.createElement('div');
            titleelement.classList.add('a-label-section-title');
            titleelement.innerText = title;
            wrapper.insertBefore(titleelement, firstsection);
        }

        oProgress.prototype.sections = function (sections) {
            var self = this;
            var sectionindex = 1;

            sections.forEach(function (section) {
                self.element.appendChild(self.createSection(section, sectionindex));
                sectionindex++;
            });
        }

        oProgress.prototype.createSection = function (section, sectionindex) {
            var self = this;

            var newSection = document.createElement('div');
            newSection.classList.add('m-progress-section');

            if (sectionindex === this.currentsectionnumber) {
                this.addSectionTitle(section.title);
                newSection.classList.add('current-section');
            }

            if (section.pages.current === 0) {
                newSection.classList.add('no-progress');
            } else if (section.pages.current <= section.pages.total) {
                newSection.classList.add('in-progress');
            } else {
                newSection.classList.add('complete');
            }

            newSection.title = section.title;

            for (var pageindex = 1; pageindex <= section.pages.total; pageindex++) {
                newSection.appendChild(self.createPage(section, pageindex));
            }

            return newSection;
        }

        oProgress.prototype.createPage = function (section, pageindex) {
            var newPage = document.createElement('div');
            newPage.classList.add('a-progress-page');

            if (pageindex === section.pages.current) {
                newPage.classList.add('current-page');
            }

            newPage.title = section.title
                + " (" + pageindex
                + "/" + section.pages.total + ")";

            return newPage;
        }

        return oProgress;

    });