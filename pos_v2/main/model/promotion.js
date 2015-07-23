function Promotion(type, barcodes) {
  this.type = type;
  this.barcodes = barcodes || [];
}

Promotion.isPromotion = function(barcodes, barcode) {
  return barcodes.indexOf(barcode) !== -1;
}

Promotion.loadAll = function() {
  return loadPromotions();
};

Promotion.getPromotionBarcodesWithType = function(promotionType) {
  var promotions = this.loadAll();

  for(var i = 0; i < promotions.length; i++) {
    if(promotions[i].type === promotionType) {
      return promotions[i].barcodes;
    }
  }
}
