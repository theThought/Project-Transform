import { ChoiceBasicHtml } from './ChoiceBasic';

export default {
    title: 'Templates/Choices/t-choice Basic',
    parameters: {
        status: {
            type: 'beta',
        },
    },
    argTypes: {
        pagePropertiesFocusQuestion: {
            control: 'boolean',
            description: 'Indicates whether the current question has focus.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
    }
};

export const ChoiceBasic = {
    render: (args) => ChoiceBasicHtml(args),
};
