function printReceipt(tags) {

  var cartItems = [];

  tags.forEach(function(tag){
    cartItems = new CartItem().createCartItem(cartItems, tag);

  });
  var receipt = new Receipt().createReceipt(cartItems);
  console.log(receipt);
}
