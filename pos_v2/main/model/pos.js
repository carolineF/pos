function Pos(scanner, cart) {
  this.scanner = scanner || new Scanner();
  this.cart = cart || new Cart();
}

Pos.prototype.scan = function(tag) {
  var cartItem = this.scanner.scan(tag);
  this.cart.addCartItem(cartItem);
};

Pos.prototype.processDiscount = function() {
  return this.cart.processPromotion();
};

Pos.prototype.createReceipt = function(discounts) {
  var receipt = new Receipt();
  var receiptString = receipt.createReceipt(this.cart, discounts);

  return receiptString;
};
