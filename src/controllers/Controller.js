import Receipt from '../models/Receipt.js';
import StoreService from '../services/StoreService.js';
import { retryInput } from '../utils/retryInput.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class Controller {
  #inputView;
  #outputView;
  constructor() {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
  }

  async run() {
    const storeService = new StoreService();
    storeService.getStocks();

    let isShoppingContinuing = true;
    while (isShoppingContinuing) {
      const stocksForPrint = storeService.getStockForPrint();
      this.#outputView.printStocks(stocksForPrint);

      // 부분적으로 service 에서 발생한 에러를 throw 하고 다시 입력받기 (retryInput)
      const [purchasedProducts, promotionInfo] = await retryInput(async () => {
        const purchasedProducts = await this.#inputView.getProductAndQuantity();

        const promotionInfo = await storeService.decreaseStocks(purchasedProducts);
        const purchasedProductsWithPrice = storeService.getPurchasedProductsWithPrice(purchasedProducts);
        return [purchasedProductsWithPrice, promotionInfo];
      });

      const checkMembershipDiscount = await this.#inputView.getMembershipDiscount();

      const receiptModel = new Receipt();
      const receipt = receiptModel.makeReceipt(purchasedProducts, promotionInfo, checkMembershipDiscount);

      this.#outputView.printReceipt(purchasedProducts, promotionInfo, receipt);

      isShoppingContinuing = await this.#inputView.continueShopping();
    }
  }
}

export default Controller;
