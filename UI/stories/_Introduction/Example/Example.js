export const ExampleNoArgsHtml = () => `
<p>Example story with no configurable Storybook <code>args</code>.</p>
`;

const style = `
<style>
    /* Test CSS from Parcel bundler. */
    [id*='storybook-'] .a-button-test {
        background-color: var(--color-secondary);
    }
</style>
`;

export const ExampleHtml = (args) => `
${style}
<p>Example story with configurable Storybook <code>args</code>, where the button label & styling can be overridden:</p>
<br>
<button class="${args.ButtonStyle}">${args.ButtonLabel}</button>
`;
