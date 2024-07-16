define(['o-question'], function (oQuestion) {
    function oQuestionChoiceSummary(id, group) {
        this.answeredWrapperElement = document.querySelector('.l-summary-response');
    }

    oQuestionChoiceSummary.prototype = Object.create(oQuestion.prototype);
    oQuestionChoiceSummary.prototype.constructor = oQuestionChoiceSummary;

    oQuestionChoiceSummary.prototype.init = function () {
        this.countSummaryResponseTextDivs();
    };

    oQuestionChoiceSummary.prototype.countSummaryResponseTextDivs = function() {
        if (!this.answeredWrapperElement) {
            return 0;
        }
        var divs = this.answeredWrapperElement.getElementsByClassName('l-summary-response-text');
        var count = divs.length;

        for (var i = 0; i < divs.length; i++) {
            
            divs[i].className += ' highlight';

            if (i === 0) {
                divs[i].style.borderTopLeftRadius = '5px';
                divs[i].style.borderBottomLeftRadius = '5px';
                divs[i].style.borderTopRightRadius = '0px';
                divs[i].style.borderBottomRightRadius = '0px';
                divs[i].style.borderRight = '1px solid #c0c0c0'; // Light gray vertical line
                divs[i].style.paddingRight = '10px';
            } else if (i === 1) {
                divs[i].style.borderTopRightRadius = '5px';
                divs[i].style.borderBottomRightRadius = '5px';
                divs[i].style.borderTopLeftRadius = '0px';
                divs[i].style.borderBottomLeftRadius = '0px';
                divs[i].style.borderLeft = '1px solid #c0c0c0'; // Light gray vertical line
                divs[i].style.paddingLeft = '10px';
            }
        }

        return count;
    };

    return oQuestionChoiceSummary;
});
