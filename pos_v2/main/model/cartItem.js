function CartItem(item, count, promotionCount) {
  this.item = item;
  this.count = count || 0;
  this.promotionCount = promotionCount || 0;
}

CartItem.prototype.getBarcode = function (tag) {
  var barcode = tag.split('-')[0];
  this.count = tag.split('-')[1] || 1;
  return barcode;
};

var findCartItem = function (cartItems, barcode) {

  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].item.barcode === barcode) {
      return cartItems[i];
    }
  }
};

CartItem.prototype.addToCartItems = function (cartItems, barcode) {

  var cartItem = findCartItem(cartItems, barcode);
  if (cartItem) {
    cartItem.count += this.count;
  } else {
    cartItems.push({
      item: this.item,
      count: this.count,
      promotionCount: this.promotionCount
    });
  }
  return cartItems;
};

CartItem.prototype.findItem = function (barcode) {
  var allItems = loadAllItems();

  for (var i = 0; i < allItems.length; i++) {
    if (allItems[i].barcode === barcode) {
      return allItems[i];
    }
  }
};

CartItem.prototype.createCartItem = function (cartItems, tag) {

  var barcode = this.getBarcode(tag);

  this.item = this.findItem(barcode);

  return this.addToCartItems(cartItems, barcode);

};
