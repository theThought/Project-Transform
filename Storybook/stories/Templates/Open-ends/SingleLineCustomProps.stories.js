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
    }
};

export const SingleLineCustomProperties = {
    args: {
        customPropertyInputType: 'text'
    },
    render: (args) => SingleLineCustomPropertiesHtml(args),
};
