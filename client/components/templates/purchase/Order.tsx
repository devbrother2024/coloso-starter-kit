'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useSnapshot } from 'valtio';

import { getProductOrders } from '@/apis/product';
import Catalog from '@/components/layouts/purchase/Catalog';
import Elective from '@/components/layouts/purchase/Elective';
import PurchaseProvider from '@/components/providers/PurchaseProvider';
import { queryKey } from '@/policy/queryKey';
import i18nStore from '@/store/i18n';
import { purchaseStore } from '@/store/purchase';

interface TypeOrder {
  productId: number;
}

const Order = ({ productId }: TypeOrder) => {
  const searchParams = useSearchParams();
  const bundleId = Number(searchParams.get('bundle')) || null;
  const { lang } = useSnapshot(i18nStore);
  const { isElective } = useSnapshot(purchaseStore);

  const { data: purchase } = useQuery({
    queryKey: [queryKey.PURCHASE_BY_ID, productId, { language: lang }],
    queryFn: () => getProductOrders({ productId, bundleId, language: lang }),
  });

  return (
    <>
      {isElective ? <Elective /> : <Catalog />}
      <PurchaseProvider purchase={purchase} bundleId={bundleId} />
    </>
  );
};

export default Order;
