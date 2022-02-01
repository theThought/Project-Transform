<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:template name="BlockStyle">
      <xsl:call-template name="BorderStyle" />
      <xsl:call-template name="PaddingStyle" />
   </xsl:template>
   <xsl:template name="BorderStyle">
      <!--- adds the border styles to a style attribute -->
   </xsl:template>
   <xsl:template name="PaddingStyle" />
</xsl:stylesheet>
