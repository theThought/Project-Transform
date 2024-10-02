/** @type { import('@storybook/html').Preview } */
const preview = {
    parameters: {
        options: {
            storySort: {
                order: ['Introduction','Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
            },
        },
    },
    globalTypes: {
        stylesheets: {
            themes: [
                {
                    id: "formal-theme",
                    title: "Formal theme",
                    url: "styles/formal/base.css",
                },
                {
                    id: "informal-theme",
                    title: "Informal theme",
                    url: "styles/informal/base.css",
                }
            ],
        },
    },
};

export default preview;
