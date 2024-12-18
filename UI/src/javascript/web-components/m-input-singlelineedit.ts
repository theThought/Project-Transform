import Survey from '../survey';
import { configureProperties } from '../utils/component';

export default class MInputSinglelineedit extends HTMLElement {
    private element: HTMLInputElement | null;
    private group: string | undefined;

    constructor() {
        super();

        this.element = document.querySelector('input[data-questionid]');
        this.group = this.dataset.questiongroup;

        if (!this.element) return;

        this.init();

        this.element?.addEventListener('click', this);
        this.element?.addEventListener('change', this);
    }

    private init(): void {
        console.log('MInputSinglelineedit: init');

        // TODO: Fix logic then move into its own method.
        this.group && configureProperties(Survey, 'type', this.group);
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
