import { Fragment } from 'react';

import usePurchase from '@/hooks/client/usePurchase';
import useTranslation from '@/hooks/client/useTranslation';
import { purchaseStore } from '@/store/purchase';
import { TypeProduct } from '@/types/product';
import { priceLocale } from '@/utils/price';

import DiscountPrice from './DiscountPrice';

interface TypePaymentDefault {
  selectedProducts: TypeProduct[];
}

const PaymentDefault = ({ selectedProducts }: TypePaymentDefault) => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const { paymentPrice } = usePurchase();

  return (
    <>
      {selectedProducts.map((product, i) => {
        const salePrice = product.salePrice;
        const { discountProduct } = purchaseStore;

        const isDiscountProduct = product.id === discountProduct?.id;

        return (
          <Fragment key={i}>
            <div className="board-block__item purchase-product">
              <span className="board-block__name purchase-product__title">
                <i>{product.publicTitle}</i>
              </span>
              <p className="board-block__desc">{priceLocale(salePrice)}</p>
            </div>
            {isDiscountProduct && <DiscountPrice title={t('CouponSavingPrice')} price={paymentPrice.discountAmount} />}
          </Fragment>
        );
      })}
    </>
  );
};

export default PaymentDefault;
