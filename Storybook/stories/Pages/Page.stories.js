import { PageHtml } from './Page';

export default {
    title: 'Pages/Page Layout',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const Page = {
    render: () => PageHtml(),
};
