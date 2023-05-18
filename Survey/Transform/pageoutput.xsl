<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:param name="bIncludeCSSStyles" select="true()" />
   <xsl:param name="bIncludeElementIds" select="true()" />
   <xsl:param name="sImageLocation" />
   <xsl:param name="bShowOnly" select="false()" />
   <xsl:param name="bAutoComplete" select="false()" />

   <xsl:template match="*">
   <xsl:if test="name() != ''">
    <xsl:element name="{name()}">
        <xsl:for-each select="./@*">
            <xsl:attribute name="{local-name()}">
                <xsl:value-of select="." />
            </xsl:attribute>
        </xsl:for-each>
       <xsl:apply-templates />
    </xsl:element>
   </xsl:if>
   </xsl:template>

</xsl:stylesheet>
