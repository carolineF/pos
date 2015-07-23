function Pos(scanner, cart) {
  this.scanner = scanner || new Scanner();
  this.cart = cart || new Cart();
}

Pos.prototype.scan = function(tags) {
  for(var i = 0; i < tags.length; i++){
    var cartItem = this.scanner.scan(tags[i]);
    this.cart.addCartItem(cartItem);
  }
};

Pos.prototype.setCart = function(cart) {
  this.cart = cart;
};

Pos.prototype.setScanner = function(scanner) {
  this.scanner = scanner;
};

Pos.prototype.printReceipt = function(discounts) {
  var receipt = new Receipt();
  var receiptString = receipt.createReceipt(this.cart, discounts);

  console.log(receiptString);
};
