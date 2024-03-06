'use client';

import { useEffect, useState } from 'react';

import { useSnapshot } from 'valtio';

import PaymentBundle from '@/components/layouts/purchase/PaymentBundle';
import PaymentDefault from '@/components/layouts/purchase/PaymentDefault';
import TotalPrice from '@/components/layouts/purchase/TotalPrice';
import { purchaseStore, setPurchaseStore } from '@/store/purchase';
import { TypeProduct } from '@/types/product';
import { TypeVoucherTemplate } from '@/types/voucher';
import {
  convertToVoucherCondition,
  VoucherCondition,
  VoucherFilterValidation,
  VoucherTemplateFilter,
} from '@/utils/localPolicy';

const voucherFilterValidation = new VoucherFilterValidation();

const Payment = () => {
  const { product, isBundle, isElective, selectedVoucher, courseProduct, optionProduct } = useSnapshot(purchaseStore);
  const [selectedProducts, setSelectedProducts] = useState<TypeProduct[]>([]);
  const { voucherTemplate } = selectedVoucher ?? {};

  useEffect(() => {
    const result = isBundle || isElective ? [product] : [...courseProduct, ...optionProduct];
    setSelectedProducts(result);
  }, [isBundle, isElective, product, courseProduct, optionProduct]);

  useEffect(() => {
    const getDiscountProduct = (products: TypeProduct[], voucherTemplate: TypeVoucherTemplate | null) => {
      const findProduct = products.find((product) => {
        if (voucherTemplate) {
          const validateMinPaymentAmount = product.salePrice >= voucherTemplate.minPaymentAmount;
          const voucherCondition = {
            ...convertToVoucherCondition(product),
            displayIds: product.displays?.map(({ id }) => id) ?? [],
          };
          voucherFilterValidation.setCondition(voucherCondition as VoucherCondition);
          return (
            voucherFilterValidation.validate(voucherTemplate.voucherTemplateFilters as VoucherTemplateFilter[]) &&
            validateMinPaymentAmount
          );
        }
        return false;
      });
      return findProduct ?? null;
    };
    const discountProduct = getDiscountProduct(selectedProducts, voucherTemplate ?? null);
    setPurchaseStore({ discountProduct });
  }, [selectedProducts, voucherTemplate]);

  if (isBundle)
    return (
      <>
        <PaymentBundle />
        <TotalPrice />
      </>
    );

  return (
    <>
      <PaymentDefault selectedProducts={selectedProducts} />
      <TotalPrice />
    </>
  );
};

export default Payment;
