import { useSnapshot } from 'valtio';

import usePurchase from '@/hooks/client/usePurchase';
import useTranslation from '@/hooks/client/useTranslation';
import { purchaseStore } from '@/store/purchase';
import { priceLocale } from '@/utils/price';

import DiscountPrice from './DiscountPrice';

const PaymentBundle = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const { product, discountProduct } = useSnapshot(purchaseStore);
  const { paymentPrice } = usePurchase();

  const bundleDiscountPrice = paymentPrice.packageSalePrice - product.salePrice;

  return (
    <>
      <div className="board-block__item purchase-product">
        <span className="board-block__name purchase-product__title">
          <i>{product.publicTitle}</i>
        </span>
        <p className="board-block__desc">{priceLocale(paymentPrice.packageSalePrice)}</p>
      </div>
      <DiscountPrice title={t('BundleDiscountPrice')} price={bundleDiscountPrice > 0 ? bundleDiscountPrice : 0} />
      {discountProduct && <DiscountPrice title={t('CouponSavingPrice')} price={paymentPrice.discountAmount} />}
    </>
  );
};

export default PaymentBundle;
