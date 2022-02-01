<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:template name="appComponentScript">
      <xsl:param name="ComponentName" />
      <xsl:param name="ElementID" />
      <xsl:param name="FullName" />
      <xsl:element name="script">
         <xsl:text>app.registerComponent('</xsl:text>
         <xsl:value-of select="$ComponentName" />
         <xsl:text>','</xsl:text>
         <xsl:value-of select="$ElementID" />
         <xsl:text>','</xsl:text>
         <xsl:value-of select="$FullName" />
         <xsl:text>');</xsl:text>
      </xsl:element>
   </xsl:template>

  <xsl:template name="TranslateZIndexToName">
     <xsl:param name="theID" />
     <xsl:choose>
        <xsl:when test="$theID = '-10'">
           <xsl:value-of select="'information'" />
        </xsl:when>
        <xsl:when test="$theID = '-20'">
           <xsl:value-of select="'singlelineedit'" />
        </xsl:when>
        <xsl:when test="$theID = '-30'">
           <xsl:value-of select="'multilineedit'" />
        </xsl:when>
        <xsl:when test="$theID = '-40'">
           <xsl:value-of select="'choice'" />
        </xsl:when>
        <xsl:when test="$theID = '-50'">
           <xsl:value-of select="'hnumberslider'" />
        </xsl:when>
        <xsl:otherwise>
           <xsl:value-of select="theID" />
        </xsl:otherwise>
     </xsl:choose>
  </xsl:template>

  <xsl:template name="TranslateZIndexToIsCustom">
     <xsl:param name="theID" />
     <xsl:choose>
        <xsl:when test="$theID = '-10'">
           <xsl:value-of select="'false'" />
        </xsl:when>
        <xsl:when test="$theID = '-20'">
           <xsl:value-of select="'false'" />
        </xsl:when>
        <xsl:when test="$theID = '-30'">
           <xsl:value-of select="'false'" />
        </xsl:when>
        <xsl:when test="$theID = '-40'">
           <xsl:value-of select="'true'" />
        </xsl:when>
        <xsl:when test="$theID = '-50'">
           <xsl:value-of select="'true'" />
        </xsl:when>
        <xsl:otherwise>
           <xsl:value-of select="'true'" />
        </xsl:otherwise>
     </xsl:choose>
  </xsl:template>

  <xsl:template name="CamelCaseWord">
     <xsl:param name="text" />
     <xsl:value-of select="translate(substring($text,1,1),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')" />
     <xsl:value-of select="translate(substring($text,2,string-length($text)-1),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')" />
  </xsl:template>

  <xsl:template name="CalculateQuestionName">
     <xsl:param name="QuestionName" />
     <xsl:choose>
        <xsl:when test="substring($QuestionName, string-length($QuestionName) - 1)='_C'">
           <xsl:value-of select="substring($QuestionName, 1, string-length($QuestionName)-2)" />
        </xsl:when>
        <xsl:otherwise>
           <xsl:value-of select="$QuestionName" />
        </xsl:otherwise>
     </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
