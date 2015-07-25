function PromotionCalculater(discounts){
  this.discounts = discounts || [];
}

PromotionCalculater.prototype.addDiscount = function(spread, cartItem) {
  var discount = new Discount(spread, cartItem);
  this.discounts.push(discount);
};

PromotionCalculater.prototype.choosePromotion = function(promotionType, cartItems) {

  var barcodes = Promotion.getPromotionBarcodesWithType(promotionType);

  this.processPromotion(barcodes, cartItems);

  return this.discounts;
};

PromotionCalculater.prototype.processPromotion = function(barcodes, cartItems) {

  for(var i = 0; i < cartItems.length; i++) {
    var isPromotion = Promotion.isPromotion(barcodes, cartItems[i].item.barcode);

    if(isPromotion) {
      var spread = Math.floor(cartItems[i].count / 3) * cartItems[i].item.price;
      this.addDiscount(spread, cartItems[i].item);
    }
  }

};
