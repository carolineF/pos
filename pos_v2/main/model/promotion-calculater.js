function PromotionCalculater(){

}

PromotionCalculater.choosePromotion = function(promotionType, cartItems) {

  var barcodes = Promotion.getPromotionBarcodesWithType(promotionType);

  return this.processPromotion(barcodes, cartItems);
};

PromotionCalculater.processPromotion = function(barcodes, cartItems) {
  var discount = new Discount();

  cartItems.forEach(function(cartItem) {
    var isPromotion = Promotion.isPromotion(barcodes, cartItem.item.barcode);

    if(isPromotion) {
      var ItemDiscount = Math.floor(cartItem.count / 3) * cartItem.item.price;
      discount.addDiscount(ItemDiscount, cartItem.item);
    }
  });

  return discount.discounts;
};
