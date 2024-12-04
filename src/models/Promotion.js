import { DateTimes } from '@woowacourse/mission-utils';

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

  getName() {
    return this.#name;
  }

  getBuy() {
    return this.#buy;
  }

  checkForPromotion(quantity) {
    if (quantity >= this.#buy && this.#isValidPromotionPeriod()) {
      return true;
    }

    return false;
  }

  #isValidPromotionPeriod() {
    const nowDate = DateTimes.now();
    const startDate = new Date(this.#startDate);
    const endDate = new Date(this.#endDate);

    return nowDate >= startDate && nowDate <= endDate;
  }
}

export default Promotion;
