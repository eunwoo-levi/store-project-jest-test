export const INPUT = Object.freeze({
  PRODUCT_AND_QUANTITY: '\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
  MEMBERSHIP_DISCOUNT: '\n멤버십 할인을 받으시겠습니까? (Y/N)\n',
  PURCHASING_WITHOUT_PROMOTION: (product, quantity) =>
    `\n현재 ${product} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
  CONTINUE_SHOPPING: '\n감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n',
});

export const OUTPUT = Object.freeze({
  STOCK: (product, price, quantity, promotion) => `- ${product} ${price}원 ${quantity} ${promotion}`,
  RECEIPT_HEADER: '\n===========W 편의점=============\n상품명\t\t수량\t금액',
  RECEIPT_PURCHASED_PRODUCTS: (product, price, quantity) => `${product}\t\t${price}\t\t${quantity}`,
  RECEIPT_PROMOTION_HEADER: '===========증	정=============',
  RECEIPT_PROMOTION: (product, quantity) => `${product}\t\t${quantity}`,
  RECEIPT_FINAL_HEADER: '==============================',
  RECEIPT_TOTAL_COST: (quantity, cost) => `총구매액\t\t${quantity}\t\t${cost}`,
  RECEIPT_PROMOTION_DISCOUNT: (discount) => `행사할인\t\t\t-${discount}`,
  RECEIPT_MEMBERSHIP_DISCOUNT: (discount) => `멤버십할인\t\t\t-${discount}`,
  RECEIPT_FINAL_COST: (cost) => `내실돈\t\t\t\t${cost}`,
});
