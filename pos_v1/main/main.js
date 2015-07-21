function printReceipt(barcodes) {

  var items = getItems(barcodes);
  var cartItems = getCartItems(items);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    getPromotionsString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '节省：' + formatPrice(getDiscount(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}

function getItems(barcodes) {
  var allItems = loadAllItems();
  var items = [];

  barcodes.forEach(function (barcode) {

    var item = findItem(allItems, barcode);
    if (item) {
      items.push(item);
    }
  });
  return items;
}

function findItem(items, barcode) {
  var itemOne = null;
  items.forEach(function (item) {
    if (item.barcode === barcode.split('-')[0]) {
      item.count = barcode.split('-')[1];
      itemOne = item;
    }
  });
  return itemOne;
}

function getCartItems(items) {
  var cartItems = [];

  items.forEach(function (item) {
    var cartItem = findCartItem(cartItems, item);
    var count = 1;
    if (item.count) {
      count = item.count;
    }
    if (cartItem) {
      cartItem.count += count;
    } else {
      cartItems.push({
        item: item,
        count: count
      })
    }
  })
  return cartItems;
}

function findCartItem(cartItems, item) {

  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].item.barcode === item.barcode) {
      return cartItems[i];
    }
  }
}

function getSubTotal(count, price) {
  return count * price;
}

function getDiscount(cartItems) {
  var discount = 0;
  cartItems.forEach(function (cartItem) {
    var promotionItem = findPromotions(cartItem);
    if (promotionItem) {
      discount += promotionItem.price;
    }
  })
  return discount;
}

function getAmount(cartItems) {
  var amount = 0;
  cartItems.forEach(function (cartItem) {
    var count = processPromotions(cartItem);
    amount += getSubTotal(count, cartItem.item.price);
  });

  return amount;
}

function getItemsString(cartItems) {
  var itemsString = '';

  cartItems.forEach(function (cartItem) {

    var count = processPromotions(cartItem);

    itemsString +=
      '名称：' + cartItem.item.name +
      '，数量：' + cartItem.count + cartItem.item.unit +
      '，单价：' + formatPrice(cartItem.item.price) +
      '(元)，小计：' + formatPrice(getSubTotal(count, cartItem.item.price)) + '(元)\n';
  });

  return itemsString;
}

function getPromotionsString(cartItems) {
  var promotionString = '';
  cartItems.forEach(function (cartItem) {
    var promotionItem = findPromotions(cartItem);
    if (promotionItem) {
      promotionString +=
        '名称：' + promotionItem.name +
        '，数量：' + 1 + promotionItem.unit +
        '\n';
    }
  });

  return promotionString;
}

function processPromotions(cartItem) {
  var promotions = findPromotions(cartItem);
  var count = cartItem.count;
  if (promotions) {
    count--;
  }
  return count;
}

function findPromotions(cartItem) {
  var promotionsBarcode = loadPromotions()[0].barcodes;
  for (var i = 0; i < promotionsBarcode.length; i++) {
    if (promotionsBarcode[i] == cartItem.item.barcode) {
      return cartItem.item;
    }
  }
}

function formatPrice(price) {
  return price.toFixed(2);
}
