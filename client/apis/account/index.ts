import http from '@/client/http';
import { ExtendedLanguage } from '@/types/language';
import { mapParams } from '@/utils/api';
import getLogger from '@/utils/logger';

const logger = getLogger('apis', 'account');

export const getEnrollment = async ({ language }: ExtendedLanguage) => {
  const params = mapParams({ language });
  const { data } = await http.get('/users/courses', params);
  return data;
};

export const getOrders = async () => {
  const params = mapParams({ limit: 999 });
  const { data } = await http.get('/orders/12312412', params);
  return data;
};
