/*
    Use the "browserslist" config in "package.json" file to determine which features need to be supported with polyfills.

    Please refer to these articles for explanation:
    - https://philipwalton.com/articles/loading-polyfills-only-when-needed/.
    - https://golb.hplar.ch/2018/02/Conditionally-load-polyfills.html.
*/
export const browserSupportsAllFeatures = (): boolean => {
    // As an example... test for native <dialog> support.
    const isDialog =
        typeof document.createElement('dialog').showModal === 'function';

    return isDialog;
};
