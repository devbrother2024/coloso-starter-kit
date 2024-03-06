'use client';

import { ReactNode } from 'react';

import { cx } from '@emotion/css';
import { useSnapshot } from 'valtio';

import { purchaseStore } from '@/store/purchase';

interface TypePurchaseContainer {
  children: ReactNode;
}

const PurchaseContainer = ({ children }: TypePurchaseContainer) => {
  const { callPayment } = useSnapshot(purchaseStore);

  return <form className={cx('purchase-form', { 'purchase-form--disabled': callPayment })}>{children}</form>;
};

export default PurchaseContainer;
