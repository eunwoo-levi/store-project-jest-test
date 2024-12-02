import { Console } from '@woowacourse/mission-utils';
import { retryInput } from '../utils/retryInput.js';
import { INPUT } from '../constants/message.js';

class InputView {
  getProductAndQuantity() {
    return retryInput(async () => {
      const productAndQuantity = await Console.readLineAsync(INPUT.ITEM_AND_QUANTY);
      return productAndQuantity;
    });
  }
}

export default InputView;
