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
      <xsl:when test="@Type = 'Static'">
         <xsl:call-template name="StaticControl">
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="qFullName" select="$qFullName" />
         </xsl:call-template>
      </xsl:when>
      <xsl:when test="@Type = 'Edit'">
         <xsl:call-template name="EditControl">
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="qFullName" select="$qFullName" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
      </xsl:when>
      <xsl:when test="@Type = 'SingleLineEdit'">
         <xsl:call-template name="SingleLineEditControl">
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="qFullName" select="$qFullName" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
      </xsl:when>
      <xsl:when test="@Type = 'MultiLineEdit'">
         <xsl:call-template name="MultiLineEditControl">
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="qFullName" select="$qFullName" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
      </xsl:when>
      <xsl:when test="@Type = 'DropList'">
         <xsl:call-template name="DropListControl" />
      </xsl:when>
      <xsl:when test="@Type = 'ComboList'">
         <xsl:call-template name="ComboListControl" />
      </xsl:when>
      <xsl:when test="@Type = 'RadioButton'">
         <xsl:call-template name="RadioButtonControl">
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="qFullName" select="$qFullName" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
      </xsl:when>
      <xsl:when test="@Type = 'CheckButton'">
         <xsl:call-template name="CheckButtonControl">
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="qFullName" select="$qFullName" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
      </xsl:when>
      <xsl:when test="@Type = 'ListBox'">
         <xsl:call-template name="ListBoxControl" />
      </xsl:when>
      <xsl:when test="@Type = 'ListControl'">
         <xsl:call-template name="ListControlControl" />
      </xsl:when>
      <xsl:when test="@Type = 'Button'">
         <xsl:call-template name="ButtonControl" />
      </xsl:when>
      <xsl:when test="@Type = 'Date'">
         <xsl:call-template name="DateControl" />
      </xsl:when>
      <xsl:when test="@Type = 'Time'">
         <xsl:call-template name="TimeControl" />
      </xsl:when>
      <xsl:when test="@Type = 'DateTime'">
         <xsl:call-template name="DateTimeControl" />
      </xsl:when>
      <xsl:when test="@Type = 'Password'">
         <xsl:call-template name="PasswordControl" />
      </xsl:when>
      <xsl:otherwise>
         <xsl:call-template name="StaticControl" />
      </xsl:otherwise>
   </xsl:choose>
</xsl:template>
</xsl:stylesheet>
