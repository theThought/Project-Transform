<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="SingleLineEdit">
   <xsl:param name="qGroup" />
   <xsl:param name="qFullName" />
   <xsl:param name="qIsCustom" />
   <xsl:param name="qCustomType" />
     <xsl:call-template name="MakeInputControl">
        <xsl:with-param name="qFullName" select="$qFullName" />
        <xsl:with-param name="qIsCustom" select="$qIsCustom" />
        <xsl:with-param name="qCustomType" select="$qCustomType" />
        <xsl:with-param name="qInputType" select="'text'" />
     </xsl:call-template>
     <xsl:call-template name="appComponentScript">
        <xsl:with-param name="ComponentName">
           <xsl:text>aInput</xsl:text>
           <xsl:call-template name="CamelCaseWord">
              <xsl:with-param name="text" select="$qCustomType" />
           </xsl:call-template>
        </xsl:with-param>
        <xsl:with-param name="ElementID" select="@ElementID" />
        <xsl:with-param name="FullName" select="$qFullName" />
     </xsl:call-template>
</xsl:template>
</xsl:stylesheet>
