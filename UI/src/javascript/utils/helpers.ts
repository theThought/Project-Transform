/**
 * Function - converts custom properties string to JSON.
 *
 * @param {string} properties   - stringified custom properties JSON.
 * @param {string} [filter]     - optional JSON key to filter by, so we return a subset of JSON rather than whole object.
 *
 * @return {JSON}
 */
export const generateCustomPropertiesJSON = (
    properties: string,
    filter?: string,
): Record<string, unknown> => {
    let parsedJSON: Record<string, unknown> = JSON.parse(properties);

    if (filter) {
        for (const [key, value] of Object.entries(parsedJSON)) {
            if (key === filter) {
                parsedJSON = Object.assign({ [key]: value }, parsedJSON.key);
            }
        }
    }

    return parsedJSON;
};
