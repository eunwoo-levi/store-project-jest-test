import { Console } from '@woowacourse/mission-utils';
import { OUTPUT } from '../constants/message.js';

class OutputView {
  printHeader() {
    Console.print(OUTPUT.HEADER);
  }

  printStock(allProducts) {
    allProducts.forEach((product) => {
      if (product.promotion) {
        Console.print(
          OUTPUT.STOCK(product.name, Number(product.price).toLocaleString(), product.quantity, product.promotion)
        );
        return;
      }
      Console.print(OUTPUT.STOCK(product.name, Number(product.price).toLocaleString(), product.quantity, ''));
    });
  }

  printReceipt(purchaseProducts, productsWithPromotion, receipt) {
    Console.print(OUTPUT.RECEIPT_HEADER);
    purchaseProducts.forEach((purchaseProduct) => {
      const [product, quantity, price] = purchaseProduct;
      Console.print(OUTPUT.RECEIPT(product, quantity, price.toLocaleString()));
    });
    Console.print(OUTPUT.RECEIPT_PROMOTION_HEADER);
    productsWithPromotion.forEach((productWithPromotion) => {
      if (!productWithPromotion) {
        return;
      }
      if (productWithPromotion.quantityWithPromotion > 0) {
        Console.print(OUTPUT.RECEIPT_PROMOTION(productWithPromotion.name, productWithPromotion.quantityWithPromotion));
      }
    });

    Console.print(OUTPUT.RECEIPT_RESULT_HEADER);
    Console.print(OUTPUT.RECEIPT_TOTAL_COST(receipt.totalQuantity, receipt.totalCost.toLocaleString()));
    Console.print(OUTPUT.RECEIPT_PROMOTION_DISCOUNT(receipt.promotionDiscount.toLocaleString()));
    Console.print(OUTPUT.RECEIPT_MEMBERSHIP_DISCOUNT(receipt.membershipDiscount.toLocaleString()));
    Console.print(OUTPUT.RECEIPT_FINAL_COST(receipt.finalCost.toLocaleString()));
  }
}

export default OutputView;
