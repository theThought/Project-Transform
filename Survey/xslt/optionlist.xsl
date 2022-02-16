<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="OptionList">
  <xsl:param name="qGroup"/>
  <xsl:param name="qFullName"/>
  <xsl:param name="qIsCustom"/>
  <xsl:param name="qCustomType"/>
  <xsl:param name="Orientation" select="Column"/>

    <xsl:for-each select="./Row">
        <xsl:sort select="@Y" order="ascending" data-type="number"/>
        <xsl:variable name="rowID" select="concat(./Cell/Control/Category/@CategoryID, '_')"/>
        <xsl:for-each select="./Cell">
            <xsl:sort select="@X" order="ascending" data-type="number"/>
                  Test:<xsl:value-of select="./Control[@Type='Static']" />
            <xsl:choose>
                <xsl:when test="./Cell/Control[@Type='Static']">
                    <xsl:element name="div">
                        <xsl:attribute name="class">o-option-sublist</xsl:attribute>
                        <xsl:call-template name="SpanCell"/>
                        <xsl:for-each select="./following-sibling::Row">
                            <xsl:if test="starts-with(./Cell/Control/Category/@CategoryID, $rowID)">
                              <xsl:call-template name="SpanCell">
                                 <xsl:with-param name="qGroup" select="$qGroup"/>
                                 <xsl:with-param name="qFullName" select="$qFullName"/>
                                 <xsl:with-param name="qIsCustom" select="$qIsCustom"/>
                                 <xsl:with-param name="qCustomType" select="$qCustomType"/>
                              </xsl:call-template>
                            </xsl:if>
                        </xsl:for-each>
                    </xsl:element>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="OptionListItem">
                        <xsl:with-param name="qGroup" select="$qGroup"/>
                        <xsl:with-param name="qFullName" select="$qFullName"/>
                        <xsl:with-param name="qIsCustom" select="$qIsCustom"/>
                        <xsl:with-param name="qCustomType" select="$qCustomType"/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:for-each>
    </xsl:for-each>
</xsl:template>

<xsl:template name="OptionListItem">
    <xsl:param name="qGroup"/>
    <xsl:param name="qFullName"/>
    <xsl:param name="qIsCustom"/>
    <xsl:param name="qCustomType"/>
    <xsl:param name="Orientation" select="Column"/>
    <xsl:for-each select="*">
     <xsl:choose>
        <xsl:when test="name() = 'Control'">
           <xsl:call-template name="Choice">
              <xsl:with-param name="qGroup" select="$qGroup"/>
              <xsl:with-param name="qFullName" select="$qFullName"/>
              <xsl:with-param name="qIsCustom" select="$qIsCustom"/>
              <xsl:with-param name="qCustomType" select="$qCustomType"/>
           </xsl:call-template>
        </xsl:when>
     </xsl:choose>
    </xsl:for-each>
</xsl:template>

<xsl:template name="Choice">
   <xsl:param name="qGroup" />
   <xsl:param name="qFullName" />
   <xsl:param name="qIsCustom" />
   <xsl:param name="qCustomType" />
   <xsl:choose>
     <xsl:when test="@Type='RadioButton'">
        <xsl:call-template name="RadioButtonControl">
           <xsl:with-param name="qGroup" select="$qGroup" />
           <xsl:with-param name="qFullName" select="$qFullName" />
           <xsl:with-param name="qIsCustom" select="$qIsCustom" />
           <xsl:with-param name="qCustomType" select="$qCustomType" />
        </xsl:call-template>
     </xsl:when>
     <xsl:when test="@Type='CheckButton'">
        <xsl:call-template name="CheckButtonControl">
           <xsl:with-param name="qGroup" select="$qGroup" />
           <xsl:with-param name="qFullName" select="$qFullName" />
           <xsl:with-param name="qIsCustom" select="$qIsCustom" />
           <xsl:with-param name="qCustomType" select="$qCustomType" />
        </xsl:call-template>
     </xsl:when>
   </xsl:choose>
</xsl:template>


<xsl:template match="Row"/><xsl:template match="Cell"/><xsl:template name="CellImpl"/><xsl:template name="CellSpanStyle"/><xsl:template name="SpanRow">
   <xsl:param name="qGroup"/>
   <xsl:param name="qFullName"/>
   <xsl:param name="qIsCustom"/>
   <xsl:param name="qCustomType"/>
   <xsl:param name="Orientation" select="Column"/>
   <xsl:for-each select="Row">
      <xsl:sort select="@Y" order="ascending" data-type="number"/>
      <xsl:call-template name="SpanCell">
         <xsl:with-param name="Orientation" select="$Orientation"/>
      </xsl:call-template>
   </xsl:for-each>
</xsl:template>
<xsl:template name="SpanCell">
   <xsl:param name="qGroup"/>
   <xsl:param name="qFullName"/>
   <xsl:param name="qIsCustom"/>
   <xsl:param name="qCustomType"/>
   <xsl:param name="Orientation" select="Column"/>
   <xsl:for-each select="Cell">
      <xsl:sort select="@X" order="ascending" data-type="number"/>
      <xsl:for-each select="*">
         <xsl:choose>
            <xsl:when test="name() = 'Control'">
               <xsl:call-template name="Control">
                  <xsl:with-param name="qGroup" select="$qGroup"/>
                  <xsl:with-param name="qFullName" select="$qFullName"/>
                  <xsl:with-param name="qIsCustom" select="$qIsCustom"/>
                  <xsl:with-param name="qCustomType" select="$qCustomType"/>
               </xsl:call-template>
            </xsl:when>
            <xsl:when test="name() = 'Label'">
               <xsl:apply-templates select=".">
                  <xsl:with-param name="sLabelClass" select="'mrQuestionText'"/>
                  <xsl:with-param name="bWithinTable" select="true()"/>
               </xsl:apply-templates>
            </xsl:when>
            <xsl:when test="name() = 'Error'">
               <xsl:apply-templates select=".">
                  <xsl:with-param name="sLabelClass" select="'mrErrorText'"/>
                  <xsl:with-param name="bWithinTable" select="true()"/>
               </xsl:apply-templates>
            </xsl:when>
            <xsl:when test="name() = 'Table'">
               <xsl:apply-templates select="."/>
            </xsl:when>
            <xsl:when test="name() = 'Question'">
            </xsl:when>
         </xsl:choose>
      </xsl:for-each>
   </xsl:for-each>
</xsl:template>
</xsl:stylesheet>
