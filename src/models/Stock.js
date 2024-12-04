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

  getProductByName(name) {
    const promotionProduct = this.#findPromotionProduct(name);
    const normalProduct = this.#findNormalProduct(name);

    if (promotionProduct) {
      return promotionProduct;
    }
    return normalProduct;
  }

  decreaseQuantitiy(purchasedProducts) {
    return purchasedProducts.map((purchasedProduct) => {
      const [name, quantity, price] = purchasedProduct;

      const promotionProduct = this.#findPromotionProduct(name);
      const normalProduct = this.#findNormalProduct(name);

      if (promotionProduct && promotionProduct.getQuantity() < quantity) {
        if (normalProduct.getQuantity < quantity - promotionProduct.getQuantity()) {
          throw new Error(ERROR.PRODUCT_SOLD_OUT);
        }
      }

      if (promotionProduct && promotionProduct.getQuantity() >= quantity) {
        promotionProduct.decreaseQuantity(quantity);
        return [name, quantity, price, promotionProduct.getPromotion()];
      }

      if (promotionProduct && normalProduct) {
        const totalQuantityOfPromotionProduct = promotionProduct.getQuantity();
        const restQuantity = quantity - totalQuantityOfPromotionProduct;
        if (totalQuantityOfPromotionProduct >= restQuantity) {
          promotionProduct.decreaseQuantity(totalQuantityOfPromotionProduct);
          normalProduct.decreaseQuantity(restQuantity);
          return [name, totalQuantityOfPromotionProduct, price, promotionProduct.getPromotion()];
        }
      }

      if (!normalProduct) {
        throw new Error(ERROR.NON_EXISTING_PRODUCT);
      }

      if (normalProduct.getQuantity() < quantity) {
        throw new Error(ERROR.PRODUCT_SOLD_OUT);
      }

      normalProduct.decreaseQuantity(quantity);
      return;
    });
  }

  getProductPrice(name) {
    const promotionProduct = this.#findPromotionProduct(name);
    const normalProduct = this.#findNormalProduct(name);

    if (promotionProduct) {
      return promotionProduct.getPrice();
    }
    return normalProduct.getPrice();
  }

  #findPromotionProduct(name) {
    return this.#products.find((product) => product instanceof PromotionProduct && product.getName() === name);
  }

  #findNormalProduct(name) {
    return this.#products.find((product) => !(product instanceof PromotionProduct) && product.getName() === name);
  }
}

export default Stock;
