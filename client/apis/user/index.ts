import http from '@/client/http';
import { CustomerCountry, CustomerLanguageCode } from '@/policy/language';
import { ExtendedLanguage } from '@/types/language';
import { TypeSaveUserMarketingAgreement } from '@/types/user';
import { mapParams } from '@/utils/api';
import getLogger from '@/utils/logger';

const logger = getLogger('apis', 'user');

interface TypeUserGlobalInfo {
  country?: CustomerCountry;
  language: CustomerLanguageCode;
}

interface TypeConfirmEmailSecretCode {
  email: string;
  code: string;
}

interface TypeUpdateProfile {
  name?: string;
  username?: string;
  phone?: string;
  language?: string;
  country?: string;
  postalCode?: string;
  address?: string;
  addressExtra?: string;
  emailMarketingAgreedAt?: boolean;
  phoneMarketingAgreedAt?: boolean;
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

export const getMe = async () => {
  try {
    const { data } = await http.get('/users/me');
    return data;
  } catch (err) {
    const error = err as Error;
    logger.warn('failed to get user profile', error?.message);
    throw error;
  }
};

export const updateMe = async (profile: TypeUpdateProfile) => {
  try {
    const { data } = await http.put('/users/me', profile);
    return data;
  } catch (err) {
    const error = err as Error;
    logger.warn('failed to update user profile', error?.message);
    throw error;
  }
};
