import useTranslation from '@/hooks/client/useTranslation';

const Promotion = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  return (
    <>
      <h3 className="board-block__h">{t('PromotionProductLabel')}</h3>
      <p>{t('PromotionProductDescription')}</p>
    </>
  );
};

export default Promotion;
