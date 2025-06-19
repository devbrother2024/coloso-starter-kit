import { useEffect } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import i18nStore from '@/store/i18n';

import useSiteLanguage from './useSiteLanguage';

const useLanguageSelector = () => {
  const { setSiteLanguage } = useSiteLanguage();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChangeLanguage = (languageCode: string) => {
    const { lang } = i18nStore;

    if (lang === languageCode) return;

    i18nStore.lang = languageCode;

    const [, path] = pathname.split(`/${lang}`);
    const queryParams = searchParams.toString();
    router.push(`/${languageCode}${path}${queryParams ? `?${queryParams}` : ''}`);
  };

  useEffect(() => {
    const [, siteLang] = pathname.split('/') ?? 'en';
    setSiteLanguage(siteLang);
  }, [pathname, setSiteLanguage]);

  return { onChangeLanguage };
};
export default useLanguageSelector;
