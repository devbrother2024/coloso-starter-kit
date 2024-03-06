import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { site } from '@/client/policy';

interface TypeI18n {
  [key: string]: { [key: string]: string };
}

interface TypeI18nStore {
  lang: string;
  i18n: TypeI18n | null;
}

const i18nStore = proxy<TypeI18nStore>({ lang: site.DEFAULT_LANGUAGE, i18n: null });

devtools(i18nStore, { name: 'i18n' });

export default i18nStore;
