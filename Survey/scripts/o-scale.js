define(['o-question'], function (oQuestion) {
    function oScale(id, group) {
        oQuestion.call(this, id, group);
        
        console.log('oScale instantiated with id:', id, 'and group:', group);
    }

    oScale.prototype = Object.create(oQuestion.prototype);
    oScale.prototype.constructor = oScale;

    return oScale;
});
