define(['o-question'], function (oQuestion) {
    function oQuestionChoiceSummary(id, group) {
        // this.element = document.querySelector('.o-question-choice-summary');     
    }

    oQuestionChoiceSummary.prototype = Object.create(oQuestion.prototype);
    oQuestionChoiceSummary.prototype.constructor = oQuestionChoiceSummary;

    oQuestionChoiceSummary.prototype.init = function () {
        console.log('working');
    };

    return oQuestionChoiceSummary;
});
