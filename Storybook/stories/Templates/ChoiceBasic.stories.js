import { ChoiceBasicHtml } from './ChoiceBasic';

export default {
    title: 'Templates/Choice Basic',
    parameters: {
        status: {
            type: 'stable',
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
