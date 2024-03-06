export const AvailablePaymentServiceLabels = {
  CARD: ['VISA', 'Master', 'AMEX', 'JCB'],
  PAYPAL: ['PAYPAL'],
};

export const PaymentMethodLabels: Record<string, string> = {
  MasterCard: 'MasterCard',
  VISA: 'VISA',
  PAYPAL: 'PAYPAL',
  AMEX: 'AMEX',
  JCB: 'JCB',
  PROMOTION: 'PROMOTION',
};

export const PaymentMethods = [
  {
    id: 'CARD',
    pg: 'eximbay',
    method: 'card',
  },
  {
    id: 'PAYPAL',
    pg: 'paypal',
    method: 'card',
  },
];

export const PaymentLocale = {
  currency: 'USD',
  language: 'en',
};

export const InitializePaymentPrice = {
  listPrice: 0,
  salePrice: 0,
  packageSalePrice: 0,
  discountPrice: 0,
  taxFreeAmount: 0,
  discountAmount: 0,
  totalAmount: 0,
};
