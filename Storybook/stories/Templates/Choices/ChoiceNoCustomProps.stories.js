import { ChoiceOtherSpecifyHtml } from './Choice';

export default {
    title: 'Templates/Choices/t-choice',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const ChoiceOtherSpecify = {
    render: () => ChoiceOtherSpecifyHtml(),
};
