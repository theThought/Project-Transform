import { SublistHtml } from './Sublist';

export default {
    title: 'Organisms/Sublist',
    parameters: {
        status: {
            type: 'beta',
        },
    }
};

export const Sublist = {
    render: () => SublistHtml(),
};
Sublist.storyName = 'o-option-sublist';
