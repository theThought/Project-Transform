import { VisibleContainsAnyHtml } from './Visibility';

export default {
    title: 'Templates/Visibility & Invisibility',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
};

export const VisibleContainsAny = {
    render: () => VisibleContainsAnyHtml(),
};
VisibleContainsAny.storyName = 'ContainsAny() example'
