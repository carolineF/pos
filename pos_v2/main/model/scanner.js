function Scanner() {

}

Scanner.prototype.scan = function(tag) {
  var barcode = tag.split('-')[0];
  var count = parseFloat(tag.split('-')[1]) || 1;

  var item = Item.find(barcode);

  return new CartItem(item, count);
};
