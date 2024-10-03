# Project Transform Storybook
This is the component library for [Project Transform](https://zeroheight.com/61aada3a1/p/264eaa-project-transform).

## Launch Storybook locally
> - NOTE: Use the correct Node version as listed in `.nvmrc`. If necessary, install Node Version Manager (NVM).

1. `cd Storybook`.
2. `npm run storybook`.

## Re-ordering stories in sidebar navigation
- All stories and docs are ordered according to the `storySort` configuration in `Storybook/.storybook/preview.js`.

## CSS/JS filepaths
- Storybook's static directory is defined by the `staticDirs: ['../public', '../../Survey']` array inside `./Storybook/main.js`.

## Toggling UI themes in Storybook
- Uses the `storybook-theme-switch-addon` button in the toolbar (paint brush icon).
- This works in both local and published Storybooks.
- Theme CSS file paths are defined in `.storybook/preview.js`.

## Build and publish Storybook locally
- `npm run publish-storybook` - Builds all Storybook dependencies, and copies output to `storybook-static` folder.
- `npx http-server ./storybook-static` - Test Storybook production build on local server.

## Publish Storybook using GitHub Pages
- Uses the workflow defined in `.github/workflows/static.yml`.
- Live Storybook URL = https://theThought.github.io/Project-Transform

## TODO
- Improve HTML semantics, and use `ARIA` to enhance accessibility.
- Setup Parcel bundler to transpile/compile/bundle Sass/JavaScript.
- Leverage Hot Module Reloading.
- Setup linters & Git pre-commit hooks.
- Setup VSCode and editor configs in root.
