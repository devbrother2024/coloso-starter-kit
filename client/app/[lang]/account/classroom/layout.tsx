import { PropsWithChildren } from 'react';

import serverTranslation from '@/hooks/server/useTranslation';

interface TypeAccountClassroomLayout {
  params: {
    lang: string;
  };
}

const AccountClassroomLayout = async ({
  children,
  params: { lang },
}: PropsWithChildren<TypeAccountClassroomLayout>) => {
  const t = await serverTranslation({ locale: lang, scope: 'MyPage' });

  return (
    <section className="me-section">
      <h3 className="me-section__title">{t('ClassroomLabel')}</h3>
      {children}
    </section>
  );
};

export default AccountClassroomLayout;
