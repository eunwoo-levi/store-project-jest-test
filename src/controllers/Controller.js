import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import StoreService from '../services/StoreService.js';
import Receipt from '../models/Receipt.js';
import { retryInput } from '../utils/retryInput.js';

class Controller {
  #inputView;
  #outputView;
  #storeService;
  constructor() {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
    this.#storeService = new StoreService();
  }

  async run() {
    let continueShopping = true;
    this.#storeService.storeProductsInStock();

    while (continueShopping) {
      this.#outputView.printHeader();
      this.#outputView.printStock(this.#storeService.getProductStock());

      const [productInfo, productsWithPromotion] = await retryInput(async () => {
        const purchasedProduct = await this.#inputView.getProductAndQuantity();
        const productInfo = this.#storeService.getProductReceiptInfo(purchasedProduct);
        return [productInfo, this.#storeService.decreaseStock(productInfo)];
      });

      await this.#continuePurchasingWithoutPromotion(productsWithPromotion);

      const isMembershipDiscountSelected = await this.#inputView.getMembershipDiscount();

      const receipt = new Receipt();
      const receiptResult = receipt.calculateReceipt(productInfo, productsWithPromotion, isMembershipDiscountSelected);

      this.#outputView.printReceipt(productInfo, productsWithPromotion, receiptResult);
      continueShopping = await this.#inputView.getContinueShopping();
    }
  }

  // forEach, map은 비동기(async, await 기다리지 않는다!  for ... of 로 하기!)
  async #continuePurchasingWithoutPromotion(productsWithPromotion) {
    for (const productWithPromotion of productsWithPromotion) {
      if (!productWithPromotion) {
        continue;
      }

      if (productWithPromotion.restQuantity > 0) {
        let continuePurchasingWithoutPromotion = await this.#inputView.getPurchasingWithoutPromotionDiscount(
          productWithPromotion.name,
          productWithPromotion.restQuantity
        );
        if (continuePurchasingWithoutPromotion) {
          this.#storeService.decreaseQuantitiyOfNormalProduct(productWithPromotion.restQuantity);
        }
      }
    }
  }
}

export default Controller;
