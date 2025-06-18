import { TypeExtendedCalculateVoucher } from '@/types/payment';
import { TypeProduct } from '@/types/product';
import { TypeVoucher, TypeVoucherTemplate } from '@/types/voucher';

import { calculateVoucher } from './localPolicy';

const initializeVoucherTemplateAmount = {
  discountAmount: 0,
  discountRate: 0,
  minPaymentAmount: 0,
  maxDiscountAmount: 0,
};

// 결제시 바우처 할인 가격 검증을 위한 정보
export const getVouchersInfo = (selectedVoucher: TypeVoucher | null, discountProduct: TypeProduct | null) => {
  const calculated = calculateVoucher({
    voucher: selectedVoucher?.voucherTemplate ?? (initializeVoucherTemplateAmount as TypeVoucherTemplate),
    salePrice: discountProduct?.salePrice ?? 0,
    taxFreeAmount: discountProduct?.taxFreeAmount ?? 0,
  });

  if (!selectedVoucher || !discountProduct) return [];

  return [
    {
      id: selectedVoucher.id,
      productId: discountProduct.id,
      ...calculated,
    },
  ];
};

export const extendedCalculateVoucher = ({
  calculatedPayment,
  voucherTemplate,
  salePrice,
  taxFreeAmount,
}: TypeExtendedCalculateVoucher) => {
  const calculatedVoucherAmount = calculateVoucher({
    voucher: voucherTemplate ?? initializeVoucherTemplateAmount,
    salePrice,
    taxFreeAmount,
  });
  return {
    ...calculatedVoucherAmount,
    finalTaxFreeAmount: Math.max(calculatedPayment.taxFreeAmount - calculatedVoucherAmount.discountTaxFreeAmount, 0),
    finalTotalAmount: Math.max(calculatedPayment.salePrice - calculatedVoucherAmount.discountAmount, 0),
  };
};

// 바우처 사용 시작일에 도래했는지 체크한다.
export const isAvailablePeriodVoucher = (useBeginAt?: Date | null) => {
  if (!useBeginAt) return true;

  const now = new Date().getTime();
  const periodBeginAt = new Date(useBeginAt).getTime();
  return periodBeginAt < now;
};
