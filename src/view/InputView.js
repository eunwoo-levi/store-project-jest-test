import { Console } from '@woowacourse/mission-utils';
import { retryInput } from '../utils/retryInput.js';
import { INPUT } from '../constants/messages.js';
import { parseString } from '../utils/parseString.js';
import { validateYesOrNo } from '../utils/validator.js';

class InputView {
  async getProductAndQuantity() {
    return retryInput(async () => {
      const StringOfProductAndQuantity = await Console.readLineAsync(INPUT.PRODUCT_AND_QUANTITY);
      const productAndQuantity = parseString(StringOfProductAndQuantity);
      return productAndQuantity;
    });
  }

  async getMembershipDiscount() {
    return retryInput(async () => {
      const membershipDiscount = await Console.readLineAsync(INPUT.MEMBERSHIP_DISCOUNT);
      const validatedMembershipDiscount = validateYesOrNo(membershipDiscount);
      return validatedMembershipDiscount;
    });
  }

  async purchaingWithoutPromotion(product, quantity) {
    return retryInput(async () => {
      const continueShopping = await Console.readLineAsync(INPUT.PURCHASING_WITHOUT_PROMOTION(product, quantity));
      const validatedContinueShopping = validateYesOrNo(continueShopping);
      return validatedContinueShopping;
    });
  }

  async continueShopping() {
    return retryInput(async () => {
      const continueShopping = await Console.readLineAsync(INPUT.CONTINUE_SHOPPING);
      const validatedContinueShopping = validateYesOrNo(continueShopping);
      return validatedContinueShopping;
    });
  }
}

export default InputView;
