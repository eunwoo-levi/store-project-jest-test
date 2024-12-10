export const parseString = (inputString) => {
  return inputString.split(',').map((productAndQuantity) => {
    const parsedProductAndQuantity = productAndQuantity.slice(1, productAndQuantity.length - 1);
    return parsedProductAndQuantity.split('-');
  });
};
