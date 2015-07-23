var Receipt = (function() {
  function Receipt() {

  }

  Receipt.prototype.getPromotionCount = function(cartItems, barcodes) {
    cartItems.forEach(function(cartItem) {
      var isPromotion = barcodes.indexOf(cartItem.item.barcode) != -1;
      cartItem.promotionCount = isPromotion ? Math.floor(cartItem.count / 3) : 0;
    });
  };

  Receipt.prototype.processPromotions = function(cartItems) {

    var promotions = loadPromotions();

    for(var i = 0; i < promotions.length; i++) {
      if(promotions[i].type === 'BUY_TWO_GET_ONE_FREE') {
        this.getPromotionCount(cartItems, promotions[i].barcodes);
      }
    }
  };

  var dateDigitToString = function(num) {
    return num < 10 ? '0' + num : num;
  };

  Receipt.prototype.getCurrentTime = function() {
    var currentDate = new Date(),
      year = dateDigitToString(currentDate.getFullYear()),
      month = dateDigitToString(currentDate.getMonth() + 1),
      date = dateDigitToString(currentDate.getDate()),
      hour = dateDigitToString(currentDate.getHours()),
      minute = dateDigitToString(currentDate.getMinutes()),
      second = dateDigitToString(currentDate.getSeconds()),
      formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    return formattedDateString;
  };

  Receipt.prototype.getItemString = function(cartItems) {
    var itemsString = '';

    cartItems.forEach(function(cartItem) {
      itemsString +=
        '名称：' + cartItem.item.name +
        '，数量：' + cartItem.count + cartItem.item.unit +
        '，单价：' + formatPrice(cartItem.item.price) +
        '(元)，小计：' + formatPrice(getSubTotal(cartItem.count - cartItem.promotionCount, cartItem.item.price)) + '(元)\n';
    });

    return itemsString;
  };

  Receipt.prototype.getPromotionString = function(cartItems) {
    var promotionString = '';

    cartItems.forEach(function(cartItem) {
      if(cartItem.promotionCount) {
        promotionString +=
          '名称：' + cartItem.item.name +
          '，数量：' + cartItem.promotionCount + cartItem.item.unit + '\n';
      }
    });
    return promotionString;
  };

  Receipt.prototype.getAmount = function(cartItems) {
    var amount = 0;

    cartItems.forEach(function(cartItem) {
      amount += getSubTotal(cartItem.count - cartItem.promotionCount, cartItem.item.price);
    });

    return amount;
  };

  Receipt.prototype.getPromotion = function(cartItems) {
    var discount = 0;
    cartItems.forEach(function(cartItem) {
      discount += cartItem.promotionCount * cartItem.item.price;
    });
    return discount;
  };

  function getSubTotal(count, price) {
    return count * price;
  }

  function formatPrice(price) {
    return price.toFixed(2);
  }

  Receipt.prototype.createReceipt = function(cartItems) {

    this.processPromotions(cartItems);

    var receiptString = '***<没钱赚商店>收据***\n' +
      '打印时间：' + this.getCurrentTime() +
      '\n----------------------\n' +
      this.getItemString(cartItems) +
      '----------------------\n挥泪赠送商品：\n' +
      this.getPromotionString(cartItems) +
      '----------------------\n' +
      '总计：' + formatPrice(this.getAmount(cartItems)) + '(元)\n' +
      '节省：' + formatPrice(this.getPromotion(cartItems)) + '(元)\n' +
      '**********************';
    return receiptString;
  };

  return Receipt;
})();
