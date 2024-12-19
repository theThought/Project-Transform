/**
 * Function - converts custom properties string to JSON.
 *
 * @param {string} [properties] - stringified custom properties JSON.
 *
 * @return {JSON}
 */
export const parseCustomProperties = (
    properties: string,
): Record<string, unknown> => {
    return JSON.parse(properties);
};
