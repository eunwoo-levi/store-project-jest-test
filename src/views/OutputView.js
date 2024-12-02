import { Console } from '@woowacourse/mission-utils';
import { OUTPUT } from '../constants/message.js';

class OutputView {
  printHeader() {
    Console.print(OUTPUT.HEADER);
  }

  printStock(allProducts) {
    allProducts.forEach((product) => {
      if (product.promotion) {
        Console.print(OUTPUT.STOCK(product.name, product.price, product.quantity, product.promotion));
        return;
      }
      Console.print(OUTPUT.STOCK(product.name, product.price, product.quantity, ''));
    });
  }
}

export default OutputView;
