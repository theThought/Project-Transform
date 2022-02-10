<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="CSSStyles">
   <xsl:if test="Style/@BgColor">
      <xsl:text>background-color:</xsl:text>
      <xsl:value-of select="Style/@BgColor" />
      <xsl:text>;</xsl:text>
   </xsl:if>
   <xsl:if test="Style/@Color">
      <xsl:text>color:</xsl:text>
      <xsl:value-of select="Style/@Color" />
      <xsl:text>;</xsl:text>
   </xsl:if>
   <xsl:if test="Style/@Width">
      <xsl:text>width:</xsl:text>
      <xsl:value-of select="Style/@Width" />
      <xsl:text>;</xsl:text>
   </xsl:if>
   <xsl:if test="Style/@Height">
      <xsl:text>height:</xsl:text>
      <xsl:value-of select="Style/@Height" />
      <xsl:text>;</xsl:text>
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
         <xsl:text>cursor:</xsl:text>
         <xsl:value-of select="Style/@Cursor" />
         <xsl:text>;</xsl:text>
      </xsl:when>
   </xsl:choose>
   <xsl:if test="Style/Cell/@Wrap = 'false'">white-space: nowrap;</xsl:if>
   <xsl:if test="Style/Font/@Family">
      <xsl:text>font-family:</xsl:text>
      <xsl:value-of select="Style/Font/@Family" />
      <xsl:text>;</xsl:text>
   </xsl:if>
   <xsl:if test="Style/Font/@Size">
      <xsl:text>font-size:</xsl:text>
      <xsl:value-of select="Style/Font/@Size" />
      <xsl:text>pt;</xsl:text>
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
