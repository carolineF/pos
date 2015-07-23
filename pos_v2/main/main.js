function printReceipt(tags) {

  var cartItems = [];

  tags.forEach(function(tag){
    cartItems = new CartItem().createCartItems(cartItems, tag);
  });

  var receipt = new Receipt().createReceipt(cartItems);
  console.log(receipt);
}
