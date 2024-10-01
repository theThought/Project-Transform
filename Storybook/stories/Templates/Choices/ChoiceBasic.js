export const ChoiceBasicHtml = (args) => `
<form action="#"
    class="
    ${args.pagePropertiesFocusQuestion === true ? 'focus-question' : ''}
    focus-control
    "
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container sidebyside focused cover-off config-complete" data-questiongroup="_QTypesVsBroadsheetsSingle" data-questionid="_Q0" data-position="below">

    <div class="m-question-cover"><!-- cover --></div>

        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">Which of the following papers have you read in
                        the last month?</div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">
                        <div class="o-question-response o-question-choice" data-questiongroup="_QTypesVsBroadsheetsSingle" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionChoice', '_Q0', '_QTypesVsBroadsheetsSingle');</script>
                            <div class="o-option-sublist">
                                <div class="a-label-heading-sublist" style="">
                                    <span class="a-label-option">Tabloids</span>
                                </div>
                                <div data-exclusive="true" data-questionid="_Q0_C0_S0" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base below cover-off" style="" data-checked="false">
                                    <script>app.registerComponent('mOptionBase', '_Q0_C0_S0', '_QTypesVsBroadsheetsSingle');</script>
                                    <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_Cmail" id="_Q0_C0_S0" style="" value="mail">
                                    <label for="_Q0_C0_S0">
                                        <span class="a-icon-multistate" data-icontype="single">
                                            <!--This is a comment!-->
                                        </span>
                                        <span class="a-label-option">Daily Mail</span>
                                    </label>
                                </div>
                                <div data-exclusive="true" data-questionid="_Q0_C0_S1" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base below cover-off" style="" data-checked="false">
                                    <script>app.registerComponent('mOptionBase', '_Q0_C0_S1', '_QTypesVsBroadsheetsSingle');</script>
                                    <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_Cexpress" id="_Q0_C0_S1" style="" value="express">
                                    <label for="_Q0_C0_S1">
                                        <span class="a-icon-multistate" data-icontype="single">
                                            <!--This is a comment!-->
                                        </span>
                                        <span class="a-label-option">Daily Express</span>
                                    </label>
                                </div>
                                <div data-exclusive="true" data-questionid="_Q0_C0_S7" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base below cover-off" style="" data-checked="false">
                                    <script>app.registerComponent('mOptionBase', '_Q0_C0_S7', '_QTypesVsBroadsheetsSingle');</script>
                                    <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_CMetro" id="_Q0_C0_S7" style="" value="Metro">
                                    <label for="_Q0_C0_S7">
                                        <span class="a-icon-multistate" data-icontype="single">
                                            <!--This is a comment!-->
                                        </span>
                                        <span class="a-label-option">Metro</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </question>
                </questions>
            </div>
        </div>

    </div>
</div>

</form>
`;
