<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:template name="TableStyle">
      <!--- adds the table styles to a style attribute -->
      <xsl:call-template name="LabelStyle" />
   </xsl:template>
   <xsl:template name="CellStyle">
      <xsl:call-template name="BlockStyle" />
   </xsl:template>
</xsl:stylesheet>
