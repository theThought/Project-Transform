import { GridCategoricalHtml, GridMultipleControlsHtml } from './Grid';

export default {
    title: 'Templates/Grids/t-grid',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const GridCategorical = {
    render: () => GridCategoricalHtml(),
};

export const GridMultipleControls = {
    render: () => GridMultipleControlsHtml(),
};
