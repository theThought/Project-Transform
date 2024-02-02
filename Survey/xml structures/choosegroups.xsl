<?xml version="1.0" encoding="UTF-8" ?>
<xsl:transform xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="html" doctype-public="XSLT-compat" omit-xml-declaration="yes" encoding="UTF-8" indent="yes" />

    <xsl:template match="Question">
      <html>
        <head>
          <title>New Version!</title>
        </head>
        <xsl:for-each select="./control">
          <xsl:choose>
              <xsl:when test="@type='singlelineedit'">
                <xsl:call-template name="editbox" />
              </xsl:when>
              <xsl:when test="@type='static'">
                <xsl:call-template name="heading" />
              </xsl:when>
          </xsl:choose>  
        </xsl:for-each>
      </html>
    </xsl:template>

    <xsl:template name="editbox">
        <xsl:element name="input">
            <xsl:attribute name="type">text</xsl:attribute>
            <xsl:attribute name="name"><xsl:apply-templates select="." /></xsl:attribute>
        </xsl:element>
    </xsl:template>
    
    <xsl:template name="heading">
        <xsl:element name="span">
            <xsl:apply-templates select="." />
        </xsl:element>
    </xsl:template>
    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>
</xsl:transform>
