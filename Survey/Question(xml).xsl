<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="*">
          <xsl:element name="div">
            <xsl:value-of select="local-name()" />
            <xsl:text> : </xsl:text>
            <xsl:value-of select="./text()" />
            <xsl:element name="table">
              <xsl:for-each select="@*">
                <xsl:element name="tr">
                  <xsl:element name="td">
                    <xsl:value-of select="name()" />
                  </xsl:element>
                  <xsl:element name="td">
                    <xsl:value-of select="." />
                  </xsl:element>
                </xsl:element>
              </xsl:for-each>
            </xsl:element>
            <xsl:apply-templates select="*" />
          </xsl:element>
    </xsl:template>
</xsl:stylesheet>
