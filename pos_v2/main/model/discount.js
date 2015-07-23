function Discount(discounts) {
  this.discounts = discounts || [];
}

Discount.prototype.addDiscount = function(discount, item) {
  this.discounts.push({
    discount : discount,
    item : item
  });
  return this.discounts;
};

Discount.getDiscount = function(discounts) {

  var amount = 0;
  discounts.forEach(function(discount){
    amount += discount.discount;
  });
  return amount;
};

Discount.find = function(barcode, discounts) {
  for(var i = 0; i < discounts.length; i++) {
    if(discounts[i].item.barcode === barcode) {
      return discounts[i].discount;
    }
  }
};

