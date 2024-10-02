import {
    SingleLineHtml,
    SingleLineDateHtml,
    SingleLinePrePostLabelsHtml,
    SingleLineSpecialCodesHtml
} from './SingleLine';

export default {
    title: 'Templates/Open-ends/t-singleline',
    parameters: {
        status: {
            type: 'beta',
        },
    },
    argTypes: {
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

export const SingleLine = {
    render: (args) => SingleLineHtml(args),
};

export const SingleLineDate = {
    render: (args) => SingleLineDateHtml(args),
};

export const SingleLinePrePostLabels = {
    render: (args) => SingleLinePrePostLabelsHtml(args),
};

export const SingleLineSpecialCodes = {
    render: (args) => SingleLineSpecialCodesHtml(args),
};
