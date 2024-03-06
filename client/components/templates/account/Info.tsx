'use client';

import EditAccount from '@/components/layouts/account/EditAccount';
import useTranslation from '@/hooks/client/useTranslation';

const Info = () => {
  const t = useTranslation();
  return (
    <>
      <h3 className="me-section__title me-section__title--info">{t('EditUserInfoLabel', { scope: 'MyPage' })}</h3>
      <EditAccount />
    </>
  );
};

export default Info;
