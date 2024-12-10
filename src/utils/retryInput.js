import { Console } from '@woowacourse/mission-utils';

export const retryInput = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    Console.print(error.message);
    return retryInput(callback);
  }
};
