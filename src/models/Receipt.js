class Receipt {
  calculateReceipt(products, promotionProducts, isMembershipDiscountSelected) {
    let totalQuantity = 0;
    let totalCost = 0;
    let promotionDiscount = 0;
    let membershipDiscount = 0;
    let finalCost = 0;

    let totalCostWithoutPromotion = 0;

    const promotionProductNames = new Set();

    promotionProducts.map((product) => {
      if (!product) {
        return;
      }
      const [name, quantity, price, promotion] = product;
      promotionDiscount += quantity * price;
      promotionProductNames.add(name);
    });

    products.map((product) => {
      const [name, quantity, price] = product;
      totalQuantity += Number(quantity);
      totalCost += quantity * price;
      if (!promotionProductNames.has(name)) {
        totalCostWithoutPromotion += quantity * price;
      }
    });

    if (isMembershipDiscountSelected) {
      membershipDiscount = Math.min(Math.floor(totalCostWithoutPromotion * 0.3), 8000);
    }

    finalCost = totalCost - promotionDiscount - membershipDiscount;

    return {
      totalQuantity,
      totalCost,
      promotionDiscount,
      membershipDiscount,
      finalCost,
    };
  }
}

export default Receipt;
