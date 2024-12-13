const style = `
<style>
    wc-example {
        border: 0.25rem solid var(--color-primary);
        display: block;
        padding: 1rem;
    }
</style>
`;

export const WCExampleHtml = () => `
${style}
<wc-example id="wc1">
    <p>This static content is still rendered inside <code>&lt;wc-example&gt;</code>, even if JavaScript is not available, but the <code>&lt;button&gt;</code> will be hidden.</p>

    <button class="a-button" hidden>Click me</button>

    <p>Also click outside this web component instance's button, and view the browser console.</p>
</wc-example>
<br>
<wc-example id="wc2">
    <p>Second instance of web component. Works independently of the first.</p>

    <button class="a-button" hidden>Click me</button>
</wc-example>
`;
