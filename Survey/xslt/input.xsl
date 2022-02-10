<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="MakeInputControl">
   <xsl:param name="qFullName" />
   <xsl:param name="qIsCustom" />
   <xsl:param name="qCustomType" />
   <xsl:param name="qInputType" select="'text'" />
   <!--- Edit box -->
   <xsl:element name="input">
     <!--- Set Control Type -->
     <xsl:attribute name="type">
       <xsl:value-of select="$qInputType" />
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
     <!--- CSS Class -->
     <xsl:if test="$bIncludeCSSStyles">
        <xsl:attribute name="class">
           <xsl:text>a-input-</xsl:text>
           <xsl:value-of select="$qCustomType" />
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
     <!--- Set Control Style -->
     <xsl:attribute name="style">
        <xsl:call-template name="CSSStyles" />
     </xsl:attribute>
     <!--- Max length -->
     <xsl:if test="@Length">
       <xsl:attribute name="maxlength">
         <xsl:value-of select="@Length" />
       </xsl:attribute>
     </xsl:if>
     <!--- Default text -->
     <xsl:attribute name="value">
       <xsl:value-of select="@Value" />
     </xsl:attribute>
     <xsl:if test="Category[1]/@Checked = 'true'">
       <xsl:attribute name="checked" />
     </xsl:if>
     <xsl:if test="($qIsCustom!='false')">
       <xsl:attribute name="class">hiddencontrol</xsl:attribute>
     </xsl:if>

      <xsl:attribute name="data-questionid">
         <xsl:value-of select="@ElementID" />
      </xsl:attribute>
      <xsl:attribute name="data-questiongroup">
         <xsl:value-of select="$qFullName" />
      </xsl:attribute>
      <!--- Alt -->
      <xsl:if test="@Alt != ''">
         <xsl:attribute name="Alt">
            <xsl:value-of select="@Alt" />
         </xsl:attribute>
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
      <!--- Read Only -->
      <xsl:if test="Style/Control/@ReadOnly = 'true'">
         <xsl:attribute name="readonly" />
      </xsl:if>
   </xsl:element>
</xsl:template>
</xsl:stylesheet>
