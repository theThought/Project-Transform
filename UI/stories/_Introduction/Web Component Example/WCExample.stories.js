import { WCExampleHtml } from './WCExample';

export default {
    title: 'Introduction/Web Component Example',
    parameters: {
        status: { type: 'stable' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
    argTypes: {
        Attribute: {
            control: 'text',
            description: 'Demo Web Component "attributeChangedCallback()" lifecycle method.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
    }
};

export const WCExample = {
    args: {
        Attribute: 'test'
    },
    render: (args) => WCExampleHtml(args),
};
WCExample.storyName = '<wc-example>';
