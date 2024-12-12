// Web Components.
import WCExample from './web-components/wc-example';

export const uiInit = (): void => {
    console.log('uiInit(): define Web Components...');

    // Define Web Components
    !customElements.get('wc-example') &&
        customElements.define('wc-example', WCExample);
};
