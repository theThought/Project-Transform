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
        ShowMarks: {
            control: 'boolean',
            description: 'Indicates whether scale track marks (dividers) are shown.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        ShowValue: {
            control: 'boolean',
            description: 'Indicates whether the selected value is shown.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        ShowTerminators: {
            control: 'boolean',
            description: 'Indicates whether increment & decrement buttons are shown.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        TickLabels: {
            control: 'text',
            description: 'Determines which incremental "steps" are shown in the scale.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: '10' }
            },
        },
        FloodToValue: {
            control: 'boolean',
            description: 'Indicates whether the scale track is filled with a solid colour up to the selected value.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
    }
};

export const ScaleHorizontal = {
    args: {
        ValuesMin: 0,
        ValuesMax: 100,
        ShowMarks: false,
        ShowValue: false,
        ShowTerminators: false,
        FloodToValue: false
    },
    render: (args) => ScaleHorizontalHtml(args),
};
