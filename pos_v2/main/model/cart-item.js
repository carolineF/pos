function CartItem(item, count) {
  this.item = item;
  this.count = count;
}

CartItem.prototype.getItem = function() {
  return this.item;
};

CartItem.prototype.getCount = function() {
  return this.count;
};

CartItem.prototype.getSubTotal = function() {
  return this.item.price * this.count;
};
