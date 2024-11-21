import { ScaleHorizontalHtml } from './Scale';

export default {
    title: 'Templates/Sliders & Scales/t-scale',
    parameters: {
        status: {
            type: 'beta',
        },
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
            options: ['inside', 'outside'],
            description: 'TBC.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'inside' }
            },
        },
        LabelsPre: {
            control: 'text',
            description: 'Sets the text label for the scale min value.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        LabelsPost: {
            control: 'text',
            description: 'Sets the text label for the scale max value.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
    }
};

export const ScaleHorizontal = {
    args: {
        ValuesMin: 0,
        ValuesMax: 10,
        ValuesPosition: 'inside',
        LabelsPre: 'very dissatisfied',
        LabelsPost: 'very satisfied',
    },
    render: (args) => ScaleHorizontalHtml(args),
};
