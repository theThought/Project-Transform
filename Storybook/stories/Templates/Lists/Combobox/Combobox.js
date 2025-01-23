import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
    htmlFragmentCustomProperties
} from '../../../_htmlFragments';

export const ComboboxHtml = (args) => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QComboNewProducts');</script>

        <script type="text/javascript">app.RegisterProperties("_QComboNewProducts",
{
    ${args.ListSize > 0 ? `"listsize":${args.ListSize},` : ''}
    ${args.ListSource && args.ListSource !== '' ? `"listsource":"${args.ListSource}",` : ''}
    ${args.Placeholder && args.Placeholder !== '' ? `"placeholder":"${args.Placeholder}",` : ''}
    ${`"exact":${args.Exact},`}
    ${`"filtertype":"${args.FilterType}",`}
    ${`"mincharactersforlist":${args.MinCharactersForList},`}
    ${args.NotEnoughCharacters && args.NotEnoughCharacters !== '' ? `"notenoughcharacters":"${args.NotEnoughCharacters}",` : ''}
    ${args.NoItemsInList && args.NoItemsInList !== '' ? `"NoItemsInList":"${args.NoItemsInList}",` : ''}
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Combobox question with custom properties
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-combobox" data-questiongroup="_QComboNewProducts" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionCombobox','_Q0','_QComboNewProducts');</script>
                            <div class="o-combobox" data-questiongroup="_QComboNewProducts" data-questionid="_Q0">
                                <script>app.registerComponent('oCombobox','_Q0','_QComboNewProducts');</script>
                                <input data-questionid="_Q0" data-questiongroup="_QComboNewProducts" data-position="below" type="text" name="_QComboNewProducts_C" id="_Q0" data-lpignore="true" autocomplete="off" style="" list="_Q0_list" value="" data-value="" class="a-input-combobox below"/>
                                <div class="o-list-selected" data-questiongroup="_QComboNewProducts">
                                    <!-- - - - selected tags - - - -->
                                </div>
                                <ul class="m-list" id="_Q0_list" data-questiongroup="_QComboNewProducts">
                                    <script>app.registerComponent('mList','_Q0_list','_QComboNewProducts');</script>
                                    <li class="a-option-list" data-questionid="_Q0_C0_S0" data-questiongroup="_QComboNewProducts" data-value="first" id="_Q0_C0_S0">I am always among the first to prescribe a new product</li>
                                    <li class="a-option-list" data-questionid="_Q0_C0_S1" data-questiongroup="_QComboNewProducts" data-value="reluctant" id="_Q0_C0_S1">I am very reluctant to prescribe new products/switch to new products</li>
                                    <li class="a-option-list" data-questionid="_Q0_C0_S2" data-questiongroup="_QComboNewProducts" data-value="waitShort" id="_Q0_C0_S2">I like to wait a while (for a few months) after a new product is approved before I start prescribing it</li>
                                    <li class="a-option-list" data-questionid="_Q0_C0_S3" data-questiongroup="_QComboNewProducts" data-value="waitLong" id="_Q0_C0_S3">I prefer to prescribe products that are tried and trusted</li>
                                    <li class="a-option-list" data-questionid="_Q0_C0_S4" data-questiongroup="_QComboNewProducts" data-value="waitMedium" id="_Q0_C0_S4">I wait to be comfortable (for more than a few months) with a new product by speaking to colleagues, hearing about its success before I prescribe it</li>
                                </ul>
                            </div>
                            <div data-exclusive="true" data-questionid="_Q0_X0" data-questiongroup="_QComboNewProducts" data-position="below" data-hidden="false" class="m-option-base  below" style="">
                                <script>app.registerComponent('mOptionBase','_Q0_X0','_QComboNewProducts');</script>
                                <input class="hiddencontrol" type="checkbox" name="_QComboNewProducts_Xnoproduct" id="_Q0_X0" style="" value="noproduct"/>
                                <label for="_Q0_X0">
                                    <span class="a-icon-multistate" data-icontype="multiple">
                                        <!--This is a comment!-->
                                    </span>
                                    <span class="a-label-option">none of the above</span>
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
