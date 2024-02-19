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
        }

        oQuestionGrid.prototype = Object.create(component.prototype);
        oQuestionGrid.prototype.constructor = oQuestionGrid;

        oQuestionGrid.prototype.init = function () {
            var gridid = this.group.toLowerCase();
            var grididarray = gridid.split('_q');
            gridid = grididarray[grididarray.length - 3];

            this.configureCellEvents();
            this.configureTHStyles();
            this.configureRowStyles();
            this.configureIncomingEventListeners();
            this.configureProperties(gridid);
            this.configurationComplete();
        }

        oQuestionGrid.prototype.configureIncomingEventListeners = function () {
            // for each event listener there must be a corresponding event handler
            document.addEventListener("broadcastChange", this, false);
        }

        oQuestionGrid.prototype.handleEvent = function (event) {
            switch (event.type) {
                case "broadcastChange":
                    this.receiveBroadcast(event);
                    break;
            }
        }

        oQuestionGrid.prototype.configureTHStyles = function () {
            for (var i = 0, row; row = this.grid.rows[i]; i++) {

                // get total number of cells in the current row
                var cellcount = row.cells.length;
                var emptyheadercount = 0;

                for (var j = 0, col; col = row.cells[j]; j++) {
                    var celltext = '';

                    // it is necessary to examine the content of the cell and all child nodes
                    // to ascertain if there is any text contained within them - this could be
                    // text directly in the <th> or text within a child <span> - but only if
                    // there is actually text (do not return html tags as valid headers)

                    if (col.tagName.toLowerCase() === 'th') {
                        celltext += this.recursiveTextSearch(col, '');

                        if (!celltext.length) {
                            emptyheadercount++;
                        }
                    }

                }

                if (emptyheadercount === cellcount) {
                    this.grid.rows[i].classList.add('empty-header-row');
                }

            }
        }

        oQuestionGrid.prototype.configureRowStyles = function () {
            var tablerowlist = this.grid.querySelectorAll('tr.m-structure-row, tr.m-structure-row-error');
            var stripedrowiterator = 0;

            for (var i = 0; i < tablerowlist.length; i++) {
                // do not consider error rows when determining which rows should be striped
                if (tablerowlist[i].classList.contains('m-structure-row-error')) {
                    continue;
                }

                stripedrowiterator++;

                if (stripedrowiterator % 2 !== 0) {
                    tablerowlist[i].classList.add('striped');

                    // stripe the preceding error row, if there is one
                    if (typeof tablerowlist[i-1] !== 'undefined' &&
                        tablerowlist[i-1].classList.contains('m-structure-row-error')) {
                        tablerowlist[i-1].classList.add('striped');
                    }
                }
            }
        }

        oQuestionGrid.prototype.recursiveTextSearch = function (node, text) {
            if (node.nodeType === document.TEXT_NODE) {
                var content = node.nodeValue.trim();
                text += content;
            } else if (node.nodeType === document.ELEMENT_NODE) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    if (text += this.recursiveTextSearch(node.childNodes[i], text)) {
                        return text;
                    }
                }
            }

            return text;
        }

        oQuestionGrid.prototype.configureCellEvents = function () {
            for (var i = 0, row; row = this.grid.rows[i]; i++) {

                // iterating through rows initially
                // rows are accessed using the "row" variable

                for (var j = 0, col; col = row.cells[j]; j++) {
                    // nested column iteration

                    // if the cell is clicked pass the focus and click to the first input element
                    col.onclick = function (event) {

                        // prevent bubbled events from firing this function
                        if (typeof event.target.type !== 'undefined' || event.detail === 0) {
                            return;
                        }

                        var element = null;

                        if (this.getElementsByTagName('BUTTON').length) {
                            element = this.getElementsByTagName('BUTTON')[0];
                        } else if (this.getElementsByTagName('INPUT').length) {
                            element = this.getElementsByTagName('INPUT')[0];
                        } else if (this.getElementsByTagName('TEXTAREA')) {
                            element = this.getElementsByTagName('TEXTAREA')[0];
                        }

                        if (typeof element === "undefined" || element === null) {
                            // this is an unexpected situation where we have a column that doesn't contain an input
                            return;
                        }

                        if (element.type !== 'checkbox' && element.type !== 'radio') {
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

        oQuestionGrid.prototype.separators = function (props) {
            var style = document.createElement('style');
            style.type = 'text/css';
            var color = '#212C4C';
            var generatedstyles = '';

            if (typeof props['columns'] !== "undefined" && Array.isArray(props['columns'])) {
                for (var column = 0; column < props['columns'].length; column++) {
                    generatedstyles += '.separator-column-' + props['columns'][column] + ' tr>:nth-child(' + props['columns'][column] + ') { border-right: 1px solid ' + color + '; } ';
                    this.grid.classList.add('separator-column-' + props['columns'][column]);
                }
            }

            if (typeof props['rows'] !== "undefined" && Array.isArray(props['rows'])) {
                for (var row = 0; row < props['rows'].length; row++) {
                    generatedstyles += '.separator-row-' + props['rows'][row] + ' tr:nth-of-type(' + props['rows'][row] + ') { border-bottom: 1px solid ' + color + '; } ';
                    this.grid.classList.add('separator-row-' + props['rows'][row]);
                }
            }

            style.innerHTML = generatedstyles;
            document.getElementsByTagName('head')[0].appendChild(style);
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

                    if (typeof this.properties.totals.columns !== 'undefined'
                        && Array.isArray(this.properties.totals.columns['exceptions'])
                        && this.properties.totals.columns['exceptions'].indexOf(this.rowtotals[inputitems].column) >= 0) {
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
                    this.grid.querySelector('div[data-colnumber="' + column + '"]').innerHTML = '<span>'
                        + coltotal
                        + '</span>';
                }

                grandtotal += coltotal;
            }

            this.updateGrandTotal(grandtotal);

        }

        oQuestionGrid.prototype.updateGrandTotal = function (grandtotal) {
            if (!this.hasgrandtotal) {
                return;
            }

            this.grid.querySelector('div.a-label-total-grand').innerHTML = grandtotal;

        }

        oQuestionGrid.prototype.caption = function (props) {

            if (typeof props['content'] === 'undefined') {
                this.debug(this.id + ' did not correctly define caption properties.', 2);
                props = {content: props};
            }

            // handle tables with exactly 2 rows
            if (this.grid.rows.length === 2) {
                this.addSingleRowCaption(props);
                return;
            }

            // handle tables with exactly 2 columns
            if (this.grid.rows[0].cells.length === 2) {
                this.addSingleColumnCaption(props);
                return;
            }

            this.addTableCaption(props);
        }

        oQuestionGrid.prototype.addTableCaption = function (caption) {
            var captioncontentcontainer = document.createElement('span');
            captioncontentcontainer.classList.add('a-label-caption');
            captioncontentcontainer.innerHTML = this.replaceHTMLPlaceholder(caption['content']);

            var newcaption = this.grid.createCaption();

            if (typeof caption['width'] !== 'undefined') {
                newcaption.style.width = caption['width'];
            }

            if (typeof caption['align'] !== 'undefined') {
                newcaption.classList.add('align-' + caption['align']);
            }

            newcaption.appendChild(captioncontentcontainer);
        }

        oQuestionGrid.prototype.addSingleRowCaption = function (caption) {
            var captioncontentcontainer = document.createElement('span');
            captioncontentcontainer.classList.add('a-label-caption');
            captioncontentcontainer.innerHTML = this.replaceHTMLPlaceholder(caption['content']);

            if (typeof caption['width'] !== 'undefined') {
                captioncontentcontainer.style.width = caption['width'];
            }

            if (typeof caption['align'] !== 'undefined') {
                captioncontentcontainer.classList.add('align-' + caption['align']);
            }

            // insert a blank cell in the heading row
            var headerrow = this.grid.rows[0];
            var newth = document.createElement('th');
            newth.scope = 'col';
            headerrow.insertBefore(newth, headerrow.firstChild);

            // get the row that requires a caption and add a cell at the start
            var captionrow = this.grid.rows[1];
            var captioncell = document.createElement('th');
            captioncell.scope = 'row';
            captioncell.className = 'm-structure-cell m-structure-column-caption';
            captioncell.appendChild(captioncontentcontainer);
            captionrow.insertBefore(captioncell, captionrow.firstChild);
        }

        oQuestionGrid.prototype.addSingleColumnCaption = function (caption) {
            var captioncontentcontainer = document.createElement('span');
            captioncontentcontainer.classList.add('a-label-caption');
            captioncontentcontainer.innerHTML = this.replaceHTMLPlaceholder(caption['content']);

            if (typeof caption['width'] !== 'undefined') {
                captioncontentcontainer.style.width = caption['width'];
            }

            if (typeof caption['align'] !== 'undefined') {
                captioncontentcontainer.classList.add('align-' + caption['align']);
            }

            // add a new row at the start of the table with an appropriate class
            var captionrow = this.grid.insertRow(0);
            captionrow.className = 'm-structure-row m-structure-caption-row';

            // insert two cells; the second cell will contain the caption
            var newth = document.createElement('th');
            newth.scope = 'col';
            captionrow.appendChild(newth);
            var captioncell = newth.cloneNode();
            captioncell.className = 'm-structure-cell m-structure-column-caption';
            captioncell.appendChild(captioncontentcontainer);
            captionrow.appendChild(captioncell);
        }

        oQuestionGrid.prototype.configureRowTotals = function (props) {
            if (!props['visible']) {
                return;
            }

            this.hasrowtotals = true;
            var rowcount = this.grid.rows.length;

            var captiontitle = '';
            var captionalign = '';
            var captionwidth = '';

            var figurealign = (typeof props['align'] === "undefined") ? 'default' : props['align'];
            var figurewidth = (typeof props['width'] === "undefined") ? '' : 'width: ' + props['width'];

            if (typeof props['caption'] !== 'undefined') {
                if (typeof props['caption']['content'] !== 'undefined') captiontitle = props['caption']['content'];
                if (typeof props['caption']['align'] !== 'undefined') captionalign = props['caption']['align'];
                if (typeof props['caption']['width'] !== 'undefined') captionwidth = props['caption']['width'];
            }

            for (var i = 0; i < rowcount; i++) {

                var totalcell = this.grid.rows[i].insertCell(-1);

                if (i === 0) {
                    totalcell.scope = 'col';
                    totalcell.className = 'm-structure-cell grid-row-total-title';
                    totalcell.classList.add('align-' + captionalign);
                    totalcell.innerHTML = captiontitle;
                } else {
                    totalcell.className = 'm-structure-cell grid-row-total';
                    totalcell.classList.add('align-' + figurealign);

                    if (this.grid.rows[i].classList.contains('m-structure-row-error')) {
                        continue;
                    }

                    if (Array.isArray(props['exceptions']) && props['exceptions'].indexOf(i) >= 0) {
                        continue;
                    }

                    var htmlString = '';

                    if (props['labels'] && props['labels']['pre']) {
                        htmlString += '<span class="a-label-prelabel">'
                            + props['labels']['pre']
                            + '</span>';
                    }

                    htmlString += '<div class="a-label-total-row a-label-total" '
                        + 'data-rownumber="' + i + '" '
                        + 'style="' + figurewidth + '"'
                        + '><span>0</span></div>';

                    if (props['labels'] && props['labels']['post']) {
                        htmlString += '<span class="a-label-postlabel">'
                            + props['labels']['post']
                            + '</span>';
                    }

                    totalcell.innerHTML = htmlString;
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

            var captiontitle = '';
            var captionalign = '';
            var captionwidth = '';

            var figurealign = (typeof props['align'] === "undefined") ? 'default' : props['align'];
            var figurewidth = (typeof props['width'] === "undefined") ? '' : 'width: ' + props['width'];

            if (typeof props['caption'] !== 'undefined') {
                if (typeof props['caption']['content'] !== 'undefined') captiontitle = props['caption']['content'];
                if (typeof props['caption']['align'] !== 'undefined') captionalign = props['caption']['align'];
                if (typeof props['caption']['width'] !== 'undefined') captionwidth = props['caption']['width'];
            }

            for (var i = 0; i < columncount; i++) {

                var totalcell = totalrow.insertCell(i);

                if (i === 0) {
                    totalcell.scope = 'row';
                    totalcell.className = 'm-structure-cell grid-column-total-title';
                    totalcell.classList.add('align-' + captionalign);
                    totalcell.style.width = captionwidth;
                    totalcell.innerHTML = this.replaceHTMLPlaceholder(captiontitle);
                } else {
                    if (this.hasrowtotals && i === (columncount - 1)) {
                        // tables with column and row totals also have grand totals
                        this.hasgrandtotal = true;
                        totalcell.className = 'm-structure-cell m-structure-cell-total grid-grandtotal';
                        totalcell.innerHTML = '<div class="a-label-total-grand a-label-total"><span>0</span></div>';
                    } else {
                        totalcell.className = 'm-structure-cell grid-column-total';
                        totalcell.classList.add('align-' + figurealign);

                        if (Array.isArray(props['exceptions']) && props['exceptions'].indexOf(i) >= 0) {
                            continue;
                        }

                        var htmlString = '';

                        if (props['labels'] && props['labels']['pre']) {
                            htmlString += '<span class="a-label-prelabel">'
                                + props['labels']['pre']
                                + '</span>';
                        }

                        htmlString += '<div class="a-label-total-column a-label-total" '
                            + 'data-colnumber="' + i + '" '
                            + 'style="' + figurewidth + '"'
                            + '><span>0</span></div>';

                        if (props['labels'] && props['labels']['post']) {
                            htmlString += '<span class="a-label-postlabel">'
                                + props['labels']['post']
                                + '</span>';
                        }

                        totalcell.innerHTML = this.replaceHTMLPlaceholder(htmlString);
                    }
                }
            }
        }

        return oQuestionGrid;

    });
