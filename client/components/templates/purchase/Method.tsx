'use client';

import { ChangeEvent, ComponentType, useEffect } from 'react';

import { useSnapshot } from 'valtio';

import { IconPaypal, IconVisa, IconMaster, IconAmex, IconJcb } from '@/assets/icons';
import Radio from '@/components/elements/Radio';
import Promotion from '@/components/layouts/purchase/Promotion';
import usePurchase from '@/hooks/client/usePurchase';
import useTranslation from '@/hooks/client/useTranslation';
import { AvailablePaymentServiceLabels, PaymentMethods } from '@/policy/purchase';
import { purchaseStore, setPurchaseStore } from '@/store/purchase';
import { MIN_PAYABLE_PRICE } from '@/utils/localPolicy';

const MethodLabels = {
  CARD: 'Card',
  PAYPAL: 'Paypal',
};

const PaymentServices: Record<string, ComponentType<{ className: string }>> = {
  VISA: IconVisa,
  Master: IconMaster,
  AMEX: IconAmex,
  JCB: IconJcb,
  PAYPAL: IconPaypal,
};

const Method = () => {
  const t = useTranslation();
  const { selectedPaymentType, isPromotion } = useSnapshot(purchaseStore);
  const { paymentPrice } = usePurchase();

  const onSelectedPaymentType = (event: ChangeEvent<HTMLInputElement>) => {
    const { id: selectedPaymentType } = event.target;
    setPurchaseStore({ selectedPaymentType });
  };

  useEffect(() => {
    const isPromotion = paymentPrice.totalAmount < MIN_PAYABLE_PRICE;
    setPurchaseStore({ isPromotion });
  }, [paymentPrice.totalAmount]);

  if (isPromotion) return <Promotion />;

  return (
    <>
      <h3 className="board-block__h">{t('PaymentMethod', { scope: 'PurchaseSystem' })}</h3>
      <ul className="purchase-payment">
        {PaymentMethods.map((paymentType, i) => {
          const type = paymentType.id.toUpperCase() as keyof typeof AvailablePaymentServiceLabels;
          const service = AvailablePaymentServiceLabels[type];

          return (
            <li key={i}>
              <Radio
                id={paymentType.id}
                name="payment"
                value={paymentType.pg}
                checked={selectedPaymentType === type}
                callback={onSelectedPaymentType}
              >
                {t(MethodLabels[type], { scope: 'OrderSystem' })}
                <div className="purchase-payment__caption">
                  {service.map((label, i) => {
                    const PaymentServiceIcon = PaymentServices[label];
                    return <PaymentServiceIcon key={i} className="icon" />;
                  })}
                </div>
              </Radio>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Method;
