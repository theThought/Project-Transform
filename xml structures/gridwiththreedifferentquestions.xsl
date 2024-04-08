<Questions>
    <Question>
        <Style ElementAlign="NewLine" ZIndex="-10"></Style>
        <Table UseTablesLayout="-1" Summary="Grid Categorical (visibility)" TableId="_Q1">
            <Row Y="0">
                <Cell X="1" Y="0" Class="mrGridQuestionText">
                    <Label>
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="Right"></Style>
                        <Text>ENT</Text>
                    </Label>
                </Cell>
                <Cell X="2" Y="0" Class="mrGridQuestionText">
                    <Label>
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="Right"></Style>
                        <Text>dermatology</Text>
                    </Label>
                </Cell>
                <Cell X="3" Y="0" Class="mrGridQuestionText">
                    <Label>
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="Right"></Style>
                        <Text>severe eosinophilic asthma</Text>
                    </Label>
                </Cell>
                <Cell X="4" Y="0" Class="mrGridQuestionText">
                    <Label>
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="Right"></Style>
                        <Text>Oncology</Text>
                    </Label>
                </Cell>
                <Cell X="5" Y="0" Class="mrGridQuestionText">
                    <Label>
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="Right"></Style>
                        <Text>General Discussion</Text>
                    </Label>
                </Cell>
                <Cell X="0" Y="0"></Cell>
            </Row>
            <Row Y="1">
                <Cell X="0" Y="1" Class="mrGridCategoryText">
                    <Label>
                        <Style Align="Left" VerticalAlign="Middle" ElementAlign="Right"></Style>
                    </Label>
                </Cell>
                <Cell X="1" Y="1">
                    <Control Type="RadioButton" QuestionName="_QGridVisibility_QvisCat_Qx1_QvisCatSlice_C" ElementID="_Q1_Q0_Q0_C">
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="NewLine">
                            <Control Type="RadioButton"></Control>
                        </Style>
                        <Category Name="ENT" CategoryID="0"></Category>
                    </Control>
                </Cell>
                <Cell X="2" Y="1">
                    <Control Type="RadioButton" QuestionName="_QGridVisibility_QvisCat_Qx1_QvisCatSlice_C" ElementID="_Q1_Q0_Q0_C">
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="NewLine">
                            <Control Type="RadioButton"></Control>
                        </Style>
                        <Category Name="dermatology" CategoryID="1"></Category>
                    </Control>
                </Cell>
                <Cell X="3" Y="1">
                    <Control Type="RadioButton" QuestionName="_QGridVisibility_QvisCat_Qx1_QvisCatSlice_C" ElementID="_Q1_Q0_Q0_C">
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="NewLine">
                            <Control Type="RadioButton"></Control>
                        </Style>
                        <Category Name="SEA" CategoryID="2"></Category>
                    </Control>
                </Cell>
                <Cell X="4" Y="1">
                    <Control Type="RadioButton" QuestionName="_QGridVisibility_QvisCat_Qx1_QvisCatSlice_C" ElementID="_Q1_Q0_Q0_C">
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="NewLine">
                            <Control Type="RadioButton"></Control>
                        </Style>
                        <Category Name="Oncology" CategoryID="3"></Category>
                    </Control>
                </Cell>
                <Cell X="5" Y="1">
                    <Control Type="RadioButton" QuestionName="_QGridVisibility_QvisCat_Qx1_QvisCatSlice_C" ElementID="_Q1_Q0_Q0_C">
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="NewLine">
                            <Control Type="RadioButton"></Control>
                        </Style>
                        <Category Name="Gen" CategoryID="4"></Category>
                    </Control>
                </Cell>
            </Row>
        </Table>
    </Question>
    <Question>
        <Style ElementAlign="NewLine" ZIndex="-10"></Style>
        <Table UseTablesLayout="-1" Summary="Grid Numeric (visibility)" TableId="_Q2">
            <Row Y="0">
                <Cell X="0" Y="0" Class="mrGridCategoryText">
                    <Label>
                        <Style Align="Left" VerticalAlign="Middle" ElementAlign="Right"></Style>
                    </Label>
                </Cell>
                <Cell X="1" Y="0">
                    <Question>
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="NewLine" ZIndex="-20">
                            <Control Type="SingleLineEdit"></Control>
                        </Style>
                        <Control Type="SingleLineEdit" QuestionName="_QGridVisibility_QvisLong_Qx1_QvisLongSlice" ElementID="_Q2_Q0_Q0" Value="" Length="11">
                            <Style Align="Center" VerticalAlign="Middle" ElementAlign="NewLine" ZIndex="-20">
                                <Control Type="SingleLineEdit"></Control>
                            </Style>
                        </Control>
                    </Question>
                </Cell>
            </Row>
        </Table>
    </Question>
    <Question>
        <Style ElementAlign="NewLine" ZIndex="-10"></Style>
        <Table UseTablesLayout="-1" Summary="Grid Droplist (visibility)" TableId="_Q3">
            <Row Y="0">
                <Cell X="0" Y="0" Class="mrGridCategoryText">
                    <Label>
                        <Style Align="Left" VerticalAlign="Middle" ElementAlign="Right"></Style>
                    </Label>
                </Cell>
                <Cell X="1" Y="0">
                    <Control Type="DropList" QuestionName="_QGridVisibility_QvisDrop_Qx1_QvisDropSlice_C" ElementID="_Q3_Q0_Q0_C">
                        <Style Align="Center" VerticalAlign="Middle" ElementAlign="NewLine" ZIndex="-60">
                            <Control Type="DropList"></Control>
                        </Style>
                        <Category Name="ENT" CategoryID="0">
                            <Label>
                                <Style Align="Center" VerticalAlign="Middle" ElementAlign="Right"></Style>
                                <Text>ENT</Text>
                            </Label>
                        </Category>
                        <Category Name="dermatology" CategoryID="1">
                            <Label>
                                <Style Align="Center" VerticalAlign="Middle" ElementAlign="Right"></Style>
                                <Text>dermatology</Text>
                            </Label>
                        </Category>
                        <Category Name="SEA" CategoryID="2">
                            <Label>
                                <Style Align="Center" VerticalAlign="Middle" ElementAlign="Right"></Style>
                                <Text>severe eosinophilic asthma</Text>
                            </Label>
                        </Category>
                        <Category Name="Oncology" CategoryID="3">
                            <Label>
                                <Style Align="Center" VerticalAlign="Middle" ElementAlign="Right"></Style>
                                <Text>Oncology</Text>
                            </Label>
                        </Category>
                        <Category Name="Gen" CategoryID="4">
                            <Label>
                                <Style Align="Center" VerticalAlign="Middle" ElementAlign="Right"></Style>
                                <Text>General Discussion</Text>
                            </Label>
                        </Category>
                    </Control>
                </Cell>
            </Row>
        </Table>
    </Question>
</Questions>