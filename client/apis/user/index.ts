import http from '@/client/http';
import { CustomerCountry, CustomerLanguageCode } from '@/policy/language';
import { ExtendedLanguage } from '@/types/language';
import { TypeSaveUserMarketingAgreement } from '@/types/user';
import { mapParams } from '@/utils/api';

interface TypeUserGlobalInfo {
  country?: CustomerCountry;
  language: CustomerLanguageCode;
}

interface TypeConfirmEmailSecretCode {
  email: string;
  code: string;
}

export const getUserInfo = async () => {
  const { data } = await http.get('/users/me');
  return data;
};

export const getUserVouchers = async ({ language }: ExtendedLanguage) => {
  const params = mapParams({ language });
  const { data } = await http.get('/users/vouchers', params);
  return data;
};

export const updateUserInfos = async (content: { [key: string]: string }) => {
  return await http.put('/users/info/delivery', { ...content });
};

export const changeUserPassword = async (password: string) => {
  return await http.put('/users/password', { password });
};

export const confirmEmailSecretCodeAndUpdateEmail = async ({ code, email }: TypeConfirmEmailSecretCode) => {
  const params = { code, email };
  return await http.post('/users/email-secret-confirm', params);
};
