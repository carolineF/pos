function Utils() {

}
Utils.formatPrice = function(price) {
  return price.toFixed(2);
};

Utils.dateDigitToString = function(num) {
  return num < 10 ? '0' + num : num;
};

Utils.getTime = function() {
  var currentDate = new Date(),
    year = Utils.dateDigitToString(currentDate.getFullYear()),
    month = Utils.dateDigitToString(currentDate.getMonth() + 1),
    date = Utils.dateDigitToString(currentDate.getDate()),
    hour = Utils.dateDigitToString(currentDate.getHours()),
    minute = Utils.dateDigitToString(currentDate.getMinutes()),
    second = Utils.dateDigitToString(currentDate.getSeconds()),
    formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;

  return formattedDateString;
};
