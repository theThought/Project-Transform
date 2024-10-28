import { OptionListHtml } from './List';

export default {
    title: 'Molecules/Lists',
    parameters: {
        status: {
            type: 'beta',
        },
    }
};

export const OptionList = {
    render: () => OptionListHtml(),
};
OptionList.storyName = 'm-list';
