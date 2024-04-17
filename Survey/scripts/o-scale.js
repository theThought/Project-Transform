define(['o-question'], 
function (oQuestion) {
    function oScale(id, group) {
        oQuestion.call(this, id, group);
        this.minValue = 0;  // Default minimum value
        this.maxValue = 100;  // Default maximum value
        console.log('oScale instantiated with id:', id, 'and group:', group);
    }

    oScale.prototype = Object.create(oQuestion.prototype);
    oScale.prototype.constructor = oScale;


    return oScale;
});
