import {
    InputSinglelineEditHtml
} from './Input';

export default {
    title: 'Atoms/Inputs',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const InputSinglelineEdit = {
    render: () => InputSinglelineEditHtml(),
};
InputSinglelineEdit.storyName = 'a-input-singlelineedit';
