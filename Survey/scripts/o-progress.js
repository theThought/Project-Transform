/*
  functionality:


  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

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

            this.configureProperties();
        }

        oProgress.prototype = Object.create(component.prototype);
        oProgress.prototype.constructor = oProgress;

        oProgress.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
        }

        oProgress.prototype.handleEvent = function (event) {
            switch (event.type) {
                // event handlers to match incoming event listeners
            }
        }

        oProgress.prototype.sections = function (sections) {
            var self = this;

            sections.forEach(function (section) {
                self.element.appendChild(self.createSection(section));
            });
        }

        oProgress.prototype.createSection = function (section) {
            var self = this;
            var pageindex = 1;

            var newSection = document.createElement('div');
            newSection.classList.add('m-progress-section');

            if (section.title === this.properties.currentsection) {
                newSection.classList.add('current-section');
            }

            newSection.title = section.title;

            for (pageindex = 1; pageindex <= section.pages; pageindex++) {
                newSection.appendChild(self.createPage(pageindex, section.pages, section.title));
            }

            return newSection;
        }

        oProgress.prototype.createPage = function (pageindex, pagecount, sectiontitle) {
            var newPage = document.createElement('div');
            newPage.classList.add('a-progress-page');

            if (pageindex === this.properties.currentpage) {
                newPage.classList.add('current-page');
            }

            newPage.title = sectiontitle
                + " (" + pageindex
                + "/" + pagecount + ")";

            return newPage;
        }

        return oProgress;

    });