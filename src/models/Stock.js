class Stock {
  #stocks;
  constructor(stocks) {
    this.#stocks = stocks;
  }

  getStocks() {
    return this.#stocks;
  }
}

export default Stock;
