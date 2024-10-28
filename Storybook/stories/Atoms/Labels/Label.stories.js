import {
    LabelQuestionHtml,
    LabelOptionHtml,
    LabelInstructiontionHtml,
    LabelPrelabelHtml,
    LabelPostlabelHtml,
    LabelHeadingSublistHtml
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

export const LabelOption = {
    render: () => LabelOptionHtml(),
};
LabelOption.storyName = 'a-label-option';

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

export const LabelHeadingSublist = {
    render: () => LabelHeadingSublistHtml(),
};
LabelHeadingSublist.storyName = 'a-label-heading-sublist';
