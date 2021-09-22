<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
    <xsl:output method="xml" indent="yes"/>
    <xsl:param name="bIncludeCSSStyles" select="true()"/>
    <xsl:param name="bIncludeElementIds" select="true()"/>
    <xsl:param name="sImageLocation"/>
    <xsl:param name="bShowOnly" select="false()"/>
    <xsl:param name="bAutoComplete" select="false()"/>

    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="Questions">
        <Question>
            <xsl:apply-templates select="Question"/>
        </Question>
    </xsl:template>

    <xsl:template match="Question">
             <xsl:param name="bWithinTable" select="false()"/>

        <xsl:if test="Style/@ElementAlign = 'NewLine'">
            <xsl:choose>
                <xsl:when test="position() != 1 and not($bWithinTable)">
                    <div><br /></div>
                </xsl:when>
                <xsl:otherwise>
                    <div></div>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
        <xsl:element name="span">
            <!--- Set style -->
            <xsl:attribute name="style">
                <xsl:if test="not($bWithinTable)">
                    <xsl:if test="Style/Cell/@Width or Style/Cell/@Height or Style/Cell/@BorderStyle or Style/Cell/@BorderTopStyle or Style/Cell/@BorderBottomStyle or Style/Cell/@BorderLeftStyle or Style/Cell/@BorderRightStyle">
                        <xsl:call-template name="SpanStyle"/>
                    </xsl:if>
                    <xsl:call-template name="BlockStyle"/>
                </xsl:if>
            </xsl:attribute>
            <!--- For each used to ensure order -->
            <xsl:for-each select="*">
                <xsl:choose>
                    <xsl:when test="name() = 'Control'">
                        <xsl:apply-templates select="."/>
                    </xsl:when>
                    <xsl:when test="name() = 'Label'">
                        <xsl:apply-templates select=".">
                            <xsl:with-param name="sLabelClass" select="'mrQuestionText'"/>
                        </xsl:apply-templates>
                    </xsl:when>
                    <xsl:when test="name() = 'Error'">
                        <xsl:apply-templates select=".">
                            <xsl:with-param name="sLabelClass" select="'mrErrorText'"/>
                        </xsl:apply-templates>
                    </xsl:when>
                    <xsl:when test="name() = 'Table'">
                        <xsl:apply-templates select=".">
                            <xsl:with-param name="Orientation" select="../Style/@Orientation" />
                        </xsl:apply-templates>
                    </xsl:when>
                    <xsl:when test="name() = 'Questions'">
                        <xsl:apply-templates/>
                    </xsl:when>
                </xsl:choose>
            </xsl:for-each>
        </xsl:element>
  
    </xsl:template>

    <xsl:template match="Label | Error">
    </xsl:template>

    <xsl:template name="LabelBase">
    </xsl:template>

    <xsl:template name="Label">
    </xsl:template>

    <xsl:template name="LabelText">
    </xsl:template>

<!--- TABLE -->

    <xsl:template match="Table">
    </xsl:template>

    <xsl:template match="Row">
    </xsl:template>

    <xsl:template match="Cell">
    </xsl:template>

    <xsl:template name="CellImpl">
    </xsl:template>

    <xsl:template name="CellSpanStyle">
    </xsl:template>
  <!-- SPAN LAYOUT -->

    <xsl:template name="SpanRow">
    </xsl:template>

    <xsl:template name="SpanCell">
    </xsl:template>

<!--- CONTROL -->

    <xsl:template match="Control">
        <xsl:if test="Style/@ElementAlign = 'NewLine'">
            <div></div>
        </xsl:if>
        <xsl:choose>
            <xsl:when test="@Type = 'Static'">
                <xsl:call-template name="StaticControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'Edit'">
                <xsl:call-template name="EditControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'SingleLineEdit'">
                <xsl:call-template name="SingleLineEditControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'MultiLineEdit'">
                <xsl:call-template name="MultiLineEditControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'DropList'">
                <xsl:call-template name="DropListControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'ComboList'">
                <xsl:call-template name="ComboListControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'RadioButton'">
                <xsl:call-template name="RadioButtonControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'CheckButton'">
                <xsl:call-template name="CheckButtonControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'ListBox'">
                <xsl:call-template name="ListBoxControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'ListControl'">
                <xsl:call-template name="ListControlControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'Button'">
                <xsl:call-template name="ButtonControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'Date'">
                <xsl:call-template name="DateControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'Time'">
                <xsl:call-template name="TimeControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'DateTime'">
                <xsl:call-template name="DateTimeControl"/>
            </xsl:when>
            <xsl:when test="@Type = 'Password'">
                <xsl:call-template name="PasswordControl"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="StaticControl"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

