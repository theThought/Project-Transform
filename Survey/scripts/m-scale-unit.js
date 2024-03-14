define(['o-question'], function (oQuestion) {
    function mScaleUnit(id, group) {
        oQuestion.call(this, id, group);
        
        console.log('mScaleUnit instantiated with id:', id, 'and group:', group);

    }

    mScaleUnit.prototype = Object.create(oQuestion.prototype);
    mScaleUnit.prototype.constructor = mScaleUnit;

    return mScaleUnit;
});
