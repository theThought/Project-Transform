import { ChoiceCustomPropertiesHtml } from './Choice';

export default {
    title: 'Templates/Choices/t-choice',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
    argTypes: {
        Balance: {
            control: 'boolean',
            description: 'Indicates whether balance is enabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        BalanceMinWidth: {
            control: 'text',
            description: 'Indicates the smallest width of an item (in "px" or "em").',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        OneSize: {
            control: 'boolean',
            description: 'Indicates whether onesize is enabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        OneSizeMaxWidth: {
            control: 'text',
            description: 'Indicates the largest width of an item (in "px" or "em").',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        SublistLine: {
            control: 'boolean',
            description: 'Indicates whether sublist separator is displayed.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        SublistLineLength: {
            control: 'select',
            options: [10, 25, 50, 75, 100],
            description: 'Indicates the length of the line in percentage terms.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 25 }
            },
        },
    }
};

export const ChoiceCustomProperties = {
    render: (args) => ChoiceCustomPropertiesHtml(args),
};
