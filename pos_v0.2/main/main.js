function printReceipt(barcodes) {

  var items = getItems(barcodes);
  var cartItems = getCartItems(items);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}

function getItems(barcodes) {
  var allItems = loadAllItems();
  var items = [];

  barcodes.forEach(function(barcode){
    var item = findItem(allItems, barcode);
    if(item) {
      items.push(item);
    }
  });
  return items;
}

function findItem(items, barcode) {
  var itemOne = null;
  items.forEach(function(item){
    if(item.barcode === barcode) {
      itemOne = item;
    }
  });
  return itemOne;
}

function getCartItems(items) {
  var cartItems = [];

  items.forEach(function (item) {
    var cartItem = findCartItem(cartItems, item);
    if (cartItem) {
      cartItem.count++;
    } else {
      cartItems.push({
        item: item,
        count: 1
      })
    }
  })
  return cartItems;
}

function findCartItem(cartItems, item) {

  for(var i = 0; i < cartItems.length; i++) {
    if(cartItems[i].item.barcode === item.barcode) {
      return cartItems[i];
    }
  }
}

function getSubTotal(count, price) {
  return count * price;
}

function getAmount(cartItems) {
  var amount = 0;

  cartItems.forEach(function (cartItem) {
    amount += getSubTotal(cartItem.count, cartItem.item.price);
  });

  return amount;
}

function getItemsString(cartItems) {
  var itemsString = '';

  cartItems.forEach(function (cartItem) {
    itemsString +=
      '名称：' + cartItem.item.name +
      '，数量：' + cartItem.count + cartItem.item.unit +
      '，单价：' + formatPrice(cartItem.item.price) +
      '(元)，小计：' + formatPrice(getSubTotal(cartItem.count, cartItem.item.price)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
