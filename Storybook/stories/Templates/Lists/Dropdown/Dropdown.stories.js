import { DropdownHtml } from './Dropdown';

export default {
    title: 'Templates/Lists/t-dropdown',
    parameters: {
        status: {
            type: 'beta',
        },
    },
    argTypes: {
        JumpToFirstLetter: {
            control: 'boolean',
            description: 'Navigate to first matching entry when respondent types a character.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' }
            },
        },
        ListSize: {
            control: 'number',
            description: 'Configures how many options should be displayed in the list.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 'n/a' }
            },
        },
        ListSource: {
            control: 'text',
            description: 'Identifier for an existing list to re-use data.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        Placeholder: {
            control: 'text',
            description: 'Defines the text to be displayed if no option is selected.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
    }
};

export const Dropdown = {
    args: {
        JumpToFirstLetter: true
    },
    render: (args) => DropdownHtml(args),
};