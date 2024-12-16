import { AInputSinglelineEditHtml } from './Input';

export default {
    title: 'Atoms/Inputs',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const AInputSinglelineEdit = {
    render: () => AInputSinglelineEditHtml(),
};
AInputSinglelineEdit.storyName = 'a-input-singlelineedit';
