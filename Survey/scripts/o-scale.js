define(['o-question'], 
    function (oQuestion) {
    console.log('oscallllleee');
    function oScale(id, group) {
        oQuestion.call(this, id, group);
        console.log('HELLLLOOOOO');
        console.log('oScale instantiated with id:', id, 'and group:', group);
    }

    oScale.prototype = Object.create(oQuestion.prototype);
    oScale.prototype.constructor = oScale;

    return oScale;
});
