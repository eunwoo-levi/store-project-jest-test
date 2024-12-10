import { readProducts, readPromotions } from '../utils/fileReader.js';
import { ERROR } from '../constants/errors.js';

class StoreService {
  #stocks;
  #promotions;
  constructor() {
    this.#stocks = null;
    this.#promotions = null;
  }

  getStocks() {
    const stock = readProducts();
    this.#stocks = stock.getStocks();
    this.#promotions = readPromotions();
  }

  getStockForPrint() {
    const productNames = [...new Set(this.#stocks.map((product) => product.getName()))];

    const allProducts = [];
    productNames.forEach((name) => {
      const promotionProduct = this.#findPromotionProduct(name);
      const normalProduct = this.#findNormalProduct(name);

      if (promotionProduct) {
        allProducts.push(promotionProduct.getInfo());
        if (!normalProduct) {
          allProducts.push({
            name: promotionProduct.getName(),
            price: promotionProduct.getPrice(),
            quantity: 0,
            promotion: null,
          });
          return;
        }
      }

      if (normalProduct) {
        allProducts.push(normalProduct.getInfo());
      } else if (promotionProduct) {
        allProducts.push({
          name: promotionProduct.getName(),
          price: promotionProduct.getPrice(),
          quantity: 0,
          promotion: null,
        });
      }
    });

    return allProducts;
  }

  async decreaseStocks(purchasedProducts) {
    return purchasedProducts.map((purchasedProduct) => {
      const [product, quantity] = purchasedProduct;

      const promotionProduct = this.#findPromotionProduct(product);
      const normalProduct = this.#findNormalProduct(product);

      this.#validateProductQuantity(promotionProduct, normalProduct, quantity);

      if (!promotionProduct && normalProduct && normalProduct.getQuantity() >= quantity) {
        normalProduct.decreaseQuantity(quantity);
        return;
      }

      const promotion = this.#findPromotion(promotionProduct.getPromotion());

      if (promotionProduct && normalProduct) {
        if (promotionProduct.getQuantity() >= quantity) {
          let promotionQuantity = Math.floor(quantity / (promotion.getBuy() + 1));
          if (!promotion.validateDate()) {
            promotionQuantity = 0;
          }
          promotionProduct.decreaseQuantity(quantity);
          return { promotionProduct: promotionProduct, promotionQuantity: promotionQuantity };
        }

        const restQuantity = quantity - promotionProduct.getQuantity();
        let promotionQuantity = Math.floor(promotionProduct.getQuantity() / (promotion.getBuy() + 1));

        const nonPromotionQuantity = Math.floor(promotionProduct.getQuantity() % promotionQuantity) + restQuantity;
        if (nonPromotionQuantity > 0) {
        }
        if (!promotion.validateDate()) {
          promotionQuantity = 0;
        }

        promotionProduct.decreaseQuantity(promotionProduct.getQuantity());
        normalProduct.decreaseQuantity(restQuantity);
        return {
          promotionProduct: promotionProduct,
          promotionQuantity: promotionQuantity,
        };
      }
    });
  }

  #validateProductQuantity(promotionProduct, normalProduct, quantity) {
    if (promotionProduct && normalProduct && promotionProduct.getQuantity() + normalProduct.getQuantity() < quantity) {
      throw new Error(ERROR.SOLD_OUT_PRODUCT);
    }

    if (promotionProduct && !normalProduct && promotionProduct.getQuantity() < quantity) {
      throw new Error(ERROR.SOLD_OUT_PRODUCT);
    }

    if (!promotionProduct && normalProduct && normalProduct.getQuantity() < quantity) {
      throw new Error(ERROR.SOLD_OUT_PRODUCT);
    }
  }

  getPurchasedProductsWithPrice(purchasedProducts) {
    return purchasedProducts.map((purchasedProduct) => {
      const [product, quantity] = purchasedProduct;
      const promotionProduct = this.#findPromotionProduct(product);
      const normalProduct = this.#findNormalProduct(product);

      if (promotionProduct || normalProduct) {
        return { name: product, quantity: Number(quantity), price: Number(normalProduct.getPrice()) };
      }
    });
  }

  #findPromotionProduct(name) {
    return this.#stocks.find((product) => product.getPromotion() && product.getName() === name);
  }

  #findNormalProduct(name) {
    return this.#stocks.find((product) => !product.getPromotion() && product.getName() === name);
  }

  #findPromotion(name) {
    return this.#promotions.find((promotion) => promotion.getName() === name);
  }
}

export default StoreService;
