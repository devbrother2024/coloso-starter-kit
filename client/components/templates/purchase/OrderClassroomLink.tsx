'use client';

import Link from '@/components/elements/Link';
import useTranslation from '@/hooks/client/useTranslation';

const OrderClassroomLink = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });

  return (
    <Link href="/account/classroom" className="btn purchase-submit btn--wide">
      {t('PaymentCompletedButton')}
    </Link>
  );
};

export default OrderClassroomLink;
