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

    /* Storybook strips out inline <script> preceeding "m-option-base", so need to add margin back. */
    .m-option-base:first-child {
        margin-bottom: 4px;
    }
</style>
`;

export const GridCategoricalHtml = (args) => `
${style}

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
                        Grid question (categorical)
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
