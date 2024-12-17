export default class MInputSinglelineedit extends HTMLElement {
    private element: HTMLInputElement | null;

    constructor() {
        super();

        this.element = document.querySelector('input[data-questionid]');

        if (!this.element) return;

        this.init();

        this.element?.addEventListener('click', this);
        this.element?.addEventListener('change', this);
    }

    private init(): void {
        console.log('MInputSinglelineedit: init');
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
        // document.addEventListener('broadcastChange', ...);
    }

    public disconnectedCallback() {
        // document.removeEventListener('broadcastChange', ...);
    }
}
