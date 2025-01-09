/* Display custom properties JSON for ZeroHeight scriptwriter users. */
export const htmlFragmentCustomProperties = `
<div style="margin-block-end: 3rem;">
    <button class="a-button" data-copy>Generate & copy custom properties JSON</button>
    <code>
        <pre data-json style="white-space: pre-wrap;">{}</pre>
    </code>
</div>
`;

/* Keep these HTML fragments in sync with the "real" atomic components. */
export const htmlFragmentMessageError = `
<div class="o-question-messages">
	<div class="o-question-information-messages">
        <div class="m-message-error">
            <div class="a-label-error">
                Error message(s).
            </div>
        </div>
    </div>
</div>
`;

export const htmlFragmentMessageInstruction = `
<div class="o-question-messages">
	<div class="o-question-information-messages">
        <div class="m-message-instruction has-content">
            <div>
                Instruction message(s).
            </div>
        </div>
    </div>
</div>
`;
