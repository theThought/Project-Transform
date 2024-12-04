import { PageLayoutHtml } from './Page';

export default {
    title: 'Pages/Page Layout',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
    argTypes: {
        PageLayout: {
            control: 'select',
            options: ['sidebyside', 'vertical'],
            description: 'Page property - arrange form control(s) alongside question, or below.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'sidebyside' }
            },
        },
        FocusQuestion: {
            control: 'boolean',
            description: 'Page property - indicates whether the current question has focus.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            },
        },
        SideBySide: {
            control: 'select',
            options: ['20', '30', '40', '50'],
            description: 'Page property - width of question text, as a percentage of  available width.',
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
