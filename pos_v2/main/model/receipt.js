function Receipt() {

}

Receipt.prototype.formatPrice = function(price) {
  return price.toFixed(2);
};

Receipt.prototype.createReceipt = function(cart, discounts) {
  var receipt = '***<没钱赚商店>收据***\n' +
  '打印时间：'+ Utils.getTime() +
  '\n----------------------\n' +
   this.getItemString(cart.cartItems, discounts) +
  '----------------------\n挥泪赠送商品：\n' +
  this.getPromotionsString(cart.cartItems, discounts) +
  '----------------------\n' +
  '总计：' + this.formatPrice(cart.getAmount() - Discount.getDiscount(discounts)) + '(元)\n' +
  '节省：' + this.formatPrice(Discount.getDiscount(discounts)) + '(元)\n' +
  '**********************';
  return receipt;
};

Receipt.prototype.getItemString = function(cartItems, discounts) {
  var itemsString = '';
  var that = this;

  cartItems.forEach(function (cartItem) {

    var discount = Discount.find(cartItem.item.barcode, discounts) || 0;

    itemsString +=
      '名称：' + cartItem.item.name +
      '，数量：' + cartItem.count + cartItem.item.unit +
      '，单价：' + that.formatPrice(cartItem.item.price) +
      '(元)，小计：' + that.formatPrice(cartItem.getSubTotal() - discount) + '(元)\n';
  });

  return itemsString;
};

Receipt.prototype.getPromotionsString = function(cartItems, discounts) {
  var promotionString = '';
  discounts.forEach(function(discount){
    promotionString +=
      '名称：' + discount.item.name +
      '，数量：' + (discount.discount / discount.item.price) + discount.item.unit + '\n';
  });
  return promotionString;
};
