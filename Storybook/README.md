# Project Transform Storybook
This is the component library for [Project Transform](https://zeroheight.com/61aada3a1/p/264eaa-project-transform).

## Launch Storybook locally
> - NOTE: Use the correct Node version as listed in `.nvmrc`. If necessary, install Node Version Manager (NVM).

1. `cd Storybook`.
2. `npm run storybook`.

## Re-ordering stories in sidebar navigation
- All stories and docs are ordered according to the `storySort` configuration in `Storybook/.storybook/preview.js`.

## Build and publish Storybook locally
- `npm run publish-storybook` - Builds all Storybook dependencies, and copies output to `storybook-static` folder.
- `npx http-server ./storybook-static` - Test Storybook production build on local server.

## Publish Storybook using GitHub Pages
- Uses the workflow defined in `.github/workflows/static.yml`.
- Live Storybook URL = https://theThought.github.io/Project-Transform

## TODO
- Setup Parcel bundler to transpile/compile/bundle Sass/JavaScript.
- Setup linters & Git pre-commit hooks.
- Setup VSCode and editor configs in root.
