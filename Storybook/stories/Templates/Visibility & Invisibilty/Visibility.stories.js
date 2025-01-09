import { VisibilityHtml } from './Visibility';

export default {
    title: 'Templates/Visibility & Invisibility/TEST',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
};

export const Visibility = {
    render: (args) => VisibilityHtml(args),
};
