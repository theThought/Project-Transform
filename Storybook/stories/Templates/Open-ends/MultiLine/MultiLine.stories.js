import { MultiLineHtml } from './MultiLine';

export default {
    title: 'Templates/Open-ends/t-multiline',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const MultiLine = {
    render: () => MultiLineHtml(),
};
