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
            this.hasrowtotals = false;
            this.rowtotals = [];
            this.columntotals = [];
            this.hasgrandtotal = false;

            var gridid = this.group.toLowerCase();
            var grididarray = gridid.split('_q');
            gridid = grididarray[grididarray.length - 3];

            this.configureCellEvents();
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

        oQuestionGrid.prototype.configureCellEvents = function () {
            for (var i = 0, row; row = this.grid.rows[i]; i++) {

                // iterating through rows initially
                // rows are accessed using the "row" variable

                for (var j = 0, col; col = row.cells[j]; j++) {
                    // nested column iteration

                    // if the cell is clicked pass the focus and click to the first input element
                    col.onclick = function () {
                        if (this.getElementsByTagName('INPUT').length) {
                            var element = this.getElementsByTagName('INPUT')[0];
                            element.click();
                            element.focus();
                        }
                    }
                }

            }
        }

        oQuestionGrid.prototype.cellshading = function (props) {

            if (props['headercolumn'] === true) {
                this.grid.classList.add('shade-headercolumn');
            }

            if (props['altcolumns'] === true) {
                this.grid.classList.add('shade-altcolumns');
            }

            if (props['headerrow'] === true) {
                this.grid.classList.add('shade-headerrow');
            }

            if (props['altrows'] === true) {
                this.grid.classList.add('shade-altrows');
            }

        }

        oQuestionGrid.prototype.totals = function (props) {
            if (typeof props['rows'] == "object" && props['rows']['visible']) {
                this.configureRowTotals(props['rows']);
                this.getTableInputElements('row');
                this.recalculateRowTotals();
            }

            if (typeof props['columns'] == "object" && props['columns']['visible']) {
                this.configureColumnTotals(props['columns']);
                this.getTableInputElements('column');
                this.recalculateColumnTotals();
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
                        this[direction + 'totals'].push(details);
                    }

                }

            }
        }

        oQuestionGrid.prototype.receiveBroadcast = function (event) {
            if (event.detail.element.tagName !== 'INPUT') {
                return;
            }

            var rowindex = this.rowtotals.map(function (e) {
                return e.id;
            }).indexOf(event.detail.id);
            var elementvalue = Number(event.detail.element.value);

            if (rowindex !== -1) {
                this.rowtotals[rowindex].value = elementvalue;
                this.recalculateRowTotals();
            }

            var colindex = this.columntotals.map(function (e) {
                return e.id;
            }).indexOf(event.detail.id);

            if (colindex !== -1) {
                this.columntotals[colindex].value = elementvalue;
                this.recalculateColumnTotals();
            }
        }

        oQuestionGrid.prototype.recalculateRowTotals = function () {
            var rowcount = this.grid.rows.length;
            var grandtotal = 0;

            for (var row = 1; row < rowcount; row++) {
                var rowtotal = 0;

                if (Array.isArray(this.properties.totals.rows['exceptions']) && this.properties.totals.rows['exceptions'].indexOf(row) >= 0) {
                    continue;
                }

                for (var inputitems = 0; inputitems < this.rowtotals.length; inputitems++) {

                    if (Array.isArray(this.properties.totals.columns['exceptions']) && this.properties.totals.columns['exceptions'].indexOf(this.rowtotals[inputitems].column) >= 0) {
                        continue;
                    }

                    if (this.rowtotals[inputitems].row === row) {
                        rowtotal += Number(this.rowtotals[inputitems].value);
                    }
                }

                // prevent attempts to update a total in a title row
                if (this.grid.querySelector('div[data-rownumber="' + row + '"]') !== null) {
                    this.grid.querySelector('div[data-rownumber="' + row + '"]').innerHTML = rowtotal;
                }

                grandtotal += rowtotal;
            }

            this.updateGrandTotal(grandtotal);

        }

        oQuestionGrid.prototype.recalculateColumnTotals = function () {
            var rowcount = this.grid.rows.length;
            var grandtotal = 0;

            for (var column = 0; column < rowcount; column++) {
                var coltotal = 0;

                for (var j = 0; j < this.columntotals.length; j++) {

                    if (Array.isArray(this.properties.totals.columns['exceptions'])
                        && typeof this.rowtotals[j] !== 'undefined'
                        && this.properties.totals.columns['exceptions'].indexOf(this.rowtotals[j].column) >= 0) {
                        continue;
                    }

                    if (Array.isArray(this.properties.totals.columns['exceptions'])
                        && typeof this.rowtotals[j] !== 'undefined'
                        && this.properties.totals.rows['exceptions'].indexOf(this.rowtotals[j].row) >= 0) {
                        continue;
                    }

                    if (this.columntotals[j].column === column) {
                        coltotal += Number(this.columntotals[j].value);
                    }
                }

                // prevent attempts to update a total in a title column
                if (this.grid.querySelector('div[data-colnumber="' + column + '"]') !== null) {
                    this.grid.querySelector('div[data-colnumber="' + column + '"]').innerHTML = coltotal;
                }

                grandtotal += coltotal;
            }

            this.updateGrandTotal(grandtotal);

        }

        oQuestionGrid.prototype.updateGrandTotal = function (grandtotal) {
            if (!this.hasgrandtotal) {
                return;
            }

            document.querySelector('div.a-label-total-grand').innerHTML = grandtotal;

        }

        oQuestionGrid.prototype.caption = function (caption) {
            var newcaption = this.grid.createCaption();
            newcaption.classList.add('a-label-heading')
            newcaption.innerHTML = caption;
        }

        oQuestionGrid.prototype.configureRowTotals = function (props) {
            if (!props['visible']) {
                return;
            }

            this.hasrowtotals = true;

            var rowcount = this.grid.rows.length;
            var title = (typeof props['caption'] === 'undefined') ? '' : props['caption'];

            for (var i = 0; i < rowcount; i++) {

                var totalcell = this.grid.rows[i].insertCell(-1);

                if (i === 0) {
                    totalcell.scope = 'col';
                    totalcell.className = 'm-structure-cell grid-row-total-title';
                    totalcell.innerHTML = title;
                } else {
                    totalcell.className = 'm-structure-cell grid-row-total';
                    if (Array.isArray(props['exceptions']) && props['exceptions'].indexOf(i) >= 0) {
                        continue;
                    }
                    totalcell.innerHTML = '<div class="a-label-total-row a-label-total" data-rownumber="' + i + '"><span>0</span></div>';
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
                    totalcell.scope = 'row';
                    totalcell.className = 'm-structure-cell grid-column-total-title';
                    totalcell.innerHTML = title;
                } else {
                    if (this.hasrowtotals && i === (columncount - 1)) {
                        // tables with column and row totals also have grand totals
                        this.hasgrandtotal = true;
                        totalcell.className = 'm-structure-cell m-structure-cell-total grid-grandtotal';
                        totalcell.innerHTML = '<div class="a-label-total-grand a-label-total"><span>0</span></div>';
                    } else {
                        totalcell.className = 'm-structure-cell grid-column-total';
                        if (Array.isArray(props['exceptions']) && props['exceptions'].indexOf(i) >= 0) {
                            continue;
                        }
                        totalcell.innerHTML = '<div class="a-label-total-column a-label-total" data-colnumber="' + i + '"><span>0</span></div>';
                    }

                }

            }
        }

        return oQuestionGrid;

    });
