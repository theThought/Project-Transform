<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="LabelStyle">
   <xsl:param name="IgnoreWidth" select="'false'" />
   <xsl:if test="Style/@BgColor">
      background-color:
      <xsl:value-of select="Style/@BgColor" />
      ;
   </xsl:if>
   <xsl:if test="Style/@Color">
      color:
      <xsl:value-of select="Style/@Color" />
      ;
   </xsl:if>
   <xsl:if test="Style/@Width and $IgnoreWidth != 'true'">
      width:
      <xsl:value-of select="Style/@Width" />
      ;
   </xsl:if>
   <xsl:if test="Style/@Height">
      height:
      <xsl:value-of select="Style/@Height" />
      ;
   </xsl:if>
   <xsl:if test="Style/@Hidden = 'true'">visibility: hidden;</xsl:if>
   <xsl:choose>
      <xsl:when test="Style/@Cursor = 'EResize'">cursor: e-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'NEResize'">cursor: ne-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'NResize'">cursor: n-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'NWResize'">cursor: nw-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'WResize'">cursor: w-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'SWResize'">cursor: sw-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'SResize'">cursor: s-resize;</xsl:when>
      <xsl:when test="Style/@Cursor = 'SEResize'">cursor: se-resize;</xsl:when>
      <xsl:when test="Style/@Cursor">
         cursor:
         <xsl:value-of select="Style/@Cursor" />
         ;
      </xsl:when>
   </xsl:choose>
   <xsl:if test="Style/Cell/@Wrap = 'false'">white-space: nowrap;</xsl:if>
   <xsl:if test="Style/Font/@Family">
      font-family:
      <xsl:value-of select="Style/Font/@Family" />
      ;
   </xsl:if>
   <xsl:if test="Style/Font/@Size">
      font-size:
      <xsl:value-of select="Style/Font/@Size" />
      pt;
   </xsl:if>
   <xsl:if test="Style/Font/@IsUnderline = 'true'">text-decoration: underline;</xsl:if>
   <xsl:if test="Style/Font/@IsItalic = 'true'">font-style: italic;</xsl:if>
   <xsl:if test="Style/Font/@IsBold = 'true'">font-weight: bold;</xsl:if>
   <xsl:if test="Style/Font/@IsStrikethrough = 'true'">text-decoration: line-through;</xsl:if>
   <xsl:if test="Style/Font/@IsOverline = 'true'">text-decoration: overline;</xsl:if>
   <xsl:if test="Style/Font/@IsBlink = 'true'">text-decoration: blink;</xsl:if>
   <xsl:if test="Style/Font/@IsSubscript = 'true'">vertical-align: sub;</xsl:if>
   <xsl:if test="Style/Font/@IsSuperscript = 'true'">vertical-align: super;</xsl:if>
</xsl:template>
</xsl:stylesheet>
