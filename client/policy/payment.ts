interface TypePaymentType {
  [key: string]: string;
}

export const PaymentMethod = {
  CARD: 'Card',
  PAYPAL: 'Paypal',
  PROMOTION: 'Promotion',
};

export const PaymentType: TypePaymentType = {
  COMPLETED: 'PaymentCompleted',
  PENDING: 'PaymentPending',
  REFUND: 'PaymentRefunded',
};
