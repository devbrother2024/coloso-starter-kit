'use client';

import { ComponentType, useEffect, useState } from 'react';

import { useSnapshot } from 'valtio';

import { IconVisa, IconMaster, IconAmex, IconJcb, IconPaypal } from '@/assets/icons';
import ContentBlock from '@/components/layouts/purchase/ContentBlock';
import DiscountPrice from '@/components/layouts/purchase/DiscountPrice';
import useTranslation from '@/hooks/client/useTranslation';
import { AvailablePaymentServiceLabels } from '@/policy/purchase';
import { orderStore } from '@/store/order';
import { calcPaymentPrice, getOptionProductsSalePrice } from '@/utils/payment';
import { priceLocale } from '@/utils/price';

const PaymentServiceIcon: Record<string, ComponentType<{ className: string }>> = {
  VISA: IconVisa,
  Master: IconMaster,
  AMEX: IconAmex,
  JCB: IconJcb,
  PAYPAL: IconPaypal,
};

const OrderPayment = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const {
    orderDetail,
    product,
    bundleProducts,
    optionProducts,
    optionProduct,
    paymentPrice,
    isBundle,
    isElective,
    hasOptionProduct,
  } = useSnapshot(orderStore);

  const [paymentServiceLabel, setPaymentServiceLabel] = useState('');

  const price = isBundle ? paymentPrice.packageSalePrice : paymentPrice.salePrice;
  const discountPrice = orderDetail?.orderDiscountPrice ?? 0;
  const totalPrice = orderDetail?.orderSalePrice ?? 0;
  const isDiscount = discountPrice > 0;
  const RenderPaymentServiceIcon = PaymentServiceIcon[paymentServiceLabel] ?? null;

  const getPaymentService = () => {
    const { orderDetail } = orderStore;
    const { cardName, paymentPg } = orderDetail ?? {};
    const [eximbay] = AvailablePaymentServiceLabels.CARD.filter((service) => cardName?.includes(service));
    const [paypal] = AvailablePaymentServiceLabels.PAYPAL.filter((service) => paymentPg?.includes(service));
    return eximbay ?? paypal ?? '';
  };

  useEffect(() => {
    if (!product) return;
    const result = calcPaymentPrice({
      isBundle,
      isElective,
      product,
      optionProduct: optionProducts,
      courseProduct: isBundle ? bundleProducts : [product],
    });
    // 현물 가격을 뺀 판매가 노출
    const calcPrice = Math.abs(result.salePrice - getOptionProductsSalePrice(hasOptionProduct, optionProducts));
    orderStore.paymentPrice = { ...result, salePrice: calcPrice };
  }, [product, bundleProducts, optionProducts, isBundle, isElective, hasOptionProduct]);

  useEffect(() => {
    const paymentService = getPaymentService();
    setPaymentServiceLabel(paymentService);
  }, [orderDetail]);

  if (!product) return null;

  return (
    <div className="board-block">
      <h3 className="board-block__h">{t('PaymentInformation')}</h3>
      <ContentBlock className="purchase-product" summary={product.publicTitle}>
        {priceLocale(price)}
      </ContentBlock>
      <DiscountPrice
        isVisible={isBundle}
        title={t('BundleDiscountPrice')}
        price={paymentPrice.packageSalePrice - product.salePrice}
      />
      <DiscountPrice isVisible={isDiscount} title={t('CouponSavingPrice')} price={discountPrice} />
      <ContentBlock isVisible={hasOptionProduct} summary={optionProduct?.publicTitle ?? ''}>
        {priceLocale(optionProduct?.salePrice)}
      </ContentBlock>
      <ContentBlock isDivide isBold summary={t('TotalPrice')}>
        <strong>{priceLocale(totalPrice)}</strong>
      </ContentBlock>
      <ContentBlock isBold summary={t('PaymentMethod')}>
        {RenderPaymentServiceIcon ? <RenderPaymentServiceIcon className="icon" /> : t('PromotionLabel')}
      </ContentBlock>
    </div>
  );
};

export default OrderPayment;
