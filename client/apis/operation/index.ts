import http from '@/client/http';
import { OperationType } from '@/policy/operation';
import { ExtendedLanguage } from '@/types/language';
import { mapParams } from '@/utils/api';

interface TypeGetCurations extends ExtendedLanguage {
  type: string;
}

export const getCurations = async ({ type, language }: TypeGetCurations) => {
  const params = mapParams({ type, language });
  const { data } = await http.get('/operations/page', params);

  return data;
};

export const getCategoryCurations = async ({ type, language }: TypeGetCurations) => {
  const params = mapParams({ type, language });
  const { data } = await http.get('/operations/category', params);

  return data;
};

export const getI18n = async ({ language }: ExtendedLanguage) => {
  const { data } = await http.get(`/i18n/${language}`);
  return data;
};

export const getGlobalNavigation = async ({ language }: ExtendedLanguage) => {
  const params = mapParams({ type: OperationType.GLOBAL_NAVIGATION, language });
  const { data } = await http.get('/operations/global-navigation', params);
  return data;
};
