function printReceipt(tags) {

  var items = getItems(tags);
  var cartItems = getCartItems(items);

  choosePromotions(cartItems);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n挥泪赠送商品：\n' +
      getPromotionsString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '节省：' + formatPrice(getDiscount(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}

function getDiscount(cartItems) {
  var discount = 0;
  cartItems.forEach(function(cartItem){
    discount += cartItem.promotionCount * cartItem.item.price;
  });
  return discount;
}

function getPromotionsString(cartItems) {
  var promotionString = '';
  cartItems.forEach(function(cartItem){
    if(cartItem.promotionCount) {
      promotionString +=
        '名称：' + cartItem.item.name +
        '，数量：' + cartItem.promotionCount + cartItem.item.unit + '\n';
    }
  });
  return promotionString;
}

function choosePromotions(cartItems) {
  var promotions = loadPromotions();
  promotions.forEach(function (promotion) {
    if(promotion.type === 'BUY_TWO_GET_ONE_FREE') {
      processPromotion(cartItems, promotion.barcodes);
    }
  });
}
function processPromotion(cartItems, barcodes) {
  cartItems.forEach(function(cartItem) {
    var isPromotion = barcodes.indexOf(cartItem.item.barcode) != -1;
    cartItem.promotionCount = isPromotion ? Math.floor(cartItem.count / 3) : 0;
  });
}

function getItems(tags) {
  var allItems = loadAllItems();
  var items = [];

  tags.forEach(function(tag){
    var barcode = tag.split('-')[0];
    var count = tag.split('-')[1] || 1;
    var item = findItem(allItems, barcode);
    if(item) {
      items.push({item : item, count : count});
    }
  });
  return items;
}

function findItem(items, barcode) {
  for(var i = 0; i < items.length; i++){
    if(items[i].barcode === barcode) {
      return items[i];
    }
  }
}

function getCartItems(items) {
  var cartItems = [];

  items.forEach(function (item) {
    var cartItem = findCartItem(cartItems, item);
    if (cartItem) {
      cartItem.count += item.count;
    } else {
      cartItems.push({
        item: item.item,
        count: item.count,
        promotionCount : 0
      })
    }
  });
  return cartItems;
}

function findCartItem(cartItems, item) {
  for(var i = 0; i < cartItems.length; i++) {
    if(cartItems[i].item.barcode === item.item.barcode) {
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
    amount += getSubTotal(cartItem.count - cartItem.promotionCount, cartItem.item.price);
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
      '(元)，小计：' + formatPrice(getSubTotal(cartItem.count-cartItem.promotionCount, cartItem.item.price)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
