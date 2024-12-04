import { ScaleHorizontalHtml, ScaleVerticalHtml } from './Scale';

export default {
    title: 'Templates/Sliders & Scales/t-scale',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
    argTypes: {
        ValuesMin: {
            control: 'number',
            description: 'Minimum numeric value for scale.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 'n/a' }
            },
        },
        ValuesMax: {
            control: 'number',
            description: 'Maximum numeric value for scale.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 'n/a' }
            },
        },
        ValuesPosition: {
            control: 'select',
            options: ['inside', 'above', 'below', 'none'],
            description: 'Indicates where the values assigned to each unit should be positioned.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'inside' }
            },
        },
        LabelsPre: {
            control: 'text',
            description: 'Sets the pre-label text for the minimum end of the scale.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        LabelsPost: {
            control: 'text',
            description: 'Sets the post-label text for the maximum end of the scale.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
    }
};

export const ScaleHorizontal = {
    args: {
        ValuesPosition: 'inside',
        LabelsPre: 'very dissatisfied',
        LabelsPost: 'very satisfied',
    },
    render: (args) => ScaleHorizontalHtml(args),
};

export const ScaleVertical = {
    args: {
        ValuesPosition: 'inside',
        LabelsPre: 'very dissatisfied',
        LabelsPost: 'very satisfied',
    },
    render: (args) => ScaleVerticalHtml(args),
};
