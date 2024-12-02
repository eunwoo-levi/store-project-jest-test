import { Console } from '@woowacourse/mission-utils';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import StoreService from '../services/StoreService.js';

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

    const itemAndQuantity = await this.#inputView.getProductAndQuantity();
    storeService.decreaseStock(itemAndQuantity);

    this.#outputView.printStock(storeService.getProductStock());
  }
}

export default Controller;
