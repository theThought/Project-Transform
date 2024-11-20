import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
} from '../../_htmlFragments';

import { parseCustomProps } from '../../_parseCustomPropsJSON';

const style = `
<style>
    /* Override template height inside Storybook */
    #storybook-docs .surroundcontent {
        min-height: fit-content;
    }
</style>
`;

export const SliderHorizontalHtml = (args) => `
${style}

<!--
Render custom properties for ZeroHeight scriptwriter users.
-->
${parseCustomProps(`
{
    "values":{"min":${args.ValuesMin},"max":${args.ValuesMax}},
    "show":{"marks":true,"value":true,"terminators":true},
    "ticklabels":'10',
    "floodtovalue":true
}
`)}

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
    "show":{"marks":true,"value":true,"terminators":true},
    "ticklabels":'10',
    "floodtovalue":true
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
                                    <div style="width:50%" class="m-slider-horizontal">
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
