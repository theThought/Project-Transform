/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    staticDirs: ['../public', '../../Survey'],
    addons: [
        '@storybook/addon-a11y',
        {
            name: '@storybook/addon-essentials',
            options: {
            actions: false,
            backgrounds: false,
            }
        },
        '@etchteam/storybook-addon-status',
        'storybook-theme-switch-addon'
    ],
    framework: {
        name: '@storybook/html-vite',
        options: {},
    },
    docs: {
        autodocs: true,
    },
};
export default config;
