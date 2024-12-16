// DEMO
import WCExample from './web-components/wc-example';

// Web Components.
import MInputSinglelineedit from './web-components/m-input-singlelineedit';

export const uiInit = (): void => {
    console.log('uiInit(): define Web Components...');

    // DEMO
    !customElements.get('wc-example') &&
        customElements.define('wc-example', WCExample);

    // Web components.
    !customElements.get('m-input-singlelineedit') &&
        customElements.define('m-input-singlelineedit', MInputSinglelineedit);
};
