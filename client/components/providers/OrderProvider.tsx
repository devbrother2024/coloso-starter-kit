'use client';

import { useEffect } from 'react';

import { ProductType } from '@/policy/product';
import { setOrderStore } from '@/store/order';
import { TypeOrderDetail } from '@/types/order';

interface TypeOrderProvider {
  order?: { orderDetail: TypeOrderDetail[] };
}

const OrderProvider = ({ order }: TypeOrderProvider) => {
  useEffect(() => {
    if (!order) return;
    const [orderDetail] = order.orderDetail;
    const [orderItem] = orderDetail.orderItems;
    const [usedVoucherId] = orderDetail.voucherIds ?? [];
    const product = orderItem.product;
    const bundleProducts = product.products ?? []; // bundle
    const optionProducts = product.items ?? []; // option or elective
    const electiveCourses = optionProducts.map(({ courses: [course] = [] }) => course);
    const isBundle = product.type === ProductType.BUNDLE;
    const isElective = product.type === ProductType.ELECTIVE;
    const courses = isElective ? electiveCourses : (product.courses ?? []);
    const [optionProduct] = optionProducts;
    const hasOptionProduct = optionProducts.some(({ type }) =>
      [ProductType.COACHING, ProductType.GOODS].includes(type),
    );
    setOrderStore({
      orderDetail,
      usedVoucherId,
      product,
      electiveCourses,
      bundleProducts,
      optionProducts,
      courses,
      optionProduct,
      isBundle,
      isElective,
      hasOptionProduct,
    });
  }, [order]);

  return <></>;
};

export default OrderProvider;
