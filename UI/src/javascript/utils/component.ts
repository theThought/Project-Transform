import Survey from '../survey';

export const configureProperties = (
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

    // const properties = Survey.prototype.getProperties(propertiesName);
    console.log('configureProperties', questionGroup, Survey);
};
