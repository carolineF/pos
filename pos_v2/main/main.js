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
    if (item[0] == result[i].barcode) {
      result[i].count += item[1] || 1;
      break;
    }
  }
  if (i >= result.length) {
    var index = findIndexOfSameItem(items, item[0]);
    if (index !== -1) {
      result.push(items[index]);
      result[i].count = item[1] || 1;
      return;
    }
  }
}
function findIndexOfSameItem(items, inputs) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].barcode === inputs) {
      return i;
    }
  }
  return -1;
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
dateDigitToString = function (num) {
  return num < 10 ? '0' + num : num;
}
function createPrintTime() {
  var currentDate = new Date(),
    year = dateDigitToString(currentDate.getFullYear()),
    month = dateDigitToString(currentDate.getMonth() + 1),
    date = dateDigitToString(currentDate.getDate()),
    hour = dateDigitToString(currentDate.getHours()),
    minute = dateDigitToString(currentDate.getMinutes()),
    second = dateDigitToString(currentDate.getSeconds()),
    formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
  return formattedDateString;
}
function print(inputs) {
  var result = '***<没钱赚商店>收据***\n打印时间：' + createPrintTime() + '\n----------------------\n';
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
