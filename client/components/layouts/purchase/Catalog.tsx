'use client';

import { useSnapshot } from 'valtio';

import useTranslation from '@/hooks/client/useTranslation';
import { purchaseStore } from '@/store/purchase';

import Course from './Course';
import Option from './Option';
import ProductView from './ProductView';

const Catalog = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const { courseProduct, optionProduct } = useSnapshot(purchaseStore);

  return (
    <div className="board-block">
      <h3 className="board-block__h">{t('Order')}</h3>
      <ProductView />
      <div className="purchase-course__container">
        {courseProduct.map(({ course }, i) => course && <Course key={i} course={course} />)}
      </div>
      {optionProduct.map((product, i) => (
        <Option key={i} product={product} />
      ))}
    </div>
  );
};

export default Catalog;
