import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
    htmlFragmentCustomProperties
} from '../../../_htmlFragments';

export const LonglistHtml = (args) => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_Qbrandlist');</script>

        <script type="text/javascript">app.RegisterProperties("_Qbrandlist",
{
    ${args.ListSize > 0 ? `"listsize":${args.ListSize},` : ''}
    ${args.Placeholder && args.Placeholder !== '' ? `"placeholder":"${args.Placeholder}",` : ''}
    ${`"filtertype":"${args.FilterType}",`}
    ${`"mincharactersforlist":${args.MinCharactersForList},`}
    ${args.NotEnoughCharacters && args.NotEnoughCharacters !== '' ? `"notenoughcharacters":"${args.NotEnoughCharacters}",` : ''}
    ${args.NoItemsInList && args.NoItemsInList !== '' ? `"NoItemsInList":"${args.noitemsinlist}",` : ''}
    ${`"list":{"location":"${args.ListLocation}","source":"${args.ListSource}","valuefrom":"${args.ListValueFrom}","descriptionfrom":"${args.ListDescriptionFrom}"},`}
    ${`"showanswers":${args.ShowAnswers},`}
    ${`"prompts":{"selection":"${args.PromptsSelection}","listcount":"${args.PromptsListCount}"}`}
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Longlist question with custom properties
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-openend-search" data-questiongroup="_Qbrandlist" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionOpenend-search','_Q0','_Qbrandlist');</script>
                            <div class="o-openend-search" data-questiongroup="_Qbrandlist" data-questionid="_Q0">
                                <script>app.registerComponent('oOpenend-search','_Q0','_Qbrandlist');</script>
                                <input data-questionid="_Q0" data-questiongroup="_Qbrandlist" data-position="below" type="text" step="any" name="_Qbrandlist" id="_Q0" data-lpignore="true" autocomplete="off" style="" maxlength="200" value="" data-value="" class="a-input-openend-search below"/>
                                <div class="o-list">
                                    <ul class="m-list-external" id="_Q0_list" data-questiongroup="_Qbrandlist">
                                        <!-- - - - list items - - - -->
                                    </ul>
                                    <div class="m-list-messages">
                                        <div class="a-list-message" data-id="notenoughcharacters">
                                            <!--not enough characters message goes here-->
                                        </div>
                                        <div class="a-list-message" data-id="noitemsinlist">
                                            <!--no items in list message goes here-->
                                        </div>
                                    </div>
                                </div>
                                <div class="m-openend-search-count">
                                    <span class="a-label-counter">
                                        <!--item count goes here-->
                                    </span>
                                    <span class="a-label-counter-prompt">
                                        <!--item count prompt goes here-->
                                    </span>
                                </div>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_X0" data-questiongroup="_Qbrandlist" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X0','_Qbrandlist');</script>
                                <input class="hiddencontrol" type="checkbox" name="_Qbrandlist_Xnobrand" id="_Q0_X0" style="" value="nobrand"/>
                                <label for="_Q0_X0">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">I don't know the brand</span>
                                </label>
                            </div>
                        </div>

                    </question>
                </questions>
            </div>
        </div>
        ${htmlFragmentMessageInstruction}

    </div>
    <script type="text/javascript" class="a-list" src="https://media.ipsosinteractive.com/sandbox/kevin.gray/passiveobservation/act/brandlist.js">// database list</script>
</div>

</form>
`;
