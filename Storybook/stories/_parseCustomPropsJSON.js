// Array of strings to be removed (i.e. replaced by '').
// Keep adding to array as required...
const ignoredStrings = [
    // Choice questions
    '"balance":{"state":false}',
    '"onesize":{"state":false}',
    '"sublistline":{"state":false}',
    // Open-end questions
    '"labels":{}',
    // List questions
    '"exact":true',
    '"filtertype":"contains"',
    '"mincharactersforlist":0',
    '"showanswers":true',
    '"selection":"undefined"',
    '"jumptofirstletter":true',
    // Slider & scale questions
    '"marks":false',
    '"value":false',
    '"terminators":false',
    '"ticklabels":"undefined"',
    '"floodtovalue":false',
    '"min":undefined',
    '"max":undefined',
    '"position":"inside"',
    // Grid questions
    '"rowheader":false',
    '"altrows":false',
    '"pre":""',
    '"post":""',
];

/**
 * Function - parse template literal containing custom properties JSON, and replace/sanitise unwanted content prior to rendering in Storybook, for use in ZeroHeight docs.
 *
 * @param {string} json - template literal containing JSON.
 *
 * @return {string} - template literal (HTML).
 */
export const parseCustomProps = (json) => {
    // Remove any unwanted strings.
    ignoredStrings.map(string => {
        if (json.includes(string)) {
            json = json.replace(string, '');
        }
    });

    let parsedJson = json;
    // Replace any unwanted characters.
    parsedJson = parsedJson.replace(/"/gm, '\''); // Double quotes with single
    parsedJson = parsedJson.replace(/\s+/gm, ' '); // Whitespace
    parsedJson = parsedJson.replace(/( ,)/gm, ','); // Rogue commas
    parsedJson = parsedJson.replace(/,+/gm, ','); // Rogue commas
    parsedJson = parsedJson.replace(/,}/gm, '}'); // Rogue commas
    parsedJson = parsedJson.replace(/, }/gm, ' }'); // Rogue commas
    parsedJson = parsedJson.replace(/{,/gm, '{'); // Rogue commas

    // Build HTML string.
    parsedJson = `
        <div style="margin-block-end: 3rem;">
            <button class="a-button" data-copy>Copy custom properties JSON</button>
            <span data-json style="font-family: monospace;">${parsedJson}</span>
        </div>
    `;

    return parsedJson;
}
