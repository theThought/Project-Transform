import { SingleLineSpecialCodesHtml } from './SingleLine';

export default {
    title: 'Templates/Open-ends/t-singleline',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const SingleLineSpecialCodes = {
    render: () => SingleLineSpecialCodesHtml(),
};
