import { ExampleHtml } from './Example';

export default {
    title: 'Templates/1. Example Question Template',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
    argTypes: {
        ExampleCustomProp: {
            control: 'text',
            description: 'Example custom property.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
    }
};

export const Example = {
    args: {
        ExampleCustomProp: 'test'
    },
    render: (args) => ExampleHtml(args),
};
