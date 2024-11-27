import { GridCustomPropertiesHtml } from './Grid';

export default {
    title: 'Templates/Grids/t-grid',
    parameters: {
        status: {
            type: 'beta',
        },
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
            description: 'Indicates whether an exception should be made for 1st table row.',
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
            description: 'Indicates whether an exception should be made for 1st table column.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: '[1]' }
            },
        },
    },
};

export const GridCustomProperties = {
    args: {
        CellshadingRowheader: false,
        CellshadingAltrows: false,
        TotalsRowsVisible: false,
        TotalsRowsExceptions: '[1]',
        TotalsColumnsVisible: true,
        TotalsColumnsExceptions: '[]',
    },
    render: (args) => GridCustomPropertiesHtml(args),
};
