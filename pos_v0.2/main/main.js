function printReceipt(itemLists) {

  var cartItems = getCartItems(itemLists);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}

function getCartItems(itemLists) {
  var cartItems = [];

  itemLists.forEach(function (itemList) {
    var cartItem = findCartItem(cartItems, itemList);
    if (cartItem) {
      cartItem.count++;
    } else {
      var item = getItemByItemList(itemList);
      cartItems.push({
        item: item,
        count: 1
      })
    }
  })
  return cartItems;
}

function getItemByItemList(itemList) {
  var allItems = loadAllItems();

  for(var i = 0; i < allItems.length; i++) {
    if(allItems[i].barcode === itemList) {
      return allItems[i];
    }
  }
}

function findCartItem(cartItems, itemList) {

  for(var i = 0; i < cartItems.length; i++) {
    if(cartItems[i].item.barcode === itemList) {
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
