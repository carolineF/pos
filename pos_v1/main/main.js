function printReceipt(inputs) {
  var result = [];
  for (var i = 0; i < inputs.length; i++) {
    mergeSameGoods(result, inputs[i]);
  }
  print(result);
}
function mergeSameGoods(result, inputs) {
  var items = loadAllItems();
  var item = inputs.split('-');
  for (var i = 0; i < result.length; i++) {
    if (-1 !== result[i].barcode.indexOf(item[0])) {
      var count = 1;
      if (item.length > 1) {
        count = item[1];
      }
      result[i].count += count;
      break;
    }
  }
  if (i >= result.length) {
    for (var k = 0; k < items.length; k++) {
      if (item[0] == items[k].barcode) {
        result.push(items[k]);
        var count = 1;
        if (item.length > 1) {
          count = item[1];
        }
        result[i].count = count;
        return;
      }
    }
  }
}
function processDiscountGoods(result) {
  var discount = loadPromotions();
  var items = discount[0].barcodes;
  for (var i = 0; i < items.length; i++) {
    if (result.barcode === items[i] && result.count > 2) {
      return result;
    }
  }
}
function print(inputs) {
  var result = '***<没钱赚商店>收据***\n';
  var sum = 0;
  var discountGoods = [];
  for (var i = 0; i < inputs.length; i++) {
    var item = processDiscountGoods(inputs[i]);
    var count = inputs[i].count;
    if (item) {
      discountGoods.push(item);
      count -= 1;
    }
    sum += count * inputs[i].price;
    result += '名称：' + inputs[i].name + '，数量：' + inputs[i].count +
    inputs[i].unit + '，单价：' + (inputs[i].price).toFixed(2) + '(元)' +
    '，小计：' + (count * inputs[i].price ).toFixed(2) + '(元)\n';
  }
  result += '----------------------\n' + '挥泪赠送商品：\n名称：' + discountGoods[0].name + '，数量：' +
  1 + '瓶\n名称：' + discountGoods[1].name + '，数量：' + 1 + '袋\n';
  result += '----------------------\n总计：' + sum.toFixed(2) +
  '(元)\n节省：' + (discountGoods[0].price + discountGoods[1].price).toFixed(2) + '(元)\n**********************';
  console.log(result);
}
