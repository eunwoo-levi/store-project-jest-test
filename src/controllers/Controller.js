import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import StoreService from '../services/StoreService.js';
import Receipt from '../models/Receipt.js';

class Controller {
  #inputView;
  #outputView;
  constructor() {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
  }

  async run() {
    const storeService = new StoreService();
    storeService.storeProductsInStock();
    this.#outputView.printHeader();
    this.#outputView.printStock(storeService.getProductStock());

    const purchasedProduct = await this.#inputView.getProductAndQuantity();
    const productInfo = storeService.getProductReceiptInfo(purchasedProduct);
    // promotionQuantity : [name, quantity, price, promotion]
    const productsWithPromotion = storeService.decreaseStock(productInfo);

    const isMembershipDiscountSelected = await this.#inputView.getMembershipDiscount();

    const receipt = new Receipt();
    const receiptResult = receipt.calculateReceipt(productInfo, productsWithPromotion, isMembershipDiscountSelected);

    this.#outputView.printReceipt(productInfo, productsWithPromotion, receiptResult);
  }
}

export default Controller;
