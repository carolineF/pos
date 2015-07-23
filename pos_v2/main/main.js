function printReceipt(tags) {
  var scanner = new Scanner();
  var cart = new Cart();
  var pos = new Pos(scanner, cart);
  pos.scan(tags);

  var discounts = pos.cart.processPromotion();

  pos.printReceipt(discounts);
}
