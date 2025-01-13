import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
    htmlFragmentCustomProperties
} from '../../_htmlFragments';

export const VisibleContainsAnyHtml = () => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QPaperTypesPage_QPaperTypes');</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Visibility question using <code>ContainsAny()</code> function
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-choice" data-questiongroup="_QPaperTypesPage_QPaperTypes" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionchoice','_Q0','_QPaperTypesPage_QPaperTypes');</script>
                            <div data-exclusive="false" data-questionid="_Q0_C0" data-questiongroup="_QPaperTypesPage_QPaperTypes" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_C0','_QPaperTypesPage_QPaperTypes');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QPaperTypes_Cdaily" id="_Q0_C0" style="" value="daily"/>
                                <label for="_Q0_C0">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Daily papers</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q0_C1" data-questiongroup="_QPaperTypesPage_QPaperTypes" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_C1','_QPaperTypesPage_QPaperTypes');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QPaperTypes_Cinternational" id="_Q0_C1" style="" value="international"/>
                                <label for="_Q0_C1">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">international papers</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q0_C2" data-questiongroup="_QPaperTypesPage_QPaperTypes" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_C2','_QPaperTypesPage_QPaperTypes');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QPaperTypes_CSunday" id="_Q0_C2" style="" value="Sunday"/>
                                <label for="_Q0_C2">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Sunday papers</span>
                                </label>
                            </div>
                        </div>

                    </question>
                </questions>
            </div>
        </div>
        ${htmlFragmentMessageInstruction}

    </div>

    <div class="o-question-container cover-off config-complete sidebyside">

        <script data-questionid="_Q1">app.registerComponent('oQuestionContainer','_Q1','_QPaperTypesPage_QWhichPapers');</script>

        <script type="text/javascript">app.RegisterProperties("_QWhichPapers",{"balance":{"state":true}, "onesize":{"state":true}});</script>

        <script type="text/javascript">app.RegisterProperties("_QWhichPapers",{"options":{"visible":[{"name":"Mail","rules":"PaperTypes.ContainsAny('Daily')"},{"name":"Telegraph","rules":"PaperTypes.ContainsAny('Daily')"},{"name":"Independent","rules":"PaperTypes.ContainsAny('Daily')"},{"name":"Guardian","rules":"PaperTypes.ContainsAny('Daily')"},{"name":"Post","rules":"PaperTypes.ContainsAny('International')"},{"name":"LeMonde","rules":"PaperTypes.ContainsAny('International')"},{"name":"Journal","rules":"PaperTypes.ContainsAny('International')"},{"name":"STimes","rules":"PaperTypes.ContainsAny('Sunday')"},{"name":"Observer","rules":"PaperTypes.ContainsAny('Sunday')"},{"name":"STelegraph","rules":"PaperTypes.ContainsAny('Sunday')"}]}});</script>

        <div class="m-question-cover"><!-- cover --></div>

        <!-- ${htmlFragmentMessageError} -->
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-choice" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionchoice','_Q1','_QPaperTypesPage_QWhichPapers');</script>
                            <div data-exclusive="false" data-questionid="_Q1_C0" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C0','_QPaperTypesPage_QWhichPapers');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QWhichPapers_CMail" id="_Q1_C0" style="" value="Mail"/>
                                <label for="_Q1_C0">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">The Daily Mail</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C1" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C1','_QPaperTypesPage_QWhichPapers');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QWhichPapers_CTelegraph" id="_Q1_C1" style="" value="Telegraph"/>
                                <label for="_Q1_C1">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">The Daily Telegraph</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C2" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C2','_QPaperTypesPage_QWhichPapers');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QWhichPapers_CIndependent" id="_Q1_C2" style="" value="Independent"/>
                                <label for="_Q1_C2">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">The Independent</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C3" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C3','_QPaperTypesPage_QWhichPapers');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QWhichPapers_CGuardian" id="_Q1_C3" style="" value="Guardian"/>
                                <label for="_Q1_C3">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Guardian</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C4" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C4','_QPaperTypesPage_QWhichPapers');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QWhichPapers_CPost" id="_Q1_C4" style="" value="Post"/>
                                <label for="_Q1_C4">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">The Washington Post</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C5" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C5','_QPaperTypesPage_QWhichPapers');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QWhichPapers_CLeMonde" id="_Q1_C5" style="" value="LeMonde"/>
                                <label for="_Q1_C5">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Le Monde</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C6" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C6','_QPaperTypesPage_QWhichPapers');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QWhichPapers_CJournal" id="_Q1_C6" style="" value="Journal"/>
                                <label for="_Q1_C6">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">The Wall Street Journal</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C7" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C7','_QPaperTypesPage_QWhichPapers');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QWhichPapers_CSTimes" id="_Q1_C7" style="" value="STimes"/>
                                <label for="_Q1_C7">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Sunday Times</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C8" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C8','_QPaperTypesPage_QWhichPapers');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QWhichPapers_CObserver" id="_Q1_C8" style="" value="Observer"/>
                                <label for="_Q1_C8">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Observer</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C9" data-questiongroup="_QPaperTypesPage_QWhichPapers" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C9','_QPaperTypesPage_QWhichPapers');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QPaperTypesPage_QWhichPapers_CSTelegraph" id="_Q1_C9" style="" value="STelegraph"/>
                                <label for="_Q1_C9">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Sunday Telegraph</span>
                                </label>
                            </div>
                        </div>

                    </question>
                </questions>
            </div>
        </div>
        <!-- ${htmlFragmentMessageInstruction} -->

    </div>
