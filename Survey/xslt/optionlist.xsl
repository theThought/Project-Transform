<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="OptionList">
  <xsl:param name="qGroup"/>
  <xsl:param name="qFullName"/>
  <xsl:param name="qIsCustom"/>
  <xsl:param name="qCustomType"/>

    <xsl:for-each select="./Row">
      <xsl:sort select="@Y" order="ascending" data-type="number"/>
      <xsl:for-each select="./Cell">
          <xsl:sort select="@X" order="ascending" data-type="number"/>
          <xsl:for-each select="*">
            <xsl:choose>
              <xsl:when test="name()='Control'">
                <xsl:call-template name="CellControl">
                  <xsl:with-param name="qGroup" select="$qGroup" />
                  <xsl:with-param name="qFullName" select="$qFullName" />
                  <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                  <xsl:with-param name="qCustomType" select="$qCustomType" />
                </xsl:call-template>
              </xsl:when>
              <xsl:when test="name()='Question'">
                <xsl:call-template name="CellQuestion">
                  <xsl:with-param name="qGroup" select="$qGroup" />
                  <xsl:with-param name="qFullName" select="$qFullName" />
                  <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                  <xsl:with-param name="qCustomType" select="$qCustomType" />
                </xsl:call-template>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>Cell contents</xsl:text>
                <xsl:value-of select="name()" />
              </xsl:otherwise>
            </xsl:choose>
          </xsl:for-each>
        </xsl:for-each>
      </xsl:for-each>
</xsl:template>

<xsl:template name="CellControl">
  <xsl:param name="qGroup"/>
  <xsl:param name="qFullName"/>
  <xsl:param name="qIsCustom"/>
  <xsl:param name="qCustomType"/>
  <xsl:variable name="rowID" select="concat(Category/@CategoryID, '_')"/>
  <xsl:choose>
    <xsl:when test="@Type='Static'">
        <xsl:element name="div">
            <xsl:attribute name="class">o-option-sublist</xsl:attribute>
            <xsl:call-template name="OptionHeading"/>
            <xsl:for-each select="./following-sibling::Row">
                <xsl:if test="starts-with(Category/@CategoryID, $rowID)">
                  <xsl:call-template name="OptionListItem">
                     <xsl:with-param name="qGroup" select="$qGroup"/>
                     <xsl:with-param name="qFullName" select="$qFullName"/>
                     <xsl:with-param name="qIsCustom" select="$qIsCustom"/>
                     <xsl:with-param name="qCustomType" select="$qCustomType"/>
                  </xsl:call-template>
                </xsl:if>
            </xsl:for-each>
        </xsl:element>
    </xsl:when>
    <xsl:otherwise>
        <xsl:call-template name="OptionListItem">
            <xsl:with-param name="qGroup" select="$qGroup"/>
            <xsl:with-param name="qFullName" select="$qFullName"/>
            <xsl:with-param name="qIsCustom" select="$qIsCustom"/>
            <xsl:with-param name="qCustomType" select="$qCustomType"/>
        </xsl:call-template>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>

<xsl:template name="CellQuestion">
  <xsl:apply-templates select="Question"/>
</xsl:template>

<xsl:template name="OptionListItem">
    <xsl:param name="qGroup"/>
    <xsl:param name="qFullName"/>
    <xsl:param name="qIsCustom"/>
    <xsl:param name="qCustomType"/>
    <xsl:param name="Orientation" select="Column"/>
     <xsl:choose>
        <xsl:when test="name() = 'Control'">
           <xsl:call-template name="Choice">
              <xsl:with-param name="qGroup" select="$qGroup"/>
              <xsl:with-param name="qFullName" select="$qFullName"/>
              <xsl:with-param name="qIsCustom" select="$qIsCustom"/>
              <xsl:with-param name="qCustomType" select="$qCustomType"/>
           </xsl:call-template>
        </xsl:when>
     </xsl:choose>
</xsl:template>

<xsl:template name="Choice">
   <xsl:param name="qGroup" />
   <xsl:param name="qFullName" />
   <xsl:param name="qIsCustom" />
   <xsl:param name="qCustomType" />
   <xsl:choose>
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
</xsl:template>

<xsl:template name="OptionHeading">
   <xsl:param name="qGroup"/>
   <xsl:param name="qFullName"/>
   <xsl:param name="qIsCustom"/>
   <xsl:param name="qCustomType"/>
   <xsl:param name="Orientation" select="Column"/>
   <xsl:for-each select="./Control/Category">
     <xsl:apply-templates select="Label">
        <xsl:with-param name="sLabelClass" select="'mrQuestionText'"/>
        <xsl:with-param name="bWithinTable" select="true()"/>
     </xsl:apply-templates>
   </xsl:for-each>
</xsl:template>
</xsl:stylesheet>
