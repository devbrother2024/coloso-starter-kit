'use client';

import { IconConfirm, IconError } from '@/assets/icons';
import useTranslation from '@/hooks/client/useTranslation';

interface TypeProcess {
  isCancel: boolean;
}

const Process = ({ isCancel }: TypeProcess) => {
  const t = useTranslation({ scope: 'PurchaseSystem' });

  if (isCancel) {
    return (
      <p className="board-process__state board-process__state--cancel">
        <IconError className="icon" /> {t('PaymentFailedWarning')}
      </p>
    );
  }

  return (
    <p className="board-process__state">
      <IconConfirm className="icon" /> {t('PaymentCompletedDescription')}
    </p>
  );
};

export default Process;
