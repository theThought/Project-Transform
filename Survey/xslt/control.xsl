<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="Control">
   <xsl:param name="qGroup" />
   <xsl:param name="qFullName" />
   <xsl:param name="qIsCustom">
      <xsl:call-template name="TranslateZIndexToIsCustom">
         <xsl:with-param name="theID" select="Style/@ZIndex" />
      </xsl:call-template>
   </xsl:param>
   <xsl:param name="qCustomType">
      <xsl:call-template name="TranslateZIndexToName">
         <xsl:with-param name="theID" select="Style/@ZIndex" />
      </xsl:call-template>
   </xsl:param>
   <xsl:choose>
     <xsl:when test="$qCustomType='information'">
     </xsl:when>
     <xsl:when test="$qCustomType='singlelineedit'">
       <xsl:call-template name="SingleLineEdit">
          <xsl:with-param name="qGroup" select="$qGroup" />
          <xsl:with-param name="qFullName" select="$qFullName" />
          <xsl:with-param name="qIsCustom" select="$qIsCustom" />
          <xsl:with-param name="qCustomType" select="$qCustomType" />
       </xsl:call-template>
     </xsl:when>
     <xsl:when test="$qCustomType='multilineedit'">
       <xsl:call-template name="MultiLineEditControl">
          <xsl:with-param name="qGroup" select="$qGroup" />
          <xsl:with-param name="qFullName" select="$qFullName" />
          <xsl:with-param name="qIsCustom" select="$qIsCustom" />
          <xsl:with-param name="qCustomType" select="$qCustomType" />
       </xsl:call-template>
     </xsl:when>
     <xsl:when test="$qCustomType='choice'">
     </xsl:when>
     <xsl:when test="$qCustomType='hnumberslider'">
       <xsl:call-template name="hnumberslider">
          <xsl:with-param name="qGroup" select="$qGroup" />
          <xsl:with-param name="qFullName" select="$qFullName" />
          <xsl:with-param name="qCustomType" select="$qCustomType" />
       </xsl:call-template>
     </xsl:when>
     <xsl:otherwise>
       <xsl:choose>
         <xsl:when test="@Type='Static'">
            <!-- <xsl:call-template name="StaticControl" /> -->
         </xsl:when>
         <xsl:when test="@Type='RadioButton'">
            <xsl:call-template name="RadioButtonControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type='CheckButton'">
            <xsl:call-template name="CheckButtonControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
     </xsl:choose>
     </xsl:otherwise>
   </xsl:choose>
</xsl:template>
</xsl:stylesheet>
