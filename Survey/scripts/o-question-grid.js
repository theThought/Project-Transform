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

        function oQuestionGrid(id, group) {
            component.call(this, id, group);

            this.element = document.querySelector('div[data-questiongroup="' + this.group + '"]');
            this.grid = this.element.getElementsByClassName('o-structure-table')[0];
            this.rowtotals = [];
            this.columntotals = [];

            var gridid = group.toLowerCase();
            var grididarray = gridid.split('_q');
            gridid = grididarray[grididarray.length - 3];

            this.configureIncomingEventListeners();
            this.configureProperties(gridid);
            this.configurationComplete();
        }

        oQuestionGrid.prototype = Object.create(component.prototype);
        oQuestionGrid.prototype.constructor = oQuestionGrid;

        oQuestionGrid.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("broadcastChange", this, false);
            document.addEventListener("configComplete", this, false);
        }

        oQuestionGrid.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "broadcastChange":
                    this.receiveBroadcast(event);
                    break;
            }
        }

        oQuestionGrid.prototype.totals = function (props) {
            if (typeof props['rows'] == "object" && props['rows']['visible']) {
                this.configureRowTotals(props['rows']);
                this.getTableInputElements('row');
            }

            if (typeof props['columns'] == "object" && props['columns']['visible']) {
                this.configureColumnTotals(props['columns']);
                this.getTableInputElements('column');
            }
        }

        oQuestionGrid.prototype.getTableInputElements = function (direction) {

            for (var i = 0, row; row = this.grid.rows[i]; i++) {

                // iterating through rows initially
                // rows are accessed using the "row" variable

                for (var j = 0, col; col = row.cells[j]; j++) {
                    // nested column iteration
                    // required to retrieve input elements
                    if (inputelement = col.getElementsByTagName('input')[0]) {
                        var details = {
                            'id': inputelement.id,
                            'value': Number(inputelement.value),
                            'column': j,
                            'row': i
                        };
                        this[direction+'totals'].push(details);
                    }


                }
            }
        }

        oQuestionGrid.prototype.receiveBroadcast = function (event) {
            if (event.detail.element.tagName !== 'INPUT') {
                return;
            }

            var rowindex = this.rowtotals.map(function(e) { return e.id; }).indexOf(event.detail.id);
            var elementvalue = Number(event.detail.element.value);

            if (rowindex !== -1) {
                this.rowtotals[rowindex].value = elementvalue;
                this.recalculateRowTotals();
            }

            var colindex = this.columntotals.map(function(e) { return e.id; }).indexOf(event.detail.id);

            if (colindex !== -1) {
                this.columntotals[colindex].value = elementvalue;
                this.recalculateColumnTotals();
            }
        }

        oQuestionGrid.prototype.recalculateRowTotals = function () {
            var rowcount = this.grid.rows.length;

            for (var row = 1; row < rowcount; row++) {
                var rowtotal = 0;
                for (var inputitems = 0; inputitems < this.rowtotals.length; inputitems++) {
                    if (this.rowtotals[inputitems].row === row) {
                        rowtotal += Number(this.rowtotals[inputitems].value);
                    }
                }

                // prevent attempts to update a total in a title row
                if (this.grid.querySelector('div[data-rownumber="' + row + '"]')  !== null) {
                    this.grid.querySelector('div[data-rownumber="' + row + '"]').innerHTML = rowtotal;
                }
            }
        }

        oQuestionGrid.prototype.recalculateColumnTotals = function () {
            var rowcount = this.grid.rows.length;

            for (var column = 0; column < rowcount; column++) {
                var coltotal = 0;
                for (var j = 0; j < this.columntotals.length; j++) {
                    if (this.columntotals[j].column === column) {
                        coltotal += Number(this.columntotals[j].value);
                    }
                }

                // prevent attempts to update a total in a title column
                if (this.grid.querySelector('div[data-colnumber="' + column + '"]') !== null) {
                    this.grid.querySelector('div[data-colnumber="' + column + '"]').innerHTML = coltotal;
                }
            }
        }

        oQuestionGrid.prototype.caption = function (caption) {
            var newcaption = this.grid.createCaption();
            newcaption.innerHTML = caption;
        }

        oQuestionGrid.prototype.configureRowTotals = function (props) {
            if (!props['visible']) {
                return;
            }

            var rowcount = this.grid.rows.length;
            var title = (typeof props['caption'] === 'undefined') ? '' : props['caption'];

            for (var i = 0; i < rowcount; i++) {
                var totalcell = this.grid.rows[i].insertCell(-1);

                if (i === 0) {
                    totalcell.className = 'm-structure-cell m-structure-cell-row-total-title';
                    totalcell.innerHTML = title;
                } else {
                    totalcell.className = 'm-structure-cell m-structure-cell-total';
                    totalcell.innerHTML = '<div class="a-row-total" data-rownumber="' + i + '"><span>0</span></div>';
                    totalcell.onchange = function () {
                    };
                }
            }

        }

        oQuestionGrid.prototype.configureColumnTotals = function (props) {
            if (!props['visible']) {
                return;
            }

            var columncount = this.grid.rows[0].cells.length;
            var totalrow = this.grid.insertRow(-1);
            totalrow.className = 'm-structure-column-totals';
            var title = (typeof props['caption'] === 'undefined') ? '' : props['caption'];

            for (var i = 0; i < columncount; i++) {
                var totalcell = totalrow.insertCell(i);
                if (i === 0) {
                    totalcell.className = 'm-structure-cell m-structure-cell-column-total-title';
                    totalcell.innerHTML = title;
                } else {
                    totalcell.className = 'm-structure-cell m-structure-cell-total';
                    totalcell.innerHTML = '<div class="a-column-total" data-colnumber="' + i + '"><span>0</span></div>';
                }

            }
        }

        return oQuestionGrid;

    });