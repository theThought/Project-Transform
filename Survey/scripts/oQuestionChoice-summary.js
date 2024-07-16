define(['o-question'], function (oQuestion) {
    function oQuestionChoiceSummary(id, group) {
        console.log('Blank');
    }

    oQuestionChoiceSummary.prototype = Object.create(oQuestion.prototype);
    oQuestionChoiceSummary.prototype.constructor = oQuestionChoiceSummary;

    oQuestionChoiceSummary.prototype.init = function () {
        console.log('working');
    };


    

    return oQuestionChoiceSummary;
});
