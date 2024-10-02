import {
    OptionSingleHtml,
    OptionMultiHtml
} from './Option';

export default {
    title: 'Molecules/Options',
    parameters: {
        status: {
            type: 'beta',
        },
    }
};

export const OptionSingle = {
    render: () => OptionSingleHtml(),
};
OptionSingle.storyName = 'm-option-single-answer';

export const OptionMulti = {
    render: () => OptionMultiHtml(),
};
OptionMulti.storyName = 'm-option-multi-answer';
