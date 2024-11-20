import { SliderVerticalHtml } from './Slider';

export default {
    title: 'Templates/Sliders/t-slider',
    parameters: {
        status: {
            type: 'beta',
        },
    },
};

export const SliderVertical = {
    render: (args) => SliderVerticalHtml(args),
};
