import MInputSinglelineedit from './web-components/m-input-singlelineedit';

export default class Survey {
    constructor() {
        this.defineWebComponents();
    }

    public init(): void {
        this.defineWebComponents();
    }

    private defineWebComponents(): void {
        console.log('Survey: define Web Components...');

        !customElements.get('m-input-singlelineedit') &&
            customElements.define(
                'm-input-singlelineedit',
                MInputSinglelineedit,
            );
    }
}
