export const PageHtml = () => `
<form name="mrForm" id="mrForm" action="./" method="post"><input type="hidden" name="I.Engine"
        value="Server" /><input type="hidden" name="I.Project" value="Transform" /><input type="hidden"
        name="I.Session" value="cyazpuohtaxelamazgrfjay52iaqaaaa" /><input type="hidden" name="I.SavePoint"
        value="TypesVsBroadsheetsSingle" /><input type="hidden" name="I.Renderer" value="HTMLPlayer" />
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
    <script
        id="pageproperties">app.RegisterProperties('Page', { "sidebyside": 30, "focus": { "question": true, "control": true }, "pwa": "false", "paste": "true", "jumptoerror": "true" })</script>
    <div class="surroundcontent">
        <div class="o-question-container sidebyside">

            QUESTION CONTENT GOES HERE...

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
