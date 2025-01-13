import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
    htmlFragmentCustomProperties
} from '../../_htmlFragments';

export const ExampleHtml = (args) => `
${htmlFragmentCustomProperties}

<form action="#"
    class="focus-question focus-control"
    data-paste="true"
>

<div class="surroundcontent">

    <div class="o-question-container focused cover-off config-complete sidebyside">

        <!-- Script(s) -->
        <script data-questionid="_Q0">app.registerComponent('oQuestionContainer','_Q0','_QExample');</script>

        <script>app.RegisterProperties("_QExample",
{
    "example":"${args.ExampleCustomProp}"
}
        );</script>

        <div class="m-question-cover"><!-- cover --></div>

        ${htmlFragmentMessageError}
        <div class="o-question-core">
            <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                <div class="o-question-information">
                    <div class="o-question-information-content">
                        Question text (inside optional &lt;label&gt;)
                    </div>
                </div>
                <div class="o-question-alternatives"><!-- alternative labels go here --></div>
            </div>
            <div class="o-question-response">
                <questions data-position="below">
                    <question data-position="below">

                        Question control(s)

                    </question>
                </questions>
            </div>
        </div>
        ${htmlFragmentMessageInstruction}

    </div>
</div>

</form>
`;
