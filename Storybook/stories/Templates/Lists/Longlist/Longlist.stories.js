import { LonglistHtml } from './Longlist';

export default {
    title: 'Templates/Lists/t-longlist',
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
        Placeholder: {
            control: 'text',
            description: 'Defines the text to be displayed if no option is selected.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
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
        ListLocation: {
            control: 'select',
            options: ['internal', 'external'],
            description: 'Determines if the list is internal to the webpage, or defined as an external URL.',
            table: {
                type: { summary: 'select' },
                defaultValue: { summary: 'internal' }
            },
        },
        ListSource: {
            control: 'text',
            description: 'CSS classname of the script tag being used to create the internal list.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        ListValueFrom: {
            control: 'text',
            description: 'Name of the field in the list that is stored in the data collection platform when a respondent selects an option.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        ListDescriptionFrom: {
            control: 'text',
            description: 'Name of the field in the list that is used to create the list on the screen.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        ShowAnswers: {
            control: 'boolean',
            description: 'Selected answer is shown as a tag above the control.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' }
            },
        },
        PromptsSelection: {
            control: 'text',
            description: 'Additional prompt. Appears to the left of the selected item. Clarifies the purpose of the tag.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
        PromptsListCount: {
            control: 'text',
            description: 'Additional prompt. Appears after the value that counts how many matching items there are in the text.',
            table: {
                type: { summary: 'text' },
                defaultValue: { summary: 'n/a' }
            },
        },
    }
};

export const Longlist = {
    args: {
        FilterType: 'contains',
        MinCharactersForList: 0,
        ListLocation: 'internal',
        ListSource: 'a-list',
        ListValueFrom: 'name',
        ListDescriptionFrom: 'name',
        ShowAnswers: true,
        PromptsListCount: 'items found',
        Placeholder: 'Placeholder for long list'
    },
    render: (args) => LonglistHtml(args),
};
Longlist.storyName = 't-longlist (t-openend-search)';
