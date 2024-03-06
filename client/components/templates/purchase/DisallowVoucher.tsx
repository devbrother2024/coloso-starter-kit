'use client';

import { useSnapshot } from 'valtio';

import useTranslation from '@/hooks/client/useTranslation';
import { purchaseStore } from '@/store/purchase';

const DisallowVoucher = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const { isAllowVouchers } = useSnapshot(purchaseStore);

  if (isAllowVouchers) return null;

  return (
    <div className="board-block">
      <h3 className="board-block__h">{t('CouponNotAllowed1')}</h3>
      <p className="board-block__desc">{t('CouponNotAllowed2')}</p>
    </div>
  );
};

export default DisallowVoucher;
