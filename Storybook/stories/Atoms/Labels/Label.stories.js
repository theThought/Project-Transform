import {
    LabelQuestionHtml,
    LabelInstructiontionHtml,
    LabelPrelabelHtml,
    LabelPostlabelHtml
} from './Label';

export default {
    title: 'Atoms/Labels',
    parameters: {
        status: {
            type: 'beta',
        },
    }
};

export const LabelQuestion = {
    render: () => LabelQuestionHtml(),
};
LabelQuestion.storyName = 'a-label-question';

export const LabelInstructiontion = {
    render: () => LabelInstructiontionHtml(),
};
LabelInstructiontion.storyName = 'a-label-instruction';

export const LabelPrelabel = {
    render: () => LabelPrelabelHtml(),
};
LabelPrelabel.storyName = 'a-label-prelabel';

export const LabelPostlabel = {
    render: () => LabelPostlabelHtml(),
};
LabelPostlabel.storyName = 'a-label-postlabel';
