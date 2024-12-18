// DEMO web component for Storybook introduction.
import WCExample from './web-components/wc-example';

// Survey web components.
import MInputSinglelineedit from './web-components/m-input-singlelineedit';

export const uiInit = (): void => {
    // DEMO web component for Storybook introduction.
    !customElements.get('wc-example') &&
        customElements.define('wc-example', WCExample);

    // Survey web components.
    !customElements.get('m-input-singlelineedit') &&
        customElements.define('m-input-singlelineedit', MInputSinglelineedit);
};
