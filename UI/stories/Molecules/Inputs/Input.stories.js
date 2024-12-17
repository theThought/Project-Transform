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
    }
};

export const MInputSinglelineEdit = {
    args: {
        InputType: 'text'
    },
    render: (args) => MInputSinglelineEditHtml(args),
};
MInputSinglelineEdit.storyName = '<m-input-singlelineedit>';
