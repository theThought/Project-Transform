import {
    LabelQuestionUsingLabelHtml,
    LabelQuestionUsingDivHtml
} from './Label';

export default {
    title: 'Atoms/Labels',
    parameters: {
        status: {
            type: 'beta',
        },
    }
};

export const LabelQuestionUsingLabel = {
    render: () => LabelQuestionUsingLabelHtml(),
};
LabelQuestionUsingLabel.storyName = 'a-label-question using <label>';

export const LabelQuestionUsingDiv = {
    render: () => LabelQuestionUsingDivHtml(),
};
LabelQuestionUsingDiv.storyName = 'a-label-question using <div>';
