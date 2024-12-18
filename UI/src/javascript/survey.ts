import MInputSinglelineedit from './web-components/m-input-singlelineedit';

class Survey {
    private properties: Record<string, object>;

    constructor() {
        this.properties = {};
        this.defineWebComponents();
    }

    public init(): void {
        this.defineWebComponents();
    }

    public registerProperties(id: string, props: any) {
        // TODO: Why do we need lowercase, and drop '_q'?
        id = id.toLowerCase();
        if (id.indexOf('_q') === 0) {
            id = id.substring(2);
        }
        const newprops = this.sanitiseProperties(props);
        const currprops = this.properties[id] ? this.properties[id] : {};
        this.properties[id] = Object.assign(currprops, newprops);

        console.log('Survey: registerProperties', id, props, this.properties);
    }

    private sanitiseProperties(props: any): object {
        for (const prop in props) {
            if (props.hasOwnProperty(prop)) {
                // Recursion for nested properties.
                if (typeof props[prop] === 'object') {
                    this.sanitiseProperties(props[prop]);
                }

                if (props[prop] === 'true') {
                    props[prop] = true;
                }

                if (props[prop] === 'false') {
                    props[prop] = false;
                }
            }
        }

        return props;
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

// Make 'Survey' available in global scope, so it can be used in inline <script> tags.
(globalThis as any).Survey = Survey; // TODO: Avoid using 'any' type
export default Survey;
