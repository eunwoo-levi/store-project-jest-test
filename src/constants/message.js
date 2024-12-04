export const INPUT = Object.freeze({
  ITEM_AND_QUANTY: '\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
  CONTINUE_PURCHASE_WITHOUT_DISCOUNT: (item, quantity) =>
    `\n현재 ${item} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
  MEMBERSHIP_DISCOUNT: '\n멤버십 할인을 받으시겠습니까? (Y/N)\n',
  MORE_PURCHASE: '\n감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)',
});

export const OUTPUT = Object.freeze({
  HEADER: '안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n',
  STOCK: (product, price, quantity, promotion) => {
    if (quantity === 0) {
      return `- ${product} ${price}원 재고 없음 ${promotion}`;
    }
    return `- ${product} ${price}원 ${quantity}개 ${promotion}`;
  },

  RECEIPT_HEADER: '\n===========W 편의점=============\n상품명\t\t수량\t금액',
  RECEIPT: (product, quantity, price) => `${product}\t\t${quantity}\t\t${price}`,
  RECEIPT_PROMOTION_HEADER: '===========증	정=============',
  RECEIPT_PROMOTION: (product, quantity) => `${product}\t\t${quantity}`,
  RECEIPT_RESULT_HEADER: '==============================',
  RECEIPT_TOTAL_COST: (quantity, cost) => `총구매액\t\t${quantity}\t${cost}`,
  RECEIPT_PROMOTION_DISCOUNT: (discount) => `행사할인\t\t\t-${discount}`,
  RECEIPT_MEMBERSHIP_DISCOUNT: (discount) => `멤버십할인\t\t\t-${discount}`,
  RECEIPT_FINAL_COST: (cost) => `내실돈\t\t\t\t${cost}`,
});
