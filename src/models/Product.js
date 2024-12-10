class Product {
  #name;
  #price;
  #quantity;
  #promotion;
  constructor(name, price, quantity) {
    this.#name = name;
    this.#price = Number(price);
    this.#quantity = Number(quantity);
    this.#promotion = null;
  }

  getInfo() {
    return { name: this.#name, price: this.#price, quantity: this.#quantity, promotion: this.#promotion };
  }

  getName() {
    return this.#name;
  }

  getPrice() {
    return this.#price;
  }

  getQuantity() {
    return this.#quantity;
  }

  getPromotion() {
    return this.#promotion;
  }

  decreaseQuantity(quantity) {
    this.#quantity -= quantity;
  }
}

export default Product;
