import http from '@/client/http';
import { ExtendedLanguage } from '@/types/language';
import { mapParams } from '@/utils/api';

interface TypeGetDisplaysById extends ExtendedLanguage {
  id: number;
}

interface TypeGetDisplayItems extends ExtendedLanguage {
  id: number;
  target: string;
  sort?: string;
}

export const getDisplaysById = async ({ id, language }: TypeGetDisplaysById) => {
  const params = mapParams({ language });
  const { data } = await http.get(`/displays/${id}`, params);
  return data;
};

export const getDisplayItems = async ({ id, target, sort, language }: TypeGetDisplayItems) => {
  const params = mapParams({ sort, language });
  const { data } = await http.get(`/catalogs/displays/`, params);
  return data;
};

export const getDisplayCategories = async ({ language }: ExtendedLanguage) => {
  const params = mapParams({ language });
  const { data } = await http.get('/displays', params);
  return data;
};
