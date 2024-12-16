import { MInputSinglelineEditHtml } from './Input';

export default {
    title: 'Molecules/Inputs',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const MInputSinglelineEdit = {
    render: () => MInputSinglelineEditHtml(),
};
MInputSinglelineEdit.storyName = '<m-input-singlelineedit>';