<xsl:template name="StaticControl">
        <xsl:element name="span">
            <xsl:attribute name="style">
                <xsl:if test="Style/@Width or Style/@Height">
                    <xsl:call-template name="SpanStyle"/>
                </xsl:if>
                <xsl:call-template name="ControlStyle"/>
            </xsl:attribute>
            <xsl:for-each select="Category">
                <xsl:apply-templates select="Label">
                    <xsl:with-param name="sLabelClass" select="'mrShowText'"/>
                </xsl:apply-templates>
            </xsl:for-each>
        </xsl:element>
    </xsl:template>

    <xsl:template name="EditControl">
        <!--- Need to decide whether to use a text area of a edit control -->
        <xsl:choose>
            <xsl:when test="number(@Length) > 40">
                <xsl:call-template name="MultiLineEditControl"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:call-template name="SingleLineEditControl"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="SingleLineEditControl">
        <!--- Control Label -->
        <xsl:if test="Category[1]/Label">
            <xsl:choose>
                <xsl:when test="$bIncludeElementIds">
                    <xsl:element name="label">
                        <xsl:attribute name="for">
                            <xsl:value-of select="@ElementID"/>
                            <xsl:if test="Category[1]/@CategoryID">
                                <xsl:value-of select="Category[1]/@CategoryID"/>
                            </xsl:if>
                        </xsl:attribute>
                        <xsl:apply-templates select="Category[1]/Label">
                            <xsl:with-param name="sLabelClass" select="'mrSingleText'"/>
                        </xsl:apply-templates>
                    </xsl:element>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="Category[1]/Label">
                        <xsl:with-param name="sLabelClass" select="'mrSingleText'"/>
                    </xsl:apply-templates>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
        <!--- Edit box -->
        <xsl:element name="input">
            <!--- Set Control Type -->
            <xsl:attribute name="type">text</xsl:attribute>
            <!--- Input name -->
            <xsl:attribute name="name">
                <xsl:value-of select="@QuestionName"/>
                <xsl:if test="Category[1]/@Name">
                    <xsl:value-of select="Category[1]/@Name"/>
                </xsl:if>
            </xsl:attribute>
            <!--- ID -->
            <xsl:if test="$bIncludeElementIds">
                <xsl:attribute name="id">
                    <xsl:value-of select="@ElementID"/>
                    <xsl:if test="Category[1]/@CategoryID">
                        <xsl:value-of select="Category[1]/@CategoryID"/>
                    </xsl:if>
                </xsl:attribute>
            </xsl:if>
            <!--- Alt -->
            <xsl:if test="@Alt != ''">
                <xsl:attribute name="Alt">
                    <xsl:value-of select="@Alt"/>
                </xsl:attribute>
            </xsl:if>
            <!--- CSS Class -->
            <xsl:if test="$bIncludeCSSStyles">
                <xsl:attribute name="class">mrEdit</xsl:attribute>
            </xsl:if>
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false()">
                <xsl:attribute name="disabled"/>
            </xsl:if>
            <!--- Accelerator access key -->
            <xsl:if test="Style/Control/@Accelerator != ''">
                <xsl:attribute name="accesskey">
                    <xsl:value-of select="Style/Control/@Accelerator"/>
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
                <xsl:attribute name="readonly"/>
            </xsl:if>
            <!--- Set Control Style -->
            <xsl:attribute name="style"><xsl:call-template name="ControlStyle"/></xsl:attribute>
            <!--- Max length -->
            <xsl:if test="@Length">
                <xsl:attribute name="maxlength"><xsl:value-of select="@Length"/></xsl:attribute>
            </xsl:if>
            <!--- Default text -->
            <xsl:attribute name="value">
                <xsl:choose>
                    <xsl:when test="Category[1]/@Checked = 'true'">
                        <xsl:value-of select="'*'"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="@Value"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>
        </xsl:element>
    </xsl:template>

    <xsl:template name="MultiLineEditControl">
        <!--- Control Label -->
        <xsl:if test="Category[1]/Label">
            <xsl:choose>
                <xsl:when test="$bIncludeElementIds">
                    <xsl:element name="label">
                        <xsl:attribute name="for">
                            <xsl:value-of select="@ElementID"/>
                            <xsl:if test="Category[1]/@CategoryID">
                                <xsl:value-of select="Category[1]/@CategoryID"/>
                            </xsl:if>
                        </xsl:attribute>
                        <xsl:apply-templates select="Category[1]/Label">
                            <xsl:with-param name="sLabelClass" select="'mrSingleText'"/>
                        </xsl:apply-templates>
                    </xsl:element>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="Category[1]/Label">
                        <xsl:with-param name="sLabelClass" select="'mrSingleText'"/>
                    </xsl:apply-templates>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:if>
        <!--- Text Area -->
        <xsl:element name="textarea">
            <!--- Input name -->
            <xsl:attribute name="name">
                <xsl:value-of select="@QuestionName"/>
                <xsl:if test="Category[1]/@Name">
                    <xsl:value-of select="Category[1]/@Name"/>
                </xsl:if>
            </xsl:attribute>
            <!--- ID -->
            <xsl:if test="$bIncludeElementIds">
                <xsl:attribute name="id">
                    <xsl:value-of select="@ElementID"/>
                    <xsl:if test="Category[1]/@CategoryID">
                        <xsl:value-of select="Category[1]/@CategoryID"/>
                    </xsl:if>
                </xsl:attribute>
            </xsl:if>
            <!--- Alt -->
            <xsl:if test="@Alt != ''">
                <xsl:attribute name="Alt">
                    <xsl:value-of select="@Alt"/>
                </xsl:attribute>
            </xsl:if>
            <!--- CSS Class -->
            <xsl:if test="$bIncludeCSSStyles">
                <xsl:attribute name="class">a-input-multilineedit</xsl:attribute>
            </xsl:if>
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false()">
                <xsl:attribute name="disabled"/>
            </xsl:if>
            <!--- Accelerator access key -->
            <xsl:if test="Style/Control/@Accelerator != ''">
                <xsl:attribute name="accesskey">
                    <xsl:value-of select="Style/Control/@Accelerator"/>
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
                <xsl:attribute name="readonly"/>
            </xsl:if>
            <!--- Set Control Style -->
            <xsl:attribute name="style"><xsl:call-template name="ControlStyle"/></xsl:attribute>
            <!--- Rows -->
            <xsl:choose >
                <xsl:when test="Style/@Rows != ''">
                    <xsl:attribute name="rows"><xsl:value-of select="Style/@Rows"/></xsl:attribute>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="rows"><xsl:value-of select="6"/></xsl:attribute>
                </xsl:otherwise>
            </xsl:choose>
            <!--- Columns -->
            <xsl:choose >
                <xsl:when test="Style/@Columns != ''">
                    <xsl:attribute name="cols"><xsl:value-of select="Style/@Columns"/></xsl:attribute>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:attribute name="cols"><xsl:value-of select="40"/></xsl:attribute>
                </xsl:otherwise>
            </xsl:choose>
            <!--- Default text -->
            <xsl:choose>
                <xsl:when test="Category[1]/@Checked = 'true'">
                    <xsl:value-of select="'*'"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="@Value"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>

    <xsl:template name="DropListControl">
        <xsl:choose>
            <xsl:when test="Style/Control/@ReadOnly = 'true'">
                <!--- Read Only Drop list is displayed as an edit box -->
                <xsl:element name="input">
                    <!--- Set Control Type -->
                    <xsl:attribute name="type">text</xsl:attribute>
                    <!--- Input name -->
                    <xsl:attribute name="name">
                        <xsl:value-of select="@QuestionName"/>
                        <xsl:if test="Category[@Checked = 'true'][1]/@Name">
                            <xsl:value-of select="Category[@Checked = 'true'][1]/@Name"/>
                        </xsl:if>
                    </xsl:attribute>
                    <!--- ID -->
                    <xsl:if test="$bIncludeElementIds">
                        <xsl:attribute name="id">
                            <xsl:value-of select="@ElementID"/>
                            <xsl:if test="Category[@Checked = 'true'][1]/@Name">
                                <xsl:value-of select="Category[@Checked = 'true'][1]/@CategoryID"/>
                            </xsl:if>
                        </xsl:attribute>
                    </xsl:if>
                    <!--- Alt -->
                    <xsl:if test="@Alt != ''">
                        <xsl:attribute name="Alt">
                            <xsl:value-of select="@Alt"/>
                        </xsl:attribute>
                    </xsl:if>
                    <!--- CSS Class -->
                    <xsl:if test="$bIncludeCSSStyles">
                        <xsl:attribute name="class">mrDropdown</xsl:attribute>
                    </xsl:if>
                    <!--- Show Only -->
                    <xsl:if test="$bShowOnly != false()">
                        <xsl:attribute name="disabled"/>
                    </xsl:if>
                    <!--- Read Only -->
                    <xsl:attribute name="readonly"/>
                    <!--- Set Control Style -->
                    <xsl:attribute name="style"><xsl:call-template name="ControlStyle"/></xsl:attribute>
                    <!--- Default text -->
                    <xsl:attribute name="value">
                         <xsl:value-of select="Category[@Checked = 'true'][1]/Label"/>
                    </xsl:attribute>
                </xsl:element>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="select">
                    <!--- Input name -->
                    <xsl:attribute name="name">
                        <xsl:value-of select="@QuestionName"/>
                    </xsl:attribute>
                    <!--- ID -->
                    <xsl:if test="$bIncludeElementIds">
                        <xsl:attribute name="id">
                            <xsl:value-of select="@ElementID"/>
                        </xsl:attribute>
                    </xsl:if>
                    <!--- CSS Class -->
                    <xsl:if test="$bIncludeCSSStyles">
                        <xsl:attribute name="class">mrDropdown</xsl:attribute>
                    </xsl:if>
                    <!--- Show Only -->
                    <xsl:if test="$bShowOnly != false()">
                        <xsl:attribute name="disabled"/>
                    </xsl:if>
                    <!--- Accelerator access key -->
                    <xsl:if test="Style/Control/@Accelerator != ''">
                        <xsl:attribute name="accesskey">
                            <xsl:value-of select="Style/Control/@Accelerator"/>
                        </xsl:attribute>
                    </xsl:if>
                    <!--- Set Control Style -->
                    <xsl:attribute name="style"><xsl:call-template name="ControlStyle"/></xsl:attribute>
                    <!--- Drop list categories -->
                    <xsl:for-each select="Category">
                        <xsl:choose>
                            <xsl:when test="@CategoryList">
                                <xsl:element name="optgroup">
                                    <!--- Set Option Style -->
                                    <xsl:for-each select="Label">
                                        <xsl:attribute name="style"><xsl:call-template name="LabelStyle"/></xsl:attribute>
                                    </xsl:for-each>
                                    <!--- Set Option Class -->
                                    <xsl:attribute name="class">mrMultiple</xsl:attribute>
                                    <!--- Label -->
                                    <xsl:attribute name="label"><xsl:value-of select="Label/Text"/></xsl:attribute>
                                </xsl:element>
                            </xsl:when>                         
                            <xsl:otherwise>
                                <xsl:element name="option">
                                    <!--- Set Option Style -->
                                    <xsl:for-each select="Label">
                                        <xsl:attribute name="style"><xsl:call-template name="LabelStyle"/></xsl:attribute>
                                    </xsl:for-each>
                                    <!--- Set Option Class -->
                                    <xsl:attribute name="class">mrMultiple</xsl:attribute>
                                    <!--- Check if selected -->
                                    <xsl:if test="@Checked = 'true'">
                                        <xsl:attribute name="selected"/>
                                    </xsl:if>
                                    <xsl:choose>
                                        <xsl:when test="@IsHeading">
                                            <!--- Option value -->
                                            <xsl:attribute name="value">
                                                <xsl:value-of select="''"/>
                                            </xsl:attribute>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:attribute name="value">
                                                <xsl:value-of select="@Name"/>
                                            </xsl:attribute>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                    <xsl:for-each select="Label"><xsl:call-template name="LabelText"/></xsl:for-each>
                                </xsl:element>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:for-each>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="ComboListControl">
        <br /><B>ComboList NOT IMPLEMENTED</B>
    </xsl:template>

    <xsl:template name="RadioButtonControl">
        <!--- Control Label -->
        <xsl:element name="input">
            <!--- Set Control Type -->
            <xsl:attribute name="type">radio</xsl:attribute>
            <!--- Input name -->
            <xsl:attribute name="name">
                <xsl:value-of select="@QuestionName"/>
            </xsl:attribute>
            <!--- ID -->
            <xsl:if test="$bIncludeElementIds">
                <xsl:attribute name="id">
                    <xsl:value-of select="@ElementID"/>
                    <xsl:if test="Category[1]/@CategoryID">
                        <xsl:value-of select="Category[1]/@CategoryID"/>
                    </xsl:if>
                </xsl:attribute>
            </xsl:if>
            <!--- Alt -->
            <xsl:if test="@Alt != ''">
                <xsl:attribute name="Alt">
                    <xsl:value-of select="@Alt"/>
                </xsl:attribute>
            </xsl:if>
            <!--- CSS Class -->
            <xsl:if test="$bIncludeCSSStyles">
                <xsl:attribute name="class">mrSingle</xsl:attribute>
            </xsl:if>
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false()">
                <xsl:attribute name="disabled"/>
            </xsl:if>
            <!--- Read Only -->
            <xsl:if test="Style/Control/@ReadOnly = 'true'">
                <xsl:attribute name="disabled"/>
            </xsl:if>
            <!--- Accelerator access key -->
            <xsl:if test="Style/Control/@Accelerator != ''">
                <xsl:attribute name="accesskey">
                    <xsl:value-of select="Style/Control/@Accelerator"/>
                </xsl:attribute>
            </xsl:if>
            <!--- Set Control Style -->
            <xsl:attribute name="style"><xsl:call-template name="ControlStyle"/></xsl:attribute>
            <!--- Button Category -->
            <xsl:attribute name="value">
                <xsl:if test="Category[1]/@Name"><xsl:value-of select="Category[1]/@Name"/></xsl:if>
            </xsl:attribute>
            <!--- Is Button Checked -->
            <xsl:if test="Category[1]/@Checked = 'true'">
                <xsl:attribute name="checked"/>
            </xsl:if>
            <xsl:choose>
                <xsl:when test="$bIncludeElementIds and Category[1]/Label">
                    <xsl:element name="label">
                        <xsl:attribute name="for">
                            <xsl:value-of select="@ElementID"/>
                            <xsl:if test="Category[1]/@CategoryID">
                                <xsl:value-of select="Category[1]/@CategoryID"/>
                            </xsl:if>
                        </xsl:attribute>
                        <xsl:apply-templates select="Category[1]/Label">
                            <xsl:with-param name="sLabelClass" select="'mrSingleText'"/>
                        </xsl:apply-templates>
                    </xsl:element>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="Category[1]/Label">
                        <xsl:with-param name="sLabelClass" select="'mrSingleText'"/>
                    </xsl:apply-templates>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>

    <xsl:template name="CheckButtonControl">
    <!--- Control Label -->
        <xsl:element name="input">
            <!--- Set Control Type -->
            <xsl:attribute name="type">checkbox</xsl:attribute>
            <!--- Input name -->
            <xsl:attribute name="name">
                <xsl:value-of select="@QuestionName"/>
                <xsl:if test="Category[1]/@Name">
                    <xsl:value-of select="Category[1]/@Name"/>
                </xsl:if>
            </xsl:attribute>
            <!--- ID -->
            <xsl:if test="$bIncludeElementIds">
                <xsl:attribute name="id">
                    <xsl:value-of select="@ElementID"/>
                    <xsl:if test="Category[1]/@CategoryID">
                        <xsl:value-of select="Category[1]/@CategoryID"/>
                    </xsl:if>
                </xsl:attribute>
            </xsl:if>
            <!--- Alt -->
            <xsl:if test="@Alt != ''">
                <xsl:attribute name="Alt">
                    <xsl:value-of select="@Alt"/>
                </xsl:attribute>
            </xsl:if>
            <!--- CSS Class -->
            <xsl:if test="$bIncludeCSSStyles">
                <xsl:attribute name="class">mrMultiple</xsl:attribute>
            </xsl:if>
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false()">
                <xsl:attribute name="disabled"/>
            </xsl:if>
			<!--- Read Only -->
            <xsl:if test="Style/Control/@ReadOnly = 'true'">
                <xsl:attribute name="disabled"/>
            </xsl:if>
			<!--- Accelerator access key -->
            <xsl:if test="Style/Control/@Accelerator != ''">
                <xsl:attribute name="accesskey">
                    <xsl:value-of select="Style/Control/@Accelerator"/>
                </xsl:attribute>
            </xsl:if>
            <!--- Set Control Style -->
            <xsl:attribute name="style"><xsl:call-template name="ControlStyle"/></xsl:attribute>
            <!--- Button Category -->
            <xsl:attribute name="value">
                <xsl:if test="Category[1]/@Name"><xsl:value-of select="Category[1]/@Name"/></xsl:if>
            </xsl:attribute>
            <!--- Is Button Checked -->
            <xsl:if test="Category[1]/@Checked = 'true'">
                <xsl:attribute name="checked"/>
            </xsl:if>
            <xsl:choose>
                <xsl:when test="$bIncludeElementIds and Category[1]/Label">
                    <xsl:element name="label">
                        <xsl:attribute name="for">
                            <xsl:value-of select="@ElementID"/>
                            <xsl:if test="Category[1]/@CategoryID">
                                <xsl:value-of select="Category[1]/@CategoryID"/>
                            </xsl:if>
                        </xsl:attribute>
                        <xsl:apply-templates select="Category[1]/Label">
                            <xsl:with-param name="sLabelClass" select="'mrMultipleText'"/>
                        </xsl:apply-templates>
                    </xsl:element>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="Category[1]/Label">
                        <xsl:with-param name="sLabelClass" select="'mrMultipleText'"/>
                    </xsl:apply-templates>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>

    <xsl:template name="ListBoxControl">
        <xsl:element name="select">
            <xsl:attribute name="size">4</xsl:attribute>
            <xsl:attribute name="multiple"/>
            <!--- Input name -->
            <xsl:attribute name="name">
                <xsl:value-of select="@QuestionName"/>
            </xsl:attribute>
            <!--- ID -->
            <xsl:if test="$bIncludeElementIds">
                <xsl:attribute name="id">
                    <xsl:value-of select="@ElementID"/>
                </xsl:attribute>
            </xsl:if>
            <!--- Alt -->
            <xsl:if test="@Alt != ''">
                <xsl:attribute name="Alt">
                    <xsl:value-of select="@Alt"/>
                </xsl:attribute>
            </xsl:if>
            <!--- CSS Class -->
            <xsl:if test="$bIncludeCSSStyles">
                <xsl:attribute name="class">mrListBox</xsl:attribute>
            </xsl:if>
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false()">
                <xsl:attribute name="disabled"/>
            </xsl:if>
            <!--- Accelerator access key -->
            <xsl:if test="Style/Control/@Accelerator != ''">
                <xsl:attribute name="accesskey">
                    <xsl:value-of select="Style/Control/@Accelerator"/>
                </xsl:attribute>
            </xsl:if>
            <!--- Set Control Style -->
            <xsl:attribute name="style"><xsl:call-template name="ControlStyle"/></xsl:attribute>
            <!--- List box categories -->
            <xsl:for-each select="Category">
                <xsl:choose>
                    <xsl:when test="@CategoryList">
                        <xsl:element name="optgroup">
                            <!--- Set Option Style -->
                            <xsl:for-each select="Label">
                                <xsl:attribute name="style"><xsl:call-template name="LabelStyle"/></xsl:attribute>
                            </xsl:for-each>
                            <!--- Set Option Class -->
                            <xsl:attribute name="class">mrMultiple</xsl:attribute>
                            <!--- Label -->
                            <xsl:attribute name="label"><xsl:value-of select="Label/Text"/></xsl:attribute>
                        </xsl:element>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:element name="option">
                            <!--- Set Option Style -->
                            <xsl:for-each select="Label">
                                <xsl:attribute name="style"><xsl:call-template name="LabelStyle"/></xsl:attribute>
                            </xsl:for-each>
                            <!--- Set Option Class -->
                            <xsl:attribute name="class">mrMultiple</xsl:attribute>
                            <!--- Check if selected -->
                            <xsl:if test="@Checked = 'true'">
                                <xsl:attribute name="selected"/>
                            </xsl:if>
                            <xsl:choose>
                                <xsl:when test="@IsHeading">
                                    <!--- Option value -->
                                    <xsl:attribute name="value">
                                        <xsl:value-of select="''"/>
                                    </xsl:attribute>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:attribute name="value">
                                        <xsl:value-of select="@Name"/>
                                    </xsl:attribute>
                                </xsl:otherwise>
                            </xsl:choose>
                            <xsl:for-each select="Label"><xsl:call-template name="LabelText"/></xsl:for-each>
                        </xsl:element>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
        </xsl:element>
    </xsl:template>

    <xsl:template name="ListControlControl">
        <br /><B>ListControl NOT IMPLEMENTED</B>
    </xsl:template>

    <xsl:template name="ButtonControl">
        <xsl:choose>
            <xsl:when test="Style/@Image != ''">
                <!--- Image control buttons -->
                <xsl:element name="input">
                    <xsl:attribute name="type">image</xsl:attribute>
                    <!--- Input name -->
                    <xsl:attribute name="name">
                        <xsl:value-of select="@QuestionName"/>
                        <xsl:if test="Category[1]/@Name">
                            <xsl:value-of select="Category[1]/@Name"/>
                        </xsl:if>
                    </xsl:attribute>
                    <!--- ID -->
                    <xsl:if test="$bIncludeElementIds">
                        <xsl:attribute name="id">
                            <xsl:value-of select="@ElementID"/>
                            <xsl:if test="Category[1]/@CategoryID">
                                <xsl:value-of select="Category[1]/@CategoryID"/>
                            </xsl:if>
                        </xsl:attribute>
                    </xsl:if>
                    <!--- Alt -->
                    <xsl:if test="@Alt != ''">
                        <xsl:attribute name="Alt">
                            <xsl:value-of select="@Alt"/>
                        </xsl:attribute>
                    </xsl:if>
                    <!--- CSS Class -->
                    <xsl:if test="$bIncludeCSSStyles">
                        <xsl:attribute name="sLabelClass">mrSingleText</xsl:attribute>
                    </xsl:if>
                    <!--- Show Only -->
                    <xsl:if test="$bShowOnly != false()">
                        <xsl:attribute name="disabled"/>
                    </xsl:if>
                    <!--- Accelerator access key -->
                    <xsl:if test="Style/Control/@Accelerator != ''">
                        <xsl:attribute name="accesskey">
                            <xsl:value-of select="Style/Control/@Accelerator"/>
                        </xsl:attribute>
                    </xsl:if>
                    <!--- Image control style -->
                    <xsl:attribute name="style">
                        <xsl:call-template name="ControlStyle"/>
                        <xsl:for-each select="Category[1]/Label">
                            <xsl:call-template name="BlockStyle"/>
                        </xsl:for-each>
                    </xsl:attribute>
                    <!--- Src text -->
                    <xsl:attribute name="src">
                        <xsl:if test="not((starts-with(Style/@Image, 'http:'))or(starts-with(Style/@Image, 'https:')))">
                            <xsl:value-of select="$sImageLocation"/>
                        </xsl:if>
                        <xsl:value-of select="Style/@Image"/>
                    </xsl:attribute>
                    <!--- Input value -->
                    <xsl:if test="Category[1]/@Name">
                        <xsl:attribute name="value"><xsl:value-of select="Category[1]/@Name"/></xsl:attribute>
                    </xsl:if>
                    <!--- Alt text -->
                    <xsl:attribute name="alt"><xsl:value-of select="Category/Label/Text"/></xsl:attribute>
                </xsl:element>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="input">
                    <xsl:attribute name="type">submit</xsl:attribute>
                    <!--- Input name -->
                    <xsl:attribute name="name">
                        <xsl:value-of select="@QuestionName"/>
                        <xsl:if test="Category[1]/@Name">
                            <xsl:value-of select="Category[1]/@Name"/>
                        </xsl:if>
                    </xsl:attribute>
                    <!--- ID -->
                    <xsl:if test="$bIncludeElementIds">
                        <xsl:attribute name="id">
                            <xsl:value-of select="@ElementID"/>
                            <xsl:if test="Category[1]/@CategoryID">
                                <xsl:value-of select="Category[1]/@CategoryID"/>
                            </xsl:if>
                        </xsl:attribute>
                    </xsl:if>
                    <!--- CSS Class -->
                    <xsl:if test="$bIncludeCSSStyles">
                        <xsl:attribute name="sLabelClass">mrSingleText</xsl:attribute>
                    </xsl:if>
                    <!--- Show Only -->
                    <xsl:if test="$bShowOnly != false()">
                        <xsl:attribute name="disabled"/>
                    </xsl:if>
                    <!--- Accelerator access key -->
                    <xsl:if test="Style/Control/@Accelerator != ''">
                        <xsl:attribute name="accesskey">
                            <xsl:value-of select="Style/Control/@Accelerator"/>
                        </xsl:attribute>
                    </xsl:if>
                    <!--- Button style -->
                    <xsl:attribute name="style">
                        <xsl:call-template name="ControlStyle"/>
                        <xsl:for-each select="Category[1]/Label">
                            <xsl:call-template name="LabelStyle"/>
                            <xsl:call-template name="BlockStyle"/>
                        </xsl:for-each>
                    </xsl:attribute>
                    <!--- Button Label -->
                    <xsl:attribute name="value"><xsl:value-of select="Category/Label/Text"/></xsl:attribute>
                    <!--- Alt text -->
                    <xsl:attribute name="alt"><xsl:value-of select="Category/Label/Text"/></xsl:attribute>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="DateControl">
        <br /><B>Date NOT IMPLEMENTED</B>
    </xsl:template>

    <xsl:template name="TimeControl">
        <br /><B>Time NOT IMPLEMENTED</B>
    </xsl:template>

    <xsl:template name="DateTimeControl">
        <br /><B>DateTime NOT IMPLEMENTED</B>
    </xsl:template>

    <xsl:template name="PasswordControl">
         <!--- Control Label -->
        <xsl:choose>
            <xsl:when test="$bIncludeElementIds and Category[1]/Label">
                <xsl:element name="label">
                    <xsl:attribute name="for">
                        <xsl:value-of select="@ElementID"/>
                        <xsl:if test="Category[1]/@CategoryID">
                            <xsl:value-of select="Category[1]/@CategoryID"/>
                        </xsl:if>
                    </xsl:attribute>
                    <xsl:apply-templates select="Category[1]/Label"/>
                </xsl:element>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates select="Category[1]/Label"/>
            </xsl:otherwise>
        </xsl:choose>
        <xsl:element name="input">
            <!--- Set Control Type -->
            <xsl:attribute name="type">password</xsl:attribute>
            <!--- Input name -->
            <xsl:attribute name="name">
                <xsl:value-of select="@QuestionName"/>
                <xsl:if test="Category[1]/@Name">
                    <xsl:value-of select="Category[1]/@Name"/>
                </xsl:if>
            </xsl:attribute>
            <!--- ID -->
            <xsl:if test="$bIncludeElementIds">
                <xsl:attribute name="id">
                    <xsl:value-of select="@ElementID"/>
                    <xsl:if test="Category[1]/@CategoryID">
                        <xsl:value-of select="Category[1]/@CategoryID"/>
                    </xsl:if>
                </xsl:attribute>
            </xsl:if>
            <!--- CSS Class -->
            <xsl:if test="$bIncludeCSSStyles">
                <xsl:attribute name="class">mrEdit</xsl:attribute>
            </xsl:if>
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false()">
                <xsl:attribute name="disabled"/>
            </xsl:if>
            <!--- Accelerator access key -->
            <xsl:if test="Style/Control/@Accelerator != ''">
                <xsl:attribute name="accesskey">
                    <xsl:value-of select="Style/Control/@Accelerator"/>
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
            <xsl:if test="Style/Control/@ReadOnly = 'true'"><xsl:attribute name="readonly"></xsl:attribute></xsl:if>
            <!--- Set Control Style -->
            <xsl:attribute name="style"><xsl:call-template name="ControlStyle"/></xsl:attribute>
            <!--- Max number of characters -->
            <xsl:if test="@Length">
                <xsl:attribute name="maxlength"><xsl:value-of select="@Length"/></xsl:attribute>
            </xsl:if>
            <!--- Default text -->
            <xsl:attribute name="value"><xsl:choose>
                <xsl:when test="Category[1]/@Checked = 'true'">
                        <xsl:value-of select="'*'"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="@Value"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>
        </xsl:element>
    </xsl:template>

<!--- Style Templates -->

    <xsl:template name="LabelStyle">
    </xsl:template>

    <xsl:template name="SpanStyle">
    </xsl:template>

    <xsl:template name="ControlStyle">
        <!--- adds the control styles to a style attribute -->
        <xsl:call-template name="LabelStyle"/>
    </xsl:template>

    <xsl:template name="TableStyle">
        <!--- adds the table styles to a style attribute -->
        <xsl:call-template name="LabelStyle"/>
    </xsl:template>

    <xsl:template name="CellStyle">
        <xsl:call-template name="BlockStyle"/>
    </xsl:template>

    <xsl:template name="BlockStyle">
        <xsl:call-template name="BorderStyle"/>
        <xsl:call-template name="PaddingStyle"/>
    </xsl:template>

    <xsl:template name="BorderStyle">        <!--- adds the border styles to a style attribute -->
    </xsl:template>

    <xsl:template name="PaddingStyle">
    </xsl:template>
</xsl:stylesheet>