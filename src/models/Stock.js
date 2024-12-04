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
    const promotionProduct = this.findPromotionProduct(name);
    const normalProduct = this.findNormalProduct(name);

    if (promotionProduct) {
      return promotionProduct;
    }
    return normalProduct;
  }

  decreaseQuantitiyOfNormalProduct(name, quantity) {
    const normalProduct = this.findNormalProduct(name);
    normalProduct.decreaseQuantity(quantity);
  }

  getProductPrice(name) {
    const promotionProduct = this.findPromotionProduct(name);
    const normalProduct = this.findNormalProduct(name);

    if (promotionProduct) {
      return promotionProduct.getPrice();
    }
    return normalProduct.getPrice();
  }

  findPromotionProduct(name) {
    return this.#products.find((product) => product instanceof PromotionProduct && product.getName() === name);
  }

  findNormalProduct(name) {
    return this.#products.find((product) => !(product instanceof PromotionProduct) && product.getName() === name);
  }
}

export default Stock;
