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
        pagePropertiesFocusControl: {
            control: 'boolean',
            description: 'Indicates whether the current control has focus.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        pagePropertiesSideBySide: {
            control: 'select',
            options: ['20', '30', '40', '50'],
            description: 'Flex basis for question text, as a percentage of  available width.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: '30' }
            },
        },
    }
};

export const ChoiceBasic = {
    render: (args) => ChoiceBasicHtml(args),
};
