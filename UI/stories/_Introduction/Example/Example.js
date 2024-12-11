export const ExampleNoArgsHtml = () => `
<p>Example story with no configurable Storybook <code>args</code>.</p>
`;

export const ExampleHtml = (args) => `
<p>Example story with configurable Storybook <code>args</code>:</p>
<button class="${args.ButtonStyle}">${args.ButtonLabel}</button>
`;
