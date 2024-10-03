import {
    htmlFragmentMessageError,
    htmlFragmentMessageInstruction,
} from '../_htmlFragments';

export const PageLayoutSideBySideHtml = () => `
<form action="#" method="post">
    <div class="header">
        <img class="site-logo" alt="Ipsos Logo" title="Ipsos Logo"
            src="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/staging/images/formal/ipsoslogo192.png" />
        <div class="overall-progress">
            <div class="overall-progress-text">
                <!-- progress text -->
            </div>
            <div class="overall-progress-bar">
                <table style="height: 100%; width: 100%">
                    <tr>
                        <td style="width: 1%; background-color: #D0DAE6" />
                        <td class="mrProgressText">1%</td>
                    </tr>
                </table><!-- progress bar -->
            </div>
        </div>
    </div>

    <script id="pageproperties">app.RegisterProperties('Page', { "sidebyside": 30, "focus": { "question": true, "control": true }, "pwa": "false", "paste": "true", "jumptoerror": "true" })</script>

    <div class="surroundcontent">

        <div class="o-question-container sidebyside focused cover-off config-complete" data-questionid="_Q0" data-position="below">
            ${htmlFragmentMessageError}
            <div class="o-question-core">
                <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                    1ST QUESTION GOES HERE...
                </div>

                <div class="o-question-response">
                    <questions data-position="below">
                        <question data-position="below">
                            FORM CONTROL(S) GO HERE...
                        </question>
                    </question>
                </div>
            </div>
            ${htmlFragmentMessageInstruction}
        </div>

        <div class="o-question-container sidebyside focused cover-off config-complete" data-questionid="_Q1" data-position="below">
            ${htmlFragmentMessageError}
            <div class="o-question-core">
                <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                    2ND QUESTION GOES HERE...
                </div>

                <div class="o-question-response">
                    <questions data-position="below">
                        <question data-position="below">
                            FORM CONTROL(S) GO HERE...
                        </question>
                    </question>
                </div>
            </div>
            ${htmlFragmentMessageInstruction}
        </div>

    </div>

    <div class="footer">
        <div id="nav-controls" class="btn-container nav-center">
            <div id="nextonly">
                <input type="submit" name="_NNext" class="a-button-next" style="" value="Next"></input>
            </div>
            <div id="prevstop">
                <input type="submit" name="_NPrev" class="a-button-prev" style="" value="Previous"></input>
                <input tabindex="-1" type="submit" name="_NStop" class="a-button-stop" style=""
                    value="Stop"></input>
            </div>
        </div>
        <div class="page-links"><a href="#">Privacy Policy</a><a href="#">Terms and Conditions</a><a
                href="#">Unsubscribe</a></div>
    </div>
</form>
`;

export const PageLayoutVerticalHtml = () => `
<form action="#" method="post">
    <div class="header">
        <img class="site-logo" alt="Ipsos Logo" title="Ipsos Logo"
            src="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/staging/images/formal/ipsoslogo192.png" />
        <div class="overall-progress">
            <div class="overall-progress-text">
                <!-- progress text -->
            </div>
            <div class="overall-progress-bar">
                <table style="height: 100%; width: 100%">
                    <tr>
                        <td style="width: 1%; background-color: #D0DAE6" />
                        <td class="mrProgressText">1%</td>
                    </tr>
                </table><!-- progress bar -->
            </div>
        </div>
    </div>

    <script id="pageproperties">app.RegisterProperties('Page', { "sidebyside": 30, "focus": { "question": true, "control": true }, "pwa": "false", "paste": "true", "jumptoerror": "true" })</script>

    <div class="surroundcontent">

        <div class="o-question-container focused cover-off config-complete" data-questionid="_Q0" data-position="below">
            ${htmlFragmentMessageError}
            <div class="o-question-core">
                <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                    1ST QUESTION GOES HERE...
                </div>

                <div class="o-question-response">
                    <questions data-position="below">
                        <question data-position="below">
                            FORM CONTROL(S) GO HERE...
                        </question>
                    </question>
                </div>
            </div>
            ${htmlFragmentMessageInstruction}
        </div>

        <div class="o-question-container focused cover-off config-complete" data-questionid="_Q1" data-position="below">
            ${htmlFragmentMessageError}
            <div class="o-question-core">
                <div class="o-question-information-and-messages" style="flex-basis: 30%;">
                    2ND QUESTION GOES HERE...
                </div>

                <div class="o-question-response">
                    <questions data-position="below">
                        <question data-position="below">
                            FORM CONTROL(S) GO HERE...
                        </question>
                    </question>
                </div>
            </div>
            ${htmlFragmentMessageInstruction}
        </div>

    </div>

    <div class="footer">
        <div id="nav-controls" class="btn-container nav-center">
            <div id="nextonly">
                <input type="submit" name="_NNext" class="a-button-next" style="" value="Next"></input>
            </div>
            <div id="prevstop">
                <input type="submit" name="_NPrev" class="a-button-prev" style="" value="Previous"></input>
                <input tabindex="-1" type="submit" name="_NStop" class="a-button-stop" style=""
                    value="Stop"></input>
            </div>
        </div>
        <div class="page-links"><a href="#">Privacy Policy</a><a href="#">Terms and Conditions</a><a
                href="#">Unsubscribe</a></div>
    </div>
</form>
`;
