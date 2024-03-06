import { TypeProduct, TypeProductBundle } from '@/types/product';
import { TypeVoucher, TypeVoucherTemplate } from '@/types/voucher';

export interface TypeCalcPaymentPrice {
  product: TypeProduct;
  courseProduct: TypeProduct[];
  optionProduct: TypeProductBundle[];
  discountProduct?: TypeProduct | null;
  selectedVoucher?: TypeVoucher | null;
  isBundle: boolean;
  isElective: boolean;
}

export interface TypeExtendedCalculateVoucher {
  calculatedPayment: Omit<TypePaymentPrice, 'discountAmount' | 'totalAmount'>;
  voucherTemplate: TypeVoucherTemplate;
  salePrice: number;
  taxFreeAmount: number;
}
