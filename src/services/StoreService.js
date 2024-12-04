import { readProducts, readPromotions } from '../utils/fileReader.js';

class StoreService {
  #stock;
  #promotion;
  constructor() {
    this.#stock = null;
    this.#promotion = null;
  }

  storeProductsInStock() {
    this.#stock = readProducts();
    this.#promotion = readPromotions();
  }

  getProductStock() {
    return this.#stock.getStock();
  }

  getProductReceiptInfo(purchasedProducts) {
    return purchasedProducts.map((purchasedProduct) => {
      const [name, quantity] = purchasedProduct;
      const price = this.#stock.getProductPrice(name);
      return [name, quantity, price];
    });
  }

  decreaseStock(productInfo) {
    const productsWithPromotion = this.#stock.decreaseQuantitiy(productInfo);
    const promotionQuantity = this.#getPromotionQuantity(productsWithPromotion);
    return promotionQuantity;
  }

  #getPromotionQuantity(productsWithPromotion) {
    return productsWithPromotion.map((productWithPromotion) => {
      if (!productWithPromotion) {
        return;
      }

      const [name, quantity, price, promotion] = productWithPromotion;
      const promotionModel = this.#promotion.find((promotionModel) => promotionModel.getName() === promotion);

      if (promotionModel.checkForPromotion(quantity)) {
        const buy = promotionModel.getBuy();
        const quantityOfPromotion = Math.floor(quantity / (buy + 1));

        return [name, quantityOfPromotion, price, promotion];
      }
    });
  }
}

export default StoreService;
