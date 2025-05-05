import { OQuestionContainerHtml } from './QuestionContainer';

export default {
    title: 'Organisms/Question Container',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
};

export const OQuestionContainer = {
    render: () => OQuestionContainerHtml(),
};
OQuestionContainer.storyName = '<o-question-container>';
