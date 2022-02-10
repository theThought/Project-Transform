<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="SublistHeading">
   <xsl:element name="div">
      <xsl:attribute name="class">a-label-heading-sublist</xsl:attribute>
      <xsl:attribute name="style">
         <xsl:call-template name="CSSStyle" />
      </xsl:attribute>
      <xsl:for-each select="Category">
         <xsl:apply-templates select="Label">
            <xsl:with-param name="sLabelClass" select="'a-label-heading-sublist'" />
         </xsl:apply-templates>
      </xsl:for-each>
   </xsl:element>
</xsl:template>
</xsl:stylesheet>
