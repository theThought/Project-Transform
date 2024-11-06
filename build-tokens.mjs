import StyleDictionary from 'style-dictionary';

const myStyleDictionary = new StyleDictionary({
    source: [`Survey/source/styles/tokens.json`],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'Survey/source/styles/',
            files: [
                {
                    destination: 'tokens.css',
                    format: 'css/variables',
                },
            ],
        },
        scss: {
            transformGroup: 'scss',
            buildPath: 'Survey/source/styles/',
            files: [
                {
                    destination: '_tokens.scss',
                    format: 'scss/variables',
                },
                {
                    destination: 'tokens-map.scss',
                    format: 'scss/map-flat',
                },
                {
                    destination: 'tokens-map-deep.scss',
                    format: 'scss/map-deep',
                },
            ],
        },
    },
});

await myStyleDictionary.buildAllPlatforms();
