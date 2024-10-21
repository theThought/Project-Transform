export const parseCustomProps = (json) => {
    const parsedJson = `
        <span>Custom properties JSON:</span><br/>
        <pre>
        ${json.replaceAll('"', '\'')}
        </pre>
    `;

    return parsedJson;
}
