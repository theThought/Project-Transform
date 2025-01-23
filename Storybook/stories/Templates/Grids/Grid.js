import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
    htmlFragmentCustomProperties
} from '../../_htmlFragments';

export const GridCustomPropertiesHtml = (args) => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_Qgrid6__subheading');</script>

        <script type="text/javascript">app.RegisterProperties("_Qgrid6__subheading",
{
    "cellshading":{"rowheader":${args.CellshadingRowheader},"altrows":${args.CellshadingAltrows}},
    "totals":{"rows":{"visible":${args.TotalsRowsVisible},"exceptions":${args.TotalsRowsExceptions}},"columns":{"visible":${args.TotalsColumnsVisible},"exceptions":${args.TotalsColumnsExceptions},"caption":"${args.TotalsCaption}","labels":{"pre":"${args.TotalsLabelPre}","post":"${args.TotalsLabelPost}"}}}
}
        );</script>

        <script type="text/javascript">app.RegisterProperties("_Qslice",{"type":"number", "labels":{"post":"%"}});</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 20%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Grid with custom properties
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-UNKOWN" data-questiongroup="_Qgrid6__subheading" data-readonly="false" data-position="below">
                            <!--This is a table question-->
                            <table class="o-structure-table" name="Grid with row subheadings and column total">
                                <script>app.registerComponent('oQuestionGrid','_Q0','_Qgrid6__subheading');</script>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="" class="m-structure-cell" scope="row" rowspan="3" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Customer-related</span>
                                    </th>
                                    <th orientation="" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Prescription treatments</span>
                                    </th>
                                    <td orientation="" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_Qgrid6__subheading_Qpats__prescription__tx_Qslice" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q0_Q0','_Qgrid6__subheading_Qpats__prescription__tx_Qslice');</script>
                                            <input data-questionid="_Q0_Q0_Q0" data-questiongroup="_Qgrid6__subheading_Qpats__prescription__tx_Qslice" data-position="below" type="text" name="_Qgrid6__subheading_Qpats__prescription__tx_Qslice" id="_Q0_Q0_Q0" data-lpignore="true" autocomplete="off" style="width:3em;" maxlength="3" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q0_Q0','_Qgrid6__subheading_Qpats__prescription__tx_Qslice');</script>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Vaccinations</span>
                                    </th>
                                    <td orientation="" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_Qgrid6__subheading_Qpats__vaccinations_Qslice" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q2_Q0','_Qgrid6__subheading_Qpats__vaccinations_Qslice');</script>
                                            <input data-questionid="_Q0_Q2_Q0" data-questiongroup="_Qgrid6__subheading_Qpats__vaccinations_Qslice" data-position="below" type="text" name="_Qgrid6__subheading_Qpats__vaccinations_Qslice" id="_Q0_Q2_Q0" data-lpignore="true" autocomplete="off" style="width:3em;" maxlength="3" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q2_Q0','_Qgrid6__subheading_Qpats__vaccinations_Qslice');</script>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">General health</span>
                                    </th>
                                    <td orientation="" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_Qgrid6__subheading_Qpats__general__health__education_Qslice" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q3_Q0','_Qgrid6__subheading_Qpats__general__health__education_Qslice');</script>
                                            <input data-questionid="_Q0_Q3_Q0" data-questiongroup="_Qgrid6__subheading_Qpats__general__health__education_Qslice" data-position="below" type="text" name="_Qgrid6__subheading_Qpats__general__health__education_Qslice" id="_Q0_Q3_Q0" data-lpignore="true" autocomplete="off" style="width:3em;" maxlength="3" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q3_Q0','_Qgrid6__subheading_Qpats__general__health__education_Qslice');</script>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="" class="m-structure-cell" scope="row" rowspan="3" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Other / administrative</span>
                                    </th>
                                    <th orientation="" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Engaging with healthcare professionals</span>
                                    </th>
                                    <td orientation="" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_Qgrid6__subheading_Qengaging__physicians__healthcare__prof__admin__staff__behalf__of__pats_Qslice" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q11_Q0','_Qgrid6__subheading_Qengaging__physicians__healthcare__prof__admin__staff__behalf__of__pats_Qslice');</script>
                                            <input data-questionid="_Q0_Q11_Q0" data-questiongroup="_Qgrid6__subheading_Qengaging__physicians__healthcare__prof__admin__staff__behalf__of__pats_Qslice" data-position="below" type="text" name="_Qgrid6__subheading_Qengaging__physicians__healthcare__prof__admin__staff__behalf__of__pats_Qslice" id="_Q0_Q11_Q0" data-lpignore="true" autocomplete="off" style="width:3em;" maxlength="3" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q11_Q0','_Qgrid6__subheading_Qengaging__physicians__healthcare__prof__admin__staff__behalf__of__pats_Qslice');</script>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Engaging with insurance companies</span>
                                    </th>
                                    <td orientation="" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_Qgrid6__subheading_Qengaging__insurance__comp__behalf__pats_Qslice" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q12_Q0','_Qgrid6__subheading_Qengaging__insurance__comp__behalf__pats_Qslice');</script>
                                            <input data-questionid="_Q0_Q12_Q0" data-questiongroup="_Qgrid6__subheading_Qengaging__insurance__comp__behalf__pats_Qslice" data-position="below" type="text" name="_Qgrid6__subheading_Qengaging__insurance__comp__behalf__pats_Qslice" id="_Q0_Q12_Q0" data-lpignore="true" autocomplete="off" style="width:3em;" maxlength="3" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q12_Q0','_Qgrid6__subheading_Qengaging__insurance__comp__behalf__pats_Qslice');</script>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">General administration</span>
                                    </th>
                                    <td orientation="" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_Qgrid6__subheading_Qgeneral__administration__operational__activities_Qslice" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q14_Q0','_Qgrid6__subheading_Qgeneral__administration__operational__activities_Qslice');</script>
                                            <input data-questionid="_Q0_Q14_Q0" data-questiongroup="_Qgrid6__subheading_Qgeneral__administration__operational__activities_Qslice" data-position="below" type="text" name="_Qgrid6__subheading_Qgeneral__administration__operational__activities_Qslice" id="_Q0_Q14_Q0" data-lpignore="true" autocomplete="off" style="width:3em;" maxlength="3" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q14_Q0','_Qgrid6__subheading_Qgeneral__administration__operational__activities_Qslice');</script>
                                        </div>
                                    </td>
                                </tr>
                            </table>
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

