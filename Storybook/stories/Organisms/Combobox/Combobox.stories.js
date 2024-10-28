import { ComboboxHtml } from './Combobox';

export default {
    title: 'Organisms/Combobox',
    parameters: {
        status: {
            type: 'beta',
        },
    }
};

export const Combobox = {
    render: () => ComboboxHtml(),
};
Combobox.storyName = 'o-combobox';
