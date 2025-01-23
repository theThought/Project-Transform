import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
    htmlFragmentCustomProperties
} from '../../../_htmlFragments';

export const SliderHorizontalHtml = (args) => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QHowManyMissed');</script>

        <script type="text/javascript">app.RegisterProperties("_QHowManyMissed",
{
    "values":{"min":${args.ValuesMin},"max":${args.ValuesMax}},
    "show":{"marks":${args.ShowMarks},"value":${args.ShowValue},"terminators":${args.ShowTerminators}},
    "ticklabels":"${args.TickLabels}",
    "floodtovalue":${args.FloodToValue}
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        <label for="_Q0">This is a horizontal slider question</label>
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-slider-horizontal" data-questiongroup="_QHowManyMissed" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionSlider-horizontal','_Q0','_QHowManyMissed');</script>
                            <div>
                                <!-- - - - rotation div - - - -->
                                <div class="o-question-slider-horizontal-control">
                                    <button type="Button" class="a-button-preterminator" data-questionid="_Q0_Preterm" data-questiongroup="_QHowManyMissed">
                                        <!--slider-horizontalpre terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPreTerminator','_Q0_Preterm','_QHowManyMissed');</script>
                                    <div style="" class="m-slider-horizontal">
                                        <div class="a-style-sliderborder">
                                            <!--slider-horizontal slider border-->
                                        </div>
                                        <div class="m-style-slidermarks">
                                            <!--slider-horizontal tick marks-->
                                        </div>
                                        <div class="m-slider-thumb-horizontal">
                                            <div class="a-label-thumbvalue" data-questionid="_Q0_Val" data-questiongroup="_QHowManyMissed">
                                                <script>app.registerComponent('aLabelThumbValue','_Q0_Thumbvalue','_QHowManyMissed');</script>
                                                <!--slider-horizontal thumb value-->
                                            </div>
                                        </div>
                                        <input data-questionid="_Q0" data-questiongroup="_QHowManyMissed" data-position="below" type="range" name="_QHowManyMissed" id="_Q0" data-lpignore="true" autocomplete="off" style="" maxlength="3" value="" data-value="" class="a-input-slider-horizontal below"/>
                                        <div data-questiongroup="_QHowManyMissed" class="m-label-ticklabels">
                                            <!--slider-horizontal tick labels-->
                                        </div>
                                    </div>
                                    <script>app.registerComponent('aInputSlider-horizontal','_Q0','_QHowManyMissed');</script>
                                    <button type="Button" class="a-button-postterminator" data-questionid="_Q0_Postterm" data-questiongroup="_QHowManyMissed">
                                        <!--slider-horizontal post terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPostTerminator','_Q0_Postterm','_QHowManyMissed');</script>
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

export const SliderVerticalHtml = (args) => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QHowManyMissedV');</script>

        <script type="text/javascript">app.RegisterProperties("_QHowManyMissedV",
{
    "values":{"min":${args.ValuesMin},"max":${args.ValuesMax}},
    "show":{"marks":${args.ShowMarks},"value":${args.ShowValue},"terminators":${args.ShowTerminators}},
    "ticklabels":"${args.TickLabels}",
    "floodtovalue":${args.FloodToValue}
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        <label for="_Q0">This is a vertical slider question</label>
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-slider-vertical" data-questiongroup="_QHowManyMissedV" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionSlider-vertical','_Q0','_QHowManyMissedV');</script>
                            <div class="o-slider-rotate">
                                <!-- - - - rotation div - - - -->
                                <div class="o-question-slider-vertical-control">
                                    <button type="Button" class="a-button-preterminator" data-questionid="_Q0_Preterm" data-questiongroup="_QHowManyMissedV">
                                        <!--slider-verticalpre terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPreTerminator','_Q0_Preterm','_QHowManyMissedV');</script>
                                    <div style="" class="m-slider-vertical">
                                        <div class="a-style-sliderborder">
                                            <!--slider-vertical slider border-->
                                        </div>
                                        <div class="m-style-slidermarks">
                                            <!--slider-vertical tick marks-->
                                        </div>
                                        <div class="m-slider-thumb-vertical">
                                            <div class="a-label-thumbvalue" data-questionid="_Q0_Val" data-questiongroup="_QHowManyMissedV">
                                                <script>app.registerComponent('aLabelThumbValue','_Q0_Thumbvalue','_QHowManyMissedV');</script>
                                                <!--slider-vertical thumb value-->
                                            </div>
                                        </div>
                                        <input data-questionid="_Q0" data-questiongroup="_QHowManyMissedV" data-position="below" type="range" name="_QHowManyMissedV" id="_Q0" data-lpignore="true" autocomplete="off" style="" maxlength="3" value="" data-value="" class="a-input-slider-vertical below hiddencontrol"/>
                                        <div data-questiongroup="_QHowManyMissedV" class="m-label-ticklabels">
                                            <!--slider-vertical tick labels-->
                                        </div>
                                    </div>
                                    <script>app.registerComponent('aInputSlider-vertical','_Q0','_QHowManyMissedV');</script>
                                    <button type="Button" class="a-button-postterminator" data-questionid="_Q0_Postterm" data-questiongroup="_QHowManyMissedV">
                                        <!--slider-vertical post terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPostTerminator','_Q0_Postterm','_QHowManyMissedV');</script>
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

export const SliderSpecialCodesHtml = () => `
<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q1">app.registerComponent('oQuestionContainer','_Q1','_QHowManyMissedSC');</script>

        <script type="text/javascript">app.RegisterProperties("_QHowManyMissedSC",
{
    "values":{"min":0,"max":50},
    "show":{"value":true},
    "floodtovalue":true
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        <label for="_Q1">This is a horizontal slider question with special codes</label>
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-slider-horizontal" data-questiongroup="_QHowManyMissedSC" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionSlider-horizontal','_Q1','_QHowManyMissedSC');</script>
                            <div>
                                <!-- - - - rotation div - - - -->
                                <div class="o-question-slider-horizontal-control">
                                    <button type="Button" class="a-button-preterminator" data-questionid="_Q1_Preterm" data-questiongroup="_QHowManyMissedSC">
                                        <!--slider-horizontalpre terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPreTerminator','_Q1_Preterm','_QHowManyMissedSC');</script>
                                    <div style="" class="m-slider-horizontal">
                                        <div class="a-style-sliderborder">
                                            <!--slider-horizontal slider border-->
                                        </div>
                                        <div class="m-style-slidermarks">
                                            <!--slider-horizontal tick marks-->
                                        </div>
                                        <div class="m-slider-thumb-horizontal">
                                            <div class="a-label-thumbvalue" data-questionid="_Q1_Val" data-questiongroup="_QHowManyMissedSC">
                                                <script>app.registerComponent('aLabelThumbValue','_Q1_Thumbvalue','_QHowManyMissedSC');</script>
                                                <!--slider-horizontal thumb value-->
                                            </div>
                                        </div>
                                        <input data-questionid="_Q1" data-questiongroup="_QHowManyMissedSC" data-position="below" type="range" name="_QHowManyMissedSC" id="_Q1" data-lpignore="true" autocomplete="off" style="" maxlength="3" value="" data-value="" class="a-input-slider-horizontal below"/>
                                        <div data-questiongroup="_QHowManyMissedSC" class="m-label-ticklabels">
                                            <!--slider-horizontal tick labels-->
                                        </div>
                                    </div>
                                    <script>app.registerComponent('aInputSlider-horizontal','_Q1','_QHowManyMissedSC');</script>
                                    <button type="Button" class="a-button-postterminator" data-questionid="_Q1_Postterm" data-questiongroup="_QHowManyMissedSC">
                                        <!--slider-horizontal post terminator-->
                                    </button>
                                    <script>app.registerComponent('aButtonPostTerminator','_Q1_Postterm','_QHowManyMissedSC');</script>
                                </div>
                            </div>

                            <!-- Special codes -->
                            <div data-exclusive="true" data-questionid="_Q1_X0" data-questiongroup="_QHowManyMissedSC" data-position="side" data-hidden="false" class="m-option-base side" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_X0','_QHowManyMissedSC');</script>
                                <input class="hiddencontrol" type="radio" name="_QHowManyMissedSC_Xcode1" id="_Q1_X0" style="" value="code1"/>
                                <label for="_Q1_X0">
                                    <span class="a-icon-multistate" data-icontype="single"></span>
                                    <span class="a-label-option">first special code</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q1_X1" data-questiongroup="_QHowManyMissedSC" data-position="side" data-hidden="false" class="m-option-base side" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_X1','_QHowManyMissedSC');</script>
                                <input class="hiddencontrol" type="radio" name="_QHowManyMissed_Xcode2" id="_Q1_X1" style="" value="code2"/>
                                <label for="_Q1_X1">
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
