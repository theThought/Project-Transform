import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
} from '../../../_htmlFragments';

export const MultiLineHtml = () => `
<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QMultiLine');</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        <label for="_Q0">This is a multiline question with special codes</label>
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-multilineedit" data-questiongroup="_QMultiLine" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionmultilineedit','_Q0','_QMultiLine');</script>
                            <textarea data-questionid="_Q0" data-questiongroup="_QMultiLine" name="_QMultiLine" id="_Q0" class="a-input-multilineedit" autocomplete="off" style=""></textarea>
                            <script>app.registerComponent('aInputMultilineedit','_Q0','_QMultiLine');</script>

                            <!-- Special codes -->
                            <div data-exclusive="true" data-questionid="_Q0_X0" data-questiongroup="_QQuestionWithLotsOfCodes" data-position="side" data-hidden="false" class="m-option-base side" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X0','_QQuestionWithLotsOfCodes');</script>
                                <input class="hiddencontrol" type="radio" name="_QQuestionWithLotsOfCodes_Xcode1" id="_Q0_X0" style="" value="code1"/>
                                <label for="_Q0_X0">
                                    <span class="a-icon-multistate" data-icontype="single"></span>
                                    <span class="a-label-option">first special code</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_X1" data-questiongroup="_QQuestionWithLotsOfCodes" data-position="side" data-hidden="false" class="m-option-base side" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X1','_QQuestionWithLotsOfCodes');</script>
                                <input class="hiddencontrol" type="radio" name="_QQuestionWithLotsOfCodes_Xcode2" id="_Q0_X1" style="" value="code2"/>
                                <label for="_Q0_X1">
                                    <span class="a-icon-multistate" data-icontype="single"></span>
                                    <span class="a-label-option">second special code</span>
                                </label>
                            </div>

                        </div>

                    </question>
                </questions>
            </div>
        </div>
        ${htmlFragmentMessageInstruction}

    </div>
</div>

</form>
`;
