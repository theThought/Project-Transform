import { OQuestionHtml } from './Question';

export default {
    title: 'Organisms/Question',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
};

export const OQuestion = {
    render: () => OQuestionHtml(),
};
OQuestion.storyName = '<o-question>';
