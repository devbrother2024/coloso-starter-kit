'use client';

import { CustomerLanguageCode, LanguageCodes } from '@/policy/language';
import { siteLocaleCookieName } from '@/policy/site';
import i18nStore from '@/store/i18n';

const expiredDate = new Date();
expiredDate.setTime(expiredDate.getTime() + 365 * 24 * 60 * 60 * 1000);

const useSiteLanguage = () => {
  const setSiteLanguage = (lang: string) => {
    if (LanguageCodes.includes(lang as CustomerLanguageCode)) {
      i18nStore.lang = lang;
      document.cookie = `${siteLocaleCookieName}=${lang}; expires=${expiredDate}; path=/;`;
    }
  };

  return { setSiteLanguage };
};

export default useSiteLanguage;
