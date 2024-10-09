import { ChoiceCustomPropertiesHtml } from './Choice';

export default {
    title: 'Templates/Choices/t-choice',
    parameters: {
        status: {
            type: 'beta',
        },
    },
    argTypes: {
        customPropertyBalanceState: {
            control: 'boolean',
            description: 'Indicates whether balance is enabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        customPropertyBalanceMinWidth: {
            control: 'text',
            description: 'Indicates the smallest width of an item (in "px" or "em").',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        customPropertyOneSizeState: {
            control: 'boolean',
            description: 'Indicates whether onesize is enabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        customPropertyOneSizeMaxWidth: {
            control: 'text',
            description: 'Indicates the largest width of an item (in "px" or "em").',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        customPropertySublistLineState: {
            control: 'boolean',
            description: 'Indicates whether sublist separator is displayed.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        customPropertySublistLineLength: {
            control: 'number',
            description: 'Indicates the length of the line in percentage terms.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '25' }
            },
        },
    }
};

export const ChoiceCustomProperties = {
    render: (args) => ChoiceCustomPropertiesHtml(args),
};
