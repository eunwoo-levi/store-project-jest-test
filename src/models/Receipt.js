class Receipt {
  makeReceipt(purchasedProducts, promotionInfos, isMembershipDiscountSelected) {
    let totalCost = 0;
    let totalQuantity = 0;
    let totalCostForMembership = 0;
    let promotionDiscount = 0;
    let membershipDiscount = 0;
    let finalCost = 0;

    const productSet = new Set();

    promotionInfos.forEach((promotionInfo) => {
      if (!promotionInfo) {
        return;
      }
      const { promotionProduct, promotionQuantity } = promotionInfo;

      productSet.add(promotionProduct.getName());
      promotionDiscount += promotionProduct.getPrice() * promotionQuantity;
    });

    purchasedProducts.forEach((purchasedProduct) => {
      totalCost += purchasedProduct.quantity * purchasedProduct.price;
      totalQuantity += purchasedProduct.quantity;
      if (!productSet.has(purchasedProduct.name)) {
        totalCostForMembership = purchasedProduct.quantity * purchasedProduct.price;
      }
    });

    if (isMembershipDiscountSelected) {
      membershipDiscount = Math.min(totalCostForMembership * 0.3, 8000);
    }

    finalCost = totalCost - promotionDiscount - membershipDiscount;

    return {
      totalCost: totalCost,
      totalQuantity: totalQuantity,
      promotionDiscount: promotionDiscount,
      membershipDiscount: membershipDiscount,
      finalCost: finalCost,
    };
  }
}

export default Receipt;
