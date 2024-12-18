export const configureProperties = (
    survey: any,
    propertiesName: string,
    questionGroup: string,
) => {
    // propertiesName = (typeof propertiesName === 'undefined') ? this.group : propertiesName;

    // this.properties = app.getProperties(propertiesName);
    // this.properties.registered = true;

    // for (var prop in this.properties) {
    //     if (this.properties.hasOwnProperty(prop) && typeof this[prop] === 'function') {
    //         this[prop](this.properties[prop]);
    //     }
    // }

    const properties = survey.prototype.getProperties(propertiesName);
    console.log(
        'TTTTTTTTT configureProperties',
        propertiesName,
        questionGroup,
        properties,
    );
};
