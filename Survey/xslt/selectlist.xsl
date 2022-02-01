<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="ListBoxControl">
   <xsl:element name="select">
      <xsl:attribute name="size">4</xsl:attribute>
      <xsl:attribute name="multiple" />
      <!--- Input name -->
      <xsl:attribute name="name">
         <xsl:value-of select="@QuestionName" />
      </xsl:attribute>
      <!--- ID -->
      <xsl:if test="$bIncludeElementIds">
         <xsl:attribute name="id">
            <xsl:value-of select="@ElementID" />
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
         <xsl:attribute name="class">mrListBox</xsl:attribute>
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
      <!--- Set Control Style -->
      <xsl:attribute name="style">
         <xsl:call-template name="ControlStyle" />
      </xsl:attribute>
      <!--- List box categories -->
      <xsl:for-each select="Category">
         <xsl:choose>
            <xsl:when test="@CategoryList">
               <xsl:element name="optgroup">
                  <!--- Set Option Style -->
                  <xsl:for-each select="Label">
                     <xsl:attribute name="style">
                        <xsl:call-template name="LabelStyle" />
                     </xsl:attribute>
                  </xsl:for-each>
                  <!--- Set Option Class -->
                  <xsl:attribute name="class">mrMultiple</xsl:attribute>
                  <!--- Label -->
                  <xsl:attribute name="label">
                     <xsl:value-of select="Label/Text" />
                  </xsl:attribute>
               </xsl:element>
            </xsl:when>
            <xsl:otherwise>
               <xsl:element name="option">
                  <!--- Set Option Style -->
                  <xsl:for-each select="Label">
                     <xsl:attribute name="style">
                        <xsl:call-template name="LabelStyle" />
                     </xsl:attribute>
                  </xsl:for-each>
                  <!--- Set Option Class -->
                  <xsl:attribute name="class">mrMultiple</xsl:attribute>
                  <!--- Check if selected -->
                  <xsl:if test="@Checked = 'true'">
                     <xsl:attribute name="selected" />
                  </xsl:if>
                  <xsl:choose>
                     <xsl:when test="@IsHeading">
                        <!--- Option value -->
                        <xsl:attribute name="value">
                           <xsl:value-of select="''" />
                        </xsl:attribute>
                     </xsl:when>
                     <xsl:otherwise>
                        <xsl:attribute name="value">
                           <xsl:value-of select="@Name" />
                        </xsl:attribute>
                     </xsl:otherwise>
                  </xsl:choose>
                  <xsl:for-each select="Label">
                     <xsl:call-template name="LabelText" />
                  </xsl:for-each>
               </xsl:element>
            </xsl:otherwise>
         </xsl:choose>
      </xsl:for-each>
   </xsl:element>
</xsl:template>
</xsl:stylesheet>
