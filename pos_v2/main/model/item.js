function Item(barcode, name, unit, price) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
}

Item.all = function() {
  return loadAllItems();
};

Item.find = function(barcode) {
  var allItems = this.all();

  for(var i = 0; i < allItems.length; i++) {
    if(allItems[i].barcode == barcode) {
      return allItems[i];
    }
  }
};
