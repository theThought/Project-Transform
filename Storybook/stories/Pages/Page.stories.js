import { PageLayoutHtml } from './Page';

export default {
    title: 'Pages/Page Layout',
    parameters: {
        status: {
            type: 'beta',
        },
    },
    argTypes: {
        pageLayout: {
            control: 'select',
            options: ['sidebyside', 'vertical'],
            description: 'Arrange form control(s) alongside question, or below.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'sidebyside' }
            },
        },
        pagePropertyFocusQuestion: {
            control: 'boolean',
            description: 'Indicates whether the current question has focus.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        pagePropertySideBySide: {
            control: 'select',
            options: ['20', '30', '40', '50'],
            description: 'Width of question text, as a percentage of  available width.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: '30' }
            },
        },
    }
};

export const PageLayout = {
    render: (args) => PageLayoutHtml(args),
};
