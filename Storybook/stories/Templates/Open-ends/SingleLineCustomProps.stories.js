import { SingleLineCustomPropertiesHtml } from './SingleLine';

export default {
    title: 'Templates/Open-ends/t-singleline',
    parameters: {
        status: {
            type: 'beta',
        },
    },
    argTypes: {
        customPropertyInputType: {
            control: 'select',
            options: ['text', 'number', 'date'],
            description: 'Provides the "type" attribute for the HTML input tag.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'text' }
            },
        },
        customPropertyPreLabel: {
            control: 'text',
            description: 'Specifies the text to be placed before the input.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        customPropertyPostLabel: {
            control: 'text',
            description: 'Specifies the text to be placed after the input.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
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

export const SingleLineCustomProperties = {
    args: {
        pageLayout: 'sidebyside',
        customPropertyInputType: 'text'
    },
    render: (args) => SingleLineCustomPropertiesHtml(args),
};
