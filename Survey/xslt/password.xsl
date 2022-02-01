<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:template name="PasswordControl">
      <!--- Control Label -->
      <xsl:choose>
         <xsl:when test="$bIncludeElementIds and Category[1]/Label">
            <xsl:element name="label">
               <xsl:attribute name="for">
                  <xsl:value-of select="@ElementID" />
                  <xsl:if test="Category[1]/@CategoryID">
                     <xsl:value-of select="Category[1]/@CategoryID" />
                  </xsl:if>
               </xsl:attribute>
               <xsl:apply-templates select="Category[1]/Label" />
            </xsl:element>
         </xsl:when>
         <xsl:otherwise>
            <xsl:apply-templates select="Category[1]/Label" />
         </xsl:otherwise>
      </xsl:choose>
      <xsl:element name="input">
         <!--- Set Control Type -->
         <xsl:attribute name="type">password</xsl:attribute>
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
            <xsl:attribute name="class">mrEdit</xsl:attribute>
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
         <!--- Max number of characters -->
         <xsl:if test="@Length">
            <xsl:attribute name="maxlength">
               <xsl:value-of select="@Length" />
            </xsl:attribute>
         </xsl:if>
         <!--- Default text -->
         <xsl:attribute name="value">
            <xsl:choose>
               <xsl:when test="Category[1]/@Checked = 'true'">
                  <xsl:value-of select="'*'" />
               </xsl:when>
               <xsl:otherwise>
                  <xsl:value-of select="@Value" />
               </xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>
      </xsl:element>
   </xsl:template>
</xsl:stylesheet>