</div>

</form>
`;

export const VisibleMathsOperandHtml = () => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QChildrenPage_QHowManyDependents');</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Visibility question using greater than <code>&gt;</code> mathematical operand
                        <br /><br />
                        Enter a number greater than 0
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_QChildrenPage_QHowManyDependents" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionsinglelineedit','_Q0','_QChildrenPage_QHowManyDependents');</script>
                            <input data-questionid="_Q0" data-questiongroup="_QChildrenPage_QHowManyDependents" data-position="below" type="text" name="_QChildrenPage_QHowManyDependents" id="_Q0" data-lpignore="true" autocomplete="off" style="" maxlength="2" value="" data-value="" class="a-input-singlelineedit below"/>
                            <script>app.registerComponent('aInputSinglelineedit','_Q0','_QChildrenPage_QHowManyDependents');</script>
                        </div>

                    </question>
                </questions>
            </div>
        </div>
        ${htmlFragmentMessageInstruction}

    </div>

    <div class="o-question-container cover-off config-complete collapse sidebyside">

        <script data-questionid="_Q1">app.registerComponent('oQuestionContainer','_Q1','_QChildrenPage_QDependentType');</script>

        <script type="text/javascript">app.RegisterProperties("_QDependentType",{"visible":{"collapse":true,"rules":"HowManyDependents %gt% 0"}});</script>

        <script type="text/javascript">app.RegisterProperties("_QDependentType",{"balance":{"state":true}, "onesize":{"state":true}});</script>

        <div class="m-question-cover"><!-- cover --></div>

        <!-- ${htmlFragmentMessageError} -->
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-choice" data-questiongroup="_QChildrenPage_QDependentType" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionchoice','_Q1','_QChildrenPage_QDependentType');</script>
                            <div data-exclusive="false" data-questionid="_Q1_C0" data-questiongroup="_QChildrenPage_QDependentType" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C0','_QChildrenPage_QDependentType');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QChildrenPage_QDependentType_CMyChildren" id="_Q1_C0" style="" value="MyChildren"/>
                                <label for="_Q1_C0">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Option 1</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C1" data-questiongroup="_QChildrenPage_QDependentType" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C1','_QChildrenPage_QDependentType');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QChildrenPage_QDependentType_CMySpouces" id="_Q1_C1" style="" value="MySpouces"/>
                                <label for="_Q1_C1">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Option 2</span>
                                </label>
                            </div>
                            <div data-exclusive="false" data-questionid="_Q1_C2" data-questiongroup="_QChildrenPage_QDependentType" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q1_C2','_QChildrenPage_QDependentType');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QChildrenPage_QDependentType_CFosters" id="_Q1_C2" style="" value="Fosters"/>
                                <label for="_Q1_C2">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">Option 3</span>
                                </label>
                            </div>
                        </div>

                    </question>
                </questions>
            </div>
        </div>
        <!-- ${htmlFragmentMessageInstruction} -->

    </div>
</div>

</form>
`;

