define(['o-question'], function (oQuestion) {
    function oQuestionOpenendSearchImages(id, group) {
        oQuestion.call(this, id, group);
        console.log(this);
        console.log(id);
        console.log(group);


        this.element = document.querySelector('.a-input-openend-search[data-questionid="' + this.id + '"]');
        console.log(this.element);
    }


    oQuestionOpenendSearchImages.prototype = Object.create(oQuestion.prototype);
    oQuestionOpenendSearchImages.prototype.constructor = oQuestionOpenendSearchImages;

    oQuestionOpenendSearchImages.prototype.init = function () {
        console.log('init loaded');
    }

    return oQuestionOpenendSearchImages;

});