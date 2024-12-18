export const parseCustomProperties = (
    properties: string,
): Record<string, unknown> => {
    return JSON.parse(properties);
};
