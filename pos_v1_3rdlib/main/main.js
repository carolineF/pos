function printReceipt(inputs) {
  var result = [];
  _.forEach(inputs, function(n){
    mergeSameGoods(result, n);
  });
  print(result);
}
function mergeSameGoods(result, inputs) {
  var items = loadAllItems();
  var item = inputs.split('-');
  for (var i = 0; i < result.length; i++) {
    if (_.includes(result[i].barcode, item[0])) {
      result[i].count += item[1] || 1;
      return;
    }
  }
  if (i >= result.length) {
    _.forEach(items, function(n) {
      if (item[0] === n.barcode) {
        n.count = item[1] || 1;
        result.push(n);
        return ;
      }
    });
  }
}
function print(inputs) {
  var result = '***<没钱赚商店>收据***\n';
  var sum = 0;
  var discountGoods = [];
  var discount = loadPromotions();
  var items = discount[0].barcodes;
  for (var i = 0; i < inputs.length; i++) {
    var count = inputs[i].count;
   if(_.includes(items,inputs[i].barcode) && inputs[i].count>2){
     discountGoods.push(inputs[i]);
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
