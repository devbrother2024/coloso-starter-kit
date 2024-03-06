'use client';

import { Fragment, ReactElement } from 'react';

import { IconVisa, IconMaster, IconPaypal, IconJcb, IconAmex } from '@/assets/icons';
import useTranslation from '@/hooks/client/useTranslation';
import { PaymentType } from '@/policy/payment';
import { PaymentMethodLabels } from '@/policy/purchase';
import { TypeOrderDetail } from '@/types/order';
import { formatUTC, formatUnitToSlash } from '@/utils/date';
import { priceLocale } from '@/utils/price';

import ProductContents from './ProductContents';
import ProductDetail from './ProductDetail';

const { MasterCard, VISA, PAYPAL, JCB, AMEX, PROMOTION } = PaymentMethodLabels;
const paymentIcons: Record<string, ReactElement> = {
  [MasterCard]: <IconMaster />,
  [VISA]: <IconVisa />,
  [PAYPAL]: <IconPaypal />,
  [JCB]: <IconJcb />,
  [AMEX]: <IconAmex />,
};

const PaymentList = ({ paymentProducts }: { paymentProducts: TypeOrderDetail }) => {
  const t = useTranslation({ scope: 'PurchaseSystem' });

  const paymentTypeName = (type: string, state: string): string => {
    if (type === 'REFUND') return t(PaymentType[type]);
    return t(PaymentType[state]);
  };

  const paymentCompletedLabel = (completedAt: string | null) => {
    if (!completedAt) return '';
    const { dateLabel, secondLabel } = formatUnitToSlash(completedAt);
    return `${dateLabel} ${secondLabel} ${formatUTC().label}`;
  };

  const paymentMethodLabel = (paymentMethod: string, paymentPg: string, cardName: string): string | ReactElement => {
    if (paymentMethod === PROMOTION) return t('Promotion');
    return paymentPg === PaymentMethodLabels.PAYPAL ? paymentIcons[paymentPg] : paymentIcons[cardName];
  };

  return (
    <li className="board-block">
      <div className="payment-list__status">
        <span className="payment-list__state">
          {paymentTypeName(paymentProducts.paymentType, paymentProducts.paymentState)}
        </span>
        <span
          className="payment-list__date"
          dangerouslySetInnerHTML={{ __html: paymentCompletedLabel(paymentProducts.paymentCompletedAt) }}
        />
      </div>

      {paymentProducts.orderItems.map(({ product }) => (
        <Fragment key={product.id}>
          <ProductContents publicTitle={product.publicTitle} subtitle={product.subtitle} />
          <ProductDetail product={product} />
        </Fragment>
      ))}

      <ul className="payment-list">
        <li>
          <span className="payment-list__label">{t('ListPrice')}</span> {priceLocale(paymentProducts.orderListPrice)}
        </li>
        <li>
          <span className="payment-list__label">{t('DiscountPrice')}</span>
          {priceLocale(paymentProducts.orderDiscountPrice, false)}
        </li>
        <li>
          <span className="payment-list__label">{t('TotalPrice')}</span>
          {priceLocale(paymentProducts.orderSalePrice)}
        </li>
        <li>
          <span className="payment-list__label">{t('PaymentMethod')}</span>
          {paymentMethodLabel(paymentProducts.paymentMethod, paymentProducts.paymentPg, paymentProducts.cardName)}
        </li>
      </ul>
    </li>
  );
};

export default PaymentList;
