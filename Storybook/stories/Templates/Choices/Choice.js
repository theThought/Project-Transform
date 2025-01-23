import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
    htmlFragmentCustomProperties
} from '../../_htmlFragments';

export const ChoiceCustomPropertiesHtml = (args) => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_Qtest__location');</script>

        <script>app.RegisterProperties("_Qtest__location",
{
    ${
    `"balance":{"state":${args.Balance === true ? "true" : "false"}${args.Balance === true && args.BalanceMinWidth?.length > 0 ? `,"min-width":"${args.BalanceMinWidth}"` : ''}},`
    }
    ${
    `"onesize":{"state":${args.OneSize === true ? "true" : "false"}${args.OneSize === true && args.OneSizeMaxWidth?.length > 0 ? `,"max-width":"${args.OneSizeMaxWidth}"` : ''}},`
    }
    ${
    `"sublistline":{"state":${args.SublistLine === true ? "true" : "false"}${args.SublistLine === true && args.SublistLineLength ? `,"length":${args.SublistLineLength}` : ''}}`
    }
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Choice question with custom properties
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-choice" data-questiongroup="_Qtest__location" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionChoice', '_Q0', '_Qtest__location');</script>

                            <div data-exclusive="true" data-questionid="_Q0_C0" data-questiongroup="_Qtest__location" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                <script>app.registerComponent('mOptionBase','_Q0_C0','_Qtest__location');</script>
                                <input class="hiddencontrol" type="radio" name="_Qtest__location_Cinhouse__hospitalpractice__where__the__tissue__sample__was__extracted" id="_Q0_C0" style="" value="inhouse__hospitalpractice__where__the__tissue__sample__was__extracted">
                                <label for="_Q0_C0">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">In-house</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_C1" data-questiongroup="_Qtest__location" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                <script>app.registerComponent('mOptionBase','_Q0_C1','_Qtest__location');</script>
                                <input class="hiddencontrol" type="radio" name="_Qtest__location_Cexternal__community__hospital" id="_Q0_C1" style="" value="external__community__hospital">
                                <label for="_Q0_C1">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">External community hospital</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_C2" data-questiongroup="_Qtest__location" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                <script>app.registerComponent('mOptionBase','_Q0_C2','_Qtest__location');</script>
                                <input class="hiddencontrol" type="radio" name="_Qtest__location_Cexternal__academic__hospital" id="_Q0_C2" style="" value="external__academic__hospital">
                                <label for="_Q0_C2">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">External academic hospital</span>
                                </label>
                            </div>

                            <!-- Sublist -->
                            <div class="o-option-sublist">
                                <div class="a-label-heading-sublist" style="">
                                    <span class="a-label-option">Private reference lab: Primary</span>
                                </div>
                                <div data-exclusive="true" data-questionid="_Q0_C27_S0" data-questiongroup="_Qtest__location" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                    <script>app.registerComponent('mOptionBase','_Q0_C27_S0','_Qtest__location');</script>
                                    <input class="hiddencontrol" type="radio" name="_Qtest__location_Claverty" id="_Q0_C27_S0" style="" value="laverty">
                                    <label for="_Q0_C27_S0">
                                        <span class="a-icon-multistate" data-icontype="single">
                                            <!--This is a comment!-->
                                        </span>
                                        <span class="a-label-option">Laverty</span>
                                    </label>
                                </div>
                                <div data-exclusive="true" data-questionid="_Q0_C27_S1" data-questiongroup="_Qtest__location" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                    <script>app.registerComponent('mOptionBase','_Q0_C27_S1','_Qtest__location');</script>
                                    <input class="hiddencontrol" type="radio" name="_Qtest__location_Cdorevitch" id="_Q0_C27_S1" style="" value="dorevitch">
                                    <label for="_Q0_C27_S1">
                                        <span class="a-icon-multistate" data-icontype="single">
                                            <!--This is a comment!-->
                                        </span>
                                        <span class="a-label-option">Dorevitch</span>
                                    </label>
                                </div>
                                <div data-exclusive="true" data-questionid="_Q0_C27_S2" data-questiongroup="_Qtest__location" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                    <script>app.registerComponent('mOptionBase','_Q0_C27_S2','_Qtest__location');</script>
                                    <input class="hiddencontrol" type="radio" name="_Qtest__location_Cqml" id="_Q0_C27_S2" style="" value="qml">
                                    <label for="_Q0_C27_S2">
                                        <span class="a-icon-multistate" data-icontype="single">
                                            <!--This is a comment!-->
                                        </span>
                                        <span class="a-label-option">QML</span>
                                    </label>
                                </div>
                            </div>

                            <!-- Sublist -->
                            <div class="o-option-sublist">
                                <div class="a-label-heading-sublist" style="">
                                    <span class="a-label-option">Private reference lab: Sonic</span>
                                </div>
                                <div data-exclusive="true" data-questionid="_Q0_C28_S0" data-questiongroup="_Qtest__location" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                    <script>app.registerComponent('mOptionBase','_Q0_C28_S0','_Qtest__location');</script>
                                    <input class="hiddencontrol" type="radio" name="_Qtest__location_Cdouglass__hanly__moir" id="_Q0_C28_S0" style="" value="douglass__hanly__moir">
                                    <label for="_Q0_C28_S0">
                                        <span class="a-icon-multistate" data-icontype="single">
                                            <!--This is a comment!-->
                                        </span>
                                        <span class="a-label-option">Douglass Hanly Moir</span>
                                    </label>
                                </div>
                                <div data-exclusive="true" data-questionid="_Q0_C28_S1" data-questiongroup="_Qtest__location" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                    <script>app.registerComponent('mOptionBase','_Q0_C28_S1','_Qtest__location');</script>
                                    <input class="hiddencontrol" type="radio" name="_Qtest__location_Cmelbourne__pathology" id="_Q0_C28_S1" style="" value="melbourne__pathology">
                                    <label for="_Q0_C28_S1">
                                        <span class="a-icon-multistate" data-icontype="single">
                                            <!--This is a comment!-->
                                        </span>
                                        <span class="a-label-option">Melbourne Pathology</span>
                                    </label>
                                </div>
                                <div data-exclusive="true" data-questionid="_Q0_C28_S2" data-questiongroup="_Qtest__location" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                    <script>app.registerComponent('mOptionBase','_Q0_C28_S2','_Qtest__location');</script>
                                    <input class="hiddencontrol" type="radio" name="_Qtest__location_Csullivan__nicolaides" id="_Q0_C28_S2" style="" value="sullivan__nicolaides">
                                    <label for="_Q0_C28_S2">
                                        <span class="a-icon-multistate" data-icontype="single">
                                            <!--This is a comment!-->
                                        </span>
                                        <span class="a-label-option">Sullivan Nicolaides</span>
                                    </label>
                                </div>
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

export const ChoiceOtherSpecifyHtml = () => `
<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer', '_Q0', '_QTypesVsBroadsheetsSingle');</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Choice question with "other specify" option
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-choice" data-questiongroup="_QTypesVsBroadsheetsSingle" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionChoice', '_Q0', '_QTypesVsBroadsheetsSingle');</script>

                            <div data-exclusive="true" data-questionid="_Q0_C0_S0" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                <script>app.registerComponent('mOptionBase', '_Q0_C0_S0', '_QTypesVsBroadsheetsSingle');</script>
                                <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_Cmail" id="_Q0_C0_S0" style="" value="mail">
                                <label for="_Q0_C0_S0">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Daily Mail</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_C0_S1" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                <script>app.registerComponent('mOptionBase', '_Q0_C0_S1', '_QTypesVsBroadsheetsSingle');</script>
                                <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_Cexpress" id="_Q0_C0_S1" style="" value="express">
                                <label for="_Q0_C0_S1">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Daily Express</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_C0_S7" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                <script>app.registerComponent('mOptionBase', '_Q0_C0_S7', '_QTypesVsBroadsheetsSingle');</script>
                                <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_CMetro" id="_Q0_C0_S7" style="" value="Metro">
                                <label for="_Q0_C0_S7">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Metro</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_C27_S4" data-questiongroup="_Qtest__location" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                <script>app.registerComponent('mOptionBase','_Q0_C27_S4','_Qtest__location');</script>
                                <input class="hiddencontrol" type="radio" name="_Qtest__location_Cother__please__specify__primary" id="_Q0_C27_S4" style="" value="other__please__specify__primary">
                                <label for="_Q0_C27_S4">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Other (please specify)</span>
                                <span class="m-input-singlelineedit nowrap position-side"><input data-questionid="_Q0_O27_S4" data-questiongroup="_Qtest__location" data-position="side" type="text" step="any" name="_Qtest__location_Oother__please__specify__primary" id="_Q0_O27_S4" autocomplete="off" style="" maxlength="200" value="" data-value="" class="a-input-singlelineedit side"></span></label>
                                <!--Style-->
                                <span class="a-label-option"></span>

                                <script>app.registerComponent('aInputSinglelineedit','_Q0_O27_S4','_Qtest__location');</script>
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

export const ChoiceSpecialCodesHtml = () => `
<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer', '_Q0', '_QTypesVsBroadsheetsSingle');</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Choice question with special codes
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-choice" data-questiongroup="_QTypesVsBroadsheetsSingle" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionChoice', '_Q0', '_QTypesVsBroadsheetsSingle');</script>

                            <div data-exclusive="true" data-questionid="_Q0_C0_S0" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                <script>app.registerComponent('mOptionBase', '_Q0_C0_S0', '_QTypesVsBroadsheetsSingle');</script>
                                <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_Cmail" id="_Q0_C0_S0" style="" value="mail">
                                <label for="_Q0_C0_S0">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Daily Mail</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_C0_S1" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                <script>app.registerComponent('mOptionBase', '_Q0_C0_S1', '_QTypesVsBroadsheetsSingle');</script>
                                <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_Cexpress" id="_Q0_C0_S1" style="" value="express">
                                <label for="_Q0_C0_S1">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Daily Express</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_C0_S7" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base below" style="" data-checked="false">
                                <script>app.registerComponent('mOptionBase', '_Q0_C0_S7', '_QTypesVsBroadsheetsSingle');</script>
                                <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_CMetro" id="_Q0_C0_S7" style="" value="Metro">
                                <label for="_Q0_C0_S7">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Metro</span>
                                </label>
                            </div>

                            <!-- Special codes -->
                            <div data-exclusive="true" data-questionid="_Q0_X0" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base side" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X0','_QTypesVsBroadsheetsSingle');</script>
                                <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_Xcode1" id="_Q0_X0" style="" value="code1"/>
                                <label for="_Q0_X0">
                                    <span class="a-icon-multistate" data-icontype="single"></span>
                                    <span class="a-label-option">first special code</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_X1" data-questiongroup="_QTypesVsBroadsheetsSingle" data-position="below" data-hidden="false" class="m-option-base side" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X1','_QTypesVsBroadsheetsSingle');</script>
                                <input class="hiddencontrol" type="radio" name="_QTypesVsBroadsheetsSingle_Xcode2" id="_Q0_X1" style="" value="code2"/>
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
