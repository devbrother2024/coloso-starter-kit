'use client';

import { useQuery } from '@tanstack/react-query';

import { getOrders } from '@/apis/account';
import { IconInfoRound } from '@/assets/icons';
import EmptyAccountItem from '@/components/layouts/account/EmptyAccountItem';
import PaymentList from '@/components/layouts/account/PaymentList';
import { queryKey } from '@/policy/queryKey';
import { TypeOrderDetail } from '@/types/order';

const PaymentPaid = () => {
  const { data: orders } = useQuery({
    queryKey: [queryKey.ORDERS],
    queryFn: getOrders,
  });

  if (!orders?.orderDetail.length) {
    return <EmptyAccountItem icon={<IconInfoRound className="icon" />} label="EmptyPaymentHistory" />;
  }

  return orders.orderDetail.map((paidProducts: TypeOrderDetail) => (
    <PaymentList key={paidProducts.id} paymentProducts={paidProducts} />
  ));
};

export default PaymentPaid;
