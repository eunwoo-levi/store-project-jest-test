class PromotionProduct {
  #name;
  #price;
  #quantity;
  #promotion;

  constructor(name, price, quantity, promotion) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
    this.#promotion = promotion;
  }

  getName() {
    return this.#name;
  }

  getPrice() {
    return Number(this.#price);
  }

  getQuantity() {
    return Number(this.#quantity);
  }

  getPromotion() {
    return this.#promotion;
  }

  getInfo() {
    return {
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
      promotion: this.#promotion,
    };
  }

  decreaseQuantity(quantity) {
    return (this.#quantity -= quantity);
  }
}

export default PromotionProduct;
