<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
<xsl:template name="SingleLineEditControl">
   <xsl:param name="qGroup" />
   <xsl:param name="qFullName" />
   <xsl:param name="qIsCustom" />
   <xsl:param name="qCustomType" />
   <xsl:choose>
      <xsl:when test="$qCustomType='hnumberslider'">
         <xsl:element name="div">
            <xsl:attribute name="class">o-question-hnumberslider-control</xsl:attribute>
            <xsl:element name="button">
               <xsl:attribute name="type">Button</xsl:attribute>
               <xsl:attribute name="class">
                  <xsl:text>a-button-preterminator</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questionid">
                  <xsl:value-of select="@ElementID" />
                  <xsl:text>_Preterm</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qFullName" />
               </xsl:attribute>
               <xsl:comment>hnumberslider pre terminator</xsl:comment>
            </xsl:element>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'aButtonPreTerminator'" />
               <xsl:with-param name="ElementID">
                  <xsl:value-of select="@ElementID" />
                  <xsl:text>_Preterm</xsl:text>
               </xsl:with-param>
               <xsl:with-param name="FullName" select="$qFullName" />
            </xsl:call-template>
            <xsl:element name="div">
               <xsl:attribute name="style">
                  <xsl:if test="Style/@Width != ''">
                     <xsl:text>width:</xsl:text>
                     <xsl:value-of select="Style/@Width" />
                  </xsl:if>
               </xsl:attribute>
               <xsl:attribute name="class">m-numberslider-horizontal</xsl:attribute>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>a-style-sliderborder</xsl:text>
                  </xsl:attribute>
                  <xsl:comment>hnumberslider slider border</xsl:comment>
               </xsl:element>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>m-style-slidermarks</xsl:text>
                  </xsl:attribute>
                  <xsl:comment>hnumberslider tick marks</xsl:comment>
               </xsl:element>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>a-label-thumbvalue</xsl:text>
                  </xsl:attribute>
                  <xsl:attribute name="data-questionid">
                     <xsl:value-of select="@ElementID" />
                     <xsl:text>_Val</xsl:text>
                  </xsl:attribute>
                  <xsl:attribute name="data-questiongroup">
                     <xsl:value-of select="$qFullName" />
                  </xsl:attribute>
                  <xsl:call-template name="appComponentScript">
                     <xsl:with-param name="ComponentName">
                        <xsl:text>aLabelThumbValue</xsl:text>
                     </xsl:with-param>
                     <xsl:with-param name="ElementID">
                        <xsl:value-of select="@ElementID" />
                        <xsl:text>_Thumbvalue</xsl:text>
                     </xsl:with-param>
                     <xsl:with-param name="FullName" select="$qFullName" />
                  </xsl:call-template>
                  <xsl:comment>hnumberslider thumb value</xsl:comment>
               </xsl:element>
               <xsl:call-template name="MakeInputControl">
                  <xsl:with-param name="qGroup" select="$qGroup" />
                  <xsl:with-param name="qFullName" select="$qFullName" />
                  <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                  <xsl:with-param name="qCustomType" select="$qCustomType" />
               </xsl:call-template>
               <xsl:element name="div">
                  <xsl:attribute name="data-questiongroup">
                     <xsl:value-of select="$qFullName" />
                  </xsl:attribute>
                  <xsl:attribute name="class">
                     <xsl:text>m-label-ticklabels</xsl:text>
                  </xsl:attribute>
                  <xsl:comment>hnumberslider tick labels</xsl:comment>
               </xsl:element>
            </xsl:element>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName">
                  <xsl:text>aInput</xsl:text>
                  <xsl:call-template name="CamelCaseWord">
                     <xsl:with-param name="text" select="$qCustomType" />
                  </xsl:call-template>
               </xsl:with-param>
               <xsl:with-param name="ElementID" select="@ElementID" />
               <xsl:with-param name="FullName" select="$qFullName" />
            </xsl:call-template>
            <xsl:element name="button">
               <xsl:attribute name="type">Button</xsl:attribute>
               <xsl:attribute name="class">
                  <xsl:text>a-button-postterminator</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questionid">
                  <xsl:value-of select="@ElementID" />
                  <xsl:text>_Postterm</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qFullName" />
               </xsl:attribute>
               <xsl:comment>hnumberslider post terminator</xsl:comment>
            </xsl:element>
         </xsl:element>
         <xsl:call-template name="appComponentScript">
            <xsl:with-param name="ComponentName" select="'aButtonPostTerminator'" />
            <xsl:with-param name="ElementID">
               <xsl:value-of select="@ElementID" />
               <xsl:text>_Postterm</xsl:text>
            </xsl:with-param>
            <xsl:with-param name="FullName" select="$qFullName" />
         </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
         <xsl:call-template name="MakeInputControl">
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="qFullName" select="$qFullName" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
         <xsl:call-template name="appComponentScript">
            <xsl:with-param name="ComponentName">
               <xsl:text>aInput</xsl:text>
               <xsl:call-template name="CamelCaseWord">
                  <xsl:with-param name="text" select="$qCustomType" />
               </xsl:call-template>
            </xsl:with-param>
            <xsl:with-param name="ElementID" select="@ElementID" />
            <xsl:with-param name="FullName" select="$qFullName" />
         </xsl:call-template>
      </xsl:otherwise>
   </xsl:choose>
</xsl:template>
</xsl:stylesheet>