export const GridCategoricalHtml = () => `
<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QDailyNewspapersByDay');</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Categorical grid
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-UNKOWN" data-questiongroup="_Q0_Grid" data-readonly="false" data-position="below">
                            <!--This is a table question-->
                            <table data-orientation="Row" class="o-structure-table" name="Indicate the preferred newspaper for each day">
                                <script>app.registerComponent('oQuestionGrid','_Q0','_Q0_Grid');</script>
                                <tr class="m-structure-row-heading" data-iterationname="">
                                    <th orientation="Row" class="m-structure-cell" scope="col" style=""></th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">Daily Express</span>
                                    </th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">The Mirror</span>
                                    </th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">The Daily Telegraph</span>
                                    </th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">The Independent</span>
                                    </th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">Guardian</span>
                                    </th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">The Times</span>
                                    </th>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Row" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Monday</span>
                                    </th>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q0_Q0_C3" data-questiongroup="_QDailyNewspapersByDay_QMon_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q0_Q0_C3','_QDailyNewspapersByDay_QMon_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QMon_QWhichpaper_CExpress" id="_Q0_Q0_Q0_C3" style="" value="Express"/>
                                            <label for="_Q0_Q0_Q0_C3">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q0_Q0_C4" data-questiongroup="_QDailyNewspapersByDay_QMon_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q0_Q0_C4','_QDailyNewspapersByDay_QMon_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QMon_QWhichpaper_CMirror" id="_Q0_Q0_Q0_C4" style="" value="Mirror"/>
                                            <label for="_Q0_Q0_Q0_C4">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q0_Q0_C5" data-questiongroup="_QDailyNewspapersByDay_QMon_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q0_Q0_C5','_QDailyNewspapersByDay_QMon_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QMon_QWhichpaper_CTelegraph" id="_Q0_Q0_Q0_C5" style="" value="Telegraph"/>
                                            <label for="_Q0_Q0_Q0_C5">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q0_Q0_C6" data-questiongroup="_QDailyNewspapersByDay_QMon_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q0_Q0_C6','_QDailyNewspapersByDay_QMon_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QMon_QWhichpaper_CIndependent" id="_Q0_Q0_Q0_C6" style="" value="Independent"/>
                                            <label for="_Q0_Q0_Q0_C6">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q0_Q0_C7" data-questiongroup="_QDailyNewspapersByDay_QMon_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q0_Q0_C7','_QDailyNewspapersByDay_QMon_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QMon_QWhichpaper_CGuardian" id="_Q0_Q0_Q0_C7" style="" value="Guardian"/>
                                            <label for="_Q0_Q0_Q0_C7">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q0_Q0_C9" data-questiongroup="_QDailyNewspapersByDay_QMon_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q0_Q0_C9','_QDailyNewspapersByDay_QMon_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QMon_QWhichpaper_CTimes" id="_Q0_Q0_Q0_C9" style="" value="Times"/>
                                            <label for="_Q0_Q0_Q0_C9">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Row" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Tuesday</span>
                                    </th>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q1_Q0_C3" data-questiongroup="_QDailyNewspapersByDay_QTue_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q1_Q0_C3','_QDailyNewspapersByDay_QTue_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QTue_QWhichpaper_CExpress" id="_Q0_Q1_Q0_C3" style="" value="Express"/>
                                            <label for="_Q0_Q1_Q0_C3">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q1_Q0_C4" data-questiongroup="_QDailyNewspapersByDay_QTue_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q1_Q0_C4','_QDailyNewspapersByDay_QTue_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QTue_QWhichpaper_CMirror" id="_Q0_Q1_Q0_C4" style="" value="Mirror"/>
                                            <label for="_Q0_Q1_Q0_C4">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q1_Q0_C5" data-questiongroup="_QDailyNewspapersByDay_QTue_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q1_Q0_C5','_QDailyNewspapersByDay_QTue_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QTue_QWhichpaper_CTelegraph" id="_Q0_Q1_Q0_C5" style="" value="Telegraph"/>
                                            <label for="_Q0_Q1_Q0_C5">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q1_Q0_C6" data-questiongroup="_QDailyNewspapersByDay_QTue_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q1_Q0_C6','_QDailyNewspapersByDay_QTue_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QTue_QWhichpaper_CIndependent" id="_Q0_Q1_Q0_C6" style="" value="Independent"/>
                                            <label for="_Q0_Q1_Q0_C6">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q1_Q0_C7" data-questiongroup="_QDailyNewspapersByDay_QTue_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q1_Q0_C7','_QDailyNewspapersByDay_QTue_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QTue_QWhichpaper_CGuardian" id="_Q0_Q1_Q0_C7" style="" value="Guardian"/>
                                            <label for="_Q0_Q1_Q0_C7">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q1_Q0_C9" data-questiongroup="_QDailyNewspapersByDay_QTue_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q1_Q0_C9','_QDailyNewspapersByDay_QTue_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QTue_QWhichpaper_CTimes" id="_Q0_Q1_Q0_C9" style="" value="Times"/>
                                            <label for="_Q0_Q1_Q0_C9">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Row" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Wednesday</span>
                                    </th>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q2_Q0_C3" data-questiongroup="_QDailyNewspapersByDay_QWed_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q2_Q0_C3','_QDailyNewspapersByDay_QWed_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QWed_QWhichpaper_CExpress" id="_Q0_Q2_Q0_C3" style="" value="Express"/>
                                            <label for="_Q0_Q2_Q0_C3">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q2_Q0_C4" data-questiongroup="_QDailyNewspapersByDay_QWed_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q2_Q0_C4','_QDailyNewspapersByDay_QWed_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QWed_QWhichpaper_CMirror" id="_Q0_Q2_Q0_C4" style="" value="Mirror"/>
                                            <label for="_Q0_Q2_Q0_C4">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q2_Q0_C5" data-questiongroup="_QDailyNewspapersByDay_QWed_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q2_Q0_C5','_QDailyNewspapersByDay_QWed_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QWed_QWhichpaper_CTelegraph" id="_Q0_Q2_Q0_C5" style="" value="Telegraph"/>
                                            <label for="_Q0_Q2_Q0_C5">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q2_Q0_C6" data-questiongroup="_QDailyNewspapersByDay_QWed_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q2_Q0_C6','_QDailyNewspapersByDay_QWed_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QWed_QWhichpaper_CIndependent" id="_Q0_Q2_Q0_C6" style="" value="Independent"/>
                                            <label for="_Q0_Q2_Q0_C6">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q2_Q0_C7" data-questiongroup="_QDailyNewspapersByDay_QWed_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q2_Q0_C7','_QDailyNewspapersByDay_QWed_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QWed_QWhichpaper_CGuardian" id="_Q0_Q2_Q0_C7" style="" value="Guardian"/>
                                            <label for="_Q0_Q2_Q0_C7">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q2_Q0_C9" data-questiongroup="_QDailyNewspapersByDay_QWed_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q2_Q0_C9','_QDailyNewspapersByDay_QWed_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QWed_QWhichpaper_CTimes" id="_Q0_Q2_Q0_C9" style="" value="Times"/>
                                            <label for="_Q0_Q2_Q0_C9">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Row" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Thursday</span>
                                    </th>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q3_Q0_C3" data-questiongroup="_QDailyNewspapersByDay_QThu_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q3_Q0_C3','_QDailyNewspapersByDay_QThu_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QThu_QWhichpaper_CExpress" id="_Q0_Q3_Q0_C3" style="" value="Express"/>
                                            <label for="_Q0_Q3_Q0_C3">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q3_Q0_C4" data-questiongroup="_QDailyNewspapersByDay_QThu_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q3_Q0_C4','_QDailyNewspapersByDay_QThu_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QThu_QWhichpaper_CMirror" id="_Q0_Q3_Q0_C4" style="" value="Mirror"/>
                                            <label for="_Q0_Q3_Q0_C4">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q3_Q0_C5" data-questiongroup="_QDailyNewspapersByDay_QThu_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q3_Q0_C5','_QDailyNewspapersByDay_QThu_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QThu_QWhichpaper_CTelegraph" id="_Q0_Q3_Q0_C5" style="" value="Telegraph"/>
                                            <label for="_Q0_Q3_Q0_C5">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q3_Q0_C6" data-questiongroup="_QDailyNewspapersByDay_QThu_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q3_Q0_C6','_QDailyNewspapersByDay_QThu_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QThu_QWhichpaper_CIndependent" id="_Q0_Q3_Q0_C6" style="" value="Independent"/>
                                            <label for="_Q0_Q3_Q0_C6">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q3_Q0_C7" data-questiongroup="_QDailyNewspapersByDay_QThu_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q3_Q0_C7','_QDailyNewspapersByDay_QThu_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QThu_QWhichpaper_CGuardian" id="_Q0_Q3_Q0_C7" style="" value="Guardian"/>
                                            <label for="_Q0_Q3_Q0_C7">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q3_Q0_C9" data-questiongroup="_QDailyNewspapersByDay_QThu_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q3_Q0_C9','_QDailyNewspapersByDay_QThu_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QThu_QWhichpaper_CTimes" id="_Q0_Q3_Q0_C9" style="" value="Times"/>
                                            <label for="_Q0_Q3_Q0_C9">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Row" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Friday</span>
                                    </th>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q4_Q0_C3" data-questiongroup="_QDailyNewspapersByDay_QFri_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q4_Q0_C3','_QDailyNewspapersByDay_QFri_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QFri_QWhichpaper_CExpress" id="_Q0_Q4_Q0_C3" style="" value="Express"/>
                                            <label for="_Q0_Q4_Q0_C3">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q4_Q0_C4" data-questiongroup="_QDailyNewspapersByDay_QFri_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q4_Q0_C4','_QDailyNewspapersByDay_QFri_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QFri_QWhichpaper_CMirror" id="_Q0_Q4_Q0_C4" style="" value="Mirror"/>
                                            <label for="_Q0_Q4_Q0_C4">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q4_Q0_C5" data-questiongroup="_QDailyNewspapersByDay_QFri_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q4_Q0_C5','_QDailyNewspapersByDay_QFri_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QFri_QWhichpaper_CTelegraph" id="_Q0_Q4_Q0_C5" style="" value="Telegraph"/>
                                            <label for="_Q0_Q4_Q0_C5">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q4_Q0_C6" data-questiongroup="_QDailyNewspapersByDay_QFri_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q4_Q0_C6','_QDailyNewspapersByDay_QFri_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QFri_QWhichpaper_CIndependent" id="_Q0_Q4_Q0_C6" style="" value="Independent"/>
                                            <label for="_Q0_Q4_Q0_C6">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q4_Q0_C7" data-questiongroup="_QDailyNewspapersByDay_QFri_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q4_Q0_C7','_QDailyNewspapersByDay_QFri_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QFri_QWhichpaper_CGuardian" id="_Q0_Q4_Q0_C7" style="" value="Guardian"/>
                                            <label for="_Q0_Q4_Q0_C7">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="true" data-questionid="_Q0_Q4_Q0_C9" data-questiongroup="_QDailyNewspapersByDay_QFri_QWhichpaper" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q4_Q0_C9','_QDailyNewspapersByDay_QFri_QWhichpaper');</script>
                                            <input class="hiddencontrol" type="radio" name="_QDailyNewspapersByDay_QFri_QWhichpaper_CTimes" id="_Q0_Q4_Q0_C9" style="" value="Times"/>
                                            <label for="_Q0_Q4_Q0_C9">
                                                <span class="a-icon-multistate" data-icontype="single">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
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

export const GridComplexHtml = () => `
<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QHiddenQuestions');</script>
        <script type="text/javascript">app.RegisterProperties("_Qasimplequestion",{"type":"text"});</script>
        <script type="text/javascript">app.RegisterProperties("_Qasimplequestionwithlabels",{"type":"number","labels":{"pre":"£", "post":"p"}});</script>
        <script type="text/javascript">app.RegisterProperties("_Qasimpledropdown",{"displayicon":false,"jumptofirstletter":true,"listsize":10,"showanswers":false,"type":"dropdown","placeholder":"Which Gender"});</script>
        <script type="text/javascript">app.RegisterProperties("_Qasimplecombobox",{"displayicon":false,"filtertype":"starts","listsize":10,"showanswers":false,"placeholder":"Which Gender","mincharactersforlist":1,"notenoughcharacters":"You need to type at least one character","noitemsinlist":"no items match this filter"});</script>
        <script type="text/javascript">app.RegisterProperties("_Qasimpleslider",{"values":{"min":1,"max":5},"show":{"marks":true,"value":false,"terminators":true},"ticklabels":1,"floodtovalue":true});</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Complex grid, with inputs, dropdowns, comboboxes and sliders
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-UNKOWN" data-questiongroup="_Q0_Grid" data-readonly="false" data-position="below">
                            <!--This is a table question-->
                            <table data-orientation="Row" class="o-structure-table" name="Here is a grid containing various hidden questions">
                                <script>app.registerComponent('oQuestionGrid','_Q0','_Q0_Grid');</script>
                                <tr class="m-structure-row-heading" data-iterationname="">
                                    <th orientation="Row" class="m-structure-cell" scope="col" style=""></th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" style="">
                                        <span class="a-label-question">Input</span>
                                    </th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" style="">
                                        <span class="a-label-question">Input &amp; labels</span>
                                    </th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" style="">
                                        <span class="a-label-question">dropdown</span>
                                    </th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" style="">
                                        <span class="a-label-question">combobox</span>
                                    </th>
                                    <th orientation="Row" class="m-structure-cell" scope="col" style="">
                                        <span class="a-label-question">slider</span>
                                    </th>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Row" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">first</span>
                                    </th>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplequestion" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q0_Q0','_QHiddenQuestions_Qfirstrow_Qasimplequestion');</script>
                                            <input data-questionid="_Q0_Q0_Q0" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplequestion" data-position="below" type="text" step="any" name="_QHiddenQuestions_Qfirstrow_Qasimplequestion" id="_Q0_Q0_Q0" data-lpignore="true" autocomplete="off" style="width:5em;" maxlength="1024" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q0_Q0','_QHiddenQuestions_Qfirstrow_Qasimplequestion');</script>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplequestionwithlabels" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q0_Q1','_QHiddenQuestions_Qfirstrow_Qasimplequestionwithlabels');</script>
                                            <input data-questionid="_Q0_Q0_Q1" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplequestionwithlabels" data-position="below" type="text" step="any" name="_QHiddenQuestions_Qfirstrow_Qasimplequestionwithlabels" id="_Q0_Q0_Q1" data-lpignore="true" autocomplete="off" style="width:5em;" maxlength="17" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q0_Q1','_QHiddenQuestions_Qfirstrow_Qasimplequestionwithlabels');</script>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-dropdown" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpledropdown" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestiondropdown','_Q0_Q0_Q2','_QHiddenQuestions_Qfirstrow_Qasimpledropdown');</script>
                                            <div class="o-dropdown" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpledropdown" data-questionid="_Q0_Q0_Q2">
                                                <script>app.registerComponent('oDropdown','_Q0_Q0_Q2','_QHiddenQuestions_Qfirstrow_Qasimpledropdown');</script>
                                                <input data-questionid="_Q0_Q0_Q2" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpledropdown" data-position="below" type="text" name="_QHiddenQuestions_Qfirstrow_Qasimpledropdown_C" id="_Q0_Q0_Q2" data-lpignore="true" autocomplete="off" style="" value="" data-value="" class="a-input-dropdown below"/>
                                                <ul class="m-list" id="_Q0_Q0_Q2_list" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpledropdown">
                                                    <script>app.registerComponent('mList','_Q0_Q0_Q2_list','_QHiddenQuestions_Qfirstrow_Qasimpledropdown');</script>
                                                    <li class="a-option-list" data-questionid="_Q0_Q0_Q2_C0" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpledropdown" data-value="male" id="_Q0_Q0_Q2_C0">male</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q0_Q2_C1" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpledropdown" data-value="female" id="_Q0_Q0_Q2_C1">female</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q0_Q2_C2" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpledropdown" data-value="none" id="_Q0_Q0_Q2_C2">non-binary</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-combobox" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplecombobox" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestioncombobox','_Q0_Q0_Q3','_QHiddenQuestions_Qfirstrow_Qasimplecombobox');</script>
                                            <div class="o-combobox" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplecombobox" data-questionid="_Q0_Q0_Q3">
                                                <script>app.registerComponent('oCombobox','_Q0_Q0_Q3','_QHiddenQuestions_Qfirstrow_Qasimplecombobox');</script>
                                                <input data-questionid="_Q0_Q0_Q3" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplecombobox" data-position="below" type="text" name="_QHiddenQuestions_Qfirstrow_Qasimplecombobox_C" id="_Q0_Q0_Q3" data-lpignore="true" autocomplete="off" style="" list="_Q0_Q0_Q3_list" value="" data-value="" class="a-input-combobox below"/>
                                                <div class="o-list-selected" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplecombobox">
                                                    <!-- - - - selected tags - - - -->
                                                </div>
                                                <ul class="m-list" id="_Q0_Q0_Q3_list" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplecombobox">
                                                    <script>app.registerComponent('mList','_Q0_Q0_Q3_list','_QHiddenQuestions_Qfirstrow_Qasimplecombobox');</script>
                                                    <li class="a-option-list" data-questionid="_Q0_Q0_Q3_C0" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplecombobox" data-value="male" id="_Q0_Q0_Q3_C0">male</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q0_Q3_C1" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplecombobox" data-value="female" id="_Q0_Q0_Q3_C1">female</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q0_Q3_C2" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimplecombobox" data-value="none" id="_Q0_Q0_Q3_C2">non-binary</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-slider-horizontal" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpleslider" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionslider-horizontal','_Q0_Q0_Q4','_QHiddenQuestions_Qfirstrow_Qasimpleslider');</script>
                                            <div>
                                                <!-- - - - rotation div - - - -->
                                                <div class="o-question-slider-horizontal-control">
                                                    <button type="Button" class="a-button-preterminator" data-questionid="_Q0_Q0_Q4_Preterm" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpleslider">
                                                        <!--slider-horizontalpre terminator-->
                                                    </button>
                                                    <script>app.registerComponent('aButtonPreTerminator','_Q0_Q0_Q4_Preterm','_QHiddenQuestions_Qfirstrow_Qasimpleslider');</script>
                                                    <div style="width:17em" class="m-slider-horizontal">
                                                        <div class="a-style-sliderborder">
                                                            <!--slider-horizontal slider border-->
                                                        </div>
                                                        <div class="m-style-slidermarks">
                                                            <!--slider-horizontal tick marks-->
                                                        </div>
                                                        <div class="m-slider-thumb-horizontal">
                                                            <div class="a-label-thumbvalue" data-questionid="_Q0_Q0_Q4_Val" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpleslider">
                                                                <script>app.registerComponent('aLabelThumbValue','_Q0_Q0_Q4_Thumbvalue','_QHiddenQuestions_Qfirstrow_Qasimpleslider');</script>
                                                                <!--slider-horizontal thumb value-->
                                                            </div>
                                                        </div>
                                                        <input data-questionid="_Q0_Q0_Q4" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpleslider" data-position="below" type="range" name="_QHiddenQuestions_Qfirstrow_Qasimpleslider" id="_Q0_Q0_Q4" data-lpignore="true" autocomplete="off" style="" maxlength="1" value="" data-value="" class="a-input-slider-horizontal below"/>
                                                        <div data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpleslider" class="m-label-ticklabels">
                                                            <!--slider-horizontal tick labels-->
                                                        </div>
                                                    </div>
                                                    <script>app.registerComponent('aInputSlider-horizontal','_Q0_Q0_Q4','_QHiddenQuestions_Qfirstrow_Qasimpleslider');</script>
                                                    <button type="Button" class="a-button-postterminator" data-questionid="_Q0_Q0_Q4_Postterm" data-questiongroup="_QHiddenQuestions_Qfirstrow_Qasimpleslider">
                                                        <!--slider-horizontal post terminator-->
                                                    </button>
                                                    <script>app.registerComponent('aButtonPostTerminator','_Q0_Q0_Q4_Postterm','_QHiddenQuestions_Qfirstrow_Qasimpleslider');</script>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Row" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">second</span>
                                    </th>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplequestion" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q1_Q0','_QHiddenQuestions_Qsecondrow_Qasimplequestion');</script>
                                            <input data-questionid="_Q0_Q1_Q0" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplequestion" data-position="below" type="text" step="any" name="_QHiddenQuestions_Qsecondrow_Qasimplequestion" id="_Q0_Q1_Q0" data-lpignore="true" autocomplete="off" style="width:5em;" maxlength="1024" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q1_Q0','_QHiddenQuestions_Qsecondrow_Qasimplequestion');</script>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplequestionwithlabels" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q1_Q1','_QHiddenQuestions_Qsecondrow_Qasimplequestionwithlabels');</script>
                                            <input data-questionid="_Q0_Q1_Q1" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplequestionwithlabels" data-position="below" type="text" step="any" name="_QHiddenQuestions_Qsecondrow_Qasimplequestionwithlabels" id="_Q0_Q1_Q1" data-lpignore="true" autocomplete="off" style="width:5em;" maxlength="17" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q1_Q1','_QHiddenQuestions_Qsecondrow_Qasimplequestionwithlabels');</script>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-dropdown" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpledropdown" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestiondropdown','_Q0_Q1_Q2','_QHiddenQuestions_Qsecondrow_Qasimpledropdown');</script>
                                            <div class="o-dropdown" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpledropdown" data-questionid="_Q0_Q1_Q2">
                                                <script>app.registerComponent('oDropdown','_Q0_Q1_Q2','_QHiddenQuestions_Qsecondrow_Qasimpledropdown');</script>
                                                <input data-questionid="_Q0_Q1_Q2" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpledropdown" data-position="below" type="text" name="_QHiddenQuestions_Qsecondrow_Qasimpledropdown_C" id="_Q0_Q1_Q2" data-lpignore="true" autocomplete="off" style="" value="" data-value="" class="a-input-dropdown below"/>
                                                <ul class="m-list" id="_Q0_Q1_Q2_list" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpledropdown">
                                                    <script>app.registerComponent('mList','_Q0_Q1_Q2_list','_QHiddenQuestions_Qsecondrow_Qasimpledropdown');</script>
                                                    <li class="a-option-list" data-questionid="_Q0_Q1_Q2_C0" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpledropdown" data-value="male" id="_Q0_Q1_Q2_C0">male</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q1_Q2_C1" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpledropdown" data-value="female" id="_Q0_Q1_Q2_C1">female</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q1_Q2_C2" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpledropdown" data-value="none" id="_Q0_Q1_Q2_C2">non-binary</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-combobox" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplecombobox" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestioncombobox','_Q0_Q1_Q3','_QHiddenQuestions_Qsecondrow_Qasimplecombobox');</script>
                                            <div class="o-combobox" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplecombobox" data-questionid="_Q0_Q1_Q3">
                                                <script>app.registerComponent('oCombobox','_Q0_Q1_Q3','_QHiddenQuestions_Qsecondrow_Qasimplecombobox');</script>
                                                <input data-questionid="_Q0_Q1_Q3" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplecombobox" data-position="below" type="text" name="_QHiddenQuestions_Qsecondrow_Qasimplecombobox_C" id="_Q0_Q1_Q3" data-lpignore="true" autocomplete="off" style="" list="_Q0_Q1_Q3_list" value="" data-value="" class="a-input-combobox below"/>
                                                <div class="o-list-selected" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplecombobox">
                                                    <!-- - - - selected tags - - - -->
                                                </div>
                                                <ul class="m-list" id="_Q0_Q1_Q3_list" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplecombobox">
                                                    <script>app.registerComponent('mList','_Q0_Q1_Q3_list','_QHiddenQuestions_Qsecondrow_Qasimplecombobox');</script>
                                                    <li class="a-option-list" data-questionid="_Q0_Q1_Q3_C0" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplecombobox" data-value="male" id="_Q0_Q1_Q3_C0">male</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q1_Q3_C1" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplecombobox" data-value="female" id="_Q0_Q1_Q3_C1">female</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q1_Q3_C2" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimplecombobox" data-value="none" id="_Q0_Q1_Q3_C2">non-binary</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-slider-horizontal" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpleslider" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionslider-horizontal','_Q0_Q1_Q4','_QHiddenQuestions_Qsecondrow_Qasimpleslider');</script>
                                            <div>
                                                <!-- - - - rotation div - - - -->
                                                <div class="o-question-slider-horizontal-control">
                                                    <button type="Button" class="a-button-preterminator" data-questionid="_Q0_Q1_Q4_Preterm" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpleslider">
                                                        <!--slider-horizontalpre terminator-->
                                                    </button>
                                                    <script>app.registerComponent('aButtonPreTerminator','_Q0_Q1_Q4_Preterm','_QHiddenQuestions_Qsecondrow_Qasimpleslider');</script>
                                                    <div style="width:17em" class="m-slider-horizontal">
                                                        <div class="a-style-sliderborder">
                                                            <!--slider-horizontal slider border-->
                                                        </div>
                                                        <div class="m-style-slidermarks">
                                                            <!--slider-horizontal tick marks-->
                                                        </div>
                                                        <div class="m-slider-thumb-horizontal">
                                                            <div class="a-label-thumbvalue" data-questionid="_Q0_Q1_Q4_Val" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpleslider">
                                                                <script>app.registerComponent('aLabelThumbValue','_Q0_Q1_Q4_Thumbvalue','_QHiddenQuestions_Qsecondrow_Qasimpleslider');</script>
                                                                <!--slider-horizontal thumb value-->
                                                            </div>
                                                        </div>
                                                        <input data-questionid="_Q0_Q1_Q4" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpleslider" data-position="below" type="range" name="_QHiddenQuestions_Qsecondrow_Qasimpleslider" id="_Q0_Q1_Q4" data-lpignore="true" autocomplete="off" style="" maxlength="1" value="" data-value="" class="a-input-slider-horizontal below"/>
                                                        <div data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpleslider" class="m-label-ticklabels">
                                                            <!--slider-horizontal tick labels-->
                                                        </div>
                                                    </div>
                                                    <script>app.registerComponent('aInputSlider-horizontal','_Q0_Q1_Q4','_QHiddenQuestions_Qsecondrow_Qasimpleslider');</script>
                                                    <button type="Button" class="a-button-postterminator" data-questionid="_Q0_Q1_Q4_Postterm" data-questiongroup="_QHiddenQuestions_Qsecondrow_Qasimpleslider">
                                                        <!--slider-horizontal post terminator-->
                                                    </button>
                                                    <script>app.registerComponent('aButtonPostTerminator','_Q0_Q1_Q4_Postterm','_QHiddenQuestions_Qsecondrow_Qasimpleslider');</script>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Row" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">third</span>
                                    </th>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplequestion" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q2_Q0','_QHiddenQuestions_Qthirdrow_Qasimplequestion');</script>
                                            <input data-questionid="_Q0_Q2_Q0" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplequestion" data-position="below" type="text" step="any" name="_QHiddenQuestions_Qthirdrow_Qasimplequestion" id="_Q0_Q2_Q0" data-lpignore="true" autocomplete="off" style="width:5em;" maxlength="1024" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q2_Q0','_QHiddenQuestions_Qthirdrow_Qasimplequestion');</script>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplequestionwithlabels" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0_Q2_Q1','_QHiddenQuestions_Qthirdrow_Qasimplequestionwithlabels');</script>
                                            <input data-questionid="_Q0_Q2_Q1" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplequestionwithlabels" data-position="below" type="text" step="any" name="_QHiddenQuestions_Qthirdrow_Qasimplequestionwithlabels" id="_Q0_Q2_Q1" data-lpignore="true" autocomplete="off" style="width:5em;" maxlength="17" value="" data-value="" class="a-input-singlelineedit below"/>
                                            <script>app.registerComponent('aInputSinglelineedit','_Q0_Q2_Q1','_QHiddenQuestions_Qthirdrow_Qasimplequestionwithlabels');</script>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-dropdown" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpledropdown" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestiondropdown','_Q0_Q2_Q2','_QHiddenQuestions_Qthirdrow_Qasimpledropdown');</script>
                                            <div class="o-dropdown" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpledropdown" data-questionid="_Q0_Q2_Q2">
                                                <script>app.registerComponent('oDropdown','_Q0_Q2_Q2','_QHiddenQuestions_Qthirdrow_Qasimpledropdown');</script>
                                                <input data-questionid="_Q0_Q2_Q2" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpledropdown" data-position="below" type="text" name="_QHiddenQuestions_Qthirdrow_Qasimpledropdown_C" id="_Q0_Q2_Q2" data-lpignore="true" autocomplete="off" style="" value="" data-value="" class="a-input-dropdown below"/>
                                                <ul class="m-list" id="_Q0_Q2_Q2_list" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpledropdown">
                                                    <script>app.registerComponent('mList','_Q0_Q2_Q2_list','_QHiddenQuestions_Qthirdrow_Qasimpledropdown');</script>
                                                    <li class="a-option-list" data-questionid="_Q0_Q2_Q2_C0" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpledropdown" data-value="male" id="_Q0_Q2_Q2_C0">male</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q2_Q2_C1" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpledropdown" data-value="female" id="_Q0_Q2_Q2_C1">female</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q2_Q2_C2" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpledropdown" data-value="none" id="_Q0_Q2_Q2_C2">non-binary</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-combobox" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplecombobox" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestioncombobox','_Q0_Q2_Q3','_QHiddenQuestions_Qthirdrow_Qasimplecombobox');</script>
                                            <div class="o-combobox" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplecombobox" data-questionid="_Q0_Q2_Q3">
                                                <script>app.registerComponent('oCombobox','_Q0_Q2_Q3','_QHiddenQuestions_Qthirdrow_Qasimplecombobox');</script>
                                                <input data-questionid="_Q0_Q2_Q3" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplecombobox" data-position="below" type="text" name="_QHiddenQuestions_Qthirdrow_Qasimplecombobox_C" id="_Q0_Q2_Q3" data-lpignore="true" autocomplete="off" style="" list="_Q0_Q2_Q3_list" value="" data-value="" class="a-input-combobox below"/>
                                                <div class="o-list-selected" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplecombobox">
                                                    <!-- - - - selected tags - - - -->
                                                </div>
                                                <ul class="m-list" id="_Q0_Q2_Q3_list" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplecombobox">
                                                    <script>app.registerComponent('mList','_Q0_Q2_Q3_list','_QHiddenQuestions_Qthirdrow_Qasimplecombobox');</script>
                                                    <li class="a-option-list" data-questionid="_Q0_Q2_Q3_C0" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplecombobox" data-value="male" id="_Q0_Q2_Q3_C0">male</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q2_Q3_C1" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplecombobox" data-value="female" id="_Q0_Q2_Q3_C1">female</li>
                                                    <li class="a-option-list" data-questionid="_Q0_Q2_Q3_C2" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimplecombobox" data-value="none" id="_Q0_Q2_Q3_C2">non-binary</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                    <td orientation="Row" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div class="o-question-response o-question-slider-horizontal" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpleslider" data-readonly="false" data-position="below">
                                            <script>app.registerComponent('oQuestionslider-horizontal','_Q0_Q2_Q4','_QHiddenQuestions_Qthirdrow_Qasimpleslider');</script>
                                            <div>
                                                <!-- - - - rotation div - - - -->
                                                <div class="o-question-slider-horizontal-control">
                                                    <button type="Button" class="a-button-preterminator" data-questionid="_Q0_Q2_Q4_Preterm" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpleslider">
                                                        <!--slider-horizontalpre terminator-->
                                                    </button>
                                                    <script>app.registerComponent('aButtonPreTerminator','_Q0_Q2_Q4_Preterm','_QHiddenQuestions_Qthirdrow_Qasimpleslider');</script>
                                                    <div style="width:17em" class="m-slider-horizontal">
                                                        <div class="a-style-sliderborder">
                                                            <!--slider-horizontal slider border-->
                                                        </div>
                                                        <div class="m-style-slidermarks">
                                                            <!--slider-horizontal tick marks-->
                                                        </div>
                                                        <div class="m-slider-thumb-horizontal">
                                                            <div class="a-label-thumbvalue" data-questionid="_Q0_Q2_Q4_Val" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpleslider">
                                                                <script>app.registerComponent('aLabelThumbValue','_Q0_Q2_Q4_Thumbvalue','_QHiddenQuestions_Qthirdrow_Qasimpleslider');</script>
                                                                <!--slider-horizontal thumb value-->
                                                            </div>
                                                        </div>
                                                        <input data-questionid="_Q0_Q2_Q4" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpleslider" data-position="below" type="range" name="_QHiddenQuestions_Qthirdrow_Qasimpleslider" id="_Q0_Q2_Q4" data-lpignore="true" autocomplete="off" style="" maxlength="1" value="" data-value="" class="a-input-slider-horizontal below"/>
                                                        <div data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpleslider" class="m-label-ticklabels">
                                                            <!--slider-horizontal tick labels-->
                                                        </div>
                                                    </div>
                                                    <script>app.registerComponent('aInputSlider-horizontal','_Q0_Q2_Q4','_QHiddenQuestions_Qthirdrow_Qasimpleslider');</script>
                                                    <button type="Button" class="a-button-postterminator" data-questionid="_Q0_Q2_Q4_Postterm" data-questiongroup="_QHiddenQuestions_Qthirdrow_Qasimpleslider">
                                                        <!--slider-horizontal post terminator-->
                                                    </button>
                                                    <script>app.registerComponent('aButtonPostTerminator','_Q0_Q2_Q4_Postterm','_QHiddenQuestions_Qthirdrow_Qasimpleslider');</script>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
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

