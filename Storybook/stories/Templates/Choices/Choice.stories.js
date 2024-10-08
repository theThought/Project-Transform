import { ChoiceOtherSpecifyHtml } from './Choice';

export default {
    title: 'Templates/Choices/t-choice',
    parameters: {
        status: {
            type: 'beta',
        },
    },
    argTypes: {
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
            description: 'Flex basis for question text, as a percentage of  available width.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: '30' }
            },
        },
    }
};

export const ChoiceOtherSpecify = {
    args: {
        pageLayout: 'sidebyside',
    },
    render: (args) => ChoiceOtherSpecifyHtml(args),
};
