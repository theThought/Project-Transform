import {
    ChoiceHtml,
    ChoiceSublistsHtml,
    ChoiceOtherSpecifyHtml
} from './Choice';

export default {
    title: 'Templates/Choices/t-choice',
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

export const Choice = {
    render: (args) => ChoiceHtml(args),
};

export const ChoiceSublists = {
    render: (args) => ChoiceSublistsHtml(args),
};

export const ChoiceOtherSpecify = {
    render: (args) => ChoiceOtherSpecifyHtml(args),
};
