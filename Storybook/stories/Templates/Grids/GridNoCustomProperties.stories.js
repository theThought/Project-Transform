import { GridCategoricalHtml, GridComplexHtml,GridCategoricalRotatedHtml } from './Grid';

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

export const GridComplex = {
    render: () => GridComplexHtml(),
};

export const GridCategoricalRotated = {
    render: () => GridCategoricalRotatedHtml(),
};
