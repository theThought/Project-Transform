<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <!-- localfolder: /xslt/ -->
   <!-- onlinefolder: https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/ -->
   <xsl:template match="Questions">
     <xsl:apply-templates select="Question" />
   </xsl:template>
   <xsl:template match="Question">
     <xsl:variable name="qFullName">
        <xsl:call-template name="CalculateQuestionName">
           <xsl:with-param name="QuestionName" select="Control[1]/@QuestionName" />
        </xsl:call-template>
     </xsl:variable>

     <xsl:variable name="qGroupName" select="Control[1]/@ElementID" />

     <xsl:variable name="qCustomType">
        <xsl:call-template name="TranslateZIndexToName">
           <xsl:with-param name="theID" select="Style/@ZIndex" />
        </xsl:call-template>
     </xsl:variable>

     <xsl:element name="div">
        <xsl:attribute name="class">
           <xsl:text>o-question-response</xsl:text>
           <xsl:value-of select="' '" />
           <xsl:text>o-question-</xsl:text>
           <xsl:value-of select="$qCustomType" />
        </xsl:attribute>

        <xsl:attribute name="data-questiongroup">
           <xsl:value-of select="$qFullName" />
        </xsl:attribute>
        <xsl:call-template name="appComponentScript">
           <xsl:with-param name="ComponentName">
              <xsl:text>oQuestion</xsl:text>
              <xsl:call-template name="CamelCaseWord">
                 <xsl:with-param name="text" select="$qCustomType" />
              </xsl:call-template>
           </xsl:with-param>
           <xsl:with-param name="ElementID" select="Control[1]/@ElementID" />
           <xsl:with-param name="FullName" select="$qFullName" />
        </xsl:call-template>

        <xsl:for-each select="*">
           <xsl:choose>
              <xsl:when test="name() = 'Control'">
                 <xsl:call-template name="Control">
                    <xsl:with-param name="qGroup" select="$qGroupName" />
                    <xsl:with-param name="qFullName" select="$qFullName" />
                 </xsl:call-template>
              </xsl:when>
              <xsl:when test="name() = 'Label'">
                 <xsl:call-template name="Label" />
              </xsl:when>
              <xsl:when test="name() = 'Error'">
                 <xsl:call-template name="Error" />
              </xsl:when>
              <xsl:when test="name() = 'Table'">
                 <xsl:call-template name="Table">
                    <xsl:with-param name="qGroup" select="$qGroupName" />
                    <xsl:with-param name="qFullName" select="$qFullName" />
                    <xsl:with-param name="qIsCustom">
                       <xsl:call-template name="TranslateZIndexToIsCustom">
                          <xsl:with-param name="theID" select="../Style/@ZIndex" />
                       </xsl:call-template>
                    </xsl:with-param>
                    <xsl:with-param name="qCustomType" select="$qCustomType" />
                    <xsl:with-param name="Orientation" select="../Style/@Orientation" />
                 </xsl:call-template>
              </xsl:when>
              <xsl:when test="name() = 'Questions'">
                 <xsl:apply-templates />
              </xsl:when>
           </xsl:choose>
        </xsl:for-each>
     </xsl:element>
   </xsl:template>
</xsl:stylesheet>
