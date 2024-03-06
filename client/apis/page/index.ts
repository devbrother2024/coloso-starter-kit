import http from '@/client/http';
import { DomainError, PageDefaultException } from '@/policy/error';
import { cache } from '@/policy/site';
import { TypeCustomError } from '@/types/error';
import { TypeGetPageBySlug, TypeGetPreviewPage } from '@/types/page';
import { mapParams } from '@/utils/api';

export const getPageBySlug = async ({ slug, type, state, language }: TypeGetPageBySlug) => {
  try {
    const params = mapParams({ type, state, language });
    const { data } = await http.get(`/pages/${slug}`, params);
    return data;
  } catch (err) {
    const error = err as TypeCustomError;
    if (error.code !== DomainError.PAGE_SLUG_NOT_FOUND) {
      throw new PageDefaultException(error.message, error.code);
    }
    return { page: null };
  }
};

export const getPreviewPage = async ({ pageId, language }: TypeGetPreviewPage) => {
  const params = mapParams({ language });
  const options = { cache: cache.noStore };
  const { data } = await http.get(`/pages/${pageId}/preview`, params, options);
  return data;
};
