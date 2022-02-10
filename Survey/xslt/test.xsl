<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
  <xsl:output method="xml" indent="yes" />
  <xsl:param name="bIncludeCSSStyles" select="true()" />
  <xsl:param name="bIncludeElementIds" select="true()" />
  <xsl:param name="sImageLocation" />
  <xsl:param name="bShowOnly" select="false()" />
  <xsl:param name="bAutoComplete" select="false()" />
  <xsl:template match="Questions">
    <xsl:apply-templates select="Question" />
  </xsl:template>
  <xsl:template match="Question">
    <xsl:variable name="qFullName">
      <xsl:call-template name="CalculateQuestionName">
        <xsl:with-param name="QuestionName" select="//Control[1]/@QuestionName" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:for-each select="*">
      <xsl:choose>
        <xsl:when test="name() = 'Control'">
          <xsl:variable name="qGroupName" select="//Control[1]/@ElementID" />
          <xsl:call-template name="Control">
            <xsl:with-param name="qGroup" select="$qGroupName" />
            <xsl:with-param name="qFullName" select="$qFullName" />
          </xsl:call-template>
        </xsl:when>
      </xsl:choose>
    </xsl:for-each>
  </xsl:template>
  <xsl:template name="Control">
    <xsl:param name="qGroup" />
    <xsl:param name="qFullName" />
    <xsl:param name="qIsCustom">
      <xsl:call-template name="TranslateZIndexToIsCustom">
        <xsl:with-param name="theID" select="Style/@ZIndex" />
      </xsl:call-template>
    </xsl:param>
    <xsl:param name="qCustomType">
      <xsl:call-template name="TranslateZIndexToName">
        <xsl:with-param name="theID" select="Style/@ZIndex" />
      </xsl:call-template>
    </xsl:param>
    <xsl:text>[Control]CustomType: </xsl:text>
    <xsl:value-of select="$qCustomType" />
    <xsl:choose>
      <xsl:when test="$qCustomType='information'">
      </xsl:when>
      <xsl:when test="$qCustomType='singlelineedit'">
        <xsl:call-template name="SingleLineEdit">
          <xsl:with-param name="qGroup" select="$qGroup" />
          <xsl:with-param name="qFullName" select="$qFullName" />
          <xsl:with-param name="qIsCustom" select="$qIsCustom" />
          <xsl:with-param name="qCustomType" select="$qCustomType" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$qCustomType='multilineedit'">
        <xsl:call-template name="MultiLineEditControl">
          <xsl:with-param name="qGroup" select="$qGroup" />
          <xsl:with-param name="qFullName" select="$qFullName" />
          <xsl:with-param name="qIsCustom" select="$qIsCustom" />
          <xsl:with-param name="qCustomType" select="$qCustomType" />
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$qCustomType='choice'">
      </xsl:when>
      <xsl:when test="$qCustomType='hnumberslider'">
        <xsl:call-template name="hnumberslider">
          <xsl:with-param name="qGroup" select="$qGroup" />
          <xsl:with-param name="qFullName" select="$qFullName" />
          <xsl:with-param name="qCustomType" select="$qCustomType" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:choose>
          <xsl:when test="@Type='Static'">
            <!-- <xsl:call-template name="StaticControl" /> -->
          </xsl:when>
          <xsl:when test="@Type='RadioButton'">
            <xsl:call-template name="RadioButtonControl">
              <xsl:with-param name="qGroup" select="$qGroup" />
              <xsl:with-param name="qFullName" select="$qFullName" />
              <xsl:with-param name="qIsCustom" select="$qIsCustom" />
              <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
          </xsl:when>
          <xsl:when test="@Type='CheckButton'">
            <xsl:call-template name="CheckButtonControl">
              <xsl:with-param name="qGroup" select="$qGroup" />
              <xsl:with-param name="qFullName" select="$qFullName" />
              <xsl:with-param name="qIsCustom" select="$qIsCustom" />
              <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
          </xsl:when>
        </xsl:choose>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="SingleLineEdit">
    <xsl:param name="qGroup" />
    <xsl:param name="qFullName" />
    <xsl:param name="qIsCustom" />
    <xsl:param name="qCustomType" />
    <xsl:call-template name="MakeInputControl">
      <xsl:with-param name="qFullName" select="$qFullName" />
      <xsl:with-param name="qIsCustom" select="$qIsCustom" />
      <xsl:with-param name="qCustomType" select="$qCustomType" />
      <xsl:with-param name="qInputType" select="'text'" />
    </xsl:call-template>
    <xsl:call-template name="appComponentScript">
      <xsl:with-param name="ComponentName">
        <xsl:text>aInput</xsl:text>
        <xsl:call-template name="CamelCaseWord">
          <xsl:with-param name="text" select="$qCustomType" />
        </xsl:call-template>
      </xsl:with-param>
      <xsl:with-param name="ElementID" select="@ElementID" />
      <xsl:with-param name="FullName" select="$qFullName" />
    </xsl:call-template>
  </xsl:template>
  <xsl:template name="appComponentScript">
    <xsl:param name="ComponentName" />
    <xsl:param name="ElementID" />
    <xsl:param name="FullName" />
    <xsl:element name="script">
      <xsl:text>app.registerComponent('</xsl:text>
      <xsl:value-of select="$ComponentName" />
      <xsl:text>','</xsl:text>
      <xsl:value-of select="$ElementID" />
      <xsl:text>','</xsl:text>
      <xsl:value-of select="$FullName" />
      <xsl:text>');</xsl:text>
    </xsl:element>
  </xsl:template>
  <xsl:template name="TranslateZIndexToName">
    <xsl:param name="theID" />
    <xsl:choose>
      <xsl:when test="$theID = '-10'">
        <xsl:value-of select="'information'" />
      </xsl:when>
      <xsl:when test="$theID = '-20'">
        <xsl:value-of select="'singlelineedit'" />
      </xsl:when>
      <xsl:when test="$theID = '-30'">
        <xsl:value-of select="'multilineedit'" />
      </xsl:when>
      <xsl:when test="$theID = '-40'">
        <xsl:value-of select="'choice'" />
      </xsl:when>
      <xsl:when test="$theID = '-50'">
        <xsl:value-of select="'hnumberslider'" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="theID" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="TranslateZIndexToIsCustom">
    <xsl:param name="theID" />
    <xsl:choose>
      <xsl:when test="$theID = '-10'">
        <xsl:value-of select="'false'" />
      </xsl:when>
      <xsl:when test="$theID = '-20'">
        <xsl:value-of select="'false'" />
      </xsl:when>
      <xsl:when test="$theID = '-30'">
        <xsl:value-of select="'false'" />
      </xsl:when>
      <xsl:when test="$theID = '-40'">
        <xsl:value-of select="'true'" />
      </xsl:when>
      <xsl:when test="$theID = '-50'">
        <xsl:value-of select="'true'" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="'true'" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="CamelCaseWord">
    <xsl:param name="text" />
    <xsl:value-of select="translate(substring($text,1,1),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')" />
    <xsl:value-of select="translate(substring($text,2,string-length($text)-1),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')" />
  </xsl:template>
  <xsl:template name="CalculateQuestionName">
    <xsl:param name="QuestionName" />
    <xsl:choose>
      <xsl:when test="substring($QuestionName, string-length($QuestionName) - 1)='_C'">
        <xsl:value-of select="substring($QuestionName, 1, string-length($QuestionName)-2)" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$QuestionName" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="MultiLineEditControl">
    <xsl:param name="qGroup" />
    <xsl:param name="qFullName" />
    <xsl:param name="qIsCustom" />
    <xsl:param name="qCustomType" />
    <!--- Text Area -->
    <xsl:element name="textarea">
      <xsl:attribute name="data-questionid">
        <xsl:value-of select="@ElementID" />
      </xsl:attribute>
      <xsl:attribute name="data-questiongroup">
        <xsl:value-of select="$qFullName" />
      </xsl:attribute>
      <!--- Input name -->
      <xsl:attribute name="name">
        <xsl:value-of select="@QuestionName" />
        <xsl:if test="Category[1]/@Name">
          <xsl:value-of select="Category[1]/@Name" />
        </xsl:if>
      </xsl:attribute>
      <!--- ID -->
      <xsl:attribute name="id">
        <xsl:value-of select="@ElementID" />
        <xsl:if test="Category[1]/@CategoryID">
          <xsl:value-of select="Category[1]/@CategoryID" />
        </xsl:if>
      </xsl:attribute>
      <!--- Alt -->
      <xsl:if test="@Alt != ''">
        <xsl:attribute name="Alt">
          <xsl:value-of select="@Alt" />
        </xsl:attribute>
      </xsl:if>
      <!--- CSS Class -->
      <xsl:attribute name="class">a-input-multilineedit</xsl:attribute>
      <!--- Show Only -->
      <xsl:if test="$bShowOnly != false()">
        <xsl:attribute name="disabled" />
      </xsl:if>
      <!--- Accelerator access key -->
      <xsl:if test="Style/Control/@Accelerator != ''">
        <xsl:attribute name="accesskey">
          <xsl:value-of select="Style/Control/@Accelerator" />
        </xsl:attribute>
      </xsl:if>
      <!--- AutoComplete -->
      <xsl:choose>
        <xsl:when test="$bAutoComplete = true()">
          <xsl:attribute name="autocomplete">on</xsl:attribute>
        </xsl:when>
        <xsl:otherwise>
          <xsl:attribute name="autocomplete">off</xsl:attribute>
        </xsl:otherwise>
      </xsl:choose>
      <!--- Read Only -->
      <xsl:if test="Style/Control/@ReadOnly = 'true'">
        <xsl:attribute name="readonly" />
      </xsl:if>
      <!--- Set Control Style -->
      <xsl:attribute name="style">
        <xsl:call-template name="CSSStyles" />
      </xsl:attribute>
      <!--- Rows -->
      <xsl:choose>
        <xsl:when test="Style/@Rows != ''">
          <xsl:attribute name="rows">
            <xsl:value-of select="Style/@Rows" />
          </xsl:attribute>
        </xsl:when>
      </xsl:choose>
      <!--- Columns -->
      <xsl:choose>
        <xsl:when test="Style/@Columns != ''">
          <xsl:attribute name="cols">
            <xsl:value-of select="Style/@Columns" />
          </xsl:attribute>
        </xsl:when>
      </xsl:choose>
      <!--- Default text -->
      <xsl:choose>
        <xsl:when test="Category[1]/@Checked = 'true'">
          <xsl:value-of select="'*'" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="@Value" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:element>
    <xsl:call-template name="appComponentScript">
      <xsl:with-param name="ComponentName" select="'aInputMultilineedit'" />
      <xsl:with-param name="ElementID" select="@ElementID" />
      <xsl:with-param name="FullName" select="$qFullName" />
    </xsl:call-template>
  </xsl:template>
  <xsl:template name="Label">
    <xsl:param name="labelType" select="'question'" />
    <xsl:element name="span">
      <xsl:attribute name="class">
        <xsl:text>a-label-</xsl:text>
        <xsl:value-of select="$labelType" />
      </xsl:attribute>
      <xsl:call-template name="LabelText" />
    </xsl:element>
  </xsl:template>
  <xsl:template name="LabelText">
    <xsl:choose>
      <xsl:when test="Text/@WellFormed = 'false'">
        <xsl:value-of select="Text" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of disable-output-escaping="yes" select="Text" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template name="CSSStyles">
    <xsl:if test="Style/@BgColor">
      <xsl:text>background-color:</xsl:text>
      <xsl:value-of select="Style/@BgColor" />
      <xsl:text>;</xsl:text>
    </xsl:if>
    <xsl:if test="Style/@Color">
      <xsl:text>color:</xsl:text>
      <xsl:value-of select="Style/@Color" />
      <xsl:text>;</xsl:text>
    </xsl:if>
    <xsl:if test="Style/@Width">
      <xsl:text>width:</xsl:text>
      <xsl:value-of select="Style/@Width" />
      <xsl:text>;</xsl:text>
    </xsl:if>
    <xsl:if test="Style/@Height">
      <xsl:text>height:</xsl:text>
      <xsl:value-of select="Style/@Height" />
      <xsl:text>;</xsl:text>
    </xsl:if>
    <xsl:if test="Style/@Hidden = 'true'">visibility: hidden;</xsl:if>
    <xsl:choose>
      <xsl:when test="Style/@Cursor = 'EResize'">cursor: e-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'NEResize'">cursor: ne-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'NResize'">cursor: n-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'NWResize'">cursor: nw-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'WResize'">cursor: w-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'SWResize'">cursor: sw-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'SResize'">cursor: s-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'SEResize'">cursor: se-resize;</xsl:when>
      <xsl:when test="Style/@Cursor">
        <xsl:text>cursor:</xsl:text>
        <xsl:value-of select="Style/@Cursor" />
        <xsl:text>;</xsl:text>
      </xsl:when>
    </xsl:choose>
    <xsl:if test="Style/Cell/@Wrap = 'false'">white-space: nowrap;</xsl:if>
    <xsl:if test="Style/Font/@Family">
      <xsl:text>font-family:</xsl:text>
      <xsl:value-of select="Style/Font/@Family" />
      <xsl:text>;</xsl:text>
    </xsl:if>
    <xsl:if test="Style/Font/@Size">
      <xsl:text>font-size:</xsl:text>
      <xsl:value-of select="Style/Font/@Size" />
      <xsl:text>pt;</xsl:text>
    </xsl:if>
    <xsl:if test="Style/Font/@IsUnderline = 'true'">text-decoration: underline;</xsl:if>
    <xsl:if test="Style/Font/@IsItalic = 'true'">font-style: italic;</xsl:if>
    <xsl:if test="Style/Font/@IsBold = 'true'">font-weight: bold;</xsl:if>
    <xsl:if test="Style/Font/@IsStrikethrough = 'true'">text-decoration: line-through;</xsl:if>
    <xsl:if test="Style/Font/@IsOverline = 'true'">text-decoration: overline;</xsl:if>
    <xsl:if test="Style/Font/@IsBlink = 'true'">text-decoration: blink;</xsl:if>
    <xsl:if test="Style/Font/@IsSubscript = 'true'">vertical-align: sub;</xsl:if>
    <xsl:if test="Style/Font/@IsSuperscript = 'true'">vertical-align: super;</xsl:if>
  </xsl:template>
  <xsl:template name="CheckButtonControl">
    <xsl:param name="qGroup" />
    <xsl:param name="qFullName" />
    <xsl:param name="qIsCustom" />
    <xsl:param name="qCustomType" />
    <!--- Control Label -->
    <xsl:element name="div">
      <xsl:attribute name="class">m-option-base</xsl:attribute>
      <xsl:attribute name="data-exclusive">
        <xsl:choose>
          <xsl:when test="Category/Label/Style/Font/@IsBold='true'">
            <xsl:text>true</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>false</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <xsl:attribute name="data-questionid">
        <xsl:value-of select="@ElementID" />
        <xsl:if test="Category[1]/@CategoryID">
          <xsl:value-of select="Category[1]/@CategoryID" />
        </xsl:if>
      </xsl:attribute>
      <xsl:attribute name="data-questiongroup">
        <xsl:value-of select="$qFullName" />
      </xsl:attribute>
      <xsl:element name="script">
        <xsl:text>app.registerComponent('mOptionBase','</xsl:text>
        <xsl:value-of select="@ElementID" />
        <xsl:if test="Category[1]/@CategoryID">
          <xsl:value-of select="Category[1]/@CategoryID" />
        </xsl:if>
        <xsl:text>','</xsl:text>
        <xsl:value-of select="$qFullName" />
        <xsl:text>');</xsl:text>
      </xsl:element>

      <xsl:call-template name="MakeInputControl">
        <xsl:with-param name="qFullName" select="$qFullName" />
        <xsl:with-param name="qIsCustom" select="'true'" />
        <xsl:with-param name="qCustomType" select="$qCustomType" />
        <xsl:with-param name="qInputType" select="'radiobutton'" />
      </xsl:call-template>

      <xsl:element name="label">
        <xsl:attribute name="for">
          <xsl:value-of select="@ElementID" />
          <xsl:if test="Category[1]/@CategoryID">
            <xsl:value-of select="Category[1]/@CategoryID" />
          </xsl:if>
        </xsl:attribute>
        <xsl:element name="span">
          <xsl:attribute name="class">a-icon-multistate</xsl:attribute>
          <xsl:attribute name="data-icontype">multiple</xsl:attribute>
          <xsl:comment>This is a comment!</xsl:comment>
        </xsl:element>
        <xsl:apply-templates select="Category[1]/Label">
          <xsl:with-param name="labelType" select="'option'" />
        </xsl:apply-templates>
      </xsl:element>
      <xsl:apply-templates select="../Question">
        <xsl:with-param name="bWithinTable" select="true()" />
        <xsl:with-param name="qGroup" select="$qGroup" />
        <xsl:with-param name="SubQuestion" select="true()" />
      </xsl:apply-templates>
    </xsl:element>
  </xsl:template>
  <xsl:template name="MakeInputControl">
    <xsl:param name="qFullName" />
    <xsl:param name="qIsCustom" />
    <xsl:param name="qCustomType" />
    <xsl:param name="qInputType" select="text" />
    <!--- Edit box -->
    <xsl:element name="input">
      <xsl:attribute name="data-questionid">
        <xsl:value-of select="@ElementID" />
      </xsl:attribute>
      <xsl:attribute name="data-questiongroup">
        <xsl:value-of select="$qFullName" />
      </xsl:attribute>
      <!--- Set Control Type -->
      <xsl:attribute name="type">
        <xsl:value-of select="$qCustomType" />
      </xsl:attribute>
      <!--- Input name -->
      <xsl:attribute name="name">
        <xsl:value-of select="@QuestionName" />
        <xsl:if test="Category[1]/@Name">
          <xsl:value-of select="Category[1]/@Name" />
        </xsl:if>
      </xsl:attribute>
      <!--- ID -->
      <xsl:if test="$bIncludeElementIds">
        <xsl:attribute name="id">
          <xsl:value-of select="@ElementID" />
          <xsl:if test="Category[1]/@CategoryID">
            <xsl:value-of select="Category[1]/@CategoryID" />
          </xsl:if>
        </xsl:attribute>
      </xsl:if>
      <!--- Alt -->
      <xsl:if test="@Alt != ''">
        <xsl:attribute name="Alt">
          <xsl:value-of select="@Alt" />
        </xsl:attribute>
      </xsl:if>
      <!--- CSS Class -->
      <xsl:if test="$bIncludeCSSStyles">
        <xsl:attribute name="class">
          <xsl:text>a-input-</xsl:text>
          <xsl:value-of select="$qCustomType" />
        </xsl:attribute>
      </xsl:if>
      <!--- Show Only -->
      <xsl:if test="$bShowOnly != false()">
        <xsl:attribute name="disabled" />
      </xsl:if>
      <!--- Accelerator access key -->
      <xsl:if test="Style/Control/@Accelerator != ''">
        <xsl:attribute name="accesskey">
          <xsl:value-of select="Style/Control/@Accelerator" />
        </xsl:attribute>
      </xsl:if>
      <!--- AutoComplete -->
      <xsl:choose>
        <xsl:when test="$bAutoComplete = true()">
          <xsl:attribute name="autocomplete">on</xsl:attribute>
        </xsl:when>
        <xsl:otherwise>
          <xsl:attribute name="autocomplete">off</xsl:attribute>
        </xsl:otherwise>
      </xsl:choose>
      <!--- Read Only -->
      <xsl:if test="Style/Control/@ReadOnly = 'true'">
        <xsl:attribute name="readonly" />
      </xsl:if>
      <!--- Set Control Style -->
      <xsl:attribute name="style">
        <xsl:call-template name="CSSStyles" />
      </xsl:attribute>
      <!--- Max length -->
      <xsl:if test="@Length">
        <xsl:attribute name="maxlength">
          <xsl:value-of select="@Length" />
        </xsl:attribute>
      </xsl:if>
      <!--- Default text -->
      <xsl:attribute name="value">
        <xsl:value-of select="@Value" />
      </xsl:attribute>
      <xsl:if test="Category[1]/@Checked = 'true'">
        <xsl:attribute name="checked" />
      </xsl:if>
      <xsl:if test="($qIsCustom!='false')">
        <xsl:attribute name="class">hiddencontrol</xsl:attribute>
      </xsl:if>
    </xsl:element>
  </xsl:template>
  <xsl:template name="RadioButtonControl">
    <xsl:param name="qGroup" />
    <xsl:param name="qFullName" />
    <xsl:param name="qIsCustom" />
    <xsl:param name="qCustomType" />
    <!--- Control Label -->
    <xsl:element name="div">
      <xsl:attribute name="class">m-option-base</xsl:attribute>
      <xsl:attribute name="data-exclusive">
        <xsl:text>true</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="data-questionid">
        <xsl:value-of select="@ElementID" />
        <xsl:if test="Category[1]/@CategoryID">
          <xsl:value-of select="Category[1]/@CategoryID" />
        </xsl:if>
      </xsl:attribute>
      <xsl:attribute name="data-questiongroup">
        <xsl:value-of select="$qFullName" />
      </xsl:attribute>
      <xsl:if test="Category[1]/@CategoryID">
        <xsl:variable name="ElementID">
          <xsl:value-of select="@ElementID" />
          <xsl:if test="Category[1]/@CategoryID">
            <xsl:value-of select="Category[1]/@CategoryID" />
          </xsl:if>
        </xsl:variable>
        <xsl:call-template name="appComponentScript">
          <xsl:with-param name="ComponentName" select="'mOptionBase'" />
          <xsl:with-param name="ElementID" select="$ElementID" />
          <xsl:with-param name="FullName" select="$qFullName" />
        </xsl:call-template>
      </xsl:if>
      <xsl:call-template name="MakeInputControl">
        <xsl:with-param name="qFullName" select="$qFullName" />
        <xsl:with-param name="qIsCustom" select="'true'" />
        <xsl:with-param name="qCustomType" select="$qCustomType" />
        <xsl:with-param name="qInputType" select="'radiobutton'" />
      </xsl:call-template>
      <!--- Is Button Checked -->
      <xsl:element name="label">
        <xsl:attribute name="for">
          <xsl:value-of select="@ElementID" />
          <xsl:if test="Category[1]/@CategoryID">
            <xsl:value-of select="Category[1]/@CategoryID" />
          </xsl:if>
        </xsl:attribute>
        <xsl:element name="span">
          <xsl:attribute name="class">a-icon-multistate</xsl:attribute>
          <xsl:attribute name="data-icontype">single</xsl:attribute>
          <xsl:comment>This is a comment!</xsl:comment>
        </xsl:element>
        <xsl:for-each select="Category[1]/Label">
          <xsl:call-template name="Label">
            <xsl:with-param name="labelType" select="'option'" />
          </xsl:call-template>
        </xsl:for-each>
      </xsl:element>
    </xsl:element>
  </xsl:template>
  <xsl:template name="hnumberslider">
    <xsl:param name="qGroup" />
    <xsl:param name="qFullName" />
    <xsl:param name="qCustomType" />
    <xsl:element name="div">
      <xsl:attribute name="class">o-question-hnumberslider-control</xsl:attribute>
      <xsl:element name="button">
        <xsl:attribute name="type">Button</xsl:attribute>
        <xsl:attribute name="class">
          <xsl:text>a-button-preterminator</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="data-questionid">
          <xsl:value-of select="@ElementID" />
          <xsl:text>_Preterm</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="data-questiongroup">
          <xsl:value-of select="$qFullName" />
        </xsl:attribute>
        <xsl:comment>hnumberslider pre terminator</xsl:comment>
      </xsl:element>
      <xsl:call-template name="appComponentScript">
        <xsl:with-param name="ComponentName" select="'aButtonPreTerminator'" />
        <xsl:with-param name="ElementID">
          <xsl:value-of select="@ElementID" />
          <xsl:text>_Preterm</xsl:text>
        </xsl:with-param>
        <xsl:with-param name="FullName" select="$qFullName" />
      </xsl:call-template>
      <xsl:element name="div">
        <xsl:attribute name="style">
          <xsl:if test="Style/@Width != ''">
            <xsl:text>width:</xsl:text>
            <xsl:value-of select="Style/@Width" />
          </xsl:if>
        </xsl:attribute>
        <xsl:attribute name="class">m-numberslider-horizontal</xsl:attribute>
        <xsl:element name="div">
          <xsl:attribute name="class">
            <xsl:text>a-style-sliderborder</xsl:text>
          </xsl:attribute>
          <xsl:comment>hnumberslider slider border</xsl:comment>
        </xsl:element>
        <xsl:element name="div">
          <xsl:attribute name="class">
            <xsl:text>m-style-slidermarks</xsl:text>
          </xsl:attribute>
          <xsl:comment>hnumberslider tick marks</xsl:comment>
        </xsl:element>
        <xsl:element name="div">
          <xsl:attribute name="class">
            <xsl:text>a-label-thumbvalue</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="data-questionid">
            <xsl:value-of select="@ElementID" />
            <xsl:text>_Val</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qFullName" />
          </xsl:attribute>
          <xsl:call-template name="appComponentScript">
            <xsl:with-param name="ComponentName">
              <xsl:text>aLabelThumbValue</xsl:text>
            </xsl:with-param>
            <xsl:with-param name="ElementID">
              <xsl:value-of select="@ElementID" />
              <xsl:text>_Thumbvalue</xsl:text>
            </xsl:with-param>
            <xsl:with-param name="FullName" select="$qFullName" />
          </xsl:call-template>
          <xsl:comment>hnumberslider thumb value</xsl:comment>
        </xsl:element>
        <xsl:call-template name="MakeInputControl">
          <xsl:with-param name="qFullName" select="$qFullName" />
          <xsl:with-param name="qIsCustom" select="'false'" />
          <xsl:with-param name="qCustomType" select="$qCustomType" />
          <xsl:with-param name="qInputType" select="'range'" />
        </xsl:call-template>
        <xsl:element name="div">
          <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qFullName" />
          </xsl:attribute>
          <xsl:attribute name="class">
            <xsl:text>m-label-ticklabels</xsl:text>
          </xsl:attribute>
          <xsl:comment>hnumberslider tick labels</xsl:comment>
        </xsl:element>
      </xsl:element>
      <xsl:call-template name="appComponentScript">
        <xsl:with-param name="ComponentName">
          <xsl:text>aInput</xsl:text>
          <xsl:call-template name="CamelCaseWord">
            <xsl:with-param name="text" select="$qCustomType" />
          </xsl:call-template>
        </xsl:with-param>
        <xsl:with-param name="ElementID" select="@ElementID" />
        <xsl:with-param name="FullName" select="$qFullName" />
      </xsl:call-template>
      <xsl:element name="button">
        <xsl:attribute name="type">Button</xsl:attribute>
        <xsl:attribute name="class">
          <xsl:text>a-button-postterminator</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="data-questionid">
          <xsl:value-of select="@ElementID" />
          <xsl:text>_Postterm</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="data-questiongroup">
          <xsl:value-of select="$qFullName" />
        </xsl:attribute>
        <xsl:comment>hnumberslider post terminator</xsl:comment>
      </xsl:element>
    </xsl:element>
    <xsl:call-template name="appComponentScript">
      <xsl:with-param name="ComponentName" select="'aButtonPostTerminator'" />
      <xsl:with-param name="ElementID">
        <xsl:value-of select="@ElementID" />
        <xsl:text>_Postterm</xsl:text>
      </xsl:with-param>
      <xsl:with-param name="FullName" select="$qFullName" />
    </xsl:call-template>
  </xsl:template>
</xsl:stylesheet>
