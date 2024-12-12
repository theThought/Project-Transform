import { WCExampleHtml } from './WCExample';

export default {
    title: 'Introduction/Web Component Example',
    parameters: {
        status: {
            type: 'stable',
        },
    },
};

export const WCExample = {
    render: () => WCExampleHtml(),
};
WCExample.storyName = '<wc-example>';
