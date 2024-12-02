import { ERROR } from '../constants/error.js';
import PromotionProduct from './PromotionProduct.js';

class Stock {
  #products;
  constructor(products) {
    this.#products = products;
  }

  getStock() {
    return this.#products.map((product) => product.getInfo());
  }

  decreaseQuantitiy(purchaseProducts) {
    purchaseProducts.forEach((purchaseProduct) => {
      const [name, quantity] = purchaseProduct;

      const promotionProduct = this.#findPromotionProduct(name);
      const normalProduct = this.#findNormalProduct(name);

      if (promotionProduct && promotionProduct.getQuantity() < quantity) {
        if (normalProduct.getQuantity < quantity - promotionProduct.getQuantity()) {
          throw new Error(ERROR.PRODUCT_SOLD_OUT);
        }
      }

      if (promotionProduct && promotionProduct.getQuantity() >= quantity) {
        promotionProduct.decreaseQuantity(quantity);
        return;
      }

      if (promotionProduct && normalProduct) {
        const restQuantity = quantity - promotionProduct.getQuantity();
        if (normalProduct.getQuantity() >= restQuantity) {
          promotionProduct.decreaseQuantity(promotionProduct.getQuantity());
          normalProduct.decreaseQuantity(restQuantity);
          return;
        }
      }

      if (!normalProduct) {
        throw new Error(ERROR.NON_EXISTING_PRODUCT);
      }

      if (normalProduct.getQuantity() < quantity) {
        throw new Error(ERROR.PRODUCT_SOLD_OUT);
      }

      normalProduct.decreaseQuantity(quantity);
    });
  }

  #findPromotionProduct(name) {
    return this.#products.find((product) => product instanceof PromotionProduct && product.getName() === name);
  }

  #findNormalProduct(name) {
    return this.#products.find((product) => !(product instanceof PromotionProduct) && product.getName() === name);
  }
}

export default Stock;
