function printReceipt(inputs) {
  var result = [];
  for (var i = 0; i < inputs.length; i++) {
    mergeSameGoods(result, inputs[i]);
  }
  print(result);
}
function mergeSameGoods(result, inputs) {
  for (var i = 0; i < result.length; i++) {
    if (-1 !== result[i].barcode.indexOf(inputs.barcode)) {
      result[i].count += 1;
      return;
    }
  }
  if (i >= result.length) {
    result.push(inputs);
    result[i].count = 1;
  }
}
function print(inputs) {
  var result = '***<没钱赚商店>收据***\n';
  var sum = 0;
  for (var i = 0; i < inputs.length; i++) {
    sum += inputs[i].count * inputs[i].price;
    result += '名称：' + inputs[i].name + '，数量：' + inputs[i].count +
    inputs[i].unit + '，单价：' + (inputs[i].price).toFixed(2) + '(元)' +
    '，小计：' + (inputs[i].count * inputs[i].price).toFixed(2) + '(元)\n';
  }
  result += "----------------------\n总计：" + sum.toFixed(2) +
  '(元)\n**********************';
  console.log(result);
}
