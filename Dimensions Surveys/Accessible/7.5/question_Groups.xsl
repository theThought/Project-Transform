<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:param name="bIncludeCSSStyles" select="true()" />
   <xsl:param name="bIncludeElementIds" select="true()" />
   <xsl:param name="sImageLocation" />
   <xsl:param name="bShowOnly" select="false()" />
   <xsl:param name="bAutoComplete" select="false()" />
   <xsl:variable name="tReadOnly">
      <xsl:choose>
         <xsl:when test='Questions/Question[1]/Style/Control/@ReadOnly'>
            <xsl:value-of select='true()' />
         </xsl:when>
         <xsl:when test="$bShowOnly='true()'">
            <xsl:value-of select='true()' />
         </xsl:when>
         <xsl:otherwise>
            <xsl:value-of select='false()' />
         </xsl:otherwise>
      </xsl:choose>
   </xsl:variable>
   <!--- Basic Structure -->
   <xsl:template match="Questions">
      <xsl:for-each select="*">
         <xsl:choose>
            <xsl:when test="name()='Question'">
               <!--
                    <xsl:element name="div">
                    <xsl:attribute name="data-position">
                    <xsl:choose>
                    <xsl:when test="Style/@ElementAlign='NewLine'">
                    <xsl:text>below</xsl:text>
                    </xsl:when>
                    <xsl:when test="Style/@ElementAlign='Right'">
                    <xsl:text>side</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                    <xsl:text>below</xsl:text>
                    </xsl:otherwise>
                    </xsl:choose>
                    </xsl:attribute>
               -->
               <xsl:call-template name="Question" />
               <!-- 
                    </xsl:element>
               -->
            </xsl:when>
            <xsl:otherwise>
               <Other>
                  <xsl:value-of select="name()" />
               </Other>
            </xsl:otherwise>
         </xsl:choose>
      </xsl:for-each>
   </xsl:template>
   
   <xsl:template name="Question">
      <xsl:param name="bWithinTable" select="false()" />
      <xsl:param name="SubQuestion" select="false()" />
      <xsl:param name="Parent" /> 
      <xsl:param name="SubElement" />
      
      <xsl:variable name="qElementID">
         <xsl:choose>
            <xsl:when test="not($SubQuestion)">
               <xsl:call-template name="CalculateQuestionName">
                  <xsl:with-param name="QuestionName" select=".//Control[1]/@ElementID" />
               </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
               <xsl:value-of select="$SubElement" />
            </xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      <xsl:variable name="qLocal_Name" select=".//Control[1]/@QuestionName" />
      <xsl:variable name="qGroup_Name">
         <xsl:choose>
            <xsl:when test="$Parent">
               <xsl:value-of select="$Parent" />
            </xsl:when>
            <xsl:otherwise>
               <xsl:call-template name="CalculateQuestionName">
                  <xsl:with-param name="QuestionName" select="$qLocal_Name" />
               </xsl:call-template>
            </xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      <xsl:choose>
         <xsl:when test="$SubQuestion = false()">
            <xsl:variable name="qCustomType">
               <xsl:call-template name="TranslateZIndexToName">
                  <xsl:with-param name="theID" select="Style/@ZIndex" />
               </xsl:call-template>
            </xsl:variable>
            
            <xsl:if test="$qLocal_Name!=''">
               <xsl:choose>
                  <xsl:when test="Table/@UseTablesLayout = '-1'">
                     <xsl:call-template name="InsertQuestionDiv">
                        <xsl:with-param name="qElementID" select="Table/@TableId" />
                        <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                        <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     </xsl:call-template>
                  </xsl:when>
                  <xsl:otherwise>
                     <xsl:call-template name="InsertQuestionDiv">
                        <xsl:with-param name="qElementID" select="$qElementID" />
                        <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                        <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     </xsl:call-template>
                  </xsl:otherwise>
               </xsl:choose>
            </xsl:if>
         </xsl:when>
         <xsl:otherwise>
            <xsl:text>Here</xsl:text>
            <xsl:for-each select="*">
               <xsl:choose>
                  <xsl:when test="name() = 'Error'">
                     <xsl:call-template name="Error">
                        <xsl:with-param name="SubQuestion" select="true()" />
                        <xsl:with-param name="qElementID" select="$qElementID" />
                     </xsl:call-template>
                  </xsl:when>
                  <xsl:when test="name() = 'Label'">
                     <xsl:apply-templates select=".">
                        <xsl:with-param name="sLabelClass" select="'mrQuestionText'" />
                     </xsl:apply-templates>
                  </xsl:when>
                  <xsl:when test="name() = 'Control'">
                     <xsl:call-template name="Control">
                        <xsl:with-param name="qElementID" select="$qElementID" />
                        <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                        <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     </xsl:call-template>
                  </xsl:when>
                  <xsl:when test="name() = 'Question'">
                     <xsl:comment>Question</xsl:comment>
                  </xsl:when>
                  <xsl:when test="name() = 'Style'">
                     <xsl:comment>Style</xsl:comment>
                  </xsl:when>
                  <xsl:otherwise>
                     <xsl:text>toplevel: </xsl:text>
                     <xsl:value-of select="name()" />
                  </xsl:otherwise>
               </xsl:choose>
            </xsl:for-each>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="CellQuestion">
      <xsl:variable name="qElementID">
         <xsl:call-template name="CalculateQuestionName">
            <xsl:with-param name="QuestionName" select=".//Control[1]/@ElementID" />
         </xsl:call-template>
      </xsl:variable>
      <xsl:variable name="qLocal_Name">
         <xsl:call-template name="CalculateQuestionName">
            <xsl:with-param name="QuestionName" select=".//Control[1]/@QuestionName" />
         </xsl:call-template>
      </xsl:variable>
      <xsl:variable name="qGroup_Name">
         <xsl:value-of select="$qLocal_Name" />
      </xsl:variable>
      
      <xsl:for-each select="*">
         <xsl:choose>
            <xsl:when test="name() = 'Questions'">
               <xsl:for-each select="Question">
                  <xsl:call-template name="CellQuestion">
                     <xsl:with-param name="qElementID" select="$qElementID" />
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                  </xsl:call-template>
               </xsl:for-each>
            </xsl:when>
            <xsl:when test="name() = 'Question'">
               <xsl:text>Question: </xsl:text>
            </xsl:when>
            <xsl:when test="name() = 'Table'">
               <xsl:text>TABLE !!!! </xsl:text>
               <xsl:call-template name="InsertQuestionDiv">
                  <xsl:with-param name="qElementID" select="$qElementID" />
                  <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                  <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               </xsl:call-template>
            </xsl:when>
            <xsl:when test="name() = 'Control'">
               <xsl:variable name="qCustomType">
                  <xsl:call-template name="TranslateZIndexToName">
                     <xsl:with-param name="theID" select="Style/@ZIndex" />
                  </xsl:call-template>
               </xsl:variable>
               <xsl:if test="$qGroup_Name!=''">
                  <xsl:call-template name="InsertQuestionDiv">
                     <xsl:with-param name="qElementID" select="$qElementID" />
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                  </xsl:call-template>
               </xsl:if>
            </xsl:when>
            <xsl:when test="name() = 'Error'">
               
            </xsl:when>
         </xsl:choose>
      </xsl:for-each>
   </xsl:template>
   <xsl:template name="InsertQuestionDiv">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      
      <xsl:element name="div">
         <xsl:attribute name="class">
            <xsl:text>o-question-response</xsl:text>
            <xsl:value-of select="' '" />
            <xsl:text>o-question-</xsl:text>
            <xsl:choose>
               <xsl:when test="Style/@ZIndex">
                  <xsl:call-template name="TranslateZIndexToName">
                     <xsl:with-param name="theID" select="Style/@ZIndex" />
                  </xsl:call-template>
               </xsl:when>
               <xsl:when test="Table">
                  <xsl:text>table</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <xsl:if test="Style/@Hidden">
            <xsl:attribute name="data-hidden">
               <xsl:text>true</xsl:text>
            </xsl:attribute>
         </xsl:if>
         <xsl:attribute name="data-readonly">
            <xsl:value-of select='$tReadOnly' />
         </xsl:attribute>
         <xsl:attribute name="data-position">
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text>below</xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text>side</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <!-- 
              <xsl:call-template name="appComponentScript">
              <xsl:with-param name="ComponentName">
              <xsl:text>oQuestion</xsl:text>
              <xsl:call-template name="CamelCaseWord">
              <xsl:with-param name="text">
              <xsl:call-template name="TranslateZIndexToName">
              <xsl:with-param name="theID" select="Style/@ZIndex" />
              </xsl:call-template>
              </xsl:with-param>
              </xsl:call-template>
              </xsl:with-param>
              <xsl:with-param name="qElementID" select="$qElementID" />
              <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
              <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
              </xsl:call-template>
         -->
         <xsl:call-template name='TypePicker'>
            <xsl:with-param name="qElementID" select="$qElementID" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
         </xsl:call-template>
         
      </xsl:element>
   </xsl:template>
   <!--- Type Picker -->
   <xsl:template name='TypePicker'>
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:variable name="inQuestion">
         <xsl:choose>
            <xsl:when test="name()='Question'">
               <xsl:text>Question</xsl:text>
            </xsl:when>
            <xsl:when test="name()='Control'">
               <xsl:text>Control</xsl:text>
            </xsl:when>
         </xsl:choose>
      </xsl:variable>
      
      <xsl:choose>
         <xsl:when test="$inQuestion='Question'">
            <xsl:for-each select="*">
               <xsl:choose>
                  <xsl:when test="name()='Control'">
                     <xsl:variable name="cElementID" select="@ElementID" />
                     <xsl:variable name="cLocal_Name" select="@QuestionName" />
                     <xsl:call-template name="TypePickerChoose">
                        <xsl:with-param name="qElementID" select="$cElementID" />
                        <xsl:with-param name="qLocal_Name" select="$cLocal_Name" />
                        <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     </xsl:call-template>
                  </xsl:when>
                  <xsl:when test="name()='Table'">
                     <xsl:call-template name="TypePickerChoose">
                        <xsl:with-param name="qElementID" select="$qElementID" />
                        <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                        <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     </xsl:call-template>
                  </xsl:when>
               </xsl:choose>
            </xsl:for-each>
         </xsl:when>
         <xsl:when test="$inQuestion='Control'">
            <xsl:for-each select=".">
               <xsl:choose>
                  <xsl:when test="@ElementID">
                     <xsl:variable name="cElementID" select="@ElementID" />
                     <xsl:variable name="cLocal_Name" select="@QuestionName" />
                     
                     <xsl:call-template name="TypePickerChoose">
                        <xsl:with-param name="qElementID" select="$cElementID" />
                        <xsl:with-param name="qLocal_Name" select="$cLocal_Name" />
                        <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     </xsl:call-template>
                  </xsl:when>
                  <xsl:otherwise>
                     <xsl:call-template name="TypePickerChoose">
                        <xsl:with-param name="qElementID" select="$qElementID" />
                        <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                        <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     </xsl:call-template>
                  </xsl:otherwise>
               </xsl:choose>
            </xsl:for-each>
         </xsl:when>
      </xsl:choose>
   </xsl:template>
   <xsl:template name='TypePickerChoose'>
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      
      <xsl:choose>
         <xsl:when test="name() = 'Control'">
            <xsl:call-template name="Control">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="name() = 'Label'">
            <xsl:apply-templates select=".">
               <xsl:with-param name="sLabelClass" select="'mrQuestionText'" />
            </xsl:apply-templates>
         </xsl:when>
         <xsl:when test="name() = 'Error'">
            <xsl:call-template name="Error">
               <xsl:with-param name="SubQuestion" select="false()" />
               <xsl:with-param name="qElementID" select="$qElementID" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="name() = 'Table'">
            <xsl:apply-templates select=".">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom">
                  <xsl:call-template name="TranslateZIndexToIsCustom">
                     <xsl:with-param name="theID" select="../Style/@ZIndex" />
                  </xsl:call-template>
               </xsl:with-param>
               <xsl:with-param name="qCustomType">
                  <xsl:call-template name="TranslateZIndexToName">
                     <xsl:with-param name="theID" select="../Style/@ZIndex" />
                  </xsl:call-template>
               </xsl:with-param>
            </xsl:apply-templates>
         </xsl:when>
         <xsl:when test="name() = 'Questions'">
            <xsl:apply-templates />
         </xsl:when>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="Control">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom">
         <xsl:call-template name="TranslateZIndexToIsCustom">
            <xsl:with-param name="theID" select="Style/@ZIndex" />
         </xsl:call-template>
      </xsl:param>
      <xsl:param name="qCustomType">
         <xsl:call-template name="TranslateZIndexToName">
            <xsl:with-param name="theID" select="Style/@ZIndex" />
         </xsl:call-template>
      </xsl:param>
      <xsl:choose>
         <xsl:when test="$qCustomType='scale-horizontal' or $qCustomType='scale-vertical' ">
            <xsl:call-template name="ScaleControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="$qCustomType='openend-search'">
            <xsl:call-template name="OpenendSearchControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="$qCustomType='openend-search-scan'">
            <xsl:call-template name="OpenendSearchScanControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>         
         <xsl:when test="$qCustomType='slider-date'">
            <xsl:call-template name="SliderDateControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="$qCustomType='choice-summary'">
            <xsl:call-template name="ChoiceSummaryControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="$qCustomType='datetime-recent'">
            <xsl:call-template name="DateTimeRecentSlider">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="$qCustomType='media-external'">
            <xsl:call-template name="MediaExternalControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'Static'">
            <xsl:call-template name="StaticControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'Edit'">
            <xsl:call-template name="EditControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'SingleLineEdit'">
            <xsl:call-template name="SingleLineEditControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'decimal'">
            <xsl:call-template name="SingleLineEditControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'ReadWriteEdit'">
            <xsl:call-template name="SingleLineEditControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'MultiLineEdit'">
            <xsl:call-template name="MultiLineEditControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'DropList'">
            <xsl:call-template name="DropdownControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'ComboList'">
            <xsl:call-template name="ComboListControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'RadioButton'">
            <xsl:call-template name="RadioButtonControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'CheckButton'">
            <xsl:call-template name="CheckButtonControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'Button'">
            <xsl:call-template name="ButtonControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'Date'">
            <xsl:call-template name="DateControl" />
         </xsl:when>
         <xsl:when test="@Type = 'Time'">
            <xsl:call-template name="TimeControl" />
         </xsl:when>
         <xsl:when test="@Type = 'DateTime'">
            <xsl:call-template name="DateTimeControl" />
         </xsl:when>
         <xsl:when test="@Type = 'Password'">
            <xsl:call-template name="PasswordControl" />
         </xsl:when>
         <xsl:otherwise>
            <xsl:call-template name="StaticControl" />
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <!--- Labels -->
   <xsl:template match="Label">
      <xsl:param name="sLabelClass" select="'UNKNOWN'" />
      <xsl:param name="bWithinTable" select="false()" />
      <xsl:call-template name="LabelBase">
         <xsl:with-param name="sLabelClass" select="sLabelClass" />
         <xsl:with-param name="bWithinTable" select="bWithinTable" />
      </xsl:call-template>
   </xsl:template>
   <xsl:template name="LabelBase">
      <xsl:param name="sLabelClass" />
      <xsl:param name="bWithinTable" />
      <xsl:call-template name="Label" />
   </xsl:template>
   <xsl:template name="Label">
      <xsl:param name="labelType" />
      <xsl:variable name="labelsubclass">
         <xsl:choose>
            <xsl:when test="name(..)='Category'">
               <xsl:text>option</xsl:text>
            </xsl:when>
            <xsl:otherwise>
               <xsl:choose>
                  <xsl:when test="name(../../Control[1])='Control'">
                     <xsl:text>option</xsl:text>
                  </xsl:when>
                  <xsl:otherwise>
                     <xsl:text>question</xsl:text>
                  </xsl:otherwise>
               </xsl:choose>
            </xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      <xsl:element name="span">
         <xsl:attribute name="class">
            <xsl:text>a-label-</xsl:text>
            <xsl:value-of select="$labelsubclass" />
         </xsl:attribute>
         <xsl:call-template name="LabelText" />
      </xsl:element>
   </xsl:template>
   
   <xsl:template name="LabelText">
      <xsl:choose>
         <xsl:when test="Text/@WellFormed = 'false'">
            <xsl:value-of select="Text" />
         </xsl:when>
         <xsl:otherwise>
            <xsl:value-of disable-output-escaping="yes" select="Text" />
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   
   <xsl:template name="label-summary">
      <xsl:element name="div">
         <xsl:attribute name="class">a-label-option-summary</xsl:attribute>
         <xsl:call-template name="LabelText" />
      </xsl:element>
   </xsl:template>
   
   <!--- TABLE -->
   <xsl:template match="Table">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:variable name="Orientation">
         <xsl:value-of select="../Style/@Orientation" />
      </xsl:variable>
      <xsl:choose>
         <xsl:when test="@UseTablesLayout ='-1'">
            <xsl:element name="table">
               <xsl:if test="$Orientation!=''">
                  <xsl:attribute name="data-orientation">
                     <xsl:value-of select="$Orientation" />
                  </xsl:attribute>
               </xsl:if>
               <xsl:attribute name="class">
                  <xsl:text>o-structure-table</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="name">
                  <xsl:value-of select="@Summary" />
               </xsl:attribute>
               <xsl:call-template name="appComponentScript">
                  <xsl:with-param name="ComponentName" select="'oQuestionGrid'" />
                  <xsl:with-param name="qElementID" select="$qElementID" />
                  <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                  <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               </xsl:call-template>
               <xsl:for-each select="./Row">
                  <xsl:sort select="@Y" data-type="number" order="ascending"/>
                  <xsl:call-template name="StructureRow">
                     <xsl:with-param name="qElementID" select="$qElementID" />
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                     <xsl:with-param name="qCustomType" select="$qCustomType" />
                     <xsl:with-param name="Orientation" select="$Orientation" />
                  </xsl:call-template>
               </xsl:for-each>
            </xsl:element>
         </xsl:when>
         <xsl:otherwise>
            <xsl:comment>this is a set of options</xsl:comment>
            <xsl:element name="fieldset">
               <xsl:attribute name="aria-labelledby">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_label_question</xsl:text>
               </xsl:attribute>
               <xsl:for-each select="./Row">
                  <xsl:variable name="rowID" select="concat(./Cell/Control/Category/@CategoryID, '_')" />
                  <xsl:if test="not(contains(./Cell/Control/Category/@CategoryID, '_'))">
                     <xsl:choose>
                        <xsl:when test="./Cell/Control[@Type='Static']">
                           <xsl:element name="fieldset">
                              <xsl:attribute name="class">o-option-sublist</xsl:attribute>
                              <xsl:attribute name="aria-describedby">
                                 <xsl:value-of select="$qElementID" />
                                 <xsl:text>_label_question</xsl:text>
                              </xsl:attribute>
                              <xsl:call-template name="SpanCell">
                                 <xsl:with-param name="qElementID" select="$qElementID" />
                                 <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                                 <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                                 <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                                 <xsl:with-param name="qCustomType" select="$qCustomType" />
                              </xsl:call-template>
                              <xsl:for-each select="./following-sibling::Row">
                                 <xsl:if test="starts-with(./Cell/Control/Category/@CategoryID, $rowID)">
                                    <xsl:variable name="cElementID" select=".//Control[1]/@ElementID" />
                                    <xsl:variable name="cLocal_Name" select=".//Control[1]/@QuestionName" />
                                    
                                    <xsl:call-template name="SpanCell">
                                       <xsl:with-param name="qElementID" select="$cElementID" />
                                       <xsl:with-param name="qLocal_Name" select="$cLocal_Name" />
                                       <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                                       <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                                       <xsl:with-param name="qCustomType" select="$qCustomType" />
                                    </xsl:call-template>
                                 </xsl:if>
                              </xsl:for-each>
                           </xsl:element>
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:variable name="cElementID" select=".//Control[1]/@ElementID" />
                           <xsl:variable name="cLocal_Name" select=".//Control[1]/@QuestionName" />
                           
                           <xsl:call-template name="SpanCell">
                              <xsl:with-param name="qElementID" select="$cElementID" />
                              <xsl:with-param name="qLocal_Name" select="$cLocal_Name" />
                              <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                              <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                              <xsl:with-param name="qCustomType" select="$qCustomType" />
                           </xsl:call-template>
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:if>
               </xsl:for-each>
            </xsl:element>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template match="Row" />
   <xsl:template match="Cell" />
   <xsl:template name="CellImpl" />
   <xsl:template name="CellSpanStyle" />
   <!-- SPAN LAYOUT -->
   <xsl:template name="SpanRow">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:param name="Orientation" select="Column" />
      <xsl:for-each select="Row">
         <xsl:sort select="@Y" order="ascending" data-type="number" />
         <xsl:call-template name="SpanCell">
            <xsl:with-param name="qElementID" select="$qElementID" />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
            <xsl:with-param name="Orientation" select="$Orientation" />
         </xsl:call-template>
      </xsl:for-each>
   </xsl:template>
   <xsl:template name="SpanCell">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:param name="Orientation" select="Column" />
      <xsl:for-each select="Cell">
         <xsl:sort select="@X" order="ascending" data-type="number" />
         <xsl:for-each select="*">
            <xsl:choose>
               <xsl:when test="name() = 'Control'">
                  <xsl:call-template name="Control">
                     <xsl:with-param name="qElementID" select="$qElementID" />
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                     <xsl:with-param name="qCustomType" select="$qCustomType" />
                  </xsl:call-template>
               </xsl:when>
               <xsl:when test="name() = 'Label'">
                  <xsl:text>LABEL</xsl:text>
                  <xsl:apply-templates select=".">
                     <xsl:with-param name="sLabelClass" select="'mrQuestionText'" />
                     <xsl:with-param name="bWithinTable" select="true()" />
                  </xsl:apply-templates>
               </xsl:when>
               <xsl:when test="name() = 'Error'">
                  <xsl:call-template name="Error">
                     <xsl:with-param name="SubQuestion" select="false()" />
                     <xsl:with-param name="qElementID" select="$qElementID" />
                  </xsl:call-template>
               </xsl:when>
               <xsl:when test="name() = 'Question'">
               </xsl:when>
            </xsl:choose>
         </xsl:for-each>
      </xsl:for-each>
   </xsl:template>
   <!--- CONTROL -->
   <xsl:template name="Error">
      <xsl:param name="SubQuestion" select="false()" />
      <xsl:param name="qElementID" />
      <xsl:choose>
         <xsl:when test="name() = 'Error'">
            <xsl:choose>
               <xsl:when test="$SubQuestion=false()">
                  <xsl:element name="div">
                     <xsl:attribute name="class">a-label-error</xsl:attribute>
                     <xsl:attribute name="data-questionid">
                        <xsl:value-of select="$qElementID" />
                     </xsl:attribute>
                     <xsl:for-each select="Text">
                        <xsl:value-of select="." />
                     </xsl:for-each>
                  </xsl:element>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:element name="span">
                     <xsl:attribute name="class">a-label-error</xsl:attribute>
                     <xsl:attribute name="data-questionid">
                        <xsl:value-of select="$qElementID" />
                     </xsl:attribute>
                     <xsl:for-each select="Text">
                        <xsl:value-of select="." />
                     </xsl:for-each>
                  </xsl:element>
               </xsl:otherwise>
            </xsl:choose>
         </xsl:when>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="StaticControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:element name="legend">
         <xsl:attribute name="class">a-label-heading-sublist</xsl:attribute>
         <xsl:attribute name="style">
            <xsl:if test="Style/@Width or Style/@Height">
               <xsl:call-template name="SpanStyle" />
            </xsl:if>
            <xsl:call-template name="ControlStyle" />
         </xsl:attribute>
         <xsl:for-each select="Category">
            <xsl:apply-templates select="Label">
               <xsl:with-param name="sLabelClass" select="'a-label-heading-sublist'" />
            </xsl:apply-templates>
         </xsl:for-each>
      </xsl:element>
   </xsl:template>
   <xsl:template name="EditControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <!--- Need to decide whether to use a text area of a edit control -->
      <xsl:choose>
         <xsl:when test="$qCustomType='multilineedit'">
            <xsl:call-template name="MultiLineEditControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:otherwise>
            <xsl:call-template name="SingleLineEditControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="SingleLineEditControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:choose>
         <xsl:when test="$qCustomType='slider-horizontal' or $qCustomType='slider-vertical'">
            <xsl:element name="div">
               <xsl:if test="$qCustomType='slider-vertical'">
                  <xsl:attribute name="class">o-slider-rotate</xsl:attribute>
               </xsl:if>
               <xsl:comment> --- rotation div --- </xsl:comment>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>o-question-</xsl:text>
                     <xsl:value-of select="$qCustomType" />
                     <xsl:text>-control</xsl:text>
                  </xsl:attribute>
                  <xsl:element name="button">
                     <xsl:attribute name="type">Button</xsl:attribute>
                     <xsl:attribute name="class">
                        <xsl:text>a-button-preterminator</xsl:text>
                     </xsl:attribute>
                     <xsl:attribute name="data-questionid">
                        <xsl:value-of select="$qElementID" />
                        <xsl:text>_Preterm</xsl:text>
                     </xsl:attribute>
                     <xsl:attribute name="data-questiongroup">
                        <xsl:value-of select="$qGroup_Name" />
                     </xsl:attribute>
                     <xsl:comment>
                        <xsl:value-of select="$qCustomType" />
                        <xsl:text>pre terminator</xsl:text>
                     </xsl:comment>
                  </xsl:element>
                  <xsl:call-template name="appComponentScript">
                     <xsl:with-param name="ComponentName" select="'aButtonPreTerminator'" />
                     <xsl:with-param name="qElementID">
                        <xsl:value-of select="$qElementID" />
                        <xsl:text>_Preterm</xsl:text>
                     </xsl:with-param>
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                  </xsl:call-template>
                  <xsl:element name="div">
                     <xsl:attribute name="style">
                        <xsl:if test="Style/@Width != ''">
                           <xsl:text>width:</xsl:text>
                           <xsl:value-of select="Style/@Width" />
                        </xsl:if>
                     </xsl:attribute>
                     <xsl:choose>
                        <xsl:when test="$qCustomType='slider-horizontal'">
                           <xsl:attribute name="class">m-slider-horizontal</xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:attribute name="class">m-slider-vertical</xsl:attribute>
                        </xsl:otherwise>
                     </xsl:choose>
                     <xsl:element name="div">
                        <xsl:attribute name="class">
                           <xsl:text>a-style-sliderborder</xsl:text>
                        </xsl:attribute>
                        <xsl:comment>
                           <xsl:value-of select="$qCustomType" />
                           <xsl:text> slider border</xsl:text>
                        </xsl:comment>
                     </xsl:element>
                     <xsl:element name="div">
                        <xsl:attribute name="class">
                           <xsl:text>m-style-slidermarks</xsl:text>
                        </xsl:attribute>
                        <xsl:comment>
                           <xsl:value-of select="$qCustomType" />
                           <xsl:text> tick marks</xsl:text>
                        </xsl:comment>
                     </xsl:element>
                     <xsl:element name="div">
                        <xsl:attribute name="class">
                           <xsl:text>m-slider-thumb</xsl:text>
                           <xsl:choose>
                              <xsl:when test="$qCustomType='slider-horizontal'">
                                 <xsl:text>-horizontal</xsl:text>
                              </xsl:when>
                              <xsl:otherwise>
                                 <xsl:text>-vertical</xsl:text>
                              </xsl:otherwise>
                           </xsl:choose>
                        </xsl:attribute>
                        <xsl:element name="div">
                           <xsl:attribute name="class">
                              <xsl:text>a-label-thumbvalue</xsl:text>
                           </xsl:attribute>
                           <xsl:attribute name="data-questionid">
                              <xsl:value-of select="$qElementID" />
                              <xsl:text>_Val</xsl:text>
                           </xsl:attribute>
                           <xsl:attribute name="data-questiongroup">
                              <xsl:value-of select="$qGroup_Name" />
                           </xsl:attribute>
                           <xsl:call-template name="appComponentScript">
                              <xsl:with-param name="ComponentName">
                                 <xsl:text>aLabelThumbValue</xsl:text>
                              </xsl:with-param>
                              <xsl:with-param name="qElementID">
                                 <xsl:value-of select="$qElementID" />
                                 <xsl:text>_Thumbvalue</xsl:text>
                              </xsl:with-param>
                              <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                              <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                           </xsl:call-template>
                           <xsl:comment>
                              <xsl:value-of select="$qCustomType" />
                              <xsl:text> thumb value</xsl:text>
                           </xsl:comment>
                        </xsl:element>
                     </xsl:element>
                     
                     <xsl:call-template name="MakeInputControl">
                        <xsl:with-param name="qElementID" select="$qElementID" />
                        <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                        <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                        <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                        <xsl:with-param name="qCustomType" select="$qCustomType" />
                     </xsl:call-template>
                     <xsl:element name="div">
                        <xsl:attribute name="data-questiongroup">
                           <xsl:value-of select="$qGroup_Name" />
                        </xsl:attribute>
                        <xsl:attribute name="class">
                           <xsl:text>m-label-ticklabels</xsl:text>
                        </xsl:attribute>
                        <xsl:comment>
                           <xsl:value-of select="$qCustomType" />
                           <xsl:text> tick labels</xsl:text>
                        </xsl:comment>
                     </xsl:element>
                  </xsl:element>
                  <xsl:call-template name="appComponentScript">
                     <xsl:with-param name="ComponentName">
                        <xsl:text>aInput</xsl:text>
                        <xsl:call-template name="CamelCaseWord">
                           <xsl:with-param name="text" select="$qCustomType" />
                        </xsl:call-template>
                     </xsl:with-param>
                     <xsl:with-param name="qElementID" select="$qElementID" />
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                  </xsl:call-template>
                  <xsl:element name="button">
                     <xsl:attribute name="type">Button</xsl:attribute>
                     <xsl:attribute name="class">
                        <xsl:text>a-button-postterminator</xsl:text>
                     </xsl:attribute>
                     <xsl:attribute name="data-questionid">
                        <xsl:value-of select="$qElementID" />
                        <xsl:text>_Postterm</xsl:text>
                     </xsl:attribute>
                     <xsl:attribute name="data-questiongroup">
                        <xsl:value-of select="$qGroup_Name" />
                     </xsl:attribute>
                     <xsl:comment>
                        <xsl:value-of select="$qCustomType" />
                        <xsl:text> post terminator</xsl:text>
                     </xsl:comment>
                  </xsl:element>
                  <xsl:call-template name="appComponentScript">
                     <xsl:with-param name="ComponentName" select="'aButtonPostTerminator'" />
                     <xsl:with-param name="qElementID">
                        <xsl:value-of select="$qElementID" />
                        <xsl:text>_Postterm</xsl:text>
                     </xsl:with-param>
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                  </xsl:call-template>
               </xsl:element>
            </xsl:element>
         </xsl:when>
         <xsl:otherwise>
            <xsl:call-template name="MakeInputControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
            <!--
                 <xsl:call-template name="appComponentScript">
                 <xsl:with-param name="ComponentName">
                 <xsl:text>aInput</xsl:text>
                 <xsl:call-template name="CamelCaseWord">
                 <xsl:with-param name="text" select="$qCustomType" />
                 </xsl:call-template>
                 </xsl:with-param>
                 <xsl:with-param name="qElementID" select="$qElementID" />
                 <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                 <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                 </xsl:call-template>
            -->
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="MultiLineEditControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <!--- Control Label -->
      <xsl:if test="Category[1]/Label">
         <xsl:choose>
            <xsl:when test="$bIncludeElementIds">
               <xsl:element name="label">
                  <xsl:attribute name="for">
                     <xsl:value-of select="$qElementID" />
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
            <xsl:value-of select="$qElementID" />
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <!--- Input name -->
         <xsl:attribute name="name">
            <xsl:value-of select="$qLocal_Name" />
            <xsl:if test="Category[1]/@Name">
               <xsl:value-of select="Category[1]/@Name" />
            </xsl:if>
         </xsl:attribute>
         <!--- ID -->
         <xsl:if test="$bIncludeElementIds">
            <xsl:attribute name="id">
               <xsl:value-of select="$qElementID" />
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
         <xsl:if test="$bShowOnly != false() or $tReadOnly != 'false'">
            <xsl:attribute name="data-readonly">
               <xsl:text>true</xsl:text>
            </xsl:attribute>
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
         <xsl:with-param name="qElementID" select="$qElementID" />
         <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
         <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
      </xsl:call-template>
   </xsl:template>
   <xsl:template name="DropdownControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:variable name="lElementID">
         <xsl:call-template name="CalculateQuestionName">
            <xsl:with-param name="QuestionName" select="$qElementID" />
         </xsl:call-template>
      </xsl:variable>
      <xsl:element name="div">
         <xsl:attribute name="class">
            <xsl:text>o-dropdown</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="$lElementID" />
         </xsl:attribute>
         <xsl:call-template name="appComponentScript">
            <xsl:with-param name="ComponentName" select="'oDropdown'" />
            <xsl:with-param name="qElementID" select='$lElementID' />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
         </xsl:call-template>
         <xsl:call-template name="MakeInputControl">
            <xsl:with-param name="qElementID" select="$lElementID" />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
         
         <xsl:element name="ul">
            <xsl:attribute name="class">m-list</xsl:attribute>
            <xsl:attribute name="id">
               <xsl:value-of select="$lElementID" />
               <xsl:text>_list</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="data-questiongroup">
               <xsl:value-of select="$qGroup_Name" />
            </xsl:attribute>
            <xsl:if test="Style/@Width">
               <xsl:attribute name="style">
                  <xsl:text>width:</xsl:text>
                  <xsl:value-of select="Style/@Width" />
                  <xsl:text>;</xsl:text>
               </xsl:attribute>
            </xsl:if>
            <!-- Previously commented out until mlist is supported in droplist -->
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'mList'" />
               <xsl:with-param name="qElementID">
                  <xsl:value-of select='$lElementID' />
                  <xsl:text>_list</xsl:text>
               </xsl:with-param>
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
            <xsl:for-each select="Category">
               <xsl:element name="li">
                  <xsl:attribute name="class">a-option-list</xsl:attribute>
                  <xsl:attribute name="data-questionid">
                     <xsl:value-of select="$qElementID" />
                     <xsl:value-of select="@CategoryID" />
                  </xsl:attribute>
                  <xsl:attribute name="data-questiongroup">
                     <xsl:value-of select="$qGroup_Name" />
                  </xsl:attribute>
                  <xsl:if test="$bShowOnly != false() or ../Style/Control/@ReadOnly != 'false'">
                     <xsl:attribute name="data-readonly">
                        <xsl:text>true</xsl:text>
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:attribute name="data-value">
                     <xsl:value-of select="@Name" />
                  </xsl:attribute>
                  <xsl:if test="@Alt != ''">
                     <xsl:attribute name="Alt">
                        <xsl:value-of select="@Alt" />
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:if test="$bIncludeElementIds">
                     <xsl:attribute name="id">
                        <xsl:value-of select="$qElementID" />
                        <xsl:value-of select="@CategoryID" />
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:if test="@Checked = 'true'">
                     <xsl:attribute name="data-selected">
                        <xsl:text>true</xsl:text>
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:value-of select="Label/Text" />
               </xsl:element>
            </xsl:for-each>
         </xsl:element>
      </xsl:element>
   </xsl:template>
   <xsl:template name="ComboListControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:variable name="lElementID">
         <xsl:call-template name="CalculateQuestionName">
            <xsl:with-param name="QuestionName" select="$qElementID" />
         </xsl:call-template>
      </xsl:variable>
      <xsl:element name="div">
         <xsl:attribute name="class">
            <xsl:text>o-combobox</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="$lElementID" />
         </xsl:attribute>
         <xsl:call-template name="appComponentScript">
            <xsl:with-param name="ComponentName" select="'oCombobox'" />
            <xsl:with-param name="qElementID" select="$lElementID" />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
         </xsl:call-template>
         <xsl:call-template name="MakeInputControl">
            <xsl:with-param name="qElementID" select="$lElementID" />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
         <xsl:element name='div'>
            <xsl:attribute name="class">o-list-selected</xsl:attribute>
            <xsl:attribute name="data-questiongroup">
               <xsl:value-of select="$qGroup_Name" />
            </xsl:attribute>
            <xsl:comment> --- selected tags --- </xsl:comment>
         </xsl:element>
         <xsl:element name="ul">
            <xsl:attribute name="class">m-list</xsl:attribute>
            <xsl:attribute name="id">
               <xsl:value-of select="$lElementID" />
               <xsl:text>_list</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="data-questiongroup">
               <xsl:value-of select="$qGroup_Name" />
            </xsl:attribute>
            <xsl:if test="Style/@Width">
               <xsl:attribute name="style">
                  <xsl:text>width:</xsl:text>
                  <xsl:value-of select="Style/@Width" />
                  <xsl:text>;</xsl:text>
               </xsl:attribute>
            </xsl:if>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'mList'" />
               <xsl:with-param name="qElementID">
                  <xsl:value-of select='$lElementID' />
                  <xsl:text>_list</xsl:text>
               </xsl:with-param>
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
            <xsl:for-each select="Category">
               <xsl:element name="li">
                  <xsl:attribute name="class">a-option-list</xsl:attribute>
                  <xsl:attribute name="data-questionid">
                     <xsl:value-of select="$qElementID" />
                     <xsl:value-of select="@CategoryID" />
                  </xsl:attribute>
                  <xsl:attribute name="data-questiongroup">
                     <xsl:value-of select="$qGroup_Name" />
                  </xsl:attribute>
                  <xsl:if test="$bShowOnly != false() or ../Style/Control/@ReadOnly != 'false'">
                     <xsl:attribute name="data-readonly">
                        <xsl:text>true</xsl:text>
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:attribute name="data-value">
                     <xsl:value-of select="@Name" />
                  </xsl:attribute>
                  <xsl:if test="@Alt != ''">
                     <xsl:attribute name="Alt">
                        <xsl:value-of select="@Alt" />
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:if test="$bIncludeElementIds">
                     <xsl:attribute name="id">
                        <xsl:value-of select="$qElementID" />
                        <xsl:value-of select="@CategoryID" />
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:if test="@Checked = 'true'">
                     <xsl:attribute name="data-selected">
                        <xsl:text>true</xsl:text>
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:value-of select="Label/Text" />
               </xsl:element>
            </xsl:for-each>
         </xsl:element>
      </xsl:element>
   </xsl:template>
   <xsl:template name="RadioButtonControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:variable name="qCategoryID">
         <xsl:value-of select="$qElementID" />
         <xsl:value-of select=".//Category[1]/@CategoryID" />
      </xsl:variable>
      <!--- Control Label -->
      <xsl:element name="div">
         <xsl:attribute name="data-exclusive">
            <xsl:text>true</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="$qCategoryID" />
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <xsl:attribute name="data-position">
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text>below</xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text>side</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name='data-hidden'>
            <xsl:choose>
               <xsl:when test="Style/@Hidden='true'">
                  <xsl:text>true</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>false</xsl:text>
               </xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="class">
            <xsl:text>m-option-base </xsl:text>
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text> below </xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text> side </xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="style">
            <xsl:choose>
               <xsl:when test="Style/@Hidden='true'">
                  <xsl:text>visibility:hidden</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:if test=".//Category[1]/@CategoryID">
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'mOptionBase'" />
               <xsl:with-param name="qElementID" select="$qCategoryID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
         </xsl:if>
         <xsl:element name="input">
            <xsl:attribute name="class">hiddencontrol</xsl:attribute>
            <!--- Set Control Type -->
            <xsl:attribute name="type">radio</xsl:attribute>
            <!--- Input name -->
            <xsl:attribute name="name">
               <xsl:value-of select="$qLocal_Name" />
               <xsl:if test="Category[1]/@Name">
                  <xsl:value-of select="Category[1]/@Name" />
               </xsl:if>
            </xsl:attribute>
            <!--- ID -->
            <xsl:if test="$bIncludeElementIds">
               <xsl:attribute name="id">
                  <xsl:value-of select="$qCategoryID" />
               </xsl:attribute>
            </xsl:if>
            <!--- Alt -->
            <xsl:if test="@Alt != ''">
               <xsl:attribute name="Alt">
                  <xsl:value-of select="@Alt" />
               </xsl:attribute>
            </xsl:if>
            <!--- CSS Class -->
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false() or $tReadOnly != 'false' or ../Style/Control/@ReadOnly != 'false'">
               <xsl:attribute name="data-readonly">
                  <xsl:text>true</xsl:text>
               </xsl:attribute>
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
            <!--- Button Category -->
            <xsl:attribute name="value">
               <xsl:if test="Category[1]/@Name">
                  <xsl:value-of select="Category[1]/@Name" />
               </xsl:if>
            </xsl:attribute>
            <!--- Is Button Checked -->
            <xsl:if test="Category[1]/@Checked = 'true'">
               <xsl:attribute name="checked" />
            </xsl:if>
         </xsl:element>
         <xsl:element name="label">
            <xsl:attribute name="for">
               <xsl:value-of select="$qCategoryID" />
            </xsl:attribute>
            <xsl:element name="span">
               <xsl:attribute name="class">a-icon-multistate</xsl:attribute>
               <xsl:attribute name="data-icontype">single</xsl:attribute>
               <xsl:comment>This is a comment!</xsl:comment>
            </xsl:element>
            <xsl:apply-templates select="Category[1]/Label">
               <xsl:with-param name="labelType" select="'option'" />
            </xsl:apply-templates>
         </xsl:element>
         <xsl:for-each select="../Question">
            <xsl:call-template name="Question">
               <xsl:with-param name="bWithinTable" select="true()" />
               <xsl:with-param name="SubQuestion" select="true()" />
               <xsl:with-param name="Parent" select="$qGroup_Name" />
               <xsl:with-param name="SubElement">
                  <xsl:value-of select=".//Control[1]/@ElementID" />
               </xsl:with-param>
            </xsl:call-template>
         </xsl:for-each>
      </xsl:element>
   </xsl:template>
   <xsl:template name="CheckButtonControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      
      <xsl:variable name="qCategoryID">
         <xsl:value-of select="$qElementID" />
         <xsl:value-of select=".//Category[1]/@CategoryID" />
      </xsl:variable>
      <!--- Control Label -->
      <xsl:element name="div">
         <xsl:attribute name="data-exclusive">
            <xsl:choose>
               <xsl:when test="name(..)='Question'">
                  <xsl:choose>
                     <xsl:when test="Category/Label/Style/Font/@IsBold='true'">
                        <xsl:text>true</xsl:text>
                     </xsl:when>
                     <xsl:otherwise>
                        <xsl:text>false</xsl:text>
                     </xsl:otherwise>
                  </xsl:choose>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:choose>
                     <xsl:when test="../@X=0">
                        <xsl:choose>
                           <xsl:when test="Category/Label/Style/Font/@IsBold='true'">
                              <xsl:text>true</xsl:text>
                           </xsl:when>
                           <xsl:otherwise>
                              <xsl:text>false</xsl:text>
                           </xsl:otherwise>
                        </xsl:choose>
                     </xsl:when>
                     <xsl:otherwise>
                        <xsl:call-template name="CalcExclusiveCell">
                           <xsl:with-param name="yValue" select="../@Y" />
                           <xsl:with-param name="xValue" select="../@X" />
                        </xsl:call-template>
                     </xsl:otherwise>
                  </xsl:choose>
               </xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="$qCategoryID" />
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <xsl:attribute name="data-position">
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text>below</xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text>side</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name='data-hidden'>
            <xsl:choose>
               <xsl:when test="Style/@Hidden='true'">
                  <xsl:text>true</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>false</xsl:text>
               </xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="class">
            <xsl:text>m-option-base </xsl:text>
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text> below</xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text> side</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="style">
            <xsl:choose>
               <xsl:when test="Style/@Hidden='true'">
                  <xsl:text>visibility:hidden</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:if test="Category[1]/@CategoryID">
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'mOptionBase'" />
               <xsl:with-param name="qElementID" select="$qCategoryID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
         </xsl:if>
         <xsl:element name="input">
            <xsl:attribute name="class">hiddencontrol</xsl:attribute>
            <!--- Set Control Type -->
            <xsl:attribute name="type">checkbox</xsl:attribute>
            <!--- Input name -->
            <xsl:attribute name="name">
               <xsl:value-of select="$qLocal_Name" />
               <xsl:if test="Category[1]/@Name">
                  <xsl:value-of select="Category[1]/@Name" />
               </xsl:if>
            </xsl:attribute>
            <!--- ID -->
            <xsl:if test="$bIncludeElementIds">
               <xsl:attribute name="id">
                  <xsl:value-of select="$qCategoryID" />
               </xsl:attribute>
            </xsl:if>
            <!--- Alt -->
            <xsl:if test="@Alt != ''">
               <xsl:attribute name="Alt">
                  <xsl:value-of select="@Alt" />
               </xsl:attribute>
            </xsl:if>
            <!--- CSS Class -->
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false() or $tReadOnly != 'false' or Style/Control/@ReadOnly != 'false'">
               <xsl:attribute name="data-readonly">
                  <xsl:text>true</xsl:text>
               </xsl:attribute>
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
            <!--- Button Category -->
            <xsl:attribute name="value">
               <xsl:if test="Category[1]/@Name">
                  <xsl:value-of select="Category[1]/@Name" />
               </xsl:if>
            </xsl:attribute>
            <!--- Is Button Checked -->
            <xsl:if test="Category[1]/@Checked = 'true'">
               <xsl:attribute name="checked" />
            </xsl:if>
         </xsl:element>
         <xsl:element name="label">
            <xsl:attribute name="for">
               <xsl:value-of select="$qCategoryID" />
            </xsl:attribute>
            <xsl:element name="span">
               <xsl:attribute name="class">a-icon-multistate</xsl:attribute>
               <xsl:attribute name="data-icontype">multiple</xsl:attribute>
               <xsl:comment>This is a comment!</xsl:comment>
            </xsl:element>
            <xsl:apply-templates select="Category[1]/Label">
               <xsl:with-param name="labelType" select="'option'" />
            </xsl:apply-templates>
         </xsl:element>
         <xsl:for-each select="../Question">
            <xsl:call-template name="Question">
               <xsl:with-param name="bWithinTable" select="true()" />
               <xsl:with-param name="SubQuestion" select="true()" />
               <xsl:with-param name="Parent" select="$qGroup_Name" />
               <xsl:with-param name="SubElement">
                  <xsl:value-of select=".//Control[1]/@ElementID" />
               </xsl:with-param>
            </xsl:call-template>
         </xsl:for-each>
      </xsl:element>
   </xsl:template>
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
         <xsl:if test="$bShowOnly != false() or $tReadOnly != 'false'">
            <xsl:attribute name="data-readonly">
               <xsl:text>true</xsl:text>
            </xsl:attribute>
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
   <xsl:template name="ListControlControl">
      <br />
      <B>ListControl NOT IMPLEMENTED</B>
   </xsl:template>
   <xsl:template name="ButtonControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      
      <xsl:variable name="qCategoryID">
         <xsl:value-of select="$qElementID" />
         <xsl:value-of select=".//Category[1]/@CategoryID" />
      </xsl:variable>
      <xsl:choose>
         <xsl:when test="Style/@Image != ''">
            <!--- Image control buttons -->
            <xsl:element name="input">
               <xsl:attribute name="type">image</xsl:attribute>
               <!--- Input name -->
               <xsl:attribute name="name">
                  <xsl:value-of select="@qLocal_Name" />
                  <xsl:if test="Category[1]/@Name">
                     <xsl:value-of select="Category[1]/@Name" />
                  </xsl:if>
               </xsl:attribute>
               <!--- ID -->
               <xsl:if test="$bIncludeElementIds">
                  <xsl:attribute name="id">
                     <xsl:value-of select="$qElementID" />
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
                  <xsl:attribute name="sLabelClass">aButtonImage</xsl:attribute>
               </xsl:if>
               <!--- Show Only -->
               <xsl:if test="$bShowOnly != false() or $tReadOnly != 'false'">
                  <xsl:attribute name="data-readonly">
                     <xsl:text>true</xsl:text>
                  </xsl:attribute>
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
            
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'aButtonOption'" />
               <xsl:with-param name="qElementID" select="$qCategoryID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
            <xsl:element name="input">
               <xsl:attribute name="data-questionid">
                  <xsl:value-of select="$qCategoryID" />
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qGroup_Name" />
               </xsl:attribute>
               <!--- Input name -->
               <xsl:attribute name="name">
                  <xsl:value-of select="$qLocal_Name" />
                  <xsl:if test="Category[1]/@Name">
                     <xsl:value-of select="Category[1]/@Name" />
                  </xsl:if>
               </xsl:attribute>
               <!--- ID -->
               <xsl:if test="$bIncludeElementIds">
                  <xsl:attribute name="id">
                     <xsl:value-of select="$qCategoryID" />
                  </xsl:attribute>
               </xsl:if>
               <!--- CSS Class -->
               <xsl:if test="$bIncludeCSSStyles">
                  <xsl:attribute name="class">a-button-option</xsl:attribute>
               </xsl:if>
               <!--- Show Only -->
               <xsl:if test="$bShowOnly != false() or $tReadOnly != 'false'">
                  <xsl:attribute name="data-readonly">
                     <xsl:text>true</xsl:text>
                  </xsl:attribute>
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
               <!--- Checked Label -->
               <xsl:choose>
                  <xsl:when test="Category/@Checked='true'">
                     <xsl:attribute name="data-checked">
                        <xsl:text>true</xsl:text>
                     </xsl:attribute>
                  </xsl:when>
                  <xsl:otherwise>
                     <xsl:attribute name="data-checked">
                        <xsl:text>false</xsl:text>
                     </xsl:attribute>
                  </xsl:otherwise>
               </xsl:choose>
               <xsl:attribute name="type">
                  <xsl:text>submit</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="value">
                  <xsl:value-of select="Category/Label/Text" />
               </xsl:attribute>
               <xsl:attribute name="data-exclusive">
                  <xsl:text>true</xsl:text>
               </xsl:attribute>
               <!--- Alt text -->
               <xsl:attribute name="alt">
                  <xsl:value-of select="Category/Label/Text" />
               </xsl:attribute>
            </xsl:element>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="DateControl">
      <br />
      <B>Date NOT IMPLEMENTED</B>
   </xsl:template>
   <xsl:template name="TimeControl">
      <br />
      <B>Time NOT IMPLEMENTED</B>
   </xsl:template>
   <xsl:template name="DateTimeControl">
      <br />
      <B>DateTime NOT IMPLEMENTED</B>
   </xsl:template>
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
         <xsl:if test="$bShowOnly != false() or $tReadOnly != 'false'">
            <xsl:attribute name="data-readonly">
               <xsl:text>true</xsl:text>
            </xsl:attribute>
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
   
   <xsl:template name="ScaleControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:element name="div">
         <xsl:if test="$qCustomType='scale-vertical'">
            <xsl:attribute name="class">o-scale-rotate</xsl:attribute>
         </xsl:if>
         <xsl:comment> --- rotation div --- </xsl:comment>
         <xsl:element name="div">
            <xsl:attribute name="class">
               <xsl:text>o-question-</xsl:text>
               <xsl:value-of select="$qCustomType" />
               <xsl:text>-control</xsl:text>
            </xsl:attribute>
            <xsl:element name="button">
               <xsl:attribute name="type">Button</xsl:attribute>
               <xsl:attribute name="class">
                  <xsl:text>a-button-preterminator</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questionid">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Preterm</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qGroup_Name" />
               </xsl:attribute>
               <xsl:comment>
                  <xsl:value-of select="$qCustomType" />
                  <xsl:text>pre terminator</xsl:text>
               </xsl:comment>
            </xsl:element>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'aButtonPreTerminator'" />
               <xsl:with-param name="qElementID">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Preterm</xsl:text>
               </xsl:with-param>
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
            <xsl:element name="div">
               <xsl:attribute name="class">
                  <xsl:text>o-scale</xsl:text>
               </xsl:attribute>
               <xsl:call-template name="appComponentScript">
                  <xsl:with-param name="ComponentName" select="'oScale'" />
                  <xsl:with-param name="qElementID">
                     <xsl:value-of select="$qElementID" />
                     <xsl:text>_Scale</xsl:text>
                  </xsl:with-param>
                  <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                  <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               </xsl:call-template>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>o-scale-unitcontainer</xsl:text>
                  </xsl:attribute>
                  <xsl:call-template name="appComponentScript">
                     <xsl:with-param name="ComponentName" select="'oScaleContainer'" />
                     <xsl:with-param name="qElementID">
                        <xsl:value-of select="$qElementID" />
                        <xsl:text>_ScaleContainer</xsl:text>
                     </xsl:with-param>
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                  </xsl:call-template>
                  <xsl:comment> --- units container --- </xsl:comment>
               </xsl:element>
            </xsl:element> 
            <xsl:call-template name="MakeInputControl">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
            
            <xsl:element name="button">
               <xsl:attribute name="type">Button</xsl:attribute>
               <xsl:attribute name="class">
                  <xsl:text>a-button-postterminator</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questionid">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Postterm</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qGroup_Name" />
               </xsl:attribute>
               <xsl:comment>
                  <xsl:value-of select="$qCustomType" />
                  <xsl:text> post terminator</xsl:text>
               </xsl:comment>
            </xsl:element>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'aButtonPostTerminator'" />
               <xsl:with-param name="qElementID">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Postterm</xsl:text>
               </xsl:with-param>
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
         </xsl:element>
         <xsl:call-template name="appComponentScript">
            <xsl:with-param name="ComponentName">
               <xsl:text>aInput</xsl:text>
               <xsl:call-template name="CamelCaseWord">
                  <xsl:with-param name="text" select="$qCustomType" />
               </xsl:call-template>
            </xsl:with-param>
            <xsl:with-param name="qElementID" select="$qElementID" />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
         </xsl:call-template>
      </xsl:element>
   </xsl:template>
   
   <xsl:template name="OpenendSearchControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:variable name="lElementID">
         <xsl:call-template name="CalculateQuestionName">
            <xsl:with-param name="QuestionName" select="$qElementID" />
         </xsl:call-template>
      </xsl:variable>
      <xsl:element name="div">
         <xsl:attribute name="class">
            <xsl:text>o-openend-search</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="$lElementID" />
         </xsl:attribute>
         <xsl:call-template name="appComponentScript">
            <xsl:with-param name="ComponentName" select="'oOpenend-search'" />
            <xsl:with-param name="qElementID" select='$lElementID' />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
         </xsl:call-template>
         <xsl:call-template name="MakeInputControl">
            <xsl:with-param name="qElementID" select="$lElementID" />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>   
         <xsl:element name="div"> 
            <xsl:attribute name="class">o-list</xsl:attribute>
            <xsl:element name="ul">
               <xsl:attribute name="class">m-list-external</xsl:attribute>
               <xsl:attribute name="id">
                  <xsl:value-of select="$lElementID" />
                  <xsl:text>_list</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qGroup_Name" />
               </xsl:attribute>
               <xsl:if test="Style/@Width">
                  <xsl:attribute name="style">
                     <xsl:text>width:</xsl:text>
                     <xsl:value-of select="Style/@Width" />
                     <xsl:text>;</xsl:text>
                  </xsl:attribute>
               </xsl:if>
               <xsl:comment> --- list items --- </xsl:comment>
            </xsl:element>
            <xsl:element name="div">
               <xsl:attribute name="class">m-list-messages</xsl:attribute>
               <xsl:element name="div">
                  <xsl:attribute name="class">a-list-message</xsl:attribute>
                  <xsl:attribute name="data-id">notenoughcharacters</xsl:attribute>
                  <xsl:comment>not enough characters message goes here</xsl:comment>
               </xsl:element>
               <xsl:element name="div">
                  <xsl:attribute name="class">a-list-message</xsl:attribute>
                  <xsl:attribute name="data-id">noitemsinlist</xsl:attribute>
                  <xsl:comment>no items in list message goes here</xsl:comment>
               </xsl:element>
            </xsl:element>
         </xsl:element>
         <xsl:element name="div">
            <xsl:attribute name="class">m-openend-search-count</xsl:attribute>
            <xsl:element name="span">
               <xsl:attribute name="class">a-label-counter</xsl:attribute>
               <xsl:comment>item count goes here</xsl:comment>
            </xsl:element>
            <xsl:element name="span">
               <xsl:attribute name="class">a-label-counter-prompt</xsl:attribute>
               <xsl:comment>item count prompt goes here</xsl:comment>
            </xsl:element>
         </xsl:element>
      </xsl:element>  
   </xsl:template>
   
   <xsl:template name="OpenendSearchScanControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:variable name="lElementID">
         <xsl:call-template name="CalculateQuestionName">
            <xsl:with-param name="QuestionName" select="$qElementID" />
         </xsl:call-template>
      </xsl:variable>
      <xsl:element name="div">
         <xsl:attribute name="class">
            <xsl:text>o-openend-search</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="$lElementID" />
         </xsl:attribute>
         <xsl:call-template name="appComponentScript">
            <xsl:with-param name="ComponentName" select="'oOpenend-search'" />
            <xsl:with-param name="qElementID" select='$lElementID' />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
         </xsl:call-template>
         
         <xsl:element name='div'>
            <xsl:attribute name='class'>o-media-external-selected</xsl:attribute>
            <xsl:element name='div'>
               <xsl:attribute name='class'>m-instructions-prompt</xsl:attribute>
               <xsl:element name='div'>
                  <xsl:attribute name='class'>a-button-scan</xsl:attribute>
                  <xsl:comment>scan button goes here</xsl:comment>
               </xsl:element>
               <xsl:element name='div'>
                  <xsl:attribute name='class'>a-label-button-prompt</xsl:attribute>
                  <xsl:comment>prompt text goes here</xsl:comment>
               </xsl:element>
            </xsl:element>
            <xsl:element name='div'>
               <xsl:attribute name='class'>m-instructions-feedback</xsl:attribute>
               <xsl:element name='div'>
                  <xsl:attribute name='class'>a-instructions-empty</xsl:attribute>
                  <xsl:comment>empty text goes here</xsl:comment>
               </xsl:element>
               <xsl:element name='div'>
                  <xsl:attribute name='class'>o-longlist-taglist</xsl:attribute>
                  <xsl:comment>tags go here</xsl:comment>
               </xsl:element>
               <xsl:element name='div'>
                  <xsl:attribute name='class'>a-instructions-error</xsl:attribute>
                  <xsl:comment>prompt error goes here</xsl:comment>
               </xsl:element>
            </xsl:element>
         </xsl:element>
         
         <xsl:call-template name="MakeInputControl">
            <xsl:with-param name="qElementID" select="$lElementID" />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>   
         <xsl:element name="div"> 
            <xsl:attribute name="class">o-list</xsl:attribute>
            <xsl:element name="ul">
               <xsl:attribute name="class">m-list-external</xsl:attribute>
               <xsl:attribute name="id">
                  <xsl:value-of select="$lElementID" />
                  <xsl:text>_list</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qGroup_Name" />
               </xsl:attribute>
               <xsl:if test="Style/@Width">
                  <xsl:attribute name="style">
                     <xsl:text>width:</xsl:text>
                     <xsl:value-of select="Style/@Width" />
                     <xsl:text>;</xsl:text>
                  </xsl:attribute>
               </xsl:if>
               <xsl:comment> --- list items --- </xsl:comment>
            </xsl:element>
            <xsl:element name="div">
               <xsl:attribute name="class">m-list-messages</xsl:attribute>
               <xsl:element name="div">
                  <xsl:attribute name="class">a-list-message</xsl:attribute>
                  <xsl:attribute name="data-id">notenoughcharacters</xsl:attribute>
               </xsl:element>
               <xsl:element name="div">
                  <xsl:attribute name="class">a-list-message</xsl:attribute>
                  <xsl:attribute name="data-id">noitemsinlist</xsl:attribute>
               </xsl:element>
            </xsl:element>
         </xsl:element>
         <xsl:element name="div">
            <xsl:attribute name="class">m-openend-search-count</xsl:attribute>
            <xsl:element name="span">
               <xsl:attribute name="class">a-label-counter</xsl:attribute>
               <xsl:comment>item count goes here</xsl:comment>
            </xsl:element>
            <xsl:element name="span">
               <xsl:attribute name="class">a-label-counter-prompt</xsl:attribute>
               <xsl:comment>item count prompt goes here</xsl:comment>
            </xsl:element>
         </xsl:element>
      </xsl:element>  
   </xsl:template>
   
   <xsl:template name='SliderDateControl'>
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:variable name="lElementID">
         <xsl:call-template name="CalculateQuestionName">
            <xsl:with-param name="QuestionName" select="$qElementID" />
         </xsl:call-template>
      </xsl:variable>
      <xsl:element name="div">
         <xsl:comment> --- rotation div --- </xsl:comment>
         <xsl:element name="div">
            <xsl:attribute name="class">
               <xsl:text>o-question-</xsl:text>
               <xsl:value-of select="$qCustomType" />
               <xsl:text>-control</xsl:text>
            </xsl:attribute>
            <xsl:element name="button">
               <xsl:attribute name="type">Button</xsl:attribute>
               <xsl:attribute name="class">
                  <xsl:text>a-button-preterminator</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questionid">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Preterm</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qGroup_Name" />
               </xsl:attribute>
               <xsl:comment>
                  <xsl:value-of select="$qCustomType" />
                  <xsl:text>pre terminator</xsl:text>
               </xsl:comment>
            </xsl:element>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'aButtonPreTerminator'" />
               <xsl:with-param name="qElementID">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Preterm</xsl:text>
               </xsl:with-param>
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
            <xsl:element name="div">
               <xsl:attribute name="class">m-slider-date-horizontal</xsl:attribute>
               <xsl:attribute name="style">
                  <xsl:if test="Style/@Width != ''">
                     <xsl:text>width:</xsl:text>
                     <xsl:value-of select="Style/@Width" />
                  </xsl:if>
               </xsl:attribute>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>a-style-sliderborder</xsl:text>
                  </xsl:attribute>
                  <xsl:comment>
                     <xsl:value-of select="$qCustomType" />
                     <xsl:text> slider border</xsl:text>
                  </xsl:comment>
               </xsl:element>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>m-label-ticklabels</xsl:text>
                  </xsl:attribute>
                  <xsl:comment>
                     <xsl:value-of select="$qCustomType" />
                     <xsl:text> tick labels</xsl:text>
                  </xsl:comment>
               </xsl:element>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>m-style-slidermarks</xsl:text>
                  </xsl:attribute>
                  <xsl:comment>
                     <xsl:value-of select="$qCustomType" />
                     <xsl:text> tick marks</xsl:text>
                  </xsl:comment>
               </xsl:element>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>m-slider-date-thumb</xsl:text>
                  </xsl:attribute>
                  <xsl:call-template name="appComponentScript">
                     <xsl:with-param name="ComponentName">
                        <xsl:text>mSliderDateThumb</xsl:text>
                     </xsl:with-param>
                     <xsl:with-param name="qElementID">
                        <xsl:value-of select="$qElementID" />
                        <xsl:text>_DateThumb</xsl:text>
                     </xsl:with-param>
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                  </xsl:call-template>
                  
                  <xsl:element name="div">
                     <xsl:attribute name="class">
                        <xsl:text>a-label-time</xsl:text>
                     </xsl:attribute>
                     <xsl:attribute name="data-questionid">
                        <xsl:value-of select="$qElementID" />
                        <xsl:text>_Time_Val</xsl:text>
                     </xsl:attribute>
                     <xsl:attribute name="data-questiongroup">
                        <xsl:value-of select="$qGroup_Name" />
                     </xsl:attribute>
                     <xsl:comment>
                        <xsl:value-of select="$qCustomType" />
                        <xsl:text> thumb time value</xsl:text>
                     </xsl:comment>
                  </xsl:element>
                  
                  <xsl:element name="div">
                     <xsl:attribute name="class">
                        <xsl:text>a-label-date</xsl:text>
                     </xsl:attribute>
                     <xsl:attribute name="data-questionid">
                        <xsl:value-of select="$qElementID" />
                        <xsl:text>_Date_Val</xsl:text>
                     </xsl:attribute>
                     <xsl:attribute name="data-questiongroup">
                        <xsl:value-of select="$qGroup_Name" />
                     </xsl:attribute>
                     <xsl:comment>
                        <xsl:value-of select="$qCustomType" />
                        <xsl:text> thumb date value</xsl:text>
                     </xsl:comment>
                  </xsl:element>
               </xsl:element>
               
               <xsl:call-template name="MakeInputControl">
                  <xsl:with-param name="qElementID" select="$qElementID" />
                  <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                  <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                  <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                  <xsl:with-param name="qCustomType" select="$qCustomType" />
               </xsl:call-template>
            </xsl:element>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName">
                  <xsl:text>aInput</xsl:text>
                  <xsl:call-template name="CamelCaseWord">
                     <xsl:with-param name="text" select="$qCustomType" />
                  </xsl:call-template>
               </xsl:with-param>
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
            <xsl:element name="button">
               <xsl:attribute name="type">Button</xsl:attribute>
               <xsl:attribute name="class">
                  <xsl:text>a-button-postterminator</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questionid">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Postterm</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qGroup_Name" />
               </xsl:attribute>
               <xsl:comment>
                  <xsl:value-of select="$qCustomType" />
                  <xsl:text> post terminator</xsl:text>
               </xsl:comment>
            </xsl:element>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'aButtonPostTerminator'" />
               <xsl:with-param name="qElementID">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Postterm</xsl:text>
               </xsl:with-param>
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
         </xsl:element>
      </xsl:element>
   </xsl:template>
   
   <xsl:template name="ChoiceSummaryControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:variable name="qCategoryID">
         <xsl:value-of select="$qElementID" />
         <xsl:value-of select=".//Category[1]/@CategoryID" />
      </xsl:variable>
      <!--- Control Label -->
      <xsl:element name="div">
         <xsl:attribute name="data-exclusive">
            <xsl:text>true</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="$qCategoryID" />
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <xsl:attribute name="data-position">
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text>below</xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text>side</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name='data-hidden'>
            <xsl:choose>
               <xsl:when test="Style/@Hidden='true'">
                  <xsl:text>true</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>false</xsl:text>
               </xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="class">
            <xsl:text>m-option-summary </xsl:text>
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text> below </xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text> side </xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="style">
            <xsl:choose>
               <xsl:when test="Style/@Hidden='true'">
                  <xsl:text>visibility:hidden</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:if test=".//Category[1]/@CategoryID">
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'mOptionSummary'" />
               <xsl:with-param name="qElementID" select="$qCategoryID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
         </xsl:if>
         <xsl:element name="input">
            <xsl:attribute name="class">hiddencontrol</xsl:attribute>
            <!--- Set Control Type -->
            <xsl:attribute name="type">submit</xsl:attribute>
            <!--- Input name -->
            <xsl:attribute name="name">
               <xsl:value-of select="$qLocal_Name" />
               <xsl:if test="Category[1]/@Name">
                  <xsl:value-of select="Category[1]/@Name" />
               </xsl:if>
            </xsl:attribute>
            <!--- ID -->
            <xsl:if test="$bIncludeElementIds">
               <xsl:attribute name="id">
                  <xsl:value-of select="$qCategoryID" />
               </xsl:attribute>
            </xsl:if>
            <!--- Alt -->
            <xsl:if test="@Alt != ''">
               <xsl:attribute name="Alt">
                  <xsl:value-of select="@Alt" />
               </xsl:attribute>
            </xsl:if>
            <!--- CSS Class -->
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false() or $tReadOnly != 'false' or ../Style/Control/@ReadOnly != 'false'">
               <xsl:attribute name="data-readonly">
                  <xsl:text>true</xsl:text>
               </xsl:attribute>
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
            <!--- Button Category -->
            <xsl:attribute name="value">
               <xsl:if test="Category[1]/@Name">
                  <xsl:value-of select="Category[1]/@Name" />
               </xsl:if>
            </xsl:attribute>
            <!--- Is Button Checked -->
            <xsl:if test="Category[1]/@Checked = 'true'">
               <xsl:attribute name="checked" />
            </xsl:if>
            <xsl:element name="label">
               <xsl:attribute name="for">
                  <xsl:value-of select="$qCategoryID" />
               </xsl:attribute>
               <xsl:for-each select="Category[1]/Label">
                  <xsl:call-template name="label-summary">
                  </xsl:call-template>
               </xsl:for-each>
            </xsl:element>
         </xsl:element>
      </xsl:element>
   </xsl:template>
   
   <xsl:template name="DateTimeRecentSlider">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:element name="div">
         <xsl:comment> --- rotation div --- </xsl:comment>
         <xsl:element name="div">
            <xsl:attribute name="class">
               <xsl:text>o-question-</xsl:text>
               <xsl:value-of select="$qCustomType" />
               <xsl:text>-slider</xsl:text>
            </xsl:attribute>
            <xsl:element name="button">
               <xsl:attribute name="type">Button</xsl:attribute>
               <xsl:attribute name="class">
                  <xsl:text>a-button-preterminator</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questionid">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Preterm</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qGroup_Name" />
               </xsl:attribute>
               <xsl:comment>
                  <xsl:value-of select="$qCustomType" />
                  <xsl:text>pre terminator</xsl:text>
               </xsl:comment>
            </xsl:element>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'aButtonPreTerminator'" />
               <xsl:with-param name="qElementID">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Preterm</xsl:text>
               </xsl:with-param>
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
            <xsl:element name="div">
               <xsl:attribute name="style">
                  <xsl:if test="Style/@Width != ''">
                     <xsl:text>width:</xsl:text>
                     <xsl:value-of select="Style/@Width" />
                  </xsl:if>
               </xsl:attribute>
               <xsl:attribute name="class">m-slider-horizontal</xsl:attribute>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>a-style-sliderborder</xsl:text>
                  </xsl:attribute>
                  <xsl:comment>
                     <xsl:value-of select="$qCustomType" />
                     <xsl:text> slider border</xsl:text>
                  </xsl:comment>
               </xsl:element>
               <xsl:element name="div">
                  <xsl:attribute name="data-questiongroup">
                     <xsl:value-of select="$qGroup_Name" />
                  </xsl:attribute>
                  <xsl:attribute name="class">
                     <xsl:text>m-label-ticklabels</xsl:text>
                  </xsl:attribute>
                  <xsl:comment>
                     <xsl:value-of select="$qCustomType" />
                     <xsl:text> tick labels</xsl:text>
                  </xsl:comment>
               </xsl:element>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>m-style-slidermarks</xsl:text>
                  </xsl:attribute>
                  <xsl:comment>
                     <xsl:value-of select="$qCustomType" />
                     <xsl:text> tick marks</xsl:text>
                  </xsl:comment>
               </xsl:element>
               <xsl:element name="div">
                  <xsl:attribute name="class">
                     <xsl:text>m-slider-thumb-interactive</xsl:text>
                  </xsl:attribute>
                  <xsl:call-template name="appComponentScript">
                     <xsl:with-param name="ComponentName" select="'mSliderThumbInteractive'" />
                     <xsl:with-param name="qElementID">
                        <xsl:value-of select="$qElementID" />
                        <xsl:text>_Thumb</xsl:text>
                     </xsl:with-param>
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                  </xsl:call-template>
                  <xsl:call-template name="DateTimeRecentInput">
                     <xsl:with-param name="qElementID" select="$qElementID" />
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                     <xsl:with-param name="qCustomType" select="$qCustomType" />
                  </xsl:call-template>
                  <xsl:comment> --- input above picker below --</xsl:comment>                  
                  <xsl:call-template name="DateTimeRecentPicker">
                     <xsl:with-param name="qElementID" select="$qElementID" />
                     <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                     <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                     <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                     <xsl:with-param name="qCustomType" select="$qCustomType" />
                  </xsl:call-template>
               </xsl:element>
               
               <xsl:call-template name="MakeInputControl">
                  <xsl:with-param name="qElementID" select="$qElementID" />
                  <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
                  <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
                  <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                  <xsl:with-param name="qCustomType" select="$qCustomType" />
               </xsl:call-template>
            </xsl:element>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName">
                  <xsl:text>aInput</xsl:text>
                  <xsl:call-template name="CamelCaseWord">
                     <xsl:with-param name="text" select="$qCustomType" />
                  </xsl:call-template>
               </xsl:with-param>
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
            <xsl:element name="button">
               <xsl:attribute name="type">Button</xsl:attribute>
               <xsl:attribute name="class">
                  <xsl:text>a-button-postterminator</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questionid">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Postterm</xsl:text>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qGroup_Name" />
               </xsl:attribute>
               <xsl:comment>
                  <xsl:value-of select="$qCustomType" />
                  <xsl:text> post terminator</xsl:text>
               </xsl:comment>
            </xsl:element>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'aButtonPostTerminator'" />
               <xsl:with-param name="qElementID">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_Postterm</xsl:text>
               </xsl:with-param>
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            </xsl:call-template>
         </xsl:element>
      </xsl:element>
   </xsl:template>
   
   <xsl:template name="DateTimeRecentInput">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:comment>Interactive Input goes here</xsl:comment>
      <xsl:element name="div">
         <xsl:attribute name="class">
            <xsl:text>a-input-thumbtop</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="$qElementID" />
            <xsl:text>_topinput</xsl:text>
         </xsl:attribute>
         
         <xsl:call-template name="appComponentScript">
            <xsl:with-param name="ComponentName" select="'aInputThumbTop'" />
            <xsl:with-param name="qElementID">
               <xsl:value-of select="$qElementID" />
               <xsl:text>_Thumb_Input</xsl:text>
            </xsl:with-param>
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
         </xsl:call-template>
         
         <xsl:call-template name="MakeInputControl">
            <xsl:with-param name="qElementID">
               <xsl:value-of select="$qElementID" />
               <xsl:text>__thumbinput</xsl:text>
            </xsl:with-param>
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
      </xsl:element>
   </xsl:template>
   
   <xsl:template name="DateTimeRecentPicker">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:comment>Interactive Picker goes here</xsl:comment>
      <xsl:element name="div">
         <xsl:attribute name="class">
            <xsl:text>o-dropdown-thumbbottom</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="$qElementID" />
            <xsl:text>_bottompicker</xsl:text>
         </xsl:attribute>
         
         <xsl:call-template name="appComponentScript">
            <xsl:with-param name="ComponentName" select="'oDropdownThumbBottom'" />
            <xsl:with-param name="qElementID">
               <xsl:value-of select="$qElementID" />
               <xsl:text>_Thumb_Picker</xsl:text>
            </xsl:with-param>
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
         </xsl:call-template>
         
         <xsl:call-template name="MakeInputControl">
            <xsl:with-param name="qElementID">
               <xsl:value-of select="$qElementID" />
               <xsl:text>_thumbpicker</xsl:text>
            </xsl:with-param>
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
      </xsl:element>      
   </xsl:template>
   
   <xsl:template name="MediaExternalControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      
      <xsl:element name="div">
         <xsl:attribute name="class">
            <xsl:text>o-question-</xsl:text>
            <xsl:value-of select="$qCustomType" />
            <xsl:text>-wrapper</xsl:text>
         </xsl:attribute>
         
         <xsl:element name="div">
            <xsl:attribute name="class">o-question-buttonandmessage</xsl:attribute>
            <xsl:element name="div">
               <xsl:attribute name="class">o-buttonandmessage-button</xsl:attribute>
               <xsl:element name="input">
                  <xsl:attribute name="type">button</xsl:attribute>
                  <xsl:attribute name="class">a-button-primary start_external</xsl:attribute>
               </xsl:element>
            </xsl:element>
            <xsl:element name="div">
               <xsl:attribute name="class">o-buttonandmessage-message</xsl:attribute>
               <xsl:comment> --- media capture instructions --- </xsl:comment>
            </xsl:element>            
         </xsl:element>
         
         <xsl:element name="div">
            <xsl:attribute name="class">o-media-frame</xsl:attribute>
            <xsl:comment> --- media frame --- </xsl:comment>
         </xsl:element>
         
         <xsl:call-template name="SingleLineEditControl">
            <xsl:with-param name="qElementID" select="$qElementID" />
            <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
            <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>
      </xsl:element>
      
   </xsl:template>
   
   <!--- Style Templates -->
   <xsl:template name="LabelStyle">
      <xsl:param name="IgnoreWidth" select="'false'" />
      <xsl:if test="Style/@BgColor">
         <xsl:text>background-color:</xsl:text>
         <xsl:value-of select="Style/@BgColor" />
         <xsl:text>;</xsl:text>
      </xsl:if>
      <xsl:if test="Style/@Color">
         <xsl:text>color:</xsl:text>
         <xsl:value-of select="Style/@Color" />
         <xsl:text>;</xsl:text>
      </xsl:if>
      <xsl:if test="Style/@Width and $IgnoreWidth != 'true'">
         <xsl:text>width:</xsl:text>
         <xsl:value-of select="Style/@Width" />
         <xsl:text>;</xsl:text>
      </xsl:if>
      <xsl:if test="Style/@Height">
         <xsl:text>height:</xsl:text>
         <xsl:value-of select="Style/@Height" />
         <xsl:text>;</xsl:text>
      </xsl:if>
      <xsl:if test="Style/@Hidden = 'true'">visibility: hidden;</xsl:if>
      <xsl:choose>
         <xsl:when test="Style/@Cursor = 'EResize'">cursor: e-resize;</xsl:when>
         <xsl:when test="Style/@Cursor = 'NEResize'">cursor: ne-resize;</xsl:when>
         <xsl:when test="Style/@Cursor = 'NResize'">cursor: n-resize;</xsl:when>
         <xsl:when test="Style/@Cursor = 'NWResize'">cursor: nw-resize;</xsl:when>
         <xsl:when test="Style/@Cursor = 'WResize'">cursor: w-resize;</xsl:when>
         <xsl:when test="Style/@Cursor = 'SWResize'">cursor: sw-resize;</xsl:when>
         <xsl:when test="Style/@Cursor = 'SResize'">cursor: s-resize;</xsl:when>
         <xsl:when test="Style/@Cursor = 'SEResize'">cursor: se-resize;</xsl:when>
         <xsl:when test="Style/@Cursor">
            <xsl:text>cursor:</xsl:text>
            <xsl:value-of select="Style/@Cursor" />
            <xsl:text>;</xsl:text>
         </xsl:when>
      </xsl:choose>
      <xsl:if test="Style/Cell/@Wrap = 'false'">white-space: nowrap;</xsl:if>
      <xsl:if test="Style/Font/@Family">
         <xsl:text>font-family:</xsl:text>
         <xsl:value-of select="Style/Font/@Family" />
         <xsl:text>;</xsl:text>
      </xsl:if>
      <xsl:if test="Style/Font/@Size">
         <xsl:text>font-size</xsl:text>
         <xsl:value-of select="Style/Font/@Size" />
         <xsl:text>pt;</xsl:text>
      </xsl:if>
      <xsl:if test="Style/Font/@IsUnderline = 'true'">text-decoration: underline;</xsl:if>
      <xsl:if test="Style/Font/@IsItalic = 'true'">font-style: italic;</xsl:if>
      <xsl:if test="Style/Font/@IsBold = 'true'">font-weight: bold;</xsl:if>
      <xsl:if test="Style/Font/@IsStrikethrough = 'true'">text-decoration: line-through;</xsl:if>
      <xsl:if test="Style/Font/@IsOverline = 'true'">text-decoration: overline;</xsl:if>
      <xsl:if test="Style/Font/@IsBlink = 'true'">text-decoration: blink;</xsl:if>
      <xsl:if test="Style/Font/@IsSubscript = 'true'">vertical-align: sub;</xsl:if>
      <xsl:if test="Style/Font/@IsSuperscript = 'true'">vertical-align: super;</xsl:if>
   </xsl:template>
   <xsl:template name="SpanStyle" />
   <xsl:template name="ControlStyle">
      <xsl:param name="IgnoreWidth" select="'false'" />
      <!--- adds the control styles to a style attribute -->
      <xsl:call-template name="LabelStyle">
         <xsl:with-param name="IgnoreWidth" select="$IgnoreWidth" />
      </xsl:call-template>
   </xsl:template>
   <xsl:template name="TableStyle">
      <!--- adds the table styles to a style attribute -->
      <xsl:call-template name="LabelStyle" />
   </xsl:template>
   <xsl:template name="CellStyle">
      <xsl:call-template name="BlockStyle" />
   </xsl:template>
   <xsl:template name="BlockStyle">
      <xsl:call-template name="BorderStyle" />
      <xsl:call-template name="PaddingStyle" />
   </xsl:template>
   <xsl:template name="BorderStyle">
      <!--- adds the border styles to a style attribute -->
   </xsl:template>
   <xsl:template name="PaddingStyle" />
   
   <!--- Custom Templates -->
   <!--- Handling Grids -->
   <xsl:template name="StructureRow">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:param name="Orientation" select="Column" />
      <xsl:variable name="ErrorCount">
         <xsl:call-template name="CountErrors" />
      </xsl:variable>
      <xsl:if test="$ErrorCount>0">
         <xsl:call-template name="StructureError">
            <xsl:with-param name="qElementID" select="$qElementID" />
         </xsl:call-template>
      </xsl:if>
      
      <xsl:element name="tr">
         <xsl:attribute name="class">
            <xsl:text>m-structure-row</xsl:text>
            <xsl:if test="count(Cell/Question)=0 and count(Cell/Control)=0">
               <xsl:text>-heading</xsl:text>
            </xsl:if>
         </xsl:attribute>
         <xsl:attribute name='data-iterationname'>
         </xsl:attribute>
         <xsl:for-each select="./Cell">
            <xsl:sort select="@X" data-type="number" order="ascending" />
            <xsl:call-template name="StructureCell">
               <xsl:with-param name="qElementID" select="$qElementID" />
               <xsl:with-param name="qGroup_Name" select="$qGroup_Name" />
               <xsl:with-param name="qLocal_Name" select="$qLocal_Name" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
               <xsl:with-param name="Orientation" select="$Orientation" />
            </xsl:call-template>
         </xsl:for-each>
      </xsl:element>
   </xsl:template>
   <xsl:template name="StructureCell">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:param name="Orientation" select="Column" />
      <xsl:variable name='nodeCount'>
         <xsl:value-of select="count(*)" />
      </xsl:variable>
      <xsl:variable name="cellType">
         <xsl:choose>
            <xsl:when test="@Class='mrGridCategoryText'">
               <xsl:text>th</xsl:text>
            </xsl:when>
            <xsl:when test="@Class='mrGridQuestionText'">
               <xsl:text>th</xsl:text>
            </xsl:when>
            <xsl:when test="$nodeCount &lt; 1">
               <xsl:text>th</xsl:text>
            </xsl:when>
            <xsl:otherwise>
               <xsl:text>td</xsl:text>
            </xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      <xsl:variable name="cellScope">
         <xsl:choose>
            <xsl:when test="$Orientation != 'Column'">
               <xsl:choose>
                  <xsl:when test="$nodeCount &lt; 1">
                     <xsl:text>col</xsl:text>
                  </xsl:when>
                  <xsl:when test="@Class='mrGridCategoryText'">
                     <xsl:text>row</xsl:text>
                  </xsl:when>
                  <xsl:when test="@Class='mrGridQuestionText'">
                     <xsl:text>col</xsl:text>
                  </xsl:when>
               </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
               <xsl:choose>
                  <xsl:when test="$nodeCount &lt; 1">
                     <xsl:text>row</xsl:text>
                  </xsl:when>
                  <xsl:when test="@Class='mrGridCategoryText'">
                     <xsl:text>col</xsl:text>
                  </xsl:when>
                  <xsl:when test="@Class='mrGridQuestionText'">
                     <xsl:text>row</xsl:text>
                  </xsl:when>
               </xsl:choose>
            </xsl:otherwise>
         </xsl:choose>
      </xsl:variable>
      <xsl:element name="{$cellType}">
         <xsl:attribute name="orientation">
            <xsl:value-of select="$Orientation" />
         </xsl:attribute>
         <xsl:attribute name="class">
            <xsl:text>m-structure-cell</xsl:text>
            <xsl:if test="*/Style/@BgColor != ''">
               <xsl:value-of select="' '" />
               <xsl:text>m-structure-cell-</xsl:text>
               <xsl:value-of select="*/Style/@BgColor" />
            </xsl:if>
         </xsl:attribute>
         <xsl:if test="not($cellScope='') and $cellType='th'">
            <xsl:attribute name="scope">
               <xsl:value-of select="$cellScope" />
            </xsl:attribute>
         </xsl:if>
         <xsl:if test="@WeightY > 1">
            <xsl:attribute name="rowspan">
               <xsl:value-of select="@WeightY" />
            </xsl:attribute>
         </xsl:if>
         <xsl:if test="@WeightX > 1">
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
         
         <xsl:variable name='testposition'>
            <xsl:choose>
               <xsl:when test="name(child::node()[1]) = 'Error'">
                  <xsl:value-of select="2" />
               </xsl:when>
               <xsl:otherwise>
                  <xsl:value-of select="1" />
               </xsl:otherwise>
            </xsl:choose>
         </xsl:variable>
         
         <xsl:for-each select="*">
            <xsl:choose>
               <xsl:when test="name() = 'Question'">
                  <xsl:variable name="shouldGo">
                     <xsl:choose>
                        <xsl:when test="position() &lt; 2">
                           <xsl:value-of select="true()" />
                        </xsl:when>
                        <xsl:otherwise>
                           <xsl:choose>
                              <xsl:when test="name(../*[1]) != 'Control'">
                                 <xsl:value-of select="true()" />
                              </xsl:when>
                              <xsl:otherwise>
                                 <xsl:value-of select="false()" />
                              </xsl:otherwise>
                           </xsl:choose>
                        </xsl:otherwise>
                     </xsl:choose>
                  </xsl:variable>
                  <xsl:if test="$shouldGo='true'">
                     <xsl:call-template name="CellQuestion" />
                  </xsl:if>
               </xsl:when>
               <xsl:when test="name() = 'Label'">
                  <xsl:call-template name="Label">
                     <xsl:with-param name="labelType">
                        <xsl:choose>
                           <xsl:when test="../@Class='mrGridQuestionText'">
                              <xsl:choose>
                                 <xsl:when test="Style/@Align='Center'">
                                    <xsl:text>option</xsl:text>
                                 </xsl:when>
                                 <xsl:otherwise>
                                    <xsl:text>question</xsl:text>
                                 </xsl:otherwise>
                              </xsl:choose>
                           </xsl:when>
                           <xsl:when test="../@Class='mrGridCategoryText'">
                              <xsl:text>iteration</xsl:text>
                           </xsl:when>
                        </xsl:choose>
                     </xsl:with-param>
                  </xsl:call-template>
               </xsl:when>
               <xsl:when test="name() = 'Control'">
                  <xsl:variable name="cellElementID">
                     <xsl:call-template name="CalculateQuestionName">
                        <xsl:with-param name="QuestionName" select="@ElementID" />
                     </xsl:call-template>
                  </xsl:variable>
                  <xsl:variable name="cellCategoryID" select="@ElementID" />
                  
                  <xsl:variable name="cellLocal_Name" select="@QuestionName" />
                  <xsl:variable name="cellGroup_Name">
                     <xsl:call-template name="CalculateQuestionName">
                        <xsl:with-param name="QuestionName" select="$cellLocal_Name" />
                     </xsl:call-template>
                  </xsl:variable>
                  
                  <xsl:choose>
                     <xsl:when test="not(@Type = 'RadioButton') and not(@Type ='CheckButton')">
                        <xsl:call-template name="InsertQuestionDiv">
                           <xsl:with-param name="qElementID" select="$cellElementID" />
                           <xsl:with-param name="qGroup_Name" select="$cellGroup_Name" />
                           <xsl:with-param name="qLocal_Name" select="$cellLocal_Name" />
                        </xsl:call-template>
                     </xsl:when>
                     <xsl:otherwise>
                        <xsl:call-template name="Control">
                           <xsl:with-param name="qElementID" select="$cellCategoryID" />
                           <xsl:with-param name="qGroup_Name" select="$cellGroup_Name" />
                           <xsl:with-param name="qLocal_Name" select="$cellLocal_Name" />
                           <xsl:with-param name="qIsCustom">
                              <xsl:call-template name="TranslateZIndexToIsCustom">
                                 <xsl:with-param name="theID" select="Style/@ZIndex" />
                              </xsl:call-template>
                           </xsl:with-param>
                           <xsl:with-param name="qCustomType">
                              <xsl:call-template name="TranslateZIndexToName">
                                 <xsl:with-param name="theID" select="Style/@ZIndex" />
                              </xsl:call-template>
                           </xsl:with-param>
                        </xsl:call-template>
                     </xsl:otherwise>
                  </xsl:choose>
               </xsl:when>
               <xsl:when test="name() = 'Error'">
                  <xsl:comment>old error message</xsl:comment>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:apply-templates select="." />
               </xsl:otherwise>
            </xsl:choose>
         </xsl:for-each>
      </xsl:element>
   </xsl:template>
   <xsl:template name="StructureError">
      <xsl:param name="qElementID" />
      <xsl:element name="tr">
         <xsl:attribute name="class">
            <xsl:text>m-structure-row-error</xsl:text>
         </xsl:attribute>
         <xsl:for-each select="Cell">
            <xsl:element name="td">
               <xsl:if test="Question/Error or Error">
                  <xsl:attribute name="class">
                     <xsl:text>m-structure-cell-error</xsl:text>
                  </xsl:attribute>
                  <xsl:for-each select="Question/Error">
                     <xsl:call-template name="Error">
                        <xsl:with-param name="SubQuestion" select="true()" />
                        <xsl:with-param name="qElementID" select="$qElementID" />
                     </xsl:call-template>
                  </xsl:for-each>
                  <xsl:for-each select="Error">
                     <xsl:call-template name="Error">
                        <xsl:with-param name="SubQuestion" select="true()" />
                        <xsl:with-param name="qElementID" select="$qElementID" />
                     </xsl:call-template>
                  </xsl:for-each>
               </xsl:if>
            </xsl:element>
         </xsl:for-each>
      </xsl:element>
   </xsl:template>
   
   <!--- General Functions -->
   
   <xsl:template name="MakeInputControl">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <!--- Edit box -->
      <xsl:element name="input">
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="$qElementID" />
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qGroup_Name" />
         </xsl:attribute>
         <!--- Set Indicate position as side or below -->
         <xsl:attribute name="data-position">
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text>below</xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text>side</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <!--- Set Control Type -->
         <xsl:choose>
            <xsl:when test="$qCustomType='slider-horizontal' or $qCustomType='slider-vertical'">
               <xsl:attribute name="type">range</xsl:attribute>
            </xsl:when>
            <xsl:when test="$qCustomType='decimal'">
               <xsl:attribute name="step">any</xsl:attribute>
               <xsl:attribute name="type">number</xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
               <xsl:attribute name="type">text</xsl:attribute>
               <xsl:if test="@Length>10">
                  <xsl:attribute name="step">any</xsl:attribute>
               </xsl:if>
            </xsl:otherwise>
         </xsl:choose>
         <!--- Input name -->
         <xsl:attribute name="name">
            <xsl:value-of select="$qLocal_Name" />
            <xsl:if test="@Type='RadioButton' or @Type='CheckBox'">
               <xsl:value-of select="Category[1]/@Name" />
            </xsl:if>
         </xsl:attribute>
         <!--- ID -->
         <xsl:attribute name="id">
            <xsl:value-of select="$qElementID" />
            <xsl:if test="@Type='RadioButton' or @Type='CheckBox'">
               <xsl:text>_C</xsl:text>
               <xsl:value-of select="Category[1]/@CategoryID" />
            </xsl:if>
         </xsl:attribute>
         <!--- Alt -->
         <xsl:if test="@Alt != ''">
            <xsl:attribute name="Alt">
               <xsl:value-of select="@Alt" />
            </xsl:attribute>
         </xsl:if>
         <!--- Block LastPass -->
         <xsl:attribute name="data-lpignore">
            <xsl:text>true</xsl:text>
         </xsl:attribute>
         <!--- Show Only -->
         <xsl:if test="$bShowOnly != false() or $tReadOnly != 'false' or Style/Control/@ReadOnly='true'">
            <xsl:attribute name="data-readonly">
               <xsl:text>true</xsl:text>
            </xsl:attribute>
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
         <xsl:attribute name="style">
            <xsl:call-template name="ControlStyle">
               <xsl:with-param name="IgnoreWidth">
                  <xsl:choose>
                     <xsl:when test="$qCustomType = 'slider-horizontal' or $qCustomType = 'slider-vertical'">
                        <xsl:text>true</xsl:text>
                     </xsl:when>
                     <xsl:otherwise>
                        <xsl:text>false</xsl:text>
                     </xsl:otherwise>
                  </xsl:choose>
               </xsl:with-param>
            </xsl:call-template>
         </xsl:attribute>
         <!--- Max length -->
         <xsl:if test="@Length">
            <xsl:attribute name="maxlength">
               <xsl:value-of select="@Length" />
            </xsl:attribute>
         </xsl:if>
         <!--- list -->
         <xsl:choose>
            <xsl:when test="$qCustomType='combobox'">
               <xsl:attribute name="list">
                  <xsl:value-of select="$qElementID" />
                  <xsl:text>_list</xsl:text>
               </xsl:attribute>
            </xsl:when>
         </xsl:choose>
         <!--- Default text -->
         <xsl:attribute name="value">
            <xsl:choose>
               <xsl:when test="$qCustomType='combobox' or $qCustomType='dropdown'">
                  <xsl:call-template name='CheckedToString' />
               </xsl:when>
               <xsl:otherwise>
                  <xsl:value-of select="@Value" />
               </xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>
         
         <xsl:attribute name="data-value">
            <xsl:value-of select="@Value" />
         </xsl:attribute>
         
         <xsl:attribute name="class">
            <xsl:text>a-input-</xsl:text>
            <xsl:value-of select="$qCustomType" />
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text> below</xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text> side</xsl:text>
               </xsl:when>
            </xsl:choose>
            <xsl:if test="(($qIsCustom!='false') and ($qCustomType != 'slider-horizontal' or $qCustomType='slider-vertical'))">
               <xsl:text> hiddencontrol</xsl:text>
            </xsl:if>
         </xsl:attribute>
      </xsl:element>
   </xsl:template>
   <xsl:template name="TranslateZIndexToName">
      <xsl:param name="theID" />
      <xsl:choose>
         <xsl:when test="$theID = '-10'">
            <xsl:value-of select="'information'" />
         </xsl:when>
         <xsl:when test="$theID = '-20'">
            <xsl:value-of select="'singlelineedit'" />
         </xsl:when>
         <xsl:when test="$theID = '-21'">
            <xsl:value-of select="'readwriteedit'" />
         </xsl:when>
         <xsl:when test="$theID = '-22'">
            <xsl:value-of select="'decimal'" />
         </xsl:when>
         <xsl:when test="$theID = '-25'">
            <xsl:value-of select="'openend-search'" />
         </xsl:when>
         <xsl:when test="$theID = '-26'">
            <xsl:value-of select="'openend-search-scan'" />
         </xsl:when>
         <xsl:when test="$theID = '-30'">
            <xsl:value-of select="'multilineedit'" />
         </xsl:when>
         <xsl:when test="$theID = '-40'">
            <xsl:value-of select="'choice'" />
         </xsl:when>
         <xsl:when test="$theID = '-45'">
            <xsl:value-of select="'choice-summary'" />
         </xsl:when>
         <xsl:when test="$theID = '-50'">
            <xsl:value-of select="'slider-horizontal'" />
         </xsl:when>
         <xsl:when test="$theID = '-51'">
            <xsl:value-of select="'slider-vertical'" />
         </xsl:when>
         <xsl:when test="$theID = '-52'">
            <xsl:value-of select="'slider-date'" />
         </xsl:when>
         <xsl:when test="$theID = '-55'">
            <xsl:value-of select="'scale-horizontal'" />
         </xsl:when>
         <xsl:when test="$theID = '-56'">
            <xsl:value-of select="'scale-vertical'" />
         </xsl:when>
         <xsl:when test="$theID = '-60'">
            <xsl:value-of select="'dropdown'" />
         </xsl:when>
         <xsl:when test="$theID = '-70'">
            <xsl:value-of select="'combobox'" />
         </xsl:when>
         <xsl:when test="$theID = '-80'">
            <xsl:value-of select="'calendar'" />
         </xsl:when>
         <xsl:when test="$theID = '-91'">
            <xsl:value-of select="'datetime-recent'" />
         </xsl:when>
         <xsl:when test="$theID = '-1100'">
            <xsl:value-of select="'vprogressive'" />
         </xsl:when>
         <xsl:when test="$theID = '-1110'">
            <xsl:value-of select="'hprogressive'" />
         </xsl:when>
         <xsl:when test="$theID = '-1400'">
            <xsl:value-of select="'tabstrip'" />
         </xsl:when>
         <xsl:when test="$theID = '-1510'">
            <xsl:value-of select="'media-external'" />
         </xsl:when>
         <xsl:otherwise>
            <xsl:value-of select="theID" />
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="TranslateZIndexToIsCustom">
      <xsl:param name="theID" />
      <xsl:choose>
         <xsl:when test="$theID = '-10'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-20'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-21'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-22'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-25'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-26'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-30'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-40'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-45'">
            <xsl:value-of select="'true'" />
         </xsl:when>         
         <xsl:when test="$theID = '-50'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-51'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-55'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-56'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-60'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-70'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-80'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-81'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-91'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-1100'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-1110'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-1400'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-1510'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         
         <xsl:otherwise>
            <xsl:value-of select="'true'" />
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="appComponentScript">
      <xsl:param name="qElementID" />
      <xsl:param name="qLocal_Name" />
      <xsl:param name="qGroup_Name" />
      <xsl:param name="ComponentName" />
      <xsl:element name="script">
         <xsl:text>app.registerComponent('</xsl:text>
         <xsl:value-of select="$ComponentName" />
         <xsl:text>','</xsl:text>
         <xsl:value-of select="$qElementID" />
         <xsl:text>','</xsl:text>
         <xsl:value-of select="$qGroup_Name" />
         <xsl:text>');</xsl:text>
      </xsl:element>
   </xsl:template>
   <xsl:template name="CamelCaseWord">
      <xsl:param name="text" />
      <xsl:value-of select="translate(substring($text,1,1),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')" />
      <xsl:value-of select="translate(substring($text,2,string-length($text)-1),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')" />
   </xsl:template>
   <xsl:template name='CalcExclusiveCell'>
      <xsl:param name="yValue" />
      <xsl:param name="xValue" />
      <xsl:variable name="colExclusive">
         <xsl:value-of select="//Questions/Question/Table/Row[@Y=$yValue]/Cell[1]/Label/Style/Font/@IsBold" />
      </xsl:variable>
      <xsl:variable name="rowExclusive">
         <xsl:value-of select="//Questions/Question/Table/Row[1]/Cell[@X=$xValue]/Label/Style/Font/@IsBold" />
      </xsl:variable>
      <xsl:choose>
         <xsl:when test="$rowExclusive='true' or $colExclusive='true'">
            <xsl:text>true</xsl:text>
         </xsl:when>
         <xsl:otherwise>
            <xsl:text>false</xsl:text>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="CountErrors">
      <xsl:value-of select="count(./Cell[Question/Error])+count(./Cell[Error])"/>
   </xsl:template>
   
   <xsl:template name="CalculateQuestionName">
      <xsl:param name="QuestionName" />
      <xsl:choose>
         <xsl:when test="substring($QuestionName, string-length($QuestionName) - 1)='_C' or substring($QuestionName, string-length($QuestionName) - 1)='_X'">
            <xsl:value-of select="substring($QuestionName, 1, string-length($QuestionName)-2)" />
         </xsl:when>
         <xsl:otherwise>
            <xsl:value-of select="$QuestionName" />
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   
   <xsl:template name="CheckedToString">
      <xsl:for-each select="Category">
         <xsl:if test="@Checked">
            <xsl:value-of select='@Name' />
         </xsl:if>
      </xsl:for-each>
   </xsl:template>
   
</xsl:stylesheet>