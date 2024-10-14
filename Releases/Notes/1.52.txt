# Transform Project v1.52
Healthcare Transformation project for Dimensions Surveys

## Summary
In this release there are a number of bug fixes and adjustments to existing functionality
This completes Workbook v1

### DropList
The existing dropdown functionality has been replaced by a DropList
This looks exactly the same as dropdown and works in the same way, however the setup is different
While a dropdown uses a choice question in its natural format, as a base, this question type uses the droplist presentation of a choice question
This has been implemented to enable support for droplists in grids, however that functionality is not included in this release

To define a droplist:
* Metadata *
```
DrugOrdinal "Given a choice where would you prioritise this drug?" 
        style(
            ZIndex = -41,
            Width = "4em",
			Control(type="droplist")            
        ) categorical[1]
        {
    first "1st",
    second "2nd",
    third "3rd",
    fourth "4th"
    };
```

* Routing *
```
AddCustomProperties(DrugOrdinal, "DrugOrdinal", "{'displayicon':false,'onesize':{'state':true},'jumptofirstletter':true,'listsize':10,'showanswers':false,'type':'dropdown','placeholder':''}", "replace")
DrugOrdinal.Ask()
```
Within this version the custom properties have been improved
- List size is now supported
- showanswers is not supported
- jumptofirstletter is not supported

The style/width property is now supported to allow the control of the width of the control

A new question type DropList has been allocated, this is ZIndex: -41

### Visibility Rules
New visibilty rules are now supported.  The full list is now:
- Specific Option
- Not Specific Option
- Specific Value
- Min Value
- Max Value
- Not Value

The mechanism that clears old values out when questions are made invisible has been adjusted, as it was clearing out values that were valid.
There are lots of variations of these rules including cascading rules and so this aspect of the system requires significant researcher testing

Droplists now work correctly when a visibility rule is applied, the full control is now visible with the droplist rolling over to the next question when necessary


### Complex Progress Bars
A new mechanism has been introduced that supports complex progress bars that show progress of sections and pages within sections.

A new question template has been provided that shows the implementation of these Progressbars.  The normal mrProgressbar functionality is removed, it is replaced by a Banner

```
<div class="overall-progress complex" id="_Progress" data-questiongroup="_Progress"><!-- progress bar -->
	<script>app.registerComponent('oProgress', '_Progress', '_Progress');</script>
	<mrBannerText Name="CustomProgressBar" />
</div>
```
Within the mdd this Banner needs to be declared:

```

```

A function has been added to the routing to handle the creation of the information that the browser needs to setup the Progress bar 
```
function ComplexJSON_Create(theIOM, theCurrentSection, theArray)
dim curentItem
dim counter
dim arrayLength
dim newJSON
dim jsonStart, jsonFull
dim scriptStart, scriptEnd
dim quote
	quote = ChrW(34)
	newJSON = ""
	scriptStart = "<script>app.RegisterProperties('_Progress',"
	scriptEnd = ")</script>"
	jsonstart = MakeString("{'currentsection':", theCurrentSection, ",'sections':[")
	arrayLength = theArray.Len()
	for counter = 0 to arrayLength -1
		if newJSON <> "" then newJSON = MakeString(newJSON, ",")
		newJSON = MakeString(newJSON, theArray[counter])
	Next
	jsonFull = MakeString(jsonStart, newJSON, "]}").replace("'", quote)
	theIOM.Banners["CustomProgressBar"].Text = MakeString(scriptStart, jsonFull, scriptEnd)
	
	ComplexJSON_Create = MakeString(scriptStart, jsonFull, scriptEnd)
end function
```
There are three inputs to this function:
- IOM 
- A number indicating the current section number 
- An array describing each of the sections 

Here is an example of a call to this function:

```
progressJSON = ComplexJSON_Create(IOM, 2, progressJSONarray)

```
The array that defines the sections contains json definitions, the following is an example:

```
{'title':'Original Questions','pages':{'total':6,'current':0}}
```
Here is an example setup of the arrays required for a multi-section survey:

```
progressJSONarray[1] = "{'title':'Section Selection','pages':{'total':1,'current':1}}"
progressJSONarray[2] = "{'title':'Original Questions','pages':{'total':6,'current':0}}"
progressJSONarray[3] = "{'title':'Custom Property Questions','pages':{'total':7,'current':0}}"
progressJSONarray[4] = "{'title':'droplists','pages':{'total':4,'current':0}}"
progressJSONarray[5] = "{'title':'Complex Grids','pages':{'total':4,'current':0}}"
progressJSONarray[6] = "{'title':'Choices','pages':{'total':8,'current':0}}"
progressJSONarray[7] = "{'title':'Visibility Rules','pages':{'total':1,'current':0}}"
progressJSONarray[8] = "{'title':'Basic Grids','pages':{'total':3,'current':0}}"
progressJSONarray[9] = "{'title':'Grids with Totals','pages':{'total':4,'current':0}}"
progressJSONarray[10] = "{'title':'Dropdowns','pages':{'total':2,'current':0}}"
```

