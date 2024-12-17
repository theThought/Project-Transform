import { WCExampleHtml } from './WCExample';

export default {
    title: 'Introduction/Web Component Example',
    parameters: {
        status: { type: 'stable' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
    argTypes: {
        DataAttribute: {
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
        DataAttribute: 'test'
    },
    render: (args) => WCExampleHtml(args),
};
WCExample.storyName = '<wc-example>';
