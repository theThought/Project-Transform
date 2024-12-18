// Import CSS.
import '../../src/css/index.css';

// Import key ES modules.
import { browserSupportsAllFeatures } from './config/browser-supports-features';
import Survey from './survey';

// Setup DEMO Web Component for Storybook introduction.
import WCExample from './web-components/wc-example';
!customElements.get('wc-example') &&
    customElements.define('wc-example', WCExample);

if (browserSupportsAllFeatures()) {
    const app = new Survey();
    app.init();
} else {
    // Dynamic import polyfills, then instantiate UI modules.
    import('./utils/polyfills')
        .then(() => {
            const app = new Survey();
            app.init();
        })
        .catch((e) => console.error(e));
}
