<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:template match="Table">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="Orientation" select="Column" />
      <xsl:choose>
         <xsl:when test="@UseTablesLayout ='-1'">
            <xsl:element name="table">
               <xsl:attribute name="class">
                  <xsl:text>o-structure-table</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="name">
                  <xsl:value-of select="@Summary" />
               </xsl:attribute>
               <xsl:for-each select="./Row">
                  <xsl:sort select="@Y" />
                  <xsl:call-template name="StructureRow">
                     <xsl:with-param name="qGroup" select="$qGroup" />
                     <xsl:with-param name="qFullName" select="$qFullName" />
                     <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                     <xsl:with-param name="qCustomType" select="$qCustomType" />
                  </xsl:call-template>
               </xsl:for-each>
            </xsl:element>
         </xsl:when>
         <xsl:otherwise>
            <xsl:for-each select="./Row">
               <xsl:variable name="rowID" select="concat(./Cell/Control/Category/@CategoryID, '_')" />
               <xsl:if test="not(contains(./Cell/Control/Category/@CategoryID, '_'))">
                  <xsl:choose>
                     <xsl:when test="./Cell/Control[@Type='Static']">
                        <xsl:element name="div">
                           <xsl:attribute name="class">o-option-sublist</xsl:attribute>
                           <xsl:call-template name="SpanCell" />
                           <xsl:for-each select="./following-sibling::Row">
                              <xsl:if test="starts-with(./Cell/Control/Category/@CategoryID, $rowID)">
                                 <xsl:call-template name="SpanCell">
                                    <xsl:with-param name="qGroup" select="$qGroup" />
                                    <xsl:with-param name="qFullName" select="$qFullName" />
                                    <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                                    <xsl:with-param name="qCustomType" select="$qCustomType" />
                                 </xsl:call-template>
                              </xsl:if>
                           </xsl:for-each>
                        </xsl:element>
                     </xsl:when>
                     <xsl:otherwise>
                        <xsl:call-template name="SpanCell">
                           <xsl:with-param name="qGroup" select="$qGroup" />
                           <xsl:with-param name="qFullName" select="$qFullName" />
                           <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                           <xsl:with-param name="qCustomType" select="$qCustomType" />
                        </xsl:call-template>
                     </xsl:otherwise>
                  </xsl:choose>
               </xsl:if>
            </xsl:for-each>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="StructureRow">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:param name="Orientation" select="Column" />
      <xsl:element name="tr">
         <xsl:attribute name="class">
            <xsl:text>m-structure-row</xsl:text>
         </xsl:attribute>
         <xsl:for-each select="./Cell">
            <xsl:sort select="@X" />
            <xsl:call-template name="StructureCell">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:for-each>
      </xsl:element>
   </xsl:template>
   <!--- StructureCell -->
   <xsl:template name="StructureCell">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:param name="Orientation" select="Column" />
      <xsl:element name="td">
         <xsl:attribute name="class">
            <xsl:text>m-structure-cell</xsl:text>
            <xsl:if test="*/Style/@BgColor != ''">
               <xsl:value-of select="' '" />
               <xsl:text>m-structure-cell-</xsl:text>
               <xsl:value-of select="*/Style/@BgColor" />
            </xsl:if>
         </xsl:attribute>
         <xsl:if test="@WeightY != ''">
            <xsl:attribute name="rowspan">
               <xsl:value-of select="@WeightY" />
            </xsl:attribute>
         </xsl:if>
         <xsl:if test="@WeightX != ''">
            <xsl:attribute name="colspan">
               <xsl:value-of select="@WeightX" />
            </xsl:attribute>
         </xsl:if>
         <xsl:if test="*/Style/@VerticalAlign != ''">
            <xsl:attribute name="valign">
               <xsl:value-of select="*/Style/@VerticalAlign" />
            </xsl:attribute>
         </xsl:if>
         <xsl:if test="*/Style/@Align != ''">
            <xsl:attribute name="align">
               <xsl:value-of select="*/Style/@Align" />
            </xsl:attribute>
         </xsl:if>
         <xsl:attribute name="style">
            <xsl:if test="*/Style/Cell/@Width != ''">
               <xsl:text>min-width:</xsl:text>
               <xsl:value-of select="*/Style/Cell/@Width" />
               <xsl:text>;</xsl:text>
               <xsl:text>max-width:</xsl:text>
               <xsl:value-of select="*/Style/Cell/@Width" />
               <xsl:text>;</xsl:text>
            </xsl:if>
         </xsl:attribute>
         <xsl:for-each select="*">
            <xsl:choose>
               <xsl:when test="name() = 'Question'">
                 <xsl:apply-templates select="." />
               </xsl:when>
               <xsl:when test="name() = 'Control'">
                 <xsl:call-template name="Control">
                   <xsl:with-param name="qGroup" select="@ElementID" />
                   <xsl:with-param name="qFullName">
                      <xsl:call-template name="CalculateQuestionName">
                         <xsl:with-param name="QuestionName" select="@QuestionName" />
                       </xsl:call-template>
                     </xsl:with-param>
                  </xsl:call-template>
               </xsl:when>
               <xsl:otherwise>
                 <xsl:apply-templates select="." />
               </xsl:otherwise>
            </xsl:choose>
          </xsl:for-each>
      </xsl:element>
   </xsl:template>
</xsl:stylesheet>
