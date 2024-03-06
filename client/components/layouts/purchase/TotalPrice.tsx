import usePurchase from '@/hooks/client/usePurchase';
import useTranslation from '@/hooks/client/useTranslation';
import { priceLocale } from '@/utils/price';

const TotalPrice = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const { paymentPrice } = usePurchase();

  return (
    <>
      <hr className="hr" />
      <div className="board-block__item">
        <span className="board-block__name">
          <strong>{t('TotalPrice')}</strong>
        </span>
        <p className="board-block__desc">
          <strong>{priceLocale(paymentPrice.totalAmount)}</strong>
        </p>
      </div>
    </>
  );
};

export default TotalPrice;
