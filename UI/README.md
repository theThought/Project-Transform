# Project Transform Storybook
This is the NEW POC component library for [Project Transform](https://zeroheight.com/61aada3a1/p/264eaa-project-transform).

## Launch Storybook locally
> - NOTE: Use the correct Node version as listed in `.nvmrc`. If necessary, install Node Version Manager (NVM).

1. `cd Storybook`.
2. `npm run storybook`.

## Re-ordering stories in sidebar navigation
- All stories and docs are ordered according to the `storySort` configuration in `.storybook/preview.js`.

## CSS/JS filepaths
- Storybook's static directory is defined by the `staticDirs: ['../public', '../../Survey']` array inside `.storybook/main.js`.

## Toggling UI themes in Storybook - TBC

## Build and publish Storybook locally
- `npm run publish-storybook` - Builds all Storybook dependencies, and copies output to `storybook-static` folder.
- `npx http-server ./storybook-static` - Test Storybook production build on local server.

## Publish Storybook using GitHub Pages - TBC
- Uses the workflow defined in `./.github/workflows/static.yml`.
- Live Storybook URL = https://theThought.github.io/Project-Transform

## TODO
- Replace Storybook theme switcher addon with new CSS theming mechanism. TBC
- Update Github workflow to publish this Storybook instance.

- Setup Parcel bundler to transpile/compile/bundle Sass/JavaScript.
- Leverage Hot Module Reloading.
- Setup linters & Git pre-commit hooks.
- Setup VSCode and editor configs in root.
