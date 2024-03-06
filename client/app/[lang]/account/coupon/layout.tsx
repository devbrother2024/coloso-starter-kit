import { PropsWithChildren } from 'react';

import RedeemVoucher from '@/components/modules/common/RedeemVoucher';
import serverTranslation from '@/hooks/server/useTranslation';

interface TypeAccountCouponLayout {
  params: {
    lang: string;
  };
}

const AccountCouponLayout = async ({ children, params: { lang } }: PropsWithChildren<TypeAccountCouponLayout>) => {
  const t = await serverTranslation({ locale: lang, scope: 'MyPage' });

  return (
    <section className="me-section">
      <h3 className="me-section__title">{t('CouponLabel')}</h3>
      <RedeemVoucher />
      {children}
    </section>
  );
};

export default AccountCouponLayout;
