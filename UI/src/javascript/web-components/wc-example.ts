export default class WCExample extends HTMLElement {
    private button: HTMLButtonElement | null;
    private count: number;

    constructor() {
        super();

        this.button = this.querySelector('button');
        this.count = 0;

        if (!this.button) return;

        this.handleButton();

        this.button?.addEventListener('click', this);
    }

    private handleButton(): void {
        this.button?.removeAttribute('hidden');
    }

    private handleGlobalClick(e: MouseEvent): void {
        const target = e.target as HTMLElement;
        const insideButton = this.button?.contains(target);

        if (!insideButton) {
            console.log(
                'Clicked outside component:',
                this,
                'Click target:',
                target,
            );
        }
    }

    // Handle constructor() event listeners.
    public handleEvent(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;

        this.count++;
        if (target) {
            target.innerHTML = `Clicked ${this.count} time(s)`;
        }
    }

    // Handle (global) event listeners which are not part of this web component.
    public connectedCallback() {
        document.addEventListener('click', (e: MouseEvent) =>
            this.handleGlobalClick(e),
        );
    }

    public disconnectedCallback() {
        document.removeEventListener('click', this.handleGlobalClick);
    }
}
