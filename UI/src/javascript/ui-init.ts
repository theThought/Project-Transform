import Survey from './survey';
import WCExample from './web-components/wc-example';

export const uiInit = (): void => {
    // DEMO Web Component for Storybook intro.
    !customElements.get('wc-example') &&
        customElements.define('wc-example', WCExample);

    const app = new Survey();
    app.init();
};
