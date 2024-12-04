import { ComboboxHtml } from './Combobox';

export default {
    title: 'Templates/Lists/t-combobox',
    parameters: {
        status: { type: 'beta' },
        controls: { sort: 'alpha' },
        docs: { controls: { sort: 'alpha' } }
    },
    argTypes: {
        ListSize: {
            control: { type: 'number', min: 0 },
            description: 'Configures how many options should be displayed in the list.',
            table: {
                type: { summary: 'number', min: 0 },
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
        Exact: {
            control: 'boolean',
            description: 'automatically selects an option if it exactly matches the respondent\'s input.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' }
            },
        },
        FilterType: {
            control: 'select',
            options: ['contains', 'starts'],
            description: 'Determines how options are filtered.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'contains' }
            },
        },
        MinCharactersForList: {
            control: { type: 'number', min: 0 },
            description: 'Defines how many characters must be typed before the list is displayed.',
            table: {
                type: { summary: 'number', min: 0 },
                defaultValue: { summary: 0 }
            },
        },
        NotEnoughCharacters: {
            control: 'text',
            description: 'Defines a message to be displayed before "mincharactersforlist" is met.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        NoItemsInList: {
            control: 'text',
            description: 'Defines a message to be displayed if there are no matching options.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
    }
};

export const Combobox = {
    args: {
        Exact: true,
        FilterType: 'contains',
        MinCharactersForList: 1,
        NotEnoughCharacters: 'You need to type at least one character',
        NoItemsInList: 'No items match this filter',
        Placeholder: 'Placeholder for combobox'
    },
    render: (args) => ComboboxHtml(args),
};
