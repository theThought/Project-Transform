<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:template name="CheckButtonControl">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <!--- Control Label -->
      <xsl:element name="div">
         <xsl:attribute name="class">m-option-base</xsl:attribute>
         <xsl:attribute name="data-exclusive">
            <xsl:choose>
               <xsl:when test="Category/Label/Style/Font/@IsBold='true'">
                  <xsl:text>true</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>false</xsl:text>
               </xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="@ElementID" />
            <xsl:if test="Category[1]/@CategoryID">
               <xsl:value-of select="Category[1]/@CategoryID" />
            </xsl:if>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qFullName" />
         </xsl:attribute>
         <xsl:element name="script">
            <xsl:text>app.registerComponent('mOptionBase','</xsl:text>
            <xsl:value-of select="@ElementID" />
            <xsl:if test="Category[1]/@CategoryID">
               <xsl:value-of select="Category[1]/@CategoryID" />
            </xsl:if>
            <xsl:text>','</xsl:text>
            <xsl:value-of select="$qFullName" />
            <xsl:text>');</xsl:text>
         </xsl:element>

         <xsl:call-template name="MakeInputControl">
            <xsl:with-param name="qFullName" select="$qFullName" />
            <xsl:with-param name="qIsCustom" select="'true'" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
            <xsl:with-param name="qInputType" select="'checkbox'" />
         </xsl:call-template>
         <xsl:element name="label">
            <xsl:attribute name="for">
               <xsl:value-of select="@ElementID" />
               <xsl:if test="Category[1]/@CategoryID">
                  <xsl:value-of select="Category[1]/@CategoryID" />
               </xsl:if>
            </xsl:attribute>
            <xsl:element name="span">
               <xsl:attribute name="class">a-icon-multistate</xsl:attribute>
               <xsl:attribute name="data-icontype">multiple</xsl:attribute>
               <xsl:comment>This is a comment!</xsl:comment>
            </xsl:element>
            <xsl:for-each select="Category[1]/Label">
                <xsl:call-template name="Label">
                   <xsl:with-param name="labelType" select="'option'"/>
                </xsl:call-template>
            </xsl:for-each>
         </xsl:element>
         <xsl:apply-templates select="../Question">
            <xsl:with-param name="bWithinTable" select="true()" />
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="SubQuestion" select="true()" />
         </xsl:apply-templates>
      </xsl:element>
   </xsl:template>
</xsl:stylesheet>
