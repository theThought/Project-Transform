import { parseCustomProperties } from '../utils/helpers';

export default class MInputSinglelineedit extends HTMLElement {
    private qid: string | undefined;
    private qgroup: string | undefined;
    private element: HTMLInputElement | null;
    private question: HTMLElement | null;
    private customprops: string | undefined;

    constructor() {
        super();

        this.qid = this.dataset.questionid;
        this.qgroup = this.dataset.questiongroup;
        this.element = document.querySelector('input');
        this.question = this.closest('.o-question-container');
        this.customprops = this.question?.dataset.customProps;

        if (!this.element) return;

        this.init();

        this.element?.addEventListener('click', this);
        this.element?.addEventListener('change', this);
    }

    private init(): void {
        console.log(
            'MInputSinglelineedit: init...',
            this.qid,
            this.qgroup,
            this.element,
        );

        if (
            this.qid === this.question?.dataset.questionid &&
            this.qgroup === this.question?.dataset.questiongroup &&
            this.customprops
        ) {
            const customProperties = parseCustomProperties(this.customprops);
            this.setInputType(customProperties);

            // TODO: pre-/post-labels
        }
    }

    // Set the appropriate 'type' attribute on <input> based on custom properties.
    private setInputType(customProperties: Record<string, unknown>): void {
        let inputType = 'text';

        Object.entries(customProperties).forEach(([key, value]) => {
            if (key === 'type') {
                inputType = value as string;
            }
        });

        switch (inputType) {
            case 'date':
                inputType = 'date';
                break;
            case 'number':
                inputType = 'number';
                break;
            default:
                inputType = 'text';
                break;
        }

        if (this.element) {
            this.element.type = inputType;
        }
    }

    // Handle constructor() event listeners.
    public handleEvent(e: Event) {
        switch (e.type) {
            case 'click':
                console.log('click');
                break;
            case 'change':
                console.log('change');
                break;
        }
    }

    // Handle (global) event listeners which are not part of this web component.
    public connectedCallback() {
        // e.g. document.addEventListener('broadcastChange', ...);
    }

    public disconnectedCallback() {
        // e.g. document.removeEventListener('broadcastChange', ...);
    }
}