Where:
- Title is the title of the section 
- pages/total defines the total number of pages in the section
- pages/current defines the current page the user is on within that section 

When current is 0, the section is not started
When current is less than or equal to total (but greater that zero), the section is in progress
When current is greater than total, the section is complete

Each time the user moves pages and the progress bar needs to be updated the above function is called, as shown below:

```
progressJSONarray[2] = "{'title':'Original Questions','pages':{'total':6,'current':1}}"
progressJSON = ComplexJSON_Create(IOM, 2, progressJSONarray)
Hello.Show()

progressJSONarray[2] = "{'title':'Original Questions','pages':{'total':6,'current':2}}"
progressJSON = ComplexJSON_Create(IOM, 2, progressJSONarray)
FirstName.ask()


progressJSONarray[2] = "{'title':'Original Questions','pages':{'total':6,'current':3}}"
progressJSON = ComplexJSON_Create(IOM, 2, progressJSONarray)
FirstLine.Ask()
```

Ths output of this function is a json string that is inserted within the Banner
This code is just an example, there are other ways to provide the relevant JSON to the browser to create the progress bar

### Buttons
Buttons have reverted back to submit buttons 
The functionality required for multi-state buttons that can make a multi-answer question has been delayed.
In the future this will be implemented as a different question type.

To implement submit buttons on a single-answer choice question:

* metadata *
```
ChoiceAsButtons "Select one of the following colours"
        style(
            ZIndex = -40
        )
    categorical [1..1]
    {
        use choiceasbuttonslist -
    };

    choiceasbuttonslist "" define
    {
        blue "blue"
            style(
                Control(
                    Type = "Button"
                )
            ),
        pink "pink"
            style(
                Control(
                    Type = "Button"
                )
            ),
        yellow "yellow"
            style(
                Control(
                    Type = "Button"
                )
            ),
        lightgreen "light green"
            style(
                Control(
                    Type = "Button"
                )
            ),
        orange "orange"
            style(
                Control(
                    Type = "Button"
                )
            )
    };
```
* routing *
```
AddCustomProperties(ChoiceAsButtons, "ChoiceAsButtons", "{'balance':{'state':true},'onesize':{'state':false}}", "replace")
ChoiceAsButtons.ask()
```
All the custom properties for choice questions are supported.

### Grids
Grid Totals have been enhanced with various improvements to formatting and alignment
Exceptions have also been introduced 
Exceptions can be applied to row and/or column totals.
They work based on an index of columns/rows with data.  This means that index 1 is the first row/column of data in the table (headings are ignored)

This is the first version of the exceptions and the implementation is under review, changes may be made in the future.

In a table where the first column of a table contains one value, also contains a number of additional columns that needed to be added for each row.  On the right of each row is a total or the row, however that total should not include the content of the first row.

The defintion of the table is:

```
PainRelief "provide amount of pain relief you provided each patient and the number of doses they took each day" loop
	{
	use peoplelist
	} fields
	( 
		dosesgiven "Provided" style(zindex="-20", width="3em") long[0..100];
		Monday "Monday" style(zindex="-20", width="3em") long[0..100];
		Tuesday "Tuesday" style(zindex="-20", width="3em") long[0..100];
		Wednesday "Wednesday" style(zindex="-20", width="3em") long[0..100];
		Thursday "Thursday" style(zindex="-20", width="3em") long[0..100];
		Friday "Friday" style(zindex="-20", width="3em") long[0..100];
	) expand;
```

Totals are added to the rows of this table by adding custom properties
```
'totals':{'rows':{'visible':true,'exceptions':[]}}
```

Building an exception for the first column is also achieved through a custom property
```
'totals':{'columns':{'visible':false,'exceptions':[1]}}
```

These are combined to make the custom properties for the grid question:
```
AddCustomProperties(PainRelief, "PainRelief", "{'caption':'Pain Relief','totals':{'rows':{'visible':true,'exceptions':[]},'columns':{'visible':false,'exceptions':[1]}}}", "replace")
```

### Error Messages 
This release includes several improvements on Error Messages
Top-level error messages are formatted differently to make them more obvious
In grid error messages are now displayed
Sub-queston error messages are also visible