export const GridCategoricalRotatedHtml = () => `
<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QAnyFruitByDay');</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Rotated categorical grid
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-UNKOWN" data-questiongroup="_Q0_Grid" data-readonly="false" data-position="below">
                            <!--This is a table question-->
                            <table data-orientation="Column" class="o-structure-table" name="Which of the following fruit did you consume each day this week">
                                <script>app.registerComponent('oQuestionGrid','_Q0','_Q0_Grid');</script>
                                <tr class="m-structure-row-heading" data-iterationname="">
                                    <th orientation="Column" class="m-structure-cell" scope="row" style=""></th>
                                    <th orientation="Column" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">Monday</span>
                                    </th>
                                    <th orientation="Column" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">Tuesday</span>
                                    </th>
                                    <th orientation="Column" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">Wednesday</span>
                                    </th>
                                    <th orientation="Column" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">Thursday</span>
                                    </th>
                                    <th orientation="Column" class="m-structure-cell" scope="col" valign="Middle" align="Center" style="">
                                        <span class="a-label-question">Friday</span>
                                    </th>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Column" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Banana</span>
                                    </th>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q0_Q0_C0" data-questiongroup="_QAnyFruitByDay_QMon_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q0_Q0_C0','_QAnyFruitByDay_QMon_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QMon_Qwhichfruitmulti_CBanana" id="_Q0_Q0_Q0_C0" style="" value="Banana"/>
                                            <label for="_Q0_Q0_Q0_C0">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q1_Q0_C0" data-questiongroup="_QAnyFruitByDay_QTue_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q1_Q0_C0','_QAnyFruitByDay_QTue_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QTue_Qwhichfruitmulti_CBanana" id="_Q0_Q1_Q0_C0" style="" value="Banana"/>
                                            <label for="_Q0_Q1_Q0_C0">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q2_Q0_C0" data-questiongroup="_QAnyFruitByDay_QWed_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q2_Q0_C0','_QAnyFruitByDay_QWed_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QWed_Qwhichfruitmulti_CBanana" id="_Q0_Q2_Q0_C0" style="" value="Banana"/>
                                            <label for="_Q0_Q2_Q0_C0">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q3_Q0_C0" data-questiongroup="_QAnyFruitByDay_QThu_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q3_Q0_C0','_QAnyFruitByDay_QThu_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QThu_Qwhichfruitmulti_CBanana" id="_Q0_Q3_Q0_C0" style="" value="Banana"/>
                                            <label for="_Q0_Q3_Q0_C0">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q4_Q0_C0" data-questiongroup="_QAnyFruitByDay_QFri_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q4_Q0_C0','_QAnyFruitByDay_QFri_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QFri_Qwhichfruitmulti_CBanana" id="_Q0_Q4_Q0_C0" style="" value="Banana"/>
                                            <label for="_Q0_Q4_Q0_C0">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Column" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Apple</span>
                                    </th>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q0_Q0_C1" data-questiongroup="_QAnyFruitByDay_QMon_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q0_Q0_C1','_QAnyFruitByDay_QMon_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QMon_Qwhichfruitmulti_CApple" id="_Q0_Q0_Q0_C1" style="" value="Apple"/>
                                            <label for="_Q0_Q0_Q0_C1">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q1_Q0_C1" data-questiongroup="_QAnyFruitByDay_QTue_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q1_Q0_C1','_QAnyFruitByDay_QTue_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QTue_Qwhichfruitmulti_CApple" id="_Q0_Q1_Q0_C1" style="" value="Apple"/>
                                            <label for="_Q0_Q1_Q0_C1">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q2_Q0_C1" data-questiongroup="_QAnyFruitByDay_QWed_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q2_Q0_C1','_QAnyFruitByDay_QWed_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QWed_Qwhichfruitmulti_CApple" id="_Q0_Q2_Q0_C1" style="" value="Apple"/>
                                            <label for="_Q0_Q2_Q0_C1">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q3_Q0_C1" data-questiongroup="_QAnyFruitByDay_QThu_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q3_Q0_C1','_QAnyFruitByDay_QThu_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QThu_Qwhichfruitmulti_CApple" id="_Q0_Q3_Q0_C1" style="" value="Apple"/>
                                            <label for="_Q0_Q3_Q0_C1">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q4_Q0_C1" data-questiongroup="_QAnyFruitByDay_QFri_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q4_Q0_C1','_QAnyFruitByDay_QFri_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QFri_Qwhichfruitmulti_CApple" id="_Q0_Q4_Q0_C1" style="" value="Apple"/>
                                            <label for="_Q0_Q4_Q0_C1">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Column" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">Orange</span>
                                    </th>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q0_Q0_C2" data-questiongroup="_QAnyFruitByDay_QMon_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q0_Q0_C2','_QAnyFruitByDay_QMon_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QMon_Qwhichfruitmulti_COrange" id="_Q0_Q0_Q0_C2" style="" value="Orange"/>
                                            <label for="_Q0_Q0_Q0_C2">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q1_Q0_C2" data-questiongroup="_QAnyFruitByDay_QTue_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q1_Q0_C2','_QAnyFruitByDay_QTue_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QTue_Qwhichfruitmulti_COrange" id="_Q0_Q1_Q0_C2" style="" value="Orange"/>
                                            <label for="_Q0_Q1_Q0_C2">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q2_Q0_C2" data-questiongroup="_QAnyFruitByDay_QWed_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q2_Q0_C2','_QAnyFruitByDay_QWed_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QWed_Qwhichfruitmulti_COrange" id="_Q0_Q2_Q0_C2" style="" value="Orange"/>
                                            <label for="_Q0_Q2_Q0_C2">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q3_Q0_C2" data-questiongroup="_QAnyFruitByDay_QThu_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q3_Q0_C2','_QAnyFruitByDay_QThu_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QThu_Qwhichfruitmulti_COrange" id="_Q0_Q3_Q0_C2" style="" value="Orange"/>
                                            <label for="_Q0_Q3_Q0_C2">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q4_Q0_C2" data-questiongroup="_QAnyFruitByDay_QFri_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q4_Q0_C2','_QAnyFruitByDay_QFri_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QFri_Qwhichfruitmulti_COrange" id="_Q0_Q4_Q0_C2" style="" value="Orange"/>
                                            <label for="_Q0_Q4_Q0_C2">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="m-structure-row" data-iterationname="">
                                    <th orientation="Column" class="m-structure-cell" scope="row" valign="Middle" align="Left" style="">
                                        <span class="a-label-question">kiwi fruit</span>
                                    </th>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q0_Q0_C3" data-questiongroup="_QAnyFruitByDay_QMon_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q0_Q0_C3','_QAnyFruitByDay_QMon_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QMon_Qwhichfruitmulti_Ckiwi" id="_Q0_Q0_Q0_C3" style="" value="kiwi"/>
                                            <label for="_Q0_Q0_Q0_C3">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q1_Q0_C3" data-questiongroup="_QAnyFruitByDay_QTue_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q1_Q0_C3','_QAnyFruitByDay_QTue_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QTue_Qwhichfruitmulti_Ckiwi" id="_Q0_Q1_Q0_C3" style="" value="kiwi"/>
                                            <label for="_Q0_Q1_Q0_C3">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q2_Q0_C3" data-questiongroup="_QAnyFruitByDay_QWed_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q2_Q0_C3','_QAnyFruitByDay_QWed_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QWed_Qwhichfruitmulti_Ckiwi" id="_Q0_Q2_Q0_C3" style="" value="kiwi"/>
                                            <label for="_Q0_Q2_Q0_C3">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q3_Q0_C3" data-questiongroup="_QAnyFruitByDay_QThu_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q3_Q0_C3','_QAnyFruitByDay_QThu_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QThu_Qwhichfruitmulti_Ckiwi" id="_Q0_Q3_Q0_C3" style="" value="kiwi"/>
                                            <label for="_Q0_Q3_Q0_C3">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                    <td orientation="Column" class="m-structure-cell" valign="Middle" align="Center" style="">
                                        <div data-exclusive="false" data-questionid="_Q0_Q4_Q0_C3" data-questiongroup="_QAnyFruitByDay_QFri_Qwhichfruitmulti" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                            <script>app.registerComponent('mOptionBase','_Q0_Q4_Q0_C3','_QAnyFruitByDay_QFri_Qwhichfruitmulti');</script>
                                            <input class="hiddencontrol" type="checkbox" name="_QAnyFruitByDay_QFri_Qwhichfruitmulti_Ckiwi" id="_Q0_Q4_Q0_C3" style="" value="kiwi"/>
                                            <label for="_Q0_Q4_Q0_C3">
                                                <span class="a-icon-multistate" data-icontype="multiple">
                                                    <!--This is a comment!-->
                                                </span>
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </table>
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
