class Promotion {
  #name;
  #buy;
  #get;
  #startDate;
  #endDate;
  constructor(name, buy, get, startDate, endDate) {
    this.#name = name;
    this.#buy = buy;
    this.#get = get;
    this.#startDate = startDate;
    this.#endDate = endDate;
  }

  getPromotion() {
    return this.#name;
  }

  checkForPromotion(quantity) {
    if (quantity >= buy) {
      return true;
    }

    return false;
  }

  getPromotionDiscountPrice(quantity, price) {
    return quantity;
  }
}

export default Promotion;
