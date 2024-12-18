export const MInputSinglelineEditHtml = (args) => `
<!-- <script data-questionid="_Q0">
    app.registerComponent('oQuestionContainer','_Q0','_QText');
</script> -->
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
