import { ExampleNoArgsHtml } from './Example';

export default {
    title: 'Introduction/Example',
    parameters: {
        status: {
            type: 'stable',
        },
    },
};

export const ExampleNoArgs = {
    render: () => ExampleNoArgsHtml(),
};
