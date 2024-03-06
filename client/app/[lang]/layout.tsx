import { PropsWithChildren } from 'react';

import ProgressLoader from 'nextjs-toploader';

import Provider from '@/app/provider';
import { site } from '@/client/policy';
import NavigationDetector from '@/components/modules/bloc/NavigationDetector';
import ToastUi from '@/components/modules/dialogs/ToastUi';
import { CustomerLanguageCode, LanguageCodes } from '@/policy/language';
import { updateLocaleMeta } from '@/utils/meta';

interface TypeLangLayoutMeta {
  params: { lang: CustomerLanguageCode };
}

export function generateMetadata({ params: { lang } }: TypeLangLayoutMeta) {
  try {
    const isValidLanguage = LanguageCodes.includes(lang);
    const language = isValidLanguage ? lang : site.DEFAULT_LANGUAGE;

    return updateLocaleMeta(language);
  } catch (err) {
    return {};
  }
}

const LangLayout = async ({ children, params: { lang } }: PropsWithChildren<TypeLangLayoutMeta>) => {
  const isValidLanguage = LanguageCodes.includes(lang);
  const language = isValidLanguage ? lang : site.DEFAULT_LANGUAGE;

  return (
    <html lang={language}>
      <head />
      <body>
        <ProgressLoader color="#ffb200" height={2} showSpinner={false} />
        <Provider>
          {children}
          <ToastUi />
        </Provider>
        <NavigationDetector />
      </body>
    </html>
  );
};

export default LangLayout;
