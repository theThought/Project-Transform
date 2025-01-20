export const MInputSinglelineEditHtml = (args) => `
<o-question-container>
    <div
        data-questionid="_Q0"
        data-questiongroup="_QText"
        data-custom-props='{"type":"${args.InputType}", "labels":{"pre":"%lt%i%gt%${args.PreLabel}%lt%/i%gt%","post":"%lt%i%gt%${args.PostLabel}%lt%/i%gt%"}}'
    ></div>

    <m-input-singlelineedit
        data-questionid="_Q0"
        data-questiongroup="_QText"
    >
        <input
            type="text"
            id="_Q0"
            class="a-input-singlelineedit"
        />
    </m-input-singlelineedit>
</o-question-container>
`;
