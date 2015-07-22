function printReceipt(tags) {

  var cartItems = [];

  tags.forEach(function(tag){
    cartItems = new CartItem().createCartItem(cartItems, tag);

  });
console.log(cartItems);
}
