import { GridCustomPropertiesHtml } from './Grid';

export default {
    title: 'Templates/Grids/t-grid',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const GridCustomProperties = {
    render: (args) => GridCustomPropertiesHtml(args),
};
