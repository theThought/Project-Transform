import { MInputSinglelineEditHtml } from './Input';

export default {
    title: 'Molecules/Inputs',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
    argTypes: {
        InputType: {
            control: 'select',
            options: ['text', 'number', 'date'],
            description: 'Provides the "type" attribute for the HTML input tag.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'text' }
            },
        },
        PreLabel: {
            control: 'text',
            description: 'Specifies the text to be placed before the input.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        PostLabel: {
            control: 'text',
            description: 'Specifies the text to be placed after the input.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
    }
};

export const MInputSinglelineEdit = {
    args: {
        InputType: 'text',
        PreLabel: '',
        PostLabel: ''
    },
    render: (args) => MInputSinglelineEditHtml(args),
};
MInputSinglelineEdit.storyName = '<m-input-singlelineedit>';
