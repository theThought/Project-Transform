# Project Transform Storybook
This is the NEW POC component library for [Project Transform](https://zeroheight.com/61aada3a1/p/264eaa-project-transform).

## Launch Storybook/HTML locally, and run Parcel bundler
> - NOTE: Use the correct Node version as listed in `.nvmrc`. If necessary, install Node Version Manager (NVM).

- `cd UI`.
- `npm start` - installs Node modules (if not already installed), launches Parcel bundler to compile/watch files.
- `npm run storybook` - launches Storybook/HTML component library. Run this in a different terminal instance to Parcel.
- `npm run build` - compiles and minifies files, for production use.

### Hot module reloading (HMR)
- The `npm start` command above doesn't actually start the default Parcel server.
- Instead, it simply [watches files and defines a port for the HMR server](https://parceljs.org/features/cli/#parcel-watch-%3Centries%3E).
- This means that Storybook updates automatically with any CSS/JavaScript changes.

## Parcel bundler
```
"start:parcel": "parcel watch src/javascript/index.ts --hmr-port 1234 --target app"
```
- This command does not need to be explicitly run as `npm start` does it for you.
- See the `HMR` section further up for an explanation of the `--hmr-port 1234` argument.
- The `--target app` argument enables transpilation of both CSS and JavaScript in **local DEV mode**. By default, Parcel only does this for production builds.

### JavaScript transpilation and differential bundling
- There's no need for a `.babelrc` config. See [Parcel default Babel presets](https://parceljs.org/languages/javascript/#default-presets).
    - Note that `babel-eslint` has been [deprecated](https://github.com/babel/babel-eslint) in favour of `@babel/eslint-parser`.
    - `@typescript-eslint/parser` is also needed, due to TypeScript usage.
    - Parcel leverages the `browserslist` config in `package.json` to determine what level of transpilation to perform.
- The JavaScript bundles contains non-transpiled `ES6+` code for modern browsers, and transpiled `ES5` code for legacy browsers. See [Parcel differential bundling](https://parceljs.org/features/targets/#differential-bundling).

### TypeScript
- Parcel [automatically transpiles TypeScript](https://parceljs.org/languages/typescript/).
    - The `typescript` NPM package is required for `ESLint` and `Prettier` to work together.
    - A `tsconfig.json` is needed, even if it's empty. Otherwise, TypeScript errors/warnings are not displayed in the editor.

### Polyfills
- A separate `polyfills` bundle is created for browsers that don't support the required features in `src/javascript/config/browser-supports-features.ts`.

### CSS
- CSS compilation is done automatically.

### Dev dependencies
- The default Babel presets mentioned above are sufficient.
- There is no need for a `.babelrc` file with additional presets (e.g. `@babel/preset-env`) and plugins.


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
- `npm run publish-storybook` - builds all Storybook dependencies, and copies output to `storybook-static` directory.
- `npx http-server ./storybook-static` - test Storybook production build on local server.

## Publish Storybook using GitHub Pages
- Uses the workflow defined in `./.github/workflows/static.yml`.
- Live Storybook URL = https://theThought.github.io/Project-Transform

> Note: Github workflow & live Storybook URL relate to the existing Storybook component library in `./Storybook/` directory. Once this POC Storybook is ready for production, we can deprecate the old one.

## Build CSS and JavaScript for use in survey
- `npm run build`.
### Linking to build artefacts in survey
Uses whatever build folder has been defined in `package.json`.

Add to document `<head>`:
```
<link rel="stylesheet" href="/path/to/build/folder/stylesheets/index.css">
```

Add to the end of document `<body>`:
```
<script defer type="module" src="/path/to/build/folder/javascript/index.js"></script>
<script defer nomodule src="/path/to/build/folder/javascript/legacy.js"></script>
```

## Trouble-shooting bundling and build issues
- If bundling breaks, or UI is not updated (in DEV mode) via HMR to reflect latest CSS/JavaScript changes:
    - Kill the Parcel Node process with `CTRL+C`.
    - Delete `.parcel-cache`.
    - Run `npm start` again.

## Additional required files in project root directory
- `.vscode/settings.json` defines the correct working directory for `.eslintignore` and `.stylelintrc`.
- `.editorconfig` ensures all code uses the same indentation.
