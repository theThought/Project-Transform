function mOption_Base (theElement) {
  var me = this
  // Properties
  this.Element = theElement
  this.IsExclusive = false

  // Event Listeners
  me.onClick = function (theEvent) {
    if (this.IsExclusive) {

    }
  }
  // Private functions

  this.Init()
}

// Methods

mOption_Base.prototype.Init = function () {
  this.Element.addEventListener('click', this.onClick)
  this.IsExclusive = this.IsExclusive()
}

mOption_Base.prototype.IsExclusive = function () {

}
