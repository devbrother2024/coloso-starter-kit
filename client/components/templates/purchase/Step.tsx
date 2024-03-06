'use client';

import { cx } from '@emotion/css';

import { IconNumberCircleOne, IconNumberCircleTwo } from '@/assets/icons';
import useTranslation from '@/hooks/client/useTranslation';

interface TypeProcessHeader {
  type: 'purchase' | 'order' | 'cancel';
}

const PurchaseProcess = {
  purchase: 'purchase',
  order: 'order',
  cancel: 'cancel',
};

const Step = ({ type }: TypeProcessHeader) => {
  const t = useTranslation({ scope: 'PurchaseSystem' });

  return (
    <ol className="board-process">
      <li className={cx({ 'board-process--active': type === PurchaseProcess.purchase })}>
        <IconNumberCircleOne />
        {t('OrderLabel')}
      </li>
      <li className={cx({ 'board-process--active': type === PurchaseProcess.order })}>
        <IconNumberCircleTwo />
        {t('OrderConfirmedLabel')}
      </li>
    </ol>
  );
};

export default Step;
