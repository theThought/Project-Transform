export const MInputSinglelineEditHtml = (args) => `
<!-- <script data-questionid="_Q0">
    app.registerComponent('oQuestionContainer','_Q0','_QText');
</script> -->

<!-- TODO:
1. Do we need <script data-questionid="_Q0">?
2. Does <m-input-singlelineedit> need 'data-' attributes? If so, just the 1?
3. We need to inline 'app.init()' in Storybook stories. In real survey, we might also need to do the same because we're using ES modules.
-->
<script type="module">
    const app = new Survey();
    app.init();
    app.registerProperties("_QText",{"type":"${args.InputType}"});
</script>
<m-input-singlelineedit data-questiongroup="_QText">
    <input
        type="text"
        id="_Q0"
        class="a-input-singlelineedit"
        data-questionid="_Q0"
        data-questiongroup="_QText"
    />
</m-input-singlelineedit>
`;
