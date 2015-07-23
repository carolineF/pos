function Item(barcode, name, unit, price) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
}

Item.loadAll = function() {
  return loadAllItems();
};

Item.findItem = function(barcode) {
  var allItems = this.loadAll();

  for(var i = 0; i < allItems.length; i++) {
    if(allItems[i].barcode == barcode) {
      return allItems[i];
    }
  }
};
