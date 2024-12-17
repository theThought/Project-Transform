import Survey from './survey';

// DEMO Web Component
import WCExample from './web-components/wc-example';

export const uiInit = (): void => {
    // DEMO
    !customElements.get('wc-example') &&
        customElements.define('wc-example', WCExample);

    const app = new Survey();
    app.init();
};
