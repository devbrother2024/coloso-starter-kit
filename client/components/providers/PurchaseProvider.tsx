'use client';

import { useEffect } from 'react';

import usePurchase from '@/hooks/client/usePurchase';
import { ProductType } from '@/policy/product';
import { resetPurchaseStore, setPurchaseStore } from '@/store/purchase';
import { TypeGetProductOrders, TypeProduct, TypeProductBundle } from '@/types/product';

interface PurchaseProvider {
  bundleId: number | null;
  purchase?: TypeGetProductOrders;
}

const PurchaseProvider = ({ purchase, bundleId }: PurchaseProvider) => {
  const { redirectPrevPage } = usePurchase();

  const getOptionProduct = (bundle: TypeProductBundle[], bundleId: number | null) =>
    bundleId ? bundle.filter((bundle) => bundle.id === bundleId) : [];

  const getCourseProduct = (bundle: TypeProductBundle[], product: TypeProduct) => {
    const isElective = product.type === ProductType.ELECTIVE;
    const isBundle = product.type === ProductType.BUNDLE;
    if (isBundle || isElective) {
      const courses = bundle.filter((bundle) => bundle.type === ProductType.COURSE);
      return courses;
    }
    return [product];
  };

  useEffect(() => {
    if (!purchase) return;
    const { product, impData, bundle, vouchers: usableVouchers, callbackUrl } = purchase;
    setPurchaseStore({
      impData,
      product,
      bundle,
      callbackUrl,
      usableVouchers,
      courseProduct: getCourseProduct(bundle, product),
      optionProduct: getOptionProduct(bundle, bundleId),
      isAllowVouchers: !product.disallowCouponTags,
      isBundle: product.type === ProductType.BUNDLE,
      isElective: product.type === ProductType.ELECTIVE,
    });
  }, [purchase, redirectPrevPage, bundleId]);

  useEffect(() => {
    return () => resetPurchaseStore();
  }, []);

  return <></>;
};

export default PurchaseProvider;
