<?xml version="1.0" encoding="UTF-8"?>
  <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
     <xsl:output method="xml" indent="yes" />
     <xsl:param name="bIncludeCSSStyles" select="true()" />
     <xsl:param name="bIncludeElementIds" select="true()" />
     <xsl:param name="sImageLocation" />
     <xsl:param name="bShowOnly" select="false()" />
     <xsl:param name="bAutoComplete" select="false()" />

     <!-- localfolder: /xslt/ -->
     <!-- onlinefolder: https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/ -->
     <xsl:template match="Questions">
       <xsl:apply-templates select="Question" />
     </xsl:template>
     
     <xsl:template match="Question">
       <xsl:variable name="qFullName">
          <xsl:call-template name="CalculateQuestionName">
             <xsl:with-param name="QuestionName" select="//Control[1]/@QuestionName" />
          </xsl:call-template>
       </xsl:variable>

       <xsl:for-each select="*">
          <xsl:choose>
             <xsl:when test="name() = 'Control'">
                <xsl:variable name="qGroupName" select="//Control[1]/@ElementID" />
                <xsl:call-template name="Control">
                   <xsl:with-param name="qGroup" select="$qGroupName" />
                   <xsl:with-param name="qFullName" select="$qFullName" />
                </xsl:call-template>
             </xsl:when>
          </xsl:choose>
       </xsl:for-each>
     </xsl:template>

     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/functions.xsl" />
     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/control.xsl" />
     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/singlelineedit.xsl" />
     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/multilineedit.xsl" />
     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/hnumberslider.xsl" />
     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/style-css.xsl" />
<!--     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/subquestion.xsl" /> -->
     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/label.xsl" />
     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/input.xsl" />
     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/radiobutton.xsl" />
     <xsl:include href="https://media.ipsosinteractive.com/sandbox/kevin.gray/healthcare/survey/xslt/checkbutton.xsl" />
  </xsl:stylesheet>
