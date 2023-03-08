<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
   xmlns:fo="http://www.w3.org/1999/XSL/Format" version="1.0">
   <xsl:output method="xml" indent="yes" />
   <xsl:param name="bIncludeCSSStyles" select="true()" />
   <xsl:param name="bIncludeElementIds" select="true()" />
   <xsl:param name="sImageLocation" />
   <xsl:param name="bShowOnly" select="false()" />
   <xsl:param name="bAutoComplete" select="false()" />
   <!--- Basic Structure -->
   <xsl:template match="Questions">
      <xsl:for-each select="Question">
         <Question>
            <xsl:call-template name="Question" />
         </Question>
      </xsl:for-each>
   </xsl:template>
   <xsl:template name="Question">
      <xsl:param name="bWithinTable" select="false()" />
      <xsl:param name="SubQuestion" select="false()" />
      <xsl:choose>
         <xsl:when test="$SubQuestion = false()">
            <xsl:variable name="qGroupName" select="//Control[1]/@ElementID" />
            <xsl:variable name="qFullName">
               <xsl:call-template name="CalculateQuestionName">
                  <xsl:with-param name="QuestionName" select="//Control[1]/@QuestionName" />
               </xsl:call-template>
            </xsl:variable>
            <xsl:variable name="qCustomType">
               <xsl:call-template name="TranslateZIndexToName">
                  <xsl:with-param name="theID" select="Style/@ZIndex" />
               </xsl:call-template>
            </xsl:variable>
            <xsl:if test="$qGroupName!=''">
               <xsl:call-template name="InsertQuestionDiv">
                  <xsl:with-param name="qFullName" select="$qFullName" />
                  <xsl:with-param name="qGroupName" select="$qGroupName" />
               </xsl:call-template>
            </xsl:if>
         </xsl:when>
         <xsl:otherwise>
            <xsl:for-each select="*">
               <xsl:choose>
                  <xsl:when test="name() = 'Error'">
                     <xsl:call-template name="Error">
                        <xsl:with-param name="SubQuestion" select="true()" />
                     </xsl:call-template>
                  </xsl:when>
                  <xsl:when test="name() = 'Label'">
                     <xsl:apply-templates select=".">
                        <xsl:with-param name="sLabelClass" select="'mrQuestionText'" />
                     </xsl:apply-templates>
                  </xsl:when>
                  <xsl:when test="name() = 'Control'">
                     <xsl:variable name="qGroupName" select="//Control[1]/@ElementID" />
                     <xsl:call-template name="Control">
                        <xsl:with-param name="qGroup" select="$qGroupName" />
                        <xsl:with-param name="qFullName">
                           <xsl:call-template name="CalculateQuestionName">
                              <xsl:with-param name="QuestionName" select="//Control[1]/@QuestionName" />
                           </xsl:call-template>
                        </xsl:with-param>
                     </xsl:call-template>
                  </xsl:when>
               </xsl:choose>
            </xsl:for-each>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="CellQuestion">
      <xsl:for-each select="*">
         <xsl:choose>
            <xsl:when test="name() = 'Questions'">
               <xsl:for-each select="Question">
                  <xsl:call-template name="CellQuestion" />
               </xsl:for-each>
            </xsl:when>
            <xsl:when test="name() = 'Question'">
               <xsl:text>Question: </xsl:text>
            </xsl:when>
            <xsl:when test="name() = 'Table'">
               <xsl:variable name="qGroupName" select="//Control[1]/@ElementID" />
               <xsl:variable name="qFullName">
                  <xsl:call-template name="CalculateQuestionName">
                     <xsl:with-param name="QuestionName" select="Control[1]/@QuestionName" />
                  </xsl:call-template>
               </xsl:variable>
               <xsl:call-template name="InsertQuestionDiv">
                  <xsl:with-param name="GroupName" select="$qGroupName" />
                  <xsl:with-param name="FullName" select="$qFullName" />
               </xsl:call-template>
            </xsl:when>
            <xsl:when test="name() = 'Control'">
               <xsl:variable name="qGroupName" select="@ElementID" />
               <xsl:variable name="qFullName">
                  <xsl:call-template name="CalculateQuestionName">
                     <xsl:with-param name="QuestionName" select="@QuestionName" />
                  </xsl:call-template>
               </xsl:variable>
               <xsl:variable name="qCustomType">
                  <xsl:call-template name="TranslateZIndexToName">
                     <xsl:with-param name="theID" select="Style/@ZIndex" />
                  </xsl:call-template>
               </xsl:variable>
               <xsl:if test="$qGroupName!=''">
                  <xsl:call-template name="InsertQuestionDiv">
                     <xsl:with-param name="qFullName" select="$qFullName" />
                     <xsl:with-param name="qGroupName" select="$qGroupName" />
                  </xsl:call-template>
               </xsl:if>
            </xsl:when>
            <xsl:when test="name() = 'Error'">
               <xsl:call-template name="Error">
                  <xsl:with-param name="SubQuestion" select="false()" />
               </xsl:call-template>
            </xsl:when>
         </xsl:choose>
      </xsl:for-each>
   </xsl:template>
   <xsl:template name="InsertQuestionDiv">
      <xsl:param name="qFullName" />
      <xsl:param name="qGroupName" />
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
            <xsl:value-of select="$qFullName" />
         </xsl:attribute>
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
            <xsl:with-param name="ElementID" select="$qGroupName" />
            <xsl:with-param name="FullName" select="$qFullName" />
         </xsl:call-template>
         <xsl:call-template name='TypePicker'>
            <xsl:with-param name="qGroupName" select="$qGroupName" />
            <xsl:with-param name="qFullName" select="$qFullName" />
         </xsl:call-template>
      </xsl:element>
   </xsl:template>
   <!--- Type Picker -->
   <xsl:template name='TypePicker'>
      <xsl:param name="qGroupName" />
      <xsl:param name="qFullName" />
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
               <xsl:call-template name="TypePickerChoose">
                  <xsl:with-param name="qGroupName" select="$qGroupName" />
                  <xsl:with-param name="qFullName" select="$qFullName" />
               </xsl:call-template>
            </xsl:for-each>
         </xsl:when>
         <xsl:when test="$inQuestion='Control'">
            <xsl:for-each select=".">
               <xsl:choose>
                  <xsl:when test="@ElementID">
                     <xsl:call-template name="TypePickerChoose">
                        <xsl:with-param name="qGroupName" select="@ElementID" />
                        <xsl:with-param name="qFullName" select="$qFullName" />
                     </xsl:call-template>
                  </xsl:when>
                  <xsl:otherwise>
                     <xsl:call-template name="TypePickerChoose">
                        <xsl:with-param name="qGroupName" select="$qGroupName" />
                        <xsl:with-param name="qFullName" select="$qFullName" />
                     </xsl:call-template>
                  </xsl:otherwise>
               </xsl:choose>
            </xsl:for-each>
         </xsl:when>
      </xsl:choose>
   </xsl:template>
   <xsl:template name='TypePickerChoose'>
      <xsl:param name="qGroupName" />
      <xsl:param name="qFullName" />
      <xsl:choose>
         <xsl:when test="name() = 'Control'">
            <xsl:call-template name="Control">
               <xsl:with-param name="qGroup" select="$qGroupName" />
               <xsl:with-param name="qFullName" select="$qFullName" />
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
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="name() = 'Table'">
            <xsl:apply-templates select=".">
               <xsl:with-param name="qGroup" select="$qGroupName" />
               <xsl:with-param name="qFullName" select="$qFullName" />
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
               <xsl:with-param name="Orientation" select="../Style/@Orientation" />
            </xsl:apply-templates>
         </xsl:when>
         <xsl:when test="name() = 'Questions'">
            <xsl:apply-templates />
         </xsl:when>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="Control">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
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
         <xsl:when test="@Type = 'Static'">
            <xsl:call-template name="StaticControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'Edit'">
            <xsl:call-template name="EditControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'SingleLineEdit'">
            <xsl:call-template name="SingleLineEditControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'ReadWriteEdit'">
            <xsl:call-template name="SingleLineEditControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'MultiLineEdit'">
            <xsl:call-template name="MultiLineEditControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'DropList'">
            <xsl:choose>
               <xsl:when test="$qCustomType='droplist'">
                  <xsl:call-template name="DropListControl">
                     <xsl:with-param name="qGroup" select="$qGroup" />
                     <xsl:with-param name="qFullName" select="$qFullName" />
                     <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                     <xsl:with-param name="qCustomType" select="$qCustomType" />
                  </xsl:call-template>
               </xsl:when>
               <xsl:when test="$qCustomType='combobox'">
                  <xsl:call-template name="ComboBoxControl">
                     <xsl:with-param name="qGroup" select="$qGroup" />
                     <xsl:with-param name="qFullName" select="$qFullName" />
                     <xsl:with-param name="qIsCustom" select="$qIsCustom" />
                     <xsl:with-param name="qCustomType" select="$qCustomType" />
                  </xsl:call-template>
               </xsl:when>
            </xsl:choose>
         </xsl:when>
         <xsl:when test="@Type = 'ComboList'">
            <xsl:call-template name="ComboListControl" />
         </xsl:when>
         <xsl:when test="@Type = 'RadioButton'">
            <xsl:call-template name="RadioButtonControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'CheckButton'">
            <xsl:call-template name="CheckButtonControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:when test="@Type = 'ListBox'">
            <xsl:call-template name="ListBoxControl" />
         </xsl:when>
         <xsl:when test="@Type = 'ListControl'">
            <xsl:call-template name="ListControlControl" />
         </xsl:when>
         <xsl:when test="@Type = 'Button'">
            <xsl:call-template name="ButtonControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
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
            <xsl:when test="./Style/@ElementAlign='Right'">
               <xsl:text>option</xsl:text>
            </xsl:when>
            <xsl:otherwise>
               <xsl:text>question</xsl:text>
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
   <!--- TABLE -->
   <xsl:template match="Table">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
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
               <xsl:call-template name="appComponentScript">
                  <xsl:with-param name="ComponentName" select="'oQuestionGrid'" />
                  <xsl:with-param name="ElementID" select="//Control[1]/@ElementID" />
                  <xsl:with-param name="FullName">
                     <xsl:call-template name="CalculateQuestionName">
                        <xsl:with-param name="QuestionName" select="//Control[1]/@QuestionName" />
                     </xsl:call-template>
                  </xsl:with-param>
               </xsl:call-template>
               <xsl:for-each select="./Row">
                  <xsl:sort select="@Y" data-type="number" />
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
   <xsl:template match="Row" />
   <xsl:template match="Cell" />
   <xsl:template name="CellImpl" />
   <xsl:template name="CellSpanStyle" />
   <!-- SPAN LAYOUT -->
   <xsl:template name="SpanRow">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:param name="Orientation" select="Column" />
      <xsl:for-each select="Row">
         <xsl:sort select="@Y" order="ascending" data-type="number" />
         <xsl:call-template name="SpanCell">
            <xsl:with-param name="Orientation" select="$Orientation" />
         </xsl:call-template>
      </xsl:for-each>
   </xsl:template>
   <xsl:template name="SpanCell">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:param name="Orientation" select="Column" />
      <xsl:for-each select="Cell">
         <xsl:sort select="@X" order="ascending" data-type="number" />
         <xsl:for-each select="*">
            <xsl:choose>
               <xsl:when test="name() = 'Control'">
                  <xsl:call-template name="Control">
                     <xsl:with-param name="qGroup" select="$qGroup" />
                     <xsl:with-param name="qFullName" select="$qFullName" />
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
               <xsl:when test="name() = 'ErrorStopped'">
                  <xsl:apply-templates select=".">
                     <xsl:with-param name="sLabelClass" select="'a-label-error'" />
                     <xsl:with-param name="bWithinTable" select="true()" />
                  </xsl:apply-templates>
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
      <xsl:choose>
         <xsl:when test="name() = 'Error'">
            <xsl:choose>
               <xsl:when test="$SubQuestion=false()">
                  <xsl:element name="div">
                     <xsl:attribute name="class">a-label-error</xsl:attribute>
                     <xsl:for-each select="Text">
                        <xsl:value-of select="." />
                     </xsl:for-each>
                  </xsl:element>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:element name="span">
                     <xsl:attribute name="class">a-label-error</xsl:attribute>
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
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:element name="div">
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
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <!--- Need to decide whether to use a text area of a edit control -->
      <xsl:choose>
         <xsl:when test="$qCustomType='multilineedit'">
            <xsl:call-template name="MultiLineEditControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:when>
         <xsl:otherwise>
            <xsl:call-template name="SingleLineEditControl">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
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
   <xsl:template name="MultiLineEditControl">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <!--- Control Label -->
      <xsl:if test="Category[1]/Label">
         <xsl:choose>
            <xsl:when test="$bIncludeElementIds">
               <xsl:element name="label">
                  <xsl:attribute name="for">
                     <xsl:value-of select="@ElementID" />
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
            <xsl:value-of select="@ElementID" />
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qFullName" />
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
         <xsl:with-param name="ElementID" select="@ElementID" />
         <xsl:with-param name="FullName" select="$qFullName" />
      </xsl:call-template>
   </xsl:template>

   <xsl:template name="DropListControl">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:element name="div">
         <xsl:attribute name="class">
            <xsl:text>o-select-droplist</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qFullName" />
         </xsl:attribute>
         <xsl:element name="script">
            <xsl:text>app.registerComponent('oSelectDroplist','</xsl:text>
            <xsl:value-of select="$qGroup" />
            <xsl:text>','</xsl:text>
            <xsl:value-of select="$qFullName" />
            <xsl:text>');</xsl:text>
         </xsl:element>
         <xsl:variable name="data-questionid">
            <xsl:value-of select="$qGroup" />
         </xsl:variable>
         <xsl:variable name="QuestionID">
            <xsl:value-of select="@QuestionName" />
         </xsl:variable>
         <xsl:element name="select">
            <xsl:attribute name="class">m-select-droplist</xsl:attribute>
            <xsl:if test="Style/@Width">
               <xsl:attribute name="style">
                  <xsl:text>width:</xsl:text>
                  <xsl:value-of select="Style/@Width" />
                  <xsl:text>;</xsl:text>
               </xsl:attribute>
            </xsl:if>
            <xsl:for-each select="Category">
               <xsl:element name="option">
                  <xsl:attribute name="class">a-select-option</xsl:attribute>
                  <xsl:attribute name="data-questionid">
                     <xsl:value-of select="$data-questionid" />
                     <xsl:value-of select="@CategoryID" />
                  </xsl:attribute>
                  <xsl:if test="$bShowOnly != false()">
                     <xsl:attribute name="disabled" />
                  </xsl:if>
                  <!--- Read Only -->
                  <xsl:if test="../Style/Control/@ReadOnly = 'true'">
                     <xsl:attribute name="disabled" />
                  </xsl:if>
                  <xsl:attribute name="value">
                     <xsl:value-of select="@Name" />
                  </xsl:attribute>
                  <xsl:if test="@Alt != ''">
                     <xsl:attribute name="Alt">
                        <xsl:value-of select="@Alt" />
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:if test="$bIncludeElementIds">
                     <xsl:attribute name="id">
                        <xsl:value-of select="$data-questionid" />
                        <xsl:value-of select="@CategoryID" />
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:if test="@Checked = 'true'">
                     <xsl:attribute name="selected" />
                  </xsl:if>
                  <xsl:value-of disable-output-escaping="yes" select="Label/Text" />
               </xsl:element>
            </xsl:for-each>

         </xsl:element>
      </xsl:element>
      <xsl:element name="script">
         <xsl:text>app.registerComponent('mSelectDropList','</xsl:text>
         <xsl:value-of select="$qGroup" />
         <xsl:text>','</xsl:text>
         <xsl:value-of select="$qFullName" />
         <xsl:text>');</xsl:text>
      </xsl:element>

   </xsl:template>

   <xsl:template name="ComboBoxControl">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:element name="div">
         <xsl:attribute name="class">
            <xsl:text>o-select-combobox</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qFullName" />
         </xsl:attribute>
         <xsl:element name="script">
            <xsl:text>app.registerComponent('oSelectCombobox','</xsl:text>
            <xsl:value-of select="$qGroup" />
            <xsl:text>','</xsl:text>
            <xsl:value-of select="$qFullName" />
            <xsl:text>');</xsl:text>
         </xsl:element>
         <xsl:variable name="data-questionid">
            <xsl:value-of select="$qGroup" />
         </xsl:variable>
         <xsl:variable name="QuestionID">
            <xsl:value-of select="@QuestionName" />
         </xsl:variable>

         <xsl:call-template name="MakeInputControl">
            <xsl:with-param name="qGroup" select="$qGroup" />
            <xsl:with-param name="qFullName" select="$qFullName" />
            <xsl:with-param name="qIsCustom" select="$qIsCustom" />
            <xsl:with-param name="qCustomType" select="$qCustomType" />
         </xsl:call-template>

         <xsl:element name="ul">
            <xsl:attribute name="class">m-select-combobox-unorderedlist</xsl:attribute>
            <xsl:attribute name="id">
               <xsl:value-of select="$qFullName" />
               <xsl:text>_list</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="data-questiongroup">
               <xsl:value-of select="$qFullName" />
            </xsl:attribute>
            <xsl:if test="Style/@Width">
               <xsl:attribute name="style">
                  <xsl:text>width:</xsl:text>
                  <xsl:value-of select="Style/@Width" />
                  <xsl:text>;</xsl:text>
               </xsl:attribute>
            </xsl:if>
            <xsl:for-each select="Category">
               <xsl:element name="li">
                  <xsl:attribute name="class">a-select-combobox-option</xsl:attribute>
                  <xsl:attribute name="data-questionid">
                     <xsl:value-of select="$data-questionid" />
                     <xsl:value-of select="@CategoryID" />
                  </xsl:attribute>
                  <xsl:attribute name="data-questiongroup">
                     <xsl:value-of select="$qFullName" />
                  </xsl:attribute>
                  <xsl:if test="$bShowOnly != false()">
                     <xsl:attribute name="disabled" />
                  </xsl:if>
                  <!--- Read Only -->
                  <xsl:if test="../Style/Control/@ReadOnly = 'true'">
                     <xsl:attribute name="disabled" />
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
                        <xsl:value-of select="$data-questionid" />
                        <xsl:value-of select="@CategoryID" />
                     </xsl:attribute>
                  </xsl:if>
                  <xsl:if test="@Checked = 'true'">
                     <xsl:attribute name="selected" />
                  </xsl:if>
                  <xsl:value-of disable-output-escaping="yes" select="Label/Text" />
               </xsl:element>
            </xsl:for-each>
         </xsl:element>
      </xsl:element>
   </xsl:template>

   <xsl:template name="ComboListControl">
      <br />
      <B>ComboList NOT IMPLEMENTED</B>
   </xsl:template>
   <xsl:template name="RadioButtonControl">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <!--- Control Label -->
      <xsl:element name="div">
         <xsl:attribute name="data-exclusive">
            <xsl:text>true</xsl:text>
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="@ElementID" />
            <xsl:if test="Category[1]/@CategoryID">
               <xsl:value-of select="Category[1]/@CategoryID" />
            </xsl:if>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qFullName" />
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
         <xsl:attribute name="class">
            <xsl:text>m-option-base </xsl:text>
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text>below</xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text>side</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:if test="Category[1]/@CategoryID">
            <xsl:variable name="ElementID">
               <xsl:value-of select="@ElementID" />
               <xsl:if test="Category[1]/@CategoryID">
                  <xsl:value-of select="Category[1]/@CategoryID" />
               </xsl:if>
            </xsl:variable>
            <xsl:call-template name="appComponentScript">
               <xsl:with-param name="ComponentName" select="'mOptionBase'" />
               <xsl:with-param name="ElementID" select="$ElementID" />
               <xsl:with-param name="FullName" select="$qFullName" />
            </xsl:call-template>
         </xsl:if>
         <xsl:element name="input">
            <xsl:attribute name="class">hiddencontrol</xsl:attribute>
            <!--- Set Control Type -->
            <xsl:attribute name="type">radio</xsl:attribute>
            <!--- Input name -->
            <xsl:attribute name="name">
               <xsl:value-of select="@QuestionName" />
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
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false()">
               <xsl:attribute name="disabled" />
            </xsl:if>
            <!--- Read Only -->
            <xsl:if test="Style/Control/@ReadOnly = 'true'">
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
               <xsl:value-of select="@ElementID" />
               <xsl:if test="Category[1]/@CategoryID">
                  <xsl:value-of select="Category[1]/@CategoryID" />
               </xsl:if>
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
            </xsl:call-template>
         </xsl:for-each>
      </xsl:element>
   </xsl:template>
   <xsl:template name="CheckButtonControl">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <!--- Control Label -->
      <xsl:element name="div">
         <xsl:attribute name="data-exclusive">
            <xsl:choose>
               <xsl:when test="Category/Label/Style/Font/@IsBold='true'">
                  <xsl:text>true</xsl:text>
               </xsl:when>
               <xsl:otherwise>
                  <xsl:text>false</xsl:text>
               </xsl:otherwise>
            </xsl:choose>
         </xsl:attribute>
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="@ElementID" />
            <xsl:if test="Category[1]/@CategoryID">
               <xsl:value-of select="Category[1]/@CategoryID" />
            </xsl:if>
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qFullName" />
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
         <xsl:attribute name="class">
            <xsl:text>m-option-base</xsl:text>
            <xsl:choose>
               <xsl:when test="Style/@ElementAlign='NewLine'">
                  <xsl:text>below</xsl:text>
               </xsl:when>
               <xsl:when test="Style/@ElementAlign='Right'">
                  <xsl:text>side</xsl:text>
               </xsl:when>
            </xsl:choose>
         </xsl:attribute>
         <xsl:element name="script">
            <xsl:text>app.registerComponent('mOptionBase','</xsl:text>
            <xsl:value-of select="@ElementID" />
            <xsl:if test="Category[1]/@CategoryID">
               <xsl:value-of select="Category[1]/@CategoryID" />
            </xsl:if>
            <xsl:text>','</xsl:text>
            <xsl:value-of select="$qFullName" />
            <xsl:text>');</xsl:text>
         </xsl:element>
         <xsl:element name="input">
            <xsl:attribute name="class">hiddencontrol</xsl:attribute>
            <!--- Set Control Type -->
            <xsl:attribute name="type">checkbox</xsl:attribute>
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
            <!--- Show Only -->
            <xsl:if test="$bShowOnly != false()">
               <xsl:attribute name="disabled" />
            </xsl:if>
            <!--- Read Only -->
            <xsl:if test="Style/Control/@ReadOnly = 'true'">
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
               <xsl:value-of select="@ElementID" />
               <xsl:if test="Category[1]/@CategoryID">
                  <xsl:value-of select="Category[1]/@CategoryID" />
               </xsl:if>
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
               <xsl:with-param name="bWithinTable" select="false()" />
               <xsl:with-param name="SubQuestion" select="true()" />
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
   <xsl:template name="ListControlControl">
      <br />
      <B>ListControl NOT IMPLEMENTED</B>
   </xsl:template>
   <xsl:template name="ButtonControl">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
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
                  <xsl:attribute name="sLabelClass">aButtonImage</xsl:attribute>
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
            <xsl:element name="script">
               <xsl:text>app.registerComponent('aButtonOption','</xsl:text>
               <xsl:value-of select="@ElementID" />
               <xsl:if test="Category[1]/@CategoryID">
                  <xsl:value-of select="Category[1]/@CategoryID" />
               </xsl:if>
               <xsl:text>','</xsl:text>
               <xsl:value-of select="$qFullName" />
               <xsl:text>');</xsl:text>
            </xsl:element>
            <xsl:element name="input">
               <xsl:attribute name="data-questionid">
                  <xsl:value-of select="@ElementID" />
                  <xsl:if test="Category[1]/@CategoryID">
                     <xsl:value-of select="Category[1]/@CategoryID" />
                  </xsl:if>
               </xsl:attribute>
               <xsl:attribute name="data-questiongroup">
                  <xsl:value-of select="$qFullName" />
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
                  <xsl:attribute name="class">a-button-option</xsl:attribute>
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
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <xsl:param name="Orientation" select="Column" />
      <xsl:element name="tr">
         <xsl:attribute name="class">
            <xsl:text>m-structure-row</xsl:text>
            <xsl:if test="count(Cell/Question)=0">
               <xsl:text>-heading</xsl:text>
            </xsl:if>
         </xsl:attribute>
         <xsl:attribute name='data-iterationname'>
         </xsl:attribute>
         <xsl:for-each select="./Cell">
            <xsl:sort select="@X" data-type="number" />
            <xsl:call-template name="StructureCell">
               <xsl:with-param name="qGroup" select="$qGroup" />
               <xsl:with-param name="qFullName" select="$qFullName" />
               <xsl:with-param name="qIsCustom" select="$qIsCustom" />
               <xsl:with-param name="qCustomType" select="$qCustomType" />
            </xsl:call-template>
         </xsl:for-each>
      </xsl:element>
   </xsl:template>
   <xsl:template name="StructureCell">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
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
      </xsl:variable>
      <xsl:element name="{$cellType}">
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
                  <xsl:call-template name="CellQuestion" />
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
                  <xsl:choose>
                     <xsl:when test="not(@Type = 'RadioButton') and not(@Type ='CheckButton')">
                        <xsl:call-template name="InsertQuestionDiv">
                           <xsl:with-param name="qFullName">
                              <xsl:call-template name="CalculateQuestionName">
                                 <xsl:with-param name="QuestionName" select="@QuestionName" />
                              </xsl:call-template>
                           </xsl:with-param>
                           <xsl:with-param name="qGroupName" select="@ElementID" />
                        </xsl:call-template>
                     </xsl:when>
                     <xsl:otherwise>
                        <xsl:call-template name="Control">
                           <xsl:with-param name="qGroup" select="@ElementID" />
                           <xsl:with-param name="qFullName">
                              <xsl:call-template name="CalculateQuestionName">
                                 <xsl:with-param name="QuestionName" select="@QuestionName" />
                              </xsl:call-template>
                           </xsl:with-param>
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
               <xsl:otherwise>
                  <xsl:apply-templates select="." />
               </xsl:otherwise>
            </xsl:choose>
         </xsl:for-each>
      </xsl:element>
   </xsl:template>
   <!--- General Functions -->
   <xsl:template name="MakeInputControl">
      <xsl:param name="qGroup" />
      <xsl:param name="qFullName" />
      <xsl:param name="qIsCustom" />
      <xsl:param name="qCustomType" />
      <!--- Edit box -->
      <xsl:element name="input">
         <xsl:attribute name="data-questionid">
            <xsl:value-of select="@ElementID" />
         </xsl:attribute>
         <xsl:attribute name="data-questiongroup">
            <xsl:value-of select="$qFullName" />
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
            <xsl:when test="$qCustomType='hnumberslider'">
               <xsl:attribute name="type">range</xsl:attribute>
            </xsl:when>
            <xsl:otherwise>
               <xsl:attribute name="type">text</xsl:attribute>
            </xsl:otherwise>
         </xsl:choose>
         <!--- Input name -->
         <xsl:attribute name="name">
            <xsl:value-of select="@QuestionName" />
            <xsl:if test="@Type='RadioButton' or @Type='CheckBox'">
               <xsl:value-of select="Category[1]/@Name" />
            </xsl:if>
         </xsl:attribute>
         <!--- ID -->
         <xsl:if test="$bIncludeElementIds">
            <xsl:attribute name="id">
               <xsl:if test="@ElementID">
                  <xsl:value-of select="@ElementID" />
               </xsl:if>
               <xsl:if test="@Type='RadioButton' or @Type='CheckBox'">
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
            <xsl:call-template name="ControlStyle">
               <xsl:with-param name="IgnoreWidth">
                  <xsl:choose>
                     <xsl:when test="$qCustomType = 'hnumberslider'">
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
                  <xsl:value-of select="$qFullName" />
                  <xsl:text>_list</xsl:text>
               </xsl:attribute>
            </xsl:when>
         </xsl:choose>
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
            <xsl:if test="(($qIsCustom!='false') and ($qCustomType != 'hnumberslider'))">
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
         <xsl:when test="$theID = '-30'">
            <xsl:value-of select="'multilineedit'" />
         </xsl:when>
         <xsl:when test="$theID = '-40'">
            <xsl:value-of select="'choice'" />
         </xsl:when>
         <xsl:when test="$theID = '-50'">
            <xsl:value-of select="'hnumberslider'" />
         </xsl:when>
         <xsl:when test="$theID = '-60'">
            <xsl:value-of select="'list'" />
         </xsl:when>
         <xsl:when test="$theID = '-61'">
            <xsl:value-of select="'combolist'" />
         </xsl:when>
         <xsl:when test="$theID = '-65'">
            <xsl:value-of select="'droplist'" />
         </xsl:when>
         <xsl:when test="$theID = '-68'">
            <xsl:value-of select="'combobox'" />
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
         <xsl:when test="$theID = '-30'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:when test="$theID = '-40'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-41'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-50'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-60'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-61'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-65'">
            <xsl:value-of select="'true'" />
         </xsl:when>
         <xsl:when test="$theID = '-68'">
            <xsl:value-of select="'false'" />
         </xsl:when>
         <xsl:otherwise>
            <xsl:value-of select="'true'" />
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
   <xsl:template name="appComponentScript">
      <xsl:param name="ComponentName" />
      <xsl:param name="ElementID" />
      <xsl:param name="FullName" />
      <xsl:element name="script">
         <xsl:text>app.registerComponent('</xsl:text>
         <xsl:value-of select="$ComponentName" />
         <xsl:text>','</xsl:text>
         <xsl:value-of select="$ElementID" />
         <xsl:text>','</xsl:text>
         <xsl:value-of select="$FullName" />
         <xsl:text>');</xsl:text>
      </xsl:element>
   </xsl:template>
   <xsl:template name="CamelCaseWord">
      <xsl:param name="text" />
      <xsl:value-of select="translate(substring($text,1,1),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')" />
      <xsl:value-of select="translate(substring($text,2,string-length($text)-1),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')" />
   </xsl:template>

   <xsl:template name="CalculateQuestionName">
      <xsl:param name="QuestionName" />
      <xsl:choose>
         <xsl:when test="substring($QuestionName, string-length($QuestionName) - 1)='_C'">
            <xsl:value-of select="substring($QuestionName, 1, string-length($QuestionName)-2)" />
         </xsl:when>
         <xsl:otherwise>
            <xsl:value-of select="$QuestionName" />
         </xsl:otherwise>
      </xsl:choose>
   </xsl:template>
</xsl:stylesheet>