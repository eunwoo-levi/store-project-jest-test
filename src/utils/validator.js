import { ERROR } from '../constants/errors.js';

export const validateYesOrNo = (input) => {
  if (input === 'Y') {
    return true;
  } else if (input === 'N') {
    return false;
  }

  throw new Error(ERROR.INVALID_INPUT);
};
