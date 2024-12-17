import MInputSinglelineedit from './web-components/m-input-singlelineedit';

class Survey {
    constructor() {
        this.defineWebComponents();
    }

    public init(): void {
        console.log('Survey: init');
        this.defineWebComponents();
    }

    public registerProperties(id: string, props: any) {
        console.log('Survey: registerProperties', id, props);
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

window.Survey = Survey;

export default Survey;
