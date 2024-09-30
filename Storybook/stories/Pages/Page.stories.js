import { PageHtml } from './Page';

export default {
    title: 'Pages/Page Layout',
    parameters: {
        status: {
            type: 'stable',
        },
    },
};

export const Page = {
    render: () => PageHtml(),
};
