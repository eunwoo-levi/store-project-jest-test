import { readProducts, readPromotions } from '../utils/fileReader.js';
import { ERROR } from '../constants/error.js';

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
      return [name, Number(quantity), Number(price)];
    });
  }

  decreaseStock(purchasedProducts) {
    return purchasedProducts.map((purchasedProduct) => {
      const [name, quantity, price] = purchasedProduct;

      const promotionProduct = this.#stock.findPromotionProduct(name);
      const normalProduct = this.#stock.findNormalProduct(name);

      if (!promotionProduct && normalProduct) {
        if (normalProduct.getQuantity() < quantity) {
          throw new Error(ERROR.PRODUCT_SOLD_OUT);
        }
        normalProduct.decreaseQuantity(quantity);
        return;
      }

      if (promotionProduct) {
        if (!normalProduct && promotionProduct.getQuantity() < quantity) {
          throw new Error(ERROR.PRODUCT_SOLD_OUT);
        } else if (normalProduct && promotionProduct.getQuantity() + normalProduct.getQuantity() < quantity) {
          throw new Error(ERROR.PRODUCT_SOLD_OUT);
        }

        const promotionModel = this.#findPromotionModel(promotionProduct.getPromotion());
        const buy = promotionModel.getBuy();
        const quantityWithPromotion = Math.floor(quantity / (buy + 1));
        let restQuantity = 0;

        if (promotionModel.checkForPromotion(quantity)) {
          if (promotionProduct.getQuantity() >= quantity) {
            promotionProduct.decreaseQuantity(quantity);
            return {
              name: promotionProduct.getName(),
              price: promotionProduct.getPrice(),
              quantityWithPromotion,
              restQuantity,
            };
          }

          restQuantity = Math.floor(quantity % quantityWithPromotion) + (quantity - promotionProduct.getQuantity());
          promotionProduct.decreaseQuantity(promotionProduct.getQuantity());
          return {
            name: promotionProduct.getName(),
            price: promotionProduct.getPrice(),
            quantityWithPromotion,
            restQuantity,
          };
        }
      }
    });
  }

  #findPromotionModel(promotionType) {
    return this.#promotion.find((promotionModel) => promotionModel.getName() === promotionType);
  }
}

export default StoreService;
