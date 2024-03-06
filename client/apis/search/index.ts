import http from '@/client/http';
import { ExtendedLanguage } from '@/types/language';
import { TypeGetSearchResult } from '@/types/search';
import { mapParams } from '@/utils/api';

export const getSearchRecommendedKeywords = async ({ language }: ExtendedLanguage) => {
  const params = mapParams({ language });
  const { data, meta } = await http.get('/search/recommend', params);
  return { ...data, ...meta };
};

export const getSearchResult = async ({ keyword, language, sort }: TypeGetSearchResult) => {
  const params = mapParams({ keyword, language, sort });
  const { data, meta } = await http.get('/search/result', params);
  return { ...data, ...meta };
};
