import {
    InputSinglelineHtml,
    InputSinglelineDateHtml,
    InputSinglelineNumberHtml,
    InputMultilineHtml
} from './Input';

export default {
    title: 'Atoms/Inputs',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const InputSingleline = {
    render: () => InputSinglelineHtml(),
};
InputSingleline.storyName = 'a-input-singleline';

export const InputSinglelineDate = {
    render: () => InputSinglelineDateHtml(),
};
InputSinglelineDate.storyName = 'a-input-singleline (date)';

export const InputSinglelineNumber = {
    render: () => InputSinglelineNumberHtml(),
};
InputSinglelineNumber.storyName = 'a-input-singleline (number)';

export const InputMultiline = {
    render: () => InputMultilineHtml(),
};
InputMultiline.storyName = 'a-input-multiline';
