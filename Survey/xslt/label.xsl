<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
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
</xsl:stylesheet>
