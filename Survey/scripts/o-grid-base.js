/*
  functionality:

  character countdown

  Parameters: 


  Event Handlers:


  Configuration:
  {}

*/

define(['component'],
    function (component) {

        /**
         * Organism: Question Class
         *
         * @constructor
         * @param {String} id - element id
         * @param {String} group - question group
         */

        function oGridBase(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"]');

            var gridid = group.toLowerCase();
            var grididarray = gridid.split('_q');
            gridid = grididarray[grididarray.length - 3];
            this.configureProperties(gridid);
        }

        oGridBase.prototype = Object.create(component.prototype);
        oGridBase.prototype.constructor = oGridBase;

        oGridBase.prototype.totals = function (props) {
            if (typeof props['rows'] == "object") {
                this.configureRowTotals(props['rows']);
            }

            if (typeof props['columns'] == "object") {
                this.configureColumnTotals(props['columns']);
            }
        }

        oGridBase.prototype.configureRowTotals = function (props) {
            if (!props['visible']) {
                return;
            }

            var grid = this.element.getElementsByClassName('o-structure-table')[0];
            var rowcount = grid.rows.length;
            var title = props['title'] ?? '';

            for (var i = 0; i < rowcount; i++) {
                var totalcell = grid.rows[i].insertCell(-1);

                if (i === 0) {
                    totalcell.className = 'm-structure-cell m-structure-cell-total-title';
                    totalcell.innerHTML = title;
                } else {
                    totalcell.className = 'm-structure-cell m-structure-cell-total';
                    totalcell.innerHTML = '<div class="a-row-total"><span>0</span></div>';
                }
            }

        }

        oGridBase.prototype.configureColumnTotals = function (props) {
            if (!props['visible']) {
                return;
            }

            var grid = this.element.getElementsByClassName('o-structure-table')[0];
            var columncount = grid.rows[0].cells.length;
            var totalrow = grid.insertRow(-1);
            totalrow.className = 'm-structure-column-totals';
            var title = props['title'] ?? '';

            for (var i = 0; i < columncount; i++) {
                var totalcell = totalrow.insertCell(i);
                if (i === 0) {
                    totalcell.className = 'm-structure-cell m-structure-cell-total-title';
                    totalcell.innerHTML = title;
                } else {
                    totalcell.className = 'm-structure-cell m-structure-cell-total';
                    totalcell.innerHTML = '<div class="a-column-total"><span>0</span></div>';
                }

            }
        }

        return oGridBase;

    });