export const AlternativeLabelsHtml = () => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QSimpledynamicPage_QDynamicLabelChoice');</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Alternative labels question
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-choice" data-questiongroup="_QSimpledynamicPage_QDynamicLabelChoice" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionchoice','_Q0','_QSimpledynamicPage_QDynamicLabelChoice');</script>
                            <div data-exclusive="true" data-questionid="_Q0_C0" data-questiongroup="_QSimpledynamicPage_QDynamicLabelChoice" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                <script>app.registerComponent('mOptionBase','_Q0_C0','_QSimpledynamicPage_QDynamicLabelChoice');</script>
                                <input class="hiddencontrol" type="radio" name="_QSimpledynamicPage_QDynamicLabelChoice_Cchoice1" id="_Q0_C0" style="" value="choice1"/>
                                <label for="_Q0_C0">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">last week</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_C1" data-questiongroup="_QSimpledynamicPage_QDynamicLabelChoice" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                <script>app.registerComponent('mOptionBase','_Q0_C1','_QSimpledynamicPage_QDynamicLabelChoice');</script>
                                <input class="hiddencontrol" type="radio" name="_QSimpledynamicPage_QDynamicLabelChoice_Cchoice2" id="_Q0_C1" style="" value="choice2"/>
                                <label for="_Q0_C1">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">how many more</span>
                                </label>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_C2" data-questiongroup="_QSimpledynamicPage_QDynamicLabelChoice" data-position="below" data-hidden="false" class="m-option-base  below " style="">
                                <script>app.registerComponent('mOptionBase','_Q0_C2','_QSimpledynamicPage_QDynamicLabelChoice');</script>
                                <input class="hiddencontrol" type="radio" name="_QSimpledynamicPage_QDynamicLabelChoice_Cchoice3" id="_Q0_C2" style="" value="choice3"/>
                                <label for="_Q0_C2">
                                    <span class="a-icon-multistate" data-icontype="single">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">your family</span>
                                </label>
                            </div>
                        </div>

                    </question>
                </questions>
            </div>
        </div>
        ${htmlFragmentMessageInstruction}

    </div>

    <div class="o-question-container cover-off complete sidebyside">

        <script data-questionid="_Q1">app.registerComponent('oQuestionContainer','_Q1','_QSimpledynamicPage_QDynamicQuestion');</script>

        <script type="text/javascript">app.RegisterProperties("_QDynamicQuestion",{"type":"number","step":"any","labels":{"alternatives":[{"name":"first","label":"How many %lt%span class='bold'%gt%bananas%lt%/span%gt% did you eat last week","block":true,"visible":{"collapse":true,"rules":"DynamicLabelChoice.containsAny('choice1')"}},{"name":"second","label":"if you could eat more bananas how many would you eat today","block":true,"visible":{"collapse":true,"rules":"DynamicLabelChoice.containsAny('choice2')"}},{"name":"third","label":"How may bananas does your family eat in a week","block":true,"visible":{"collapse":true,"rules":"DynamicLabelChoice.containsAny('choice3')"}}],"separator":""}});</script>

        <div class="m-question-cover"><!-- cover --></div>

        <!-- ${htmlFragmentMessageError} -->
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        <label for="_Q1"></label>
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-singlelineedit" data-questiongroup="_QSimpledynamicPage_QDynamicQuestion" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionsinglelineedit','_Q1','_QSimpledynamicPage_QDynamicQuestion');</script>
                            <input data-questionid="_Q1" data-questiongroup="_QSimpledynamicPage_QDynamicQuestion" data-position="below" type="text" step="any" name="_QSimpledynamicPage_QDynamicQuestion" id="_Q1" data-lpignore="true" autocomplete="off" style="" maxlength="11" value="" data-value="" class="a-input-singlelineedit below"/>
                            <script>app.registerComponent('aInputSinglelineedit','_Q1','_QSimpledynamicPage_QDynamicQuestion');</script>
                        </div>

                    </question>
                </questions>
            </div>
        </div>
        <!-- ${htmlFragmentMessageInstruction} -->

    </div>
</div>

</form>
`;
