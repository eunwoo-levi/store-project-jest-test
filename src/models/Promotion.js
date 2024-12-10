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

  validateDate() {
    return new Date(this.#startDate) < DateTimes.now() && DateTimes.now() < new Date(this.#endDate);
  }
}

export default Promotion;
