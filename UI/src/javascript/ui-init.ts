// DEMO web component for Storybook introduction.
import WCExample from './web-components/wc-example';

// Survey web components.
import OQuestionContainer from './web-components/o-question-container';
import MInputSinglelineedit from './web-components/m-input-singlelineedit';

export const uiInit = (): void => {
    // DEMO web component for Storybook introduction.
    !customElements.get('wc-example') &&
        customElements.define('wc-example', WCExample);

    // Survey web components.
    !customElements.get('o-question-container') &&
        customElements.define('o-question-container', OQuestionContainer);

    !customElements.get('m-input-singlelineedit') &&
        customElements.define('m-input-singlelineedit', MInputSinglelineedit);
};
