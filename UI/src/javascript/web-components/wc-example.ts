export default class WCExample extends HTMLElement {
    private button: HTMLButtonElement | null;
    private count: number;

    // Triggers attributeChangedCallback() lifecycle method whenever attributes listed here change.
    static observedAttributes = ['attribute'];

    constructor() {
        super();

        this.button = this.querySelector('button');
        this.count = 0;

        if (!this.button) return;

        this.init();
        this.button.addEventListener('click', this);
    }

    private init(): void {
        this.button?.removeAttribute('hidden');
    }

    private handleGlobalClick(e: MouseEvent): void {
        const target = e.target as HTMLElement;
        const insideButton = this.button?.contains(target);

        if (!insideButton) {
            console.log(
                'Click target:',
                target,
                'Clicked outside component:',
                this,
            );
        }
    }

    // Handle attribute changes.
    public attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string,
    ): void {
        console.log(
            `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
        );
    }

    // Handle constructor() event listeners.
    public handleEvent(e: MouseEvent): void {
        const target = e.currentTarget as HTMLElement;

        this.count++;
        if (target) {
            target.innerHTML = `Clicked ${this.count} time(s)`;
        }
    }

    // Handle (global) event listeners which are not part of this web component.
    public connectedCallback(): void {
        document.addEventListener('click', (e: MouseEvent) =>
            this.handleGlobalClick(e),
        );
    }

    public disconnectedCallback(): void {
        document.removeEventListener('click', this.handleGlobalClick);
    }
}
