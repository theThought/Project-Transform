import {
    InputSinglelineHtml
} from './Input';

export default {
    title: 'Atoms/Inputs',
    parameters: {
        status: {
            type: 'beta',
        },
    }
};

export const InputSingleline = {
    render: () => InputSinglelineHtml(),
};
InputSingleline.storyName = 'a-input-singleline';
