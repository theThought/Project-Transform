<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
    <xsl:output method="xml" indent="yes"/>
    <xsl:param name="bIncludeCSSStyles" select="true()"/>
    <xsl:param name="bIncludeElementIds" select="true()"/>
    <xsl:param name="sImageLocation"/>
    <xsl:param name="sLabelClass"/>

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
