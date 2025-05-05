/** @type { import('@storybook/html').Preview } */
const preview = {
    parameters: {
        options: {
            storySort: {
                order: ['Introduction','Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
            },
        },
    },
};

export default preview;
