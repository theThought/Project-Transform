<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="MultiLineEditControl">
   <xsl:param name="qGroup" />
   <xsl:param name="qFullName" />
   <xsl:param name="qIsCustom" />
   <xsl:param name="qCustomType" />
   <!--- Control Label -->
   <xsl:if test="Category[1]/Label">
      <xsl:choose>
         <xsl:when test="$bIncludeElementIds">
            <xsl:element name="label">
               <xsl:attribute name="for">
                  <xsl:value-of select="@ElementID" />
                  <xsl:if test="Category[1]/@CategoryID">
                     <xsl:value-of select="Category[1]/@CategoryID" />
                  </xsl:if>
               </xsl:attribute>
               <xsl:apply-templates select="Category[1]/Label">
                  <xsl:with-param name="sLabelClass" select="'mrSingleText'" />
               </xsl:apply-templates>
            </xsl:element>
         </xsl:when>
         <xsl:otherwise>
            <xsl:apply-templates select="Category[1]/Label">
               <xsl:with-param name="sLabelClass" select="'mrSingleText'" />
            </xsl:apply-templates>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:if>
   <!--- Text Area -->
   <xsl:element name="textarea">
      <xsl:attribute name="data-questionid">
         <xsl:value-of select="@ElementID" />
      </xsl:attribute>
      <xsl:attribute name="data-questiongroup">
         <xsl:value-of select="$qFullName" />
      </xsl:attribute>
      <!--- Input name -->
      <xsl:attribute name="name">
         <xsl:value-of select="@QuestionName" />
         <xsl:if test="Category[1]/@Name">
            <xsl:value-of select="Category[1]/@Name" />
         </xsl:if>
      </xsl:attribute>
      <!--- ID -->
      <xsl:if test="$bIncludeElementIds">
         <xsl:attribute name="id">
            <xsl:value-of select="@ElementID" />
            <xsl:if test="Category[1]/@CategoryID">
               <xsl:value-of select="Category[1]/@CategoryID" />
            </xsl:if>
         </xsl:attribute>
      </xsl:if>
      <!--- Alt -->
      <xsl:if test="@Alt != ''">
         <xsl:attribute name="Alt">
            <xsl:value-of select="@Alt" />
         </xsl:attribute>
      </xsl:if>
      <!--- CSS Class -->
      <xsl:if test="$bIncludeCSSStyles">
         <xsl:attribute name="class">a-input-multilineedit</xsl:attribute>
      </xsl:if>
      <!--- Show Only -->
      <xsl:if test="$bShowOnly != false()">
         <xsl:attribute name="disabled" />
      </xsl:if>
      <!--- Accelerator access key -->
      <xsl:if test="Style/Control/@Accelerator != ''">
         <xsl:attribute name="accesskey">
            <xsl:value-of select="Style/Control/@Accelerator" />
         </xsl:attribute>
      </xsl:if>
      <!--- AutoComplete -->
      <xsl:choose>
         <xsl:when test="$bAutoComplete = true()">
            <xsl:attribute name="autocomplete">on</xsl:attribute>
         </xsl:when>
         <xsl:otherwise>
            <xsl:attribute name="autocomplete">off</xsl:attribute>
         </xsl:otherwise>
      </xsl:choose>
      <!--- Read Only -->
      <xsl:if test="Style/Control/@ReadOnly = 'true'">
         <xsl:attribute name="readonly" />
      </xsl:if>
      <!--- Set Control Style -->
      <xsl:attribute name="style">
         <xsl:call-template name="ControlStyle" />
      </xsl:attribute>
      <!--- Rows -->
      <xsl:choose>
         <xsl:when test="Style/@Rows != ''">
            <xsl:attribute name="rows">
               <xsl:value-of select="Style/@Rows" />
            </xsl:attribute>
         </xsl:when>
      </xsl:choose>
      <!--- Columns -->
      <xsl:choose>
         <xsl:when test="Style/@Columns != ''">
            <xsl:attribute name="cols">
               <xsl:value-of select="Style/@Columns" />
            </xsl:attribute>
         </xsl:when>
      </xsl:choose>
      <!--- Default text -->
      <xsl:choose>
         <xsl:when test="Category[1]/@Checked = 'true'">
            <xsl:value-of select="'*'" />
         </xsl:when>
         <xsl:otherwise>
            <xsl:value-of select="@Value" />
         </xsl:otherwise>
      </xsl:choose>
   </xsl:element>
   <xsl:call-template name="appComponentScript">
      <xsl:with-param name="ComponentName" select="'aInputMultilineedit'" />
      <xsl:with-param name="ElementID" select="@ElementID" />
      <xsl:with-param name="FullName" select="$qFullName" />
   </xsl:call-template>
</xsl:template>
</xsl:stylesheet>
