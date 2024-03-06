// use server-component-only
import { getI18n } from '@/apis/operation';
import { CustomerLanguageCode, LanguageCodes } from '@/policy/language';
import { queryKey } from '@/policy/queryKey';
import getLogger from '@/utils/logger';
import queryClient from '@/utils/queryClient';

const logger = getLogger('hooks', 'server useTranslate');
interface TypeUseTranslationParams {
  locale: string;
  scope?: string;
}

export default async function useTranslation({ locale, scope }: TypeUseTranslationParams) {
  const validLanguageCode = LanguageCodes.includes(locale);
  const lang = validLanguageCode ? locale : CustomerLanguageCode.EN;

  const res = await queryClient.fetchQuery({
    queryKey: [queryKey.I18N, lang],
    queryFn: () => getI18n({ language: lang }),
  });

  // todo: move util fn?
  if (!res) return (key: string) => key;
  return (key: string, opts?: Record<string, string | number>) => {
    try {
      const scp = scope ?? opts!.scope;
      const model = res[scp][key] ?? key;
      if (!opts) return model;
      return model.replace(/{([^{}]*)}/g, (tag: string, match: string) => opts[match] ?? tag);
    } catch (err) {
      const error = err as Error;
      logger.warn(`TypeError to i18n ${key}`, error?.message);
      return key;
    }
  };
}
