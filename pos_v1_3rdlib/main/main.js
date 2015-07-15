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
    if (item[0] == result[i].barcode) {
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
  _.forEach(inputs, function(n){
    var count = n.count;
    if(_.includes(items,n.barcode) && n.count>2){
      discountGoods.push(n);
      count -= 1;
    }
    sum += count * n.price;
    result += '名称：' + n.name + '，数量：' + n.count +
    n.unit + '，单价：' + (n.price).toFixed(2) + '(元)' +
    '，小计：' + (count * n.price ).toFixed(2) + '(元)\n';
  });
  result += '----------------------\n' + '挥泪赠送商品：\n名称：' + discountGoods[0].name + '，数量：' +
  1 + '瓶\n名称：' + discountGoods[1].name + '，数量：' + 1 + '袋\n';
  result += '----------------------\n总计：' + sum.toFixed(2) +
  '(元)\n节省：' + (discountGoods[0].price + discountGoods[1].price).toFixed(2) + '(元)\n**********************';
  console.log(result);
}
