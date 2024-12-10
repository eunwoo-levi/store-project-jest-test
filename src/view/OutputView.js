import { Console } from '@woowacourse/mission-utils';
import { OUTPUT } from '../constants/messages.js';

class OutputView {
  printStocks(stocks) {
    stocks.forEach((stock) => {
      const promotion = stock.promotion || '';
      let quantity = stock.quantity.toLocaleString() + '개';
      if (stock.quantity === 0) {
        quantity = '재고 없음';
      }
      Console.print(OUTPUT.STOCK(stock.name, stock.price.toLocaleString(), quantity, promotion));
    });
  }

  printReceipt(purchasedProducts, promotionInfos, receipt) {
    Console.print(OUTPUT.RECEIPT_HEADER);
    purchasedProducts.forEach((purchasedProduct) => {
      Console.print(
        OUTPUT.RECEIPT_PURCHASED_PRODUCTS(
          purchasedProduct.name,
          purchasedProduct.quantity,
          purchasedProduct.price.toLocaleString()
        )
      );
    });

    Console.print(OUTPUT.RECEIPT_PROMOTION_HEADER);
    promotionInfos.forEach((promotionInfo) => {
      if (!promotionInfo) {
        return;
      }
      const { promotionProduct, promotionQuantity } = promotionInfo;
      Console.print(OUTPUT.RECEIPT_PROMOTION(promotionProduct.getName(), promotionQuantity));
    });

    Console.print(OUTPUT.RECEIPT_FINAL_HEADER);
    Console.print(OUTPUT.RECEIPT_TOTAL_COST(receipt.totalQuantity, receipt.totalCost.toLocaleString()));
    Console.print(OUTPUT.RECEIPT_PROMOTION_DISCOUNT(receipt.promotionDiscount.toLocaleString()));
    Console.print(OUTPUT.RECEIPT_MEMBERSHIP_DISCOUNT(receipt.membershipDiscount.toLocaleString()));
    Console.print(OUTPUT.RECEIPT_FINAL_COST(receipt.finalCost.toLocaleString()));
  }
}

export default OutputView;
