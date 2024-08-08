define(['o-question'], function (oQuestion) {
    function oQuestionChoiceSummary(id, group) {
        this.element = document.querySelector('.m-option-summary');
        this.isLastAnswered = document.querySelector('.l-summary-lastchange');
    }

    oQuestionChoiceSummary.prototype = Object.create(oQuestion.prototype);
    oQuestionChoiceSummary.prototype.constructor = oQuestionChoiceSummary;

    oQuestionChoiceSummary.prototype.init = function () {
        if (this.isLastAnswered) {
            var elements = document.querySelectorAll('.m-option-summary');
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element.querySelector('.l-summary-lastchange')) {
                    element.classList.add('l-summary-lastchange');
                }
            }
        }
    };

    return oQuestionChoiceSummary;
});
