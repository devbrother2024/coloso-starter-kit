'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useSnapshot } from 'valtio/react';

import RedeemVoucher from '@/components/modules/common/RedeemVoucher';
import useTranslation from '@/hooks/client/useTranslation';
import { queryKey } from '@/policy/queryKey';
import { purchaseStore } from '@/store/purchase';

interface TypeVoucher {
  productId: number;
}

const Voucher = ({ productId }: TypeVoucher) => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const queryClient = useQueryClient();
  const { isAllowVouchers } = useSnapshot(purchaseStore);

  const refetchPurchase = () => {
    queryClient.invalidateQueries({ queryKey: [queryKey.PURCHASE_BY_ID, productId] });
  };

  if (!isAllowVouchers) return null;

  return (
    <>
      <h3 className="board-block__h">{t('SelectCoupon')}</h3>
      <div className="board-block__form">
        <RedeemVoucher refetch={refetchPurchase} />
      </div>
    </>
  );
};

export default Voucher;
