'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import useTranslation from '@/hooks/client/useTranslation';

const BaseContainer = dynamic(() => import('@/components/templates/containers/BaseContainer'), { ssr: false });
const Button = dynamic(() => import('@/components/elements/Button'), { ssr: false });
const Icon404 = dynamic(() => import('@/assets/icons/404.svg'), { ssr: false });
const Footer = dynamic(() => import('@/components/layouts/common/Footer'), { ssr: false });
const Header = dynamic(() => import('@/components/layouts/common/Header'), { ssr: false });

const Error = () => {
  const router = useRouter();
  const t = useTranslation({ scope: 'SiteGlobal' });

  return (
    <>
      <Header />
      <BaseContainer>
        <div className="grid--medium">
          <section className="error">
            <h2 className="a11y">{t('PageNotFoundErrorLabel')}</h2>
            <i className="icon--404">
              <Icon404 />
            </i>

            <p className="message">
              <strong>{t('PageNotFoundError')}</strong>
            </p>

            <Button callback={() => router.back()}>{t('GoBackLink')}</Button>
          </section>
        </div>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default Error;
