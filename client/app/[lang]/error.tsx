'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import useTranslation from '@/hooks/client/useTranslation';

const BaseContainer = dynamic(() => import('@/components/templates/containers/BaseContainer'), { ssr: false });
const Button = dynamic(() => import('@/components/elements/Button'), { ssr: false });
const Icon500 = dynamic(() => import('@/assets/icons/500.svg'), { ssr: false });

/*
 * TODOs:
 * - common error 로 변경 like unicorn!
 * - router history 없으면 홈으로 이동
 *
 * */
const Error = () => {
  const router = useRouter();
  const t = useTranslation({ scope: 'SiteGlobal' });

  return (
    <BaseContainer>
      <div className="grid--medium">
        <section className="error">
          <h2 className="a11y">{t('PageNotFoundErrorLabel')}</h2>
          <i className="icon--500">
            <Icon500 />
          </i>

          <p className="message">
            <strong>{t('PageNotFoundError')}</strong>
          </p>

          <Button callback={() => router.back()}>{t('GoBackLink')}</Button>
        </section>
      </div>
    </BaseContainer>
  );
};

export default Error;
