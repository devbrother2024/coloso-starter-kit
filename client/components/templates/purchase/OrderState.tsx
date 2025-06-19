'use client';

import { useEffect, useRef, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSnapshot } from 'valtio';

import { getOrderById, requestOrderCancel, requestOrderSuccess } from '@/apis/order';
import { isLocal } from '@/client/policy';
import Process from '@/components/layouts/purchase/Process';
import OrderProvider from '@/components/providers/OrderProvider';
import { queryKey } from '@/policy/queryKey';
import i18nStore from '@/store/i18n';
import { orderStore, setOrderStore } from '@/store/order';
import { TypeUpdatePaymentState } from '@/types/order';
import { TypeGetProductOrders } from '@/types/product';
import { OrderState as PurchaseState } from '@/utils/localPolicy';
import getLogger from '@/utils/logger';
import { toCurrencyView } from '@/utils/price';

const logger = getLogger('pages', 'done');

interface TypeOrderState {
  orderId: number;
}

const OrderState = ({ orderId }: TypeOrderState) => {
  const router = useRouter();
  const pathname = usePathname()!;
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { lang } = useSnapshot(i18nStore);
  const { orderDetail, product, usedVoucherId } = useSnapshot(orderStore);

  const [enabledOrder, setEnabledOrder] = useState(false);
  const [isOrderCanceled, setIsOrderCanceled] = useState(false);

  const state = orderDetail?.paymentState ?? PurchaseState.PENDING;

  const paymentStateRef = useRef({ success: false, cancel: false });
  const paymentRef = useRef({
    orderId,
    impSuccess: !!`${searchParams.get('imp_success') ?? false}`,
    impMerchantUid: searchParams.get('merchant_uid') ?? '',
    impUid: searchParams.get('imp_uid') ?? '',
  });
  const payment = paymentRef.current;
  const isCancel = isOrderCanceled || state === PurchaseState.CANCELLED;

  const { data: order } = useQuery({
    queryKey: [queryKey.PURCHASE_ORDER, orderId, lang],
    queryFn: () => getOrderById({ orderId: Number(orderId), language: lang }),
    enabled: enabledOrder,
  });

  const purchase = queryClient.getQueryData<TypeGetProductOrders>([
    queryKey.PURCHASE_BY_ID,
    product?.id,
    { language: lang },
  ]);

  const { mutate: mutateOrderSuccess } = useMutation({
    mutationFn: requestOrderSuccess,
    onSettled: () => setEnabledOrder(true),
  });

  const { mutate: mutateOrderCancel } = useMutation({
    mutationFn: requestOrderCancel,
    onSettled: () => setIsOrderCanceled(true),
    onError: (error: Error) => {
      logger.warn('failed to mutate order cancellation', error);
    },
  });

  const updatePaymentState = ({ type, state }: TypeUpdatePaymentState) => {
    paymentStateRef.current[type] = state;
  };

  useEffect(() => {
    if (payment.impSuccess) return;
    setEnabledOrder(true);
  }, [payment.impSuccess]);

  // success
  useEffect(() => {
    const { success } = paymentStateRef.current;

    if (!payment.impSuccess || success) return;
    const { orderId, impMerchantUid, impUid } = payment;
    updatePaymentState({ type: 'success', state: true });
    mutateOrderSuccess({ orderId, impMerchantUid, impUid });

    // refetchMyPageQueryKey
    queryClient.refetchQueries({ queryKey: [queryKey.USER_COURSES, { language: lang }] });
    queryClient.refetchQueries({ queryKey: [queryKey.USER_VOUCHERS] });
    queryClient.refetchQueries({ queryKey: [queryKey.ORDERS] });
  }, [
    mutateOrderSuccess,
    payment.impSuccess,
    payment.impMerchantUid,
    payment.impUid,
    paymentStateRef,
    payment,
    queryClient,
    lang,
  ]);

  // cancel
  useEffect(() => {
    const { cancel: isRequestedCancel } = paymentStateRef.current;
    const invalidCancel = payment.impSuccess || !payment.impMerchantUid;

    setOrderStore({ isCancel });
    if (invalidCancel || isRequestedCancel || isCancel) return;

    const { orderId, impMerchantUid } = payment;
    updatePaymentState({ type: 'cancel', state: true });
    mutateOrderCancel({ orderId, impMerchantUid });
  }, [
    isCancel,
    mutateOrderCancel,
    payment.impMerchantUid,
    payment.impSuccess,
    payment.orderId,
    paymentStateRef,
    payment,
  ]);

  return (
    <>
      <Process isCancel={isCancel} />
      <OrderProvider order={order} />
    </>
  );
};

export default OrderState;
