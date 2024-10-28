import { DropdownHtml } from './Dropdown';

export default {
    title: 'Organisms/Dropdown',
    parameters: {
        status: {
            type: 'beta',
        },
    }
};

export const Dropdown = {
    render: () => DropdownHtml(),
};
Dropdown.storyName = 'o-dropdown';
