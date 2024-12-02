import { readProducts } from '../utils/fileReader.js';

class StoreService {
  #stock;
  constructor() {
    this.#stock = null;
  }

  storeProductsInStock() {
    this.#stock = readProducts();
  }

  getProductStock() {
    return this.#stock.getStock();
  }

  decreaseStock(purchaseString) {
    const purchaseProducts = this.#parsedString(purchaseString);
    this.#stock.decreaseQuantitiy(purchaseProducts);
  }

  #parsedString(purchaseString) {
    return purchaseString.split(',').map((purchase) => {
      const stock = purchase.slice(1, purchase.length - 1);
      const [product, quantity] = stock.split('-');
      return [product, quantity];
    });
  }
}

export default StoreService;
