import { LabelQuestionHtml } from './Label';

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
