<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:template name="ControlStyle">
      <xsl:param name="IgnoreWidth" select="'false'" />
      <!--- adds the control styles to a style attribute -->
      <xsl:call-template name="LabelStyle">
         <xsl:with-param name="IgnoreWidth" select="$IgnoreWidth" />
      </xsl:call-template>
   </xsl:template>
</xsl:stylesheet>
