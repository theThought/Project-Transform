export default class MInputSinglelineedit extends HTMLElement {
    private input: HTMLInputElement | null;

    constructor() {
        super();

        this.input = this.querySelector('input');

        if (!this.input) return;

        this.init();
        this.input?.addEventListener('click', this);
    }

    private init(): void {
        console.log('init');
    }

    // Handle constructor() event listeners.
    public handleEvent(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;

        console.log('click', target);
    }
}
