import { Console } from '@woowacourse/mission-utils';
import { retryInput } from '../utils/retryInput.js';
import { INPUT } from '../constants/message.js';
import { ERROR } from '../constants/error.js';

class InputView {
  getProductAndQuantity() {
    return retryInput(async () => {
      const StringOfPurchasedProduct = await Console.readLineAsync(INPUT.ITEM_AND_QUANTY);
      const purchaseProduct = this.#parsedString(StringOfPurchasedProduct);
      return purchaseProduct;
    });
  }

  getMembershipDiscount() {
    return retryInput(async () => {
      const isMembershipDiscountSelected = await Console.readLineAsync(INPUT.MEMBERSHIP_DISCOUNT);
      if (isMembershipDiscountSelected === 'Y') {
        return true;
      } else if (isMembershipDiscountSelected === 'N') {
        return false;
      }

      throw new Error(ERROR.INVALID_INPUT);
    });
  }

  getPurchasingWithoutPromotionDiscount(name, quantity) {
    return retryInput(async () => {
      const continuePurchasingWithoutPromotion = await Console.readLineAsync(
        INPUT.CONTINUE_PURCHASE_WITHOUT_DISCOUNT(name, quantity)
      );
      if (continuePurchasingWithoutPromotion === 'Y') {
        return true;
      } else if (continuePurchasingWithoutPromotion === 'N') {
        return false;
      }

      throw new Error(ERROR.INVALID_INPUT);
    });
  }

  getContinueShopping() {
    return retryInput(async () => {
      const continueShopping = await Console.readLineAsync(INPUT.CONTINUE_PURCHASE);
      if (continueShopping === 'Y') {
        return true;
      } else if (continueShopping === 'N') {
        return false;
      }

      throw new Error(ERROR.INVALID_INPUT);
    });
  }

  #parsedString(purchaseString) {
    return purchaseString.split(',').map((purchase) => {
      if (purchase[0] !== '[' || purchase[purchase.length - 1] !== ']') {
        throw new Error(ERROR.INVALID_PRODUCT_AND_QUANTITY_FORMAT);
      }
      const stock = purchase.slice(1, purchase.length - 1);
      const [product, quantity] = stock.split('-');

      if (!Number.isInteger(Number(quantity))) {
        throw new Error(ERROR.INVALID_PRODUCT_AND_QUANTITY_FORMAT);
      }

      return [product, quantity];
    });
  }
}

export default InputView;
