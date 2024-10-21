export const parseCustomProps = (json) => {
    const parsedJson = `
        <pre>
        ${json.replaceAll('"', '\'')}
        </pre>
    `;

    return parsedJson;
}
