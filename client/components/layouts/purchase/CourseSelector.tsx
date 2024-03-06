'use client';

import { useSnapshot } from 'valtio';

import Checkbox from '@/components/elements/Checkbox';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { NotificationLabels } from '@/policy/notificationLabels';
import { purchaseStore, setPurchaseStore } from '@/store/purchase';
import { TypeProduct } from '@/types/product';

import Course from './Course';

interface TypeCourseSelector {
  products: TypeProduct[];
}

const CourseSelector = ({ products }: TypeCourseSelector) => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const executeNotifications = useToast();
  const { product, selectedProducts } = useSnapshot(purchaseStore);
  const {
    extras: { electiveOptionCount },
  } = product;
  const isMaximum = selectedProducts.length === electiveOptionCount;

  const onSelectedProduct = (product: TypeProduct) => {
    const { selectedProducts } = purchaseStore;
    const hasItem = selectedProducts.some((item) => item.id === product.id);
    const filteredItems = selectedProducts.filter((item) => item.id !== product.id);

    if (isMaximum) {
      setPurchaseStore({
        selectedProducts: filteredItems,
      });
      return;
    }

    setPurchaseStore({
      selectedProducts: hasItem ? filteredItems : [...selectedProducts, product],
    });
  };

  return (
    <div className="purchase-selector">
      <div className="purchase-selector__header">
        <div className="purchase-selector__h">{t('ScheduledClass')}</div>
        <p className="purchase-selector__p">
          {t('SelectClass')}
          <span>
            (<i>{selectedProducts.length}</i>/{electiveOptionCount})
          </span>
        </p>
      </div>
      <div className="purchase-selector__list">
        {products.map((product) => {
          const { id, course } = product;
          const checked = selectedProducts.some((item) => item.id === product.id);

          return (
            <Checkbox
              key={id}
              name={`${id}`}
              checked={checked}
              callback={(event) => {
                const { name: productId } = event.target;
                const selectedProduct = products.find((product) => product.id === Number(productId));
                const isOverflow = isMaximum && !selectedProducts.find((product) => product.id === Number(productId));

                if (isOverflow) {
                  const { type, message } = NotificationLabels.OVERFLOW_PRODUCT_ITEM;
                  executeNotifications({ type, message: t(message) });
                  return;
                }

                selectedProduct && onSelectedProduct(selectedProduct);
              }}
            >
              {course && <Course isEmphasis={true} course={course} />}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSelector;
