'use client';

import { useSnapshot } from 'valtio';

import useTranslation from '@/hooks/client/useTranslation';
import { purchaseStore } from '@/store/purchase';

import CourseSelector from './CourseSelector';
import ProductView from './ProductView';

const Elective = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const { courseProduct } = useSnapshot(purchaseStore);

  return (
    <div className="board-block">
      <h3 className="board-block__h">{t('Order')}</h3>
      <ProductView />
      <CourseSelector products={courseProduct} />
    </div>
  );
};

export default Elective;
