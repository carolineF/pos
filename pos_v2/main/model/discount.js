function Discount(spread, item) {
  this.spread = spread;
  this.item = item;
}

Discount.getDiscount = function(discounts) {
  var amount = 0;
  discounts.forEach(function(discount){
    amount += discount.spread;
  });
  return amount;
};

Discount.find = function(barcode, discounts) {
  for(var i = 0; i < discounts.length; i++) {
    if(discounts[i].item.barcode === barcode) {
      return discounts[i].spread;
    }
  }
};
