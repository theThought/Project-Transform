import { ExampleHtml } from './Example';

export default {
    title: 'Introduction/Example',
    parameters: {
        status: { type: 'stable' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
    argTypes: {
        ButtonStyle: {
            control: 'select',
            options: ['a-button', 'a-button-test'],
            description: 'Button CSS classname.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'n/a' }
            },
        },
        ButtonLabel: {
            control: 'text',
            description: 'Button label.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
    }
};

export const Example = {
    args: {
        ButtonLabel: 'Button label'
    },
    render: (args) => ExampleHtml(args),
};
