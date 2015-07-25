function Cart(cartItems) {
  this.cartItems = cartItems || [];
}

Cart.prototype.addCartItem = function(addedCartItem) {

  var cartItem = this.findCartItem(addedCartItem);
  if(cartItem){
    cartItem.count += addedCartItem.count;
  }else{
    this.cartItems.push(addedCartItem);
  }
};

Cart.prototype.findCartItem = function(cartItem) {
  for(var i = 0; i < this.cartItems.length; i++) {
    var isExist = this.cartItems[i].item.barcode === cartItem.item.barcode;
    if(isExist) {
      return this.cartItems[i];
    }
  }
};

Cart.prototype.processPromotion = function() {
  var promotionCalculater = new PromotionCalculater();
  var discounts = promotionCalculater.choosePromotion('BUY_TWO_GET_ONE_FREE', this.cartItems);

  return discounts;
};

Cart.prototype.getAmount = function() {
  var amount = 0;
  this.cartItems.forEach(function(cartItem) {
    amount += cartItem.count * cartItem.item.price;
  });

  return amount;
};
