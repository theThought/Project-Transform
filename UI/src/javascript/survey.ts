import MInputSinglelineedit from './web-components/m-input-singlelineedit';

class Survey {
    private properties: Record<string, object>;

    constructor() {
        this.properties = {};
        this.init();
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

        console.log('Survey: registerProperties', this.properties);
    }

    public getProperties(id: string): object {
        // Perform a loop, becoming less specific, until properties
        // are returned, or we run out of things to search for.
        id = id.toLowerCase();

        if (this.properties[id] !== undefined) {
            return this.properties[id];
        }

        while (id.length > 0) {
            if (typeof this.properties[id] !== 'undefined') {
                return this.properties[id];
            }
            if (id.indexOf('_q') === -1) {
                return {};
            }
            id = id.substring(id.indexOf('_q') + 2);
        }

        return {};
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
