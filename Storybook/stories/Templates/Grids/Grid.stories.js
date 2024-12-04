import { GridCustomPropertiesHtml } from './Grid';

export default {
    title: 'Templates/Grids/t-grid',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
    argTypes: {
        CellshadingRowheader: {
            control: 'boolean',
            description: 'Indicates whether table header is shaded.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        CellshadingAltrows: {
            control: 'boolean',
            description: 'Indicates whether alternate table rows are shaded.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        TotalsRowsVisible: {
            control: 'boolean',
            description: 'Indicates whether totals are added to the table rows.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        TotalsRowsExceptions: {
            control: 'select',
            options: ['[]', '[1]'],
            description: 'Indicates whether an exception should be made for a table row, based on its index (where 1 is the first row, ignoring headings).',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: '[1]' }
            },
        },
        TotalsColumnsVisible: {
            control: 'boolean',
            description: 'Indicates whether totals are added to the table columns.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        TotalsColumnsExceptions: {
            control: 'select',
            options: ['[]', '[1]'],
            description: 'Indicates whether an exception should be made for a table column, based on its index (where 1 is the first column, ignoring headings).',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: '[1]' }
            },
        },
        TotalsCaption: {
            control: 'text',
            description: 'Specifies the caption for the totals.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        TotalsLabelPre: {
            control: 'text',
            description: 'Specifies the pre-label to be added to the totals.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        TotalsLabelPost: {
            control: 'text',
            description: 'Specifies the post-label to be added to the totals.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
    },
};

export const GridCustomProperties = {
    args: {
        CellshadingRowheader: false,
        CellshadingAltrows: true,
        TotalsRowsVisible: false,
        TotalsRowsExceptions: '[1]',
        TotalsColumnsVisible: true,
        TotalsColumnsExceptions: '[]',
        TotalsCaption: 'Totals',
        TotalsLabelPre: '',
        TotalsLabelPost: '%',
    },
    render: (args) => GridCustomPropertiesHtml(args),
};
