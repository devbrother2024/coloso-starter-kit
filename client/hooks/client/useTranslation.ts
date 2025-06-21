// only 'use client';
import { useQuery } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';

import { getI18n } from '@/apis/operation';
import { queryKey } from '@/policy/queryKey';
import i18nStore from '@/store/i18n';
import getLogger from '@/utils/logger';

const logger = getLogger('hooks', 'client useTranslate');

interface TypeUseTranslationParams {
  locale?: string;
  scope?: string;
}

export default function useTranslation({ locale, scope }: TypeUseTranslationParams = {}) {
  const i18n = useSnapshot(i18nStore);
  const lang = locale ?? i18n.lang;

  const { data: token, isFetching } = useQuery({
    queryKey: [queryKey.I18N, lang],
    queryFn: () => getI18n({ language: lang }),
  });

  // todo: move util fn?
  if (!token) return (key: string) => (isFetching ? '\b' : key);
  return (key: string, opts?: Record<string, string | number>) => {
    if (!key) {
      debugger;
    }

    const scp = scope ?? opts!.scope;
    const model = token[scp][key] ?? key;
    if (!model) {
      logger.warn(`i18n model not found, scp.key = ${scp}.${key} `);
      return '';
    }
    if (!opts) return model;
    try {
      return model.replace(/{([^{}]*)}/g, (tag: string, match: string) => opts[match] ?? tag);
    } catch (err) {
      const error = err as Error;
      logger.warn(`TypeError to i18n ${key}`, error?.message);
      return key;
    }
  };
}
