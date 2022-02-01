<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="ButtonControl">
   <xsl:choose>
      <xsl:when test="Style/@Image != ''">
         <!--- Image control buttons -->
         <xsl:element name="input">
            <xsl:attribute name="type">image</xsl:attribute>
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
               <xsl:attribute name="sLabelClass">mrSingleText</xsl:attribute>
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
            <!--- Image control style -->
            <xsl:attribute name="style">
               <xsl:call-template name="ControlStyle" />
               <xsl:for-each select="Category[1]/Label">
                  <xsl:call-template name="BlockStyle" />
               </xsl:for-each>
            </xsl:attribute>
            <!--- Src text -->
            <xsl:attribute name="src">
               <xsl:if test="not((starts-with(Style/@Image, 'http:'))or(starts-with(Style/@Image, 'https:')))">
                  <xsl:value-of select="$sImageLocation" />
               </xsl:if>
               <xsl:value-of select="Style/@Image" />
            </xsl:attribute>
            <!--- Input value -->
            <xsl:if test="Category[1]/@Name">
               <xsl:attribute name="value">
                  <xsl:value-of select="Category[1]/@Name" />
               </xsl:attribute>
            </xsl:if>
            <!--- Alt text -->
            <xsl:attribute name="alt">
               <xsl:value-of select="Category/Label/Text" />
            </xsl:attribute>
         </xsl:element>
      </xsl:when>
      <xsl:otherwise>
         <xsl:element name="input">
            <xsl:attribute name="type">submit</xsl:attribute>
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
               <xsl:attribute name="sLabelClass">mrSingleText</xsl:attribute>
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
            <!--- Button style -->
            <xsl:attribute name="style">
               <xsl:call-template name="ControlStyle" />
               <xsl:for-each select="Category[1]/Label">
                  <xsl:call-template name="LabelStyle" />
                  <xsl:call-template name="BlockStyle" />
               </xsl:for-each>
            </xsl:attribute>
            <!--- Button Label -->
            <xsl:attribute name="value">
               <xsl:value-of select="Category/Label/Text" />
            </xsl:attribute>
            <!--- Alt text -->
            <xsl:attribute name="alt">
               <xsl:value-of select="Category/Label/Text" />
            </xsl:attribute>
         </xsl:element>
      </xsl:otherwise>
   </xsl:choose>
</xsl:template>
</xsl:stylesheet>
