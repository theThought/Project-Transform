import {
    PageLayoutSideBySideHtml,
    PageLayoutVerticalHtml
} from './Page';

export default {
    title: 'Pages/Page Layout',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const PageLayoutSideBySide = {
    render: () => PageLayoutSideBySideHtml(),
};

export const PageLayoutVertical = {
    render: () => PageLayoutVerticalHtml(),
};
