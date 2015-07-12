function printReceipt(inputs) {
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
