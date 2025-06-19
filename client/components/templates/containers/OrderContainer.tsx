'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useSnapshot } from 'valtio';

import Loader from '@/components/elements/Loader';
import PurchaseCancelDialog from '@/components/modules/dialogs/PurchaseCancelDialog';
import useDialog from '@/hooks/client/useDialog';
import { setOrderStore, orderStore } from '@/store/order';

const OrderContainer = ({ children }: PropsWithChildren) => {
  const { isCancel } = useSnapshot(orderStore);
  const { isActiveDialog, onOpenDialog, onCloseDialog } = useDialog();

  useEffect(() => {
    if (!isCancel) return;

    onOpenDialog();
  }, [isCancel, onOpenDialog]);

  useEffect(() => {
    return () => {
      setOrderStore(null);
    };
  }, []);

  if (isCancel) {
    return (
      <>
        <Loader />
        <PurchaseCancelDialog isActive={isActiveDialog} onClose={onCloseDialog} />
      </>
    );
  }

  return <>{children}</>;
};

export default OrderContainer;
