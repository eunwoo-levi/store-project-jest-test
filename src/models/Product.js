class Product {
  #name;
  #price;
  #quantity;

  constructor(name, price, quantity) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
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

  getInfo() {
    return {
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
    };
  }

  decreaseQuantity(quantity) {
    return (this.#quantity -= quantity);
  }
}

export default Product;
