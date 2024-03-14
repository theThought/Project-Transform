define(['o-question'], function (oQuestion) {
    function oScaleContainer(id, group) {
        oQuestion.call(this, id, group);
        
        console.log('oScaleContainer instantiated with id:', id, 'and group:', group);
    }

    oScaleContainer.prototype = Object.create(oQuestion.prototype);
    oScaleContainer.prototype.constructor = oScaleContainer;

    return oScaleContainer;
});
