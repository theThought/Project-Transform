define(['o-question'], function (oQuestion) {
    function oQuestionChoiceSummary(id, group) {

        this.element = document.querySelector('.o-question-choice-summary');
        
        // Check if .a-label-option-summary contains a child with .l-summary-background
        this.checkChildDiv();
    }

    oQuestionChoiceSummary.prototype = Object.create(oQuestion.prototype);
    oQuestionChoiceSummary.prototype.constructor = oQuestionChoiceSummary;

    oQuestionChoiceSummary.prototype.init = function () {
        console.log('working');
    };

    oQuestionChoiceSummary.prototype.checkChildDiv = function() {
        var labelOptionSummaries = this.element.querySelectorAll('.a-label-option-summary');
        var lastMatch = null;

        labelOptionSummaries.forEach(function(labelOptionSummary) {
            var summaryBackground = labelOptionSummary.querySelector('.l-summary-background');
            if (summaryBackground) {
                lastMatch = labelOptionSummary;
            }
        });

        if (lastMatch) { 
            lastMatch.classList.add('l-summary-answered');
          }
    };

    return oQuestionChoiceSummary;
});
