<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
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
                   <xsl:with-param name="labelType" select="'option'"/>
                </xsl:call-template>
            </xsl:for-each>
      </xsl:element>
    </xsl:element>
</xsl:template>
</xsl:stylesheet>
