
function MyApp () {
  var me = this
  this.xhttp = null
  this.fileList = { folder: '', files: ['question.xsl'], subfiles: [] }
  this.processingSubfiles = false
  this.DateStamp = new Date()

  var bigXMLstring = "<?xml version='1.0' encoding='UTF-8'?><xsl:stylesheet xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:fo='http://www.w3.org/1999/XSL/Format' version='1.0'><xsl:output method='xml' indent='yes' /><xsl:param name='bIncludeCSSStyles' select='true()' /><xsl:param name='bIncludeElementIds' select='true()' /><xsl:param name='sImageLocation' /><xsl:param name='bShowOnly' select='false()' /><xsl:param name='bAutoComplete' select='false()' /></xsl:stylesheet>"

  this.onUpdate = function (theEvent) {
    var valuePoint = document.getElementById(theEvent.detail.prompt)
    if (theEvent.detail.action !== 'increment') {
      valuePoint.innerHTML = theEvent.detail.value
    } else {
      var currentValue = parseInt(valuePoint.innerHTML)
      currentValue = currentValue + theEvent.detail.value
      valuePoint.innerHTML = currentValue
    }
    me.CheckForFinish()
  }

  this.onLog = function (theEvent) {
    var newRecord = document.createElement('div')
    newRecord.innerHTML = theEvent.detail.message
    var container = document.getElementById('logcontainer')
    container.appendChild(newRecord)
  }

  var parser = new DOMParser();

  this.bigXML = parser.parseFromString(bigXMLstring, 'text/xml')
  this.bigXMLroot = this.bigXML.documentElement

  document.addEventListener('Update', this.onUpdate)
  document.addEventListener('Log', this.onLog)
  var textareaOutput = document.getElementById('testresult')
  textareaOutput.innerHTML = 'your xml output will appear <xml>here</xml>'
}

MyApp.prototype.GetStarted = function () {
  var fileLength = this.fileList.files.length
  var newEvent = new CustomEvent('Update', {detail:{ prompt: 'filestoprocess', value: fileLength, action: 'replace' } })
  document.dispatchEvent(newEvent)

  for (var counter = 0; counter < fileLength; counter++) {
    var currentFilename = this.fileList.files[counter]
    this.LoadXMLDoc(currentFilename)
  }
}

MyApp.prototype.RunSecondWave = function () {
  var fileLength = this.fileList.subfiles.length
  var newEvent = new CustomEvent('Update', {detail:{ prompt: 'filestoprocess', value: fileLength, action: 'increment' } })
  document.dispatchEvent(newEvent)

  for (var counter = 0; counter < fileLength; counter++) {
    var currentFilename = this.fileList.subfiles[counter]
    this.LoadXMLDoc(currentFilename)
  }
}

MyApp.prototype.LoadXMLDoc = function (theFile) {
  var xobj = new XMLHttpRequest()
  var me = this
  xobj.overrideMimeType('application/xml')
  xobj.onreadystatechange = function () {
    console.log('readyState: ' + xobj.readyState)
    console.log('status: ' + xobj.status)
    if (xobj.readyState === 4 && xobj.status === 200) {
      // Required use of an anonymous callback as .open will NOT
      // return a value but simply returns undefined in asynchronous mode
      var newEvent = new CustomEvent('Update', {detail:{ prompt: 'filesreceived', value: 1, action: 'increment' } })
      document.dispatchEvent(newEvent)
      me.GrabXML(xobj.responseXML)
    }
  }
  xobj.open('GET', theFile + '?stamp=' + this.DateStamp, true)
  xobj.setRequestHeader('Access-Control-Allow-Origin', '*')
  var newEvent = new CustomEvent('Update', {detail:{ prompt: 'filesrequested', value: 1, action: 'increment' } })
  document.dispatchEvent(newEvent)
  xobj.send(null)
}

MyApp.prototype.GrabXML = function (theXML) {
  const rootElement = theXML.documentElement
  const howManyNodes = rootElement.childNodes.length
  var newEvent, newMessage
  for (var counter = 0; counter < howManyNodes; counter++) {
    var curElement = rootElement.childNodes[counter].cloneNode(true)
    if (curElement.nodeType === 1) {
      console.log('node: ' + curElement.nodeName)
      switch (curElement.nodeName) {
        case 'xsl:template' :
          if (curElement.getAttribute('name') === null) newMessage = curElement.getAttribute('match')
          else newMessage = curElement.getAttribute('name')

          newEvent = new CustomEvent('Log', { detail: { message: newMessage } })
          document.dispatchEvent(newEvent)

          this.bigXMLroot.appendChild(curElement)
          break

        case 'xsl:include':
          this.fileList.subfiles.push(curElement.getAttribute('href'))
      }
      if (curElement.nodeName === 'xsl:template') {
      }
    }
  }
  newEvent = new CustomEvent('Update', { detail: { prompt: 'filesmerged', value: 1, action: 'increment' } })
  document.dispatchEvent(newEvent)
}

MyApp.prototype.CheckForFinish = function () {
  var targetValue = parseInt(document.getElementById('filestoprocess').innerHTML)
  var currentValue = parseInt(document.getElementById('filesmerged').innerHTML)

  if (this.processingSubfiles) targetValue = targetValue + parseInt(document.getElementById('subfilestoprocess').innerHTML)

  if (targetValue !== 0) {
    if (targetValue === currentValue) {
      if (!this.processingSubfiles) {
        this.processingSubfiles = true
        this.RunSecondWave()
      } else {
        var xmlString = new XMLSerializer().serializeToString(this.bigXML)
        // document.getElementById('result').appendChild(document.createTextNode(xmlString))
        document.getElementById('result').innerHTML = xmlString
      }
    }
  }
}
var Combiner = new MyApp()
Combiner.GetStarted()
