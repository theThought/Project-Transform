<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:param name="bIncludeCSSStyles" select="true()" />
   <xsl:param name="bIncludeElementIds" select="true()" />
   <xsl:param name="sImageLocation" />
   <xsl:param name="bShowOnly" select="false()" />
   <xsl:param name="bAutoComplete" select="false()" />
   <xsl:template match="Table">
   <xsl:for-each select="Row">
       <xsl:call-template name="OptionRow" />
   </xsl:for-each>
   </xsl:template>

    <xsl:template name="OptionRow">
        <xsl:for-each select="Cell">
            <xsl:choose>
                <xsl:when test="Control/@Type='Static'">
                    <xsl:call-template name="OptionGroup" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:choose>
                            <xsl:when test="contains(Control/Category/@CategoryID,'_')">
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:call-template name="OptionBase" />
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:otherwise>
            </xsl:choose>
        </xsl:for-each>
    </xsl:template>

    <xsl:template name="OptionBase">
        <xsl:param name="BelongsTo" />
        <xsl:text>Base</xsl:text>

        <xsl:value-of select="Control/Category/@CategoryID" />
        --
        <xsl:text>BelongsTo:</xsl:text>
        <xsl:value-of select="$BelongsTo" />
        <xsl:for-each select="Control">
            <xsl:call-template name="Control">

            </xsl:call-template>
        </xsl:for-each>
</xsl:template>

    <xsl:template name="OptionGroup">
        <xsl:variable name="rowID" select="Control/Category/@CategoryID" />
        <xsl:variable name="GroupName" select="Control/Category/@Name" />

        <xsl:element name="div">
           <xsl:attribute name="class">o-option-sublist</xsl:attribute>

            <xsl:for-each select="../following-sibling::Row">
                <xsl:sort select="@X" order="ascending" data-type="number" />
                <xsl:variable name="newrowID" select="Cell/Control/Category/@CategoryID" />

                <xsl:if test="starts-with($newrowID, $rowID)" >
                    <xsl:call-template name="OptionBase">
                        <xsl:with-param name="BelongsTo" select="$GroupName" />
                    </xsl:call-template>
                    <xsl:value-of select="$newrowID" />
                </xsl:if>
            </xsl:for-each>
        </xsl:element>
</xsl:template>

<xsl:template name="Control">

</xsl:template>"
</xsl:stylesheet>
