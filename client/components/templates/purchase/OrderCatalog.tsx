'use client';

import { useSnapshot } from 'valtio';

import Course from '@/components/layouts/purchase/Course';
import Product from '@/components/layouts/purchase/Product';
import useTranslation from '@/hooks/client/useTranslation';
import { orderStore } from '@/store/order';

const OrderCatalog = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const { courses, product, paymentPrice } = useSnapshot(orderStore);

  return (
    <div className="board-block">
      <h3 className="board-block__h">{t('PaymentCompletedLabel')}</h3>
      <Product product={product} price={paymentPrice.salePrice} />
      <div className="purchase-course__container">
        {courses.map((course, i) => (
          <Course key={i} course={course} />
        ))}
      </div>
    </div>
  );
};

export default OrderCatalog;
