import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
    htmlFragmentCustomProperties
} from '../../../_htmlFragments';

export const DropdownHtml = (args) => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_Qnew__products');</script>

        <script type="text/javascript">app.RegisterProperties("_Qnew__products",
{
    ${`"jumptofirstletter":${args.JumpToFirstLetter},`}
    ${args.ListSize > 0 ? `"listsize":${args.ListSize},` : ''}
    ${args.ListSource && args.ListSource !== '' ? `"listsource":"${args.ListSource}",` : ''}
    ${args.Placeholder && args.Placeholder !== '' ? `"placeholder":"${args.Placeholder}",` : ''}
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Dropdown question with custom properties
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        <div class="o-question-response o-question-dropdown" data-questiongroup="_Qnew__products" data-readonly="false" data-position="below">
                            <script>app.registerComponent('oQuestionDropdown','_Q0','_Qnew__products');</script>
                            <div class="o-dropdown" data-questiongroup="_Qnew__products" data-questionid="_Q0">
                                <script>app.registerComponent('oDropdown','_Q0','_Qnew__products');</script>
                                <input data-questionid="_Q0" data-questiongroup="_Qnew__products" data-position="below" type="text" name="_Qnew__products_C" id="_Q0" data-lpignore="true" autocomplete="off" style="" value="" data-value="" class="a-input-dropdown below"/>
                                <ul class="m-list" id="_Q0_list" data-questiongroup="_Qnew__products">
                                    <script>app.registerComponent('mList','_Q0_list','_Qnew__products');</script>
                                    <li class="a-option-list" data-questionid="_Q0_C0" data-questiongroup="_Qnew__products" data-value="first" id="_Q0_C0">I am always among the first to prescribe a new product</li>
                                    <li class="a-option-list" data-questionid="_Q0_C1" data-questiongroup="_Qnew__products" data-value="wait__short" id="_Q0_C1">I like to wait a while (for a few months) after a new product is approved before I start prescribing it</li>
                                    <li class="a-option-list" data-questionid="_Q0_C2" data-questiongroup="_Qnew__products" data-value="wait__medium" id="_Q0_C2">I wait to be comfortable (for more than a few months) with a new product by speaking to colleagues, hearing about its success before I prescribe it</li>
                                    <li class="a-option-list" data-questionid="_Q0_C3" data-questiongroup="_Qnew__products" data-value="wait__long" id="_Q0_C3">I prefer to prescribe products that are tried and trusted</li>
                                    <li class="a-option-list" data-questionid="_Q0_C4" data-questiongroup="_Qnew__products" data-value="reluctant" id="_Q0_C4">I am very reluctant to prescribe new products/switch to new products</li>
                                </ul>
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
