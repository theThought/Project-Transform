import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
    htmlFragmentCustomProperties
} from '../../../_htmlFragments';

export const ScaleHorizontalHtml = (args) => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QPassive10Scale');</script>

        <script type="text/javascript">app.RegisterProperties("_QPassive10Scale",
{
    "values":{"min":${args.ValuesMin},"max":${args.ValuesMax},"position":"${args.ValuesPosition}"},
    "labels":{"pre":"${args.LabelsPre}","post":"${args.LabelsPost}"}
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        <label for="_Q0">This is a horizontal scale question</label>
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-scale-horizontal" data-questiongroup="_QPassive10Scale" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionScale-horizontal','_Q0','_QPassive10Scale');</script>
                            <div>
                                <!-- - - - rotation div - - - -->
                                <div class="o-question-scale-horizontal-control">
                                    <button type="Button" class="a-button-preterminator" data-questionid="_Q0_Preterm" data-questiongroup="_QPassive10Scale">
                                        <!--scale-horizontalpre terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPreTerminator','_Q0_Preterm','_QPassive10Scale');</script>
                                    <div class="o-scale">
                                        <script>app.registerComponent('oScale','_Q0_Scale','_QPassive10Scale');</script>
                                        <div class="o-scale-unitcontainer">
                                            <script>app.registerComponent('oScaleContainer','_Q0_ScaleContainer','_QPassive10Scale');</script>
                                            <!-- - - - units container - - - -->
                                        </div>
                                    </div>
                                    <input data-questionid="_Q0" data-questiongroup="_QPassive10Scale" data-position="below" type="text" name="_QPassive10Scale" id="_Q0" data-lpignore="true" autocomplete="off" style="width:80%;" maxlength="2" value="" data-value="" class="a-input-scale-horizontal below hiddencontrol"/>
                                    <button type="Button" class="a-button-postterminator" data-questionid="_Q0_Postterm" data-questiongroup="_QPassive10Scale">
                                        <!--scale-horizontal post terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPostTerminator','_Q0_Postterm','_QPassive10Scale');</script>
                                </div>
                                <script>app.registerComponent('aInputScale-horizontal','_Q0','_QPassive10Scale');</script>
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

export const ScaleVerticalHtml = (args) => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QPassive10ScaleV');</script>

        <script type="text/javascript">app.RegisterProperties("_QPassive10ScaleV",
{
    "values":{"min":${args.ValuesMin},"max":${args.ValuesMax},"position":"${args.ValuesPosition}"},
    "labels":{"pre":"${args.LabelsPre}","post":"${args.LabelsPost}"}
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        <label for="_Q0">This is a vertical scale question</label>
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-scale-vertical" data-questiongroup="_QPassive10ScaleV" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionScale-vertical','_Q0','_QPassive10ScaleV');</script>
                            <div class="o-scale-rotate">
                                <!-- - - - rotation div - - - -->
                                <div class="o-question-scale-vertical-control">
                                    <button type="Button" class="a-button-preterminator" data-questionid="_Q0_Preterm" data-questiongroup="_QPassive10ScaleV">
                                        <!--scale-verticalpre terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPreTerminator','_Q0_Preterm','_QPassive10ScaleV');</script>
                                    <div class="o-scale">
                                        <script>app.registerComponent('oScale','_Q0_Scale','_QPassive10ScaleV');</script>
                                        <div class="o-scale-unitcontainer">
                                            <script>app.registerComponent('oScaleContainer','_Q0_ScaleContainer','_QPassive10ScaleV');</script>
                                            <!-- - - - units container - - - -->
                                        </div>
                                    </div>
                                    <input data-questionid="_Q0" data-questiongroup="_QPassive10ScaleV" data-position="below" type="text" name="_QPassive10ScaleV" id="_Q0" data-lpignore="true" autocomplete="off" style="width:80%;" maxlength="2" value="" data-value="" class="a-input-scale-vertical below hiddencontrol"/>
                                    <button type="Button" class="a-button-postterminator" data-questionid="_Q0_Postterm" data-questiongroup="_QPassive10ScaleV">
                                        <!--scale-vertical post terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPostTerminator','_Q0_Postterm','_QPassive10ScaleV');</script>
                                </div>
                                <script>app.registerComponent('aInputScale-vertical','_Q0','_QPassive10ScaleV');</script>
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

export const ScaleSpecialCodesHtml = () => `
<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QPassive10ScaleSC');</script>

        <script type="text/javascript">app.RegisterProperties("_QPassive10ScaleSC",
{
    "values":{"position":"inside"}
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        <label for="_Q0">This is a horizontal scale question with special codes</label>
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-scale-horizontal" data-questiongroup="_QPassive10ScaleSC" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionScale-horizontal','_Q0','_QPassive10ScaleSC');</script>
                            <div>
                                <!-- - - - rotation div - - - -->
                                <div class="o-question-scale-horizontal-control">
                                    <button type="Button" class="a-button-preterminator" data-questionid="_Q0_Preterm" data-questiongroup="_QPassive10ScaleSC">
                                        <!--scale-horizontalpre terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPreTerminator','_Q0_Preterm','_QPassive10ScaleSC');</script>
                                    <div class="o-scale">
                                        <script>app.registerComponent('oScale','_Q0_Scale','_QPassive10ScaleSC');</script>
                                        <div class="o-scale-unitcontainer">
                                            <script>app.registerComponent('oScaleContainer','_Q0_ScaleContainer','_QPassive10ScaleSC');</script>
                                            <!-- - - - units container - - - -->
                                        </div>
                                    </div>
                                    <input data-questionid="_Q0" data-questiongroup="_QPassive10ScaleSC" data-position="below" type="text" name="_QPassive10ScaleSC" id="_Q0" data-lpignore="true" autocomplete="off" style="width:80%;" maxlength="2" value="" data-value="" class="a-input-scale-horizontal below hiddencontrol"/>
                                    <button type="Button" class="a-button-postterminator" data-questionid="_Q0_Postterm" data-questiongroup="_QPassive10ScaleSC">
                                        <!--scale-horizontal post terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPostTerminator','_Q0_Postterm','_QPassive10ScaleSC');</script>
                                </div>
                                <script>app.registerComponent('aInputScale-horizontal','_Q0','_QPassive10ScaleSC');</script>
                            </div>

                            <!-- Special codes -->
                            <div data-exclusive="true" data-questionid="_Q0_X0" data-questiongroup="_QPassive10ScaleSC" data-position="side" data-hidden="false" class="m-option-base side" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X0','_QPassive10ScaleSC');</script>
                                <input class="hiddencontrol" type="radio" name="_QPassive10ScaleSC_Xcode1" id="_Q0_X0" style="" value="code1"/>
                                <label for="_Q0_X0">
                                    <span class="a-icon-multistate" data-icontype="single"></span>
                                    <span class="a-label-option">first special code</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_X1" data-questiongroup="_QPassive10ScaleSC" data-position="side" data-hidden="false" class="m-option-base side" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X1','_QPassive10ScaleSC');</script>
                                <input class="hiddencontrol" type="radio" name="_QPassive10ScaleSC_Xcode2" id="_Q0_X1" style="" value="code2"/>
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
