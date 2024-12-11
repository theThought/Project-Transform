# Project Transform Storybook
This is the NEW POC component library for [Project Transform](https://zeroheight.com/61aada3a1/p/264eaa-project-transform).

## Launch Storybook locally and run Parcel bundler
> - NOTE: Use the correct Node version as listed in `.nvmrc`. If necessary, install Node Version Manager (NVM).

From `./UI/` folder:
- `npm run reset` - Deletes `node_modules` folder and reinstalls with `npm run install`.
- `npm start` - Installs Node modules (if not already installed), launches Parcel bundler to compile/watch files, and sets the port for HMR (Hot Module Reloading) to work in Storybook.
- `npm run storybook` - Launches Storybook/HTML component library. Run this in a different terminal instance to Parcel.
- `npm run build` - Compiles and minifies files, for production and local dev environments.

## Re-ordering stories in sidebar navigation
- All stories and docs are ordered according to the `storySort` configuration in `.storybook/preview.js`.

## CSS/JS filepaths
- Storybook's static directory is defined by the `staticDirs: ['../public', '../../Survey']` array inside `.storybook/main.js`.

## Linting
This component library provides lint configurations for both JavaScript and CSS.

### Linter configuration
- Install the following VSCode extensions:
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
    - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
- Where appropriate, additional NPM packages have been installed according to the `parser`, `extends`, `plugins` and `rules` fields in these configs:
    - `.eslintrc.js`
    - `.stylelintrc`
    - `.prettierrc`

> NOTES:
> - `Eslint` errors will only be shown in VSCode if you open VSCode from the project root directory, not a parent directory.
> - In order for `.eslintignore` to work correctly, there's a custom `.vscode/settings.json` in the root directory which defines the correct working directory (i.e. `ui` sub-directory).
> - `Postcss` has been installed as a `devDependency`, otherwise `stylelint` throws type errors due to its own postcss dependencies.
> - The VSCode `stylelint` extension introduced changes that break the `stylelint v14` NPM package. To fix this, the following settings have been added in the custom VSCode `settings.json` file:
> ```
> "css.validate": false,
> "stylelint.enable": true,
> "stylelint.validate": [
>     "css",
>     "postcss"
> ]
> ```

### Git pre-commit hooks
Configured using `husky` and `lint-staged` to ensure no linting errors are committed to the remote codebase.

> NOTE:
> Run `npm run prepare` from `./UI/` directory to install husky shell script. Do this just ONCE after cloning the repo.

### Other recommended extensions for VSCode
- [ES6 template literal syntax highlighter](https://marketplace.visualstudio.com/items?itemName=julienetie.vscode-template-literals). Useful when editing Storybook/HTML stories, which use ES6 template literals.

## Supported browsers
- The [default browserslist configuration](https://github.com/browserslist/browserslist#best-practices) has been defined in `package.json`.
- Run `npx browserslist` to see a list of supported browsers.

## Build and publish Storybook locally
- `npm run publish-storybook` - Builds all Storybook dependencies, and copies output to `storybook-static` folder.
- `npx http-server ./storybook-static` - Test Storybook production build on local server.

## Publish Storybook using GitHub Pages - TBC
- Uses the workflow defined in `./.github/workflows/static.yml`.
- Live Storybook URL = https://theThought.github.io/Project-Transform

## Additional required files in project root directory
- `.vscode/settings.json` defines the correct working directory for `.eslintignore` and `.stylelintrc`.
- `.editorconfig` ensures all code uses the same indentation.

## TODO
- Replace Storybook theme switcher addon with new CSS theming mechanism. TBC
- Update Github workflow to publish this Storybook instance.

- Setup Parcel bundler to transpile/compile/bundle Sass/JavaScript.
- Leverage Hot Module Reloading.
- Setup linters & Git pre-commit hooks.
- Setup VSCode and editor configs in root.
