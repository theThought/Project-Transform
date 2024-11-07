<?xml version="1.0" encoding="UTF-8"?>
<!--
IBM Confidential

OCO Source Materials

IBM SPSS Products: Data Collection

(C) Copyright IBM Corp. 2001, 2011

The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
    <xsl:output method="xml" indent="yes"/>
    <xsl:param name="bIncludeCSSStyles" select="true()"/>
    <xsl:param name="bIncludeElementIds" select="true()"/>
    <xsl:param name="sImageLocation"/>

    <xsl:template match="Navigation">
        <navigation>
            <xsl:choose>
                <xsl:when test="Style/@Image != ''">
                <xsl:element name="div">
                    <xsl:attribute name="class">o-navigation-save</xsl:attribute>
                    <xsl:attribute name="style">display:flex;place-item:center</xsl:attribute>
                    <xsl:element name="div">
                        <xsl:attribute name="class">a-label-button-caption-left</xsl:attribute>
                        <xsl:attribute name="style">padding-top:6px;padding-right:4px</xsl:attribute>
                        <xsl:value-of select="Label/Text"/>
                    </xsl:element>
                    <!--- Image nav buttons -->
                    <xsl:element name="input">
                        <xsl:attribute name="type">image</xsl:attribute>
                        <!--- Input name -->
                        <xsl:attribute name="name">_N<xsl:value-of select="@Type"/></xsl:attribute>
                        <!--- CSS Class -->
                        <xsl:if test="$bIncludeCSSStyles">
                            <xsl:attribute name="class">mr<xsl:value-of select="@Type"/></xsl:attribute>
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
                            <xsl:call-template name="BlockStyle"/>
                        </xsl:attribute>
                        <!--- Src text -->
                        <xsl:attribute name="src">
                            <xsl:if test="not((starts-with(Style/@Image, 'http:'))or(starts-with(Style/@Image, 'https:')))">
                                <xsl:value-of select="$sImageLocation"/>
                            </xsl:if>
                            <xsl:value-of select="Style/@Image"/>
                        </xsl:attribute>
                    </xsl:element>
                 </xsl:element>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:element name="input">
                      <xsl:if test="@Type='Stop'">
                        <xsl:attribute name="tabindex">-1</xsl:attribute>
                      </xsl:if>
                        <xsl:attribute name="type">submit</xsl:attribute>
                        <!--- Input name -->
                        <xsl:attribute name="name">_N<xsl:value-of select="@Type"/></xsl:attribute>
                        <!--- CSS Class -->
                        <xsl:if test="$bIncludeCSSStyles">
                            <xsl:attribute name="class">
                              <xsl:text>a-button-</xsl:text>
                              <xsl:value-of select="translate(@Type, 'ABCDEFGHIJKLMNOPQRSTUVXYZ', 'abcdefghijklmnopqrstuvxyz')"/>
                            </xsl:attribute>
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
                            <xsl:for-each select="Label">
                                <xsl:call-template name="LabelStyle"/>
                            </xsl:for-each>
                            <xsl:call-template name="BlockStyle"/>
                        </xsl:attribute>
                        <!--- Button Label -->
                        <xsl:attribute name="value"><xsl:value-of select="Label/Text"/></xsl:attribute>
                    </xsl:element>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:if test="@Type = 'Goto'">
                <xsl:element name="select">
                    <!--- Input name -->
                    <xsl:attribute name="name">_NGoto_C</xsl:attribute>
                    <!--- CSS Class -->
                    <xsl:if test="$bIncludeCSSStyles">
                        <xsl:attribute name="class">mrGotoDropdown</xsl:attribute>
                    </xsl:if>
                    <!--- Goto drop list style -->
                    <xsl:attribute name="style">
                        <xsl:call-template name="ControlStyle"/>
                        <xsl:for-each select="Label">
                            <xsl:call-template name="LabelStyle"/>
                        </xsl:for-each>
                        <xsl:call-template name="BlockStyle"/>
                    </xsl:attribute>
                    <xsl:for-each select="Target">
                        <xsl:element name="option">
                            <!--- Option value -->
                            <xsl:attribute name="value">
                                <xsl:value-of select="@Name"/>
                            </xsl:attribute>
                            <xsl:value-of select="@Label"/>
                        </xsl:element>
                    </xsl:for-each>
                </xsl:element>
            </xsl:if>
        </navigation>
    </xsl:template>

    <xsl:template name="LabelStyle">
        <!--- adds the label styles to a style attribute -->
        <xsl:if test="Style/@Hidden = 'true'">visibility: hidden;</xsl:if>
        <xsl:if test="Style/@ZIndex">z-index: <xsl:value-of select="Style/@ZIndex"/>;</xsl:if>
        <xsl:if test="Style/Cell/@Wrap = 'false'">white-space: nowrap;</xsl:if>
    </xsl:template>

    <xsl:template name="ControlStyle">
        <!--- adds the control styles to a style attribute -->
        <xsl:call-template name="LabelStyle"/>
    </xsl:template>

    <xsl:template name="BlockStyle">
        <!--- adds the block styles to a style attribute -->
        <xsl:if test="Style/@Align">text-Align: <xsl:value-of select="Style/@Align"/>;</xsl:if>
        <xsl:choose>
            <xsl:when test="Style/@VerticalAlign = 'TextTop'">vertical-align: text-top;</xsl:when>
            <xsl:when test="Style/@VerticalAlign = 'TextBottom'">vertical-align: text-bottom;</xsl:when>
            <xsl:when test="Style/@VerticalAlign">vertical-align: <xsl:value-of select="Style/@VerticalAlign"/>;</xsl:when>
        </xsl:choose>
        <xsl:if test="Style/Cell/@Wrap = 'false'">white-space: nowrap;</xsl:if>
    </xsl:template>

</xsl:stylesheet>
