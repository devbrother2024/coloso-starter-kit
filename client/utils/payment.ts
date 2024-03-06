import { TypeCalcPaymentPrice } from '@/types/payment';
import { TypeProduct } from '@/types/product';

import { extendedCalculateVoucher } from './voucher';

const reducePrices = (prices: number[]) => prices.reduce((acc, cur) => acc + cur, 0);

export const calcPaymentPrice = ({
  product,
  courseProduct,
  optionProduct,
  discountProduct,
  selectedVoucher,
  isBundle,
  isElective,
}: TypeCalcPaymentPrice) => {
  const listPrices = [
    ...courseProduct.map((product) => product.listPrice || 0),
    ...optionProduct.map((product) => product.listPrice || 0),
  ];
  const salePrices = [
    ...courseProduct.map((product) => product.salePrice || 0),
    ...optionProduct.map((product) => product.salePrice || 0),
  ];
  const taxFreeAmounts = [
    ...courseProduct.map((product) => product.taxFreeAmount || 0),
    ...optionProduct.map((product) => product.taxFreeAmount || 0),
  ];

  const hasVoucher = selectedVoucher?.id;
  const isTaxFreeAmount = isBundle || isElective;

  const packageSalePrice = reducePrices(salePrices);
  const listPrice = reducePrices(listPrices);
  const salePrice = isTaxFreeAmount ? product.salePrice : packageSalePrice;
  const taxFreeAmount = isTaxFreeAmount ? product.taxFreeAmount : reducePrices(taxFreeAmounts);
  const discountPrice = packageSalePrice - listPrice;

  const calculatedPayment = {
    listPrice,
    salePrice,
    taxFreeAmount,
    discountPrice,
    packageSalePrice,
    discountAmount: 0,
    totalAmount: salePrice,
  };

  if (hasVoucher) {
    const { finalTaxFreeAmount, discountAmount, finalTotalAmount } = extendedCalculateVoucher({
      calculatedPayment,
      voucherTemplate: selectedVoucher.voucherTemplate,
      salePrice: discountProduct?.salePrice ?? 0,
      taxFreeAmount: discountProduct?.taxFreeAmount ?? 0,
    });

    return {
      ...calculatedPayment,
      discountAmount,
      taxFreeAmount: finalTaxFreeAmount,
      totalAmount: finalTotalAmount,
    };
  }

  return calculatedPayment;
};

export const getOptionProductsSalePrice = (isOption: boolean, optionProducts: TypeProduct[]) => {
  if (isOption) return optionProducts.map(({ salePrice }) => salePrice).reduce((acc, cur) => acc + cur, 0);
  return 0;
};
