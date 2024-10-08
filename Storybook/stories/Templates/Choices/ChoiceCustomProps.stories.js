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
            control: 'number',
            description: 'Indicates the smallest width of an item.',
            table: {
                type: { summary: 'number' },
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
            control: 'number',
            description: 'Indicates the largest width of an item.',
            table: {
                type: { summary: 'number' },
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
        pageLayout: {
            control: 'select',
            options: ['sidebyside', 'vertical'],
            description: 'Arrange form control(s) alongside question, or below.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'sidebyside' }
            },
        },
        pagePropertyFocusQuestion: {
            control: 'boolean',
            description: 'Indicates whether the current question has focus.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        pagePropertyFocusControl: {
            control: 'boolean',
            description: 'Indicates whether the current control has focus.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        pagePropertySideBySide: {
            control: 'select',
            options: ['20', '30', '40', '50'],
            description: 'Width of question text, as a percentage of  available width.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: '30' }
            },
        },
    }
};

export const ChoiceCustomProperties = {
    args: {
        pageLayout: 'sidebyside',
    },
    render: (args) => ChoiceCustomPropertiesHtml(args),
};
