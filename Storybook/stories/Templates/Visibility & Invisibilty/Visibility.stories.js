import {
    VisibleContainsAnyHtml,
    VisibleMathsOperandHtml,
    AlternativeLabelsHtml
} from './Visibility';

export default {
    title: 'Templates/Visibility & Invisibility',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
};

export const VisibleContainsAny = {
    render: () => VisibleContainsAnyHtml(),
};
VisibleContainsAny.storyName = 'Visibility with ContainsAny()'

export const VisibleMathsOperand = {
    render: () => VisibleMathsOperandHtml(),
};
VisibleMathsOperand.storyName = 'Visibility with ">" Mathematical Operand'

export const AlternativeLabels = {
    render: () => AlternativeLabelsHtml(),
};
