'use client';

import { useQuery } from '@tanstack/react-query';

import { getOrders } from '@/apis/account';
import { IconInfoRound } from '@/assets/icons';
import EmptyAccountItem from '@/components/layouts/account/EmptyAccountItem';
import PaymentList from '@/components/layouts/account/PaymentList';
import { queryKey } from '@/policy/queryKey';
import { TypeOrderDetail } from '@/types/order';

const PaymentRefund = () => {
  const { data: orders } = useQuery({
    queryKey: [queryKey.ORDERS],
    queryFn: getOrders,
    gcTime: 0,
  });

  if (!orders?.refundOrders.length) {
    return <EmptyAccountItem icon={<IconInfoRound className="icon" />} label="EmptyRefundHistory" />;
  }

  return orders.refundOrders.map((refundProducts: TypeOrderDetail) => (
    <PaymentList key={refundProducts.id} paymentProducts={refundProducts} />
  ));
};

export default PaymentRefund;
