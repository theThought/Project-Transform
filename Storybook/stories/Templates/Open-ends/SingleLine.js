import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
} from '../../_htmlFragments';

const style = `
<style>
    .surroundcontent {
        min-height: fit-content;
    }
</style>
`;

export const SingleLineCustomPropsHtml = (args) => `
${style}
<form action="#"
    class="
    ${args.pagePropertyFocusQuestion === true ? 'focus-question' : ''}
    ${args.pagePropertyFocusControl === true ? 'focus-control' : ''}
    "
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete ${args.pageLayout === 'sidebyside' ? 'sidebyside' : ''}">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QText');</script>

        <script type="text/javascript">app.RegisterProperties("_QText",{"type":"${args.customPropertyInputType}","labels":{
            ${args.customPropertyPreLabel ? `"pre":"%lt%i%gt%${args.customPropertyPreLabel}%lt%/i%gt%"` : ''}
            ${args.customPropertyPreLabel && args.customPropertyPostLabel ? ',' : ''}
            ${args.customPropertyPostLabel ? `"post":"%lt%i%gt%${args.customPropertyPostLabel}%lt%/i%gt%"` : ''}
        }});</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: ${args.pagePropertySideBySide}%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        This is a question with custom properties (e.g. number/date, pre/post labels)
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_QText" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionSinglelineedit','_Q0','_QText');</script>
                            <input data-questionid="_Q0" data-questiongroup="_QText" data-position="below" type="text" step="any" name="_QText" id="_Q0" autocomplete="off" style="width:10em;" maxlength="20" value="" data-value="" class="a-input-singlelineedit below"/>
                            <script>app.registerComponent('aInputSinglelineedit','_Q0','_QText');</script>
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

export const SingleLineSpecialCodesHtml = (args) => `
${style}
<form action="#"
    class="
    ${args.pagePropertyFocusQuestion === true ? 'focus-question' : ''}
    ${args.pagePropertyFocusControl === true ? 'focus-control' : ''}
    "
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete ${args.pageLayout === 'sidebyside' ? 'sidebyside' : ''}">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QQuestionWithLotsOfCodes');</script>

        <script>app.RegisterProperties("_QQuestionWithLotsOfCodes",{"balance":{"state":true}, "onesize":{"state":true}});</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: ${args.pagePropertySideBySide}%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">This is a question with special codes</div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_QQuestionWithLotsOfCodes" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionSinglelineedit','_Q0','_QQuestionWithLotsOfCodes');</script>
                            <input data-questionid="_Q0" data-questiongroup="_QQuestionWithLotsOfCodes" data-position="below" type="text" step="any" name="_QQuestionWithLotsOfCodes" id="_Q0" autocomplete="off" style="width:10em;" maxlength="30" value="" data-value="" class="a-input-singlelineedit below"/>
                            <script>app.registerComponent('aInputSinglelineedit','_Q0','_QQuestionWithLotsOfCodes');</script>
                            <div data-exclusive="true" data-questionid="_Q0_X0" data-questiongroup="_QQuestionWithLotsOfCodes" data-position="side" data-hidden="false" class="m-option-base  side " style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X0','_QQuestionWithLotsOfCodes');</script>
                                <input class="hiddencontrol" type="radio" name="_QQuestionWithLotsOfCodes_Xcode1" id="_Q0_X0" style="" value="code1"/>
                                <label for="_Q0_X0">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">first code</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_X1" data-questiongroup="_QQuestionWithLotsOfCodes" data-position="side" data-hidden="false" class="m-option-base  side " style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X1','_QQuestionWithLotsOfCodes');</script>
                                <input class="hiddencontrol" type="radio" name="_QQuestionWithLotsOfCodes_Xcode2" id="_Q0_X1" style="" value="code2"/>
                                <label for="_Q0_X1">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">second code</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_X2" data-questiongroup="_QQuestionWithLotsOfCodes" data-position="side" data-hidden="false" class="m-option-base  side " style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X2','_QQuestionWithLotsOfCodes');</script>
                                <input class="hiddencontrol" type="radio" name="_QQuestionWithLotsOfCodes_Xcode3" id="_Q0_X2" style="" value="code3"/>
                                <label for="_Q0_X2">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">third code</span>
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
