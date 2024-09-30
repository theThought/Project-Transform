/** @type { import('@storybook/html').Preview } */
const preview = {
    parameters: {
        options: {
            storySort: {
                order: ['Templates', 'Pages'],
            },
        },
    },
    // globalTypes: {
    //     stylesheets: {
    //         themes: [
    //             {
    //                 id: "default-theme",
    //                 title: "Default theme",
    //                 url: "./build/ui/default/css/index.css",
    //             },
    //             {
    //                 id: "theme1-theme",
    //                 title: "Theme1",
    //                 url: "./build/ui/theme1/css/index.css",
    //             }
    //         ],
    //     },
    // },
};

export default preview;
