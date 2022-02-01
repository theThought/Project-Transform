<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="EditControl">
   <xsl:param name="qGroup" />
   <xsl:param name="qFullName" />
   <xsl:param name="qIsCustom" />
   <xsl:param name="qCustomType" />
   <!--- Need to decide whether to use a text area of a edit control -->
   <xsl:choose>
      <xsl:when test="number(@Length) &gt; 40">
         <xsl:call-template name="MultiLineEditControl">
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="qFullName" select="$qFullName" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
         <xsl:call-template name="SingleLineEditControl">
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="qFullName" select="$qFullName" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
      </xsl:otherwise>
   </xsl:choose>
</xsl:template>
</xsl:stylesheet>
