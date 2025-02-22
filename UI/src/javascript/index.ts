// Import CSS.
import '../../src/css/index.css';

// Import key ES modules.
import { browserSupportsAllFeatures } from './utils/browser-supports-features';
import { uiInit } from './ui-init';

if (browserSupportsAllFeatures()) {
    uiInit();
} else {
    // Dynamic import polyfills, then instantiate UI modules.
    import('./utils/polyfills')
        .then(() => uiInit())
        .catch((e) => console.error(e));
}
