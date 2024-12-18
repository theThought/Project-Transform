import { parseCustomProperties } from '../utils/helpers';

export default class MInputSinglelineedit extends HTMLElement {
    private element: HTMLInputElement | null;
    private group: string | undefined;
    private properties: string | undefined;

    // Triggers attributeChangedCallback() lifecycle method whenever attributes listed here change.
    static observedAttributes = ['data-properties'];

    constructor() {
        super();

        this.element = document.querySelector('input[data-questionid]');
        this.group = this.dataset.questiongroup;
        this.properties = this.dataset.properties;

        if (!this.element) return;

        this.init();

        this.element?.addEventListener('click', this);
        this.element?.addEventListener('change', this);
    }

    private init(): void {
        console.log(
            'MInputSinglelineedit: init',
            this.element,
            this.group,
            this.properties,
        );
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

    // Handle attribute changes.
    public attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string,
    ): void {
        const customProperties = parseCustomProperties(newValue);
        this.setInputType(customProperties);
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
