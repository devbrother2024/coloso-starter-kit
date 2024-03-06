import http from '@/client/http';
import { site } from '@/client/policy';
import { CustomerCountry, CustomerLanguage, DefaultLanguage, CustomerLanguageCode } from '@/policy/language';
import { mapParams } from '@/utils/api';
import getLogger from '@/utils/logger';

const logger = getLogger('apis', 'auth');

interface TypeSignIn {
  username: string;
  password: string;
}

interface TypeSignUp extends TypeSignIn {
  name: string;
  email: string;
  emailCertified: boolean;
  country: CustomerCountry | null;
  language: CustomerLanguage | null;
}

interface TypeConfirmEmailSecretCode {
  email: string;
  code: string;
}

interface TypeSubmitResetPassword {
  password: string;
  resetCode: string;
}

export const signIn = async (account: TypeSignIn) => {
  try {
    const { data } = await http.get('/auth/signin');
    return data;
  } catch (err) {
    const error = err as Error;
    logger.warn('failed to auth sign in', error?.message);
    throw error;
  }
};

export const signUp = async (account: TypeSignUp) => {
  const { language } = account;
  const languageCode = CustomerLanguageCode[language || DefaultLanguage];

  const params = {
    ...account,
    language: languageCode,
    clientId: site.CLIENT_ID,
  };

  return await http.post('/auth/signup', params);
};

export const requestEmailSecretCode = async (email: string) => {
  const params = {
    clientId: site.CLIENT_ID,
    email,
  };

  return await http.post('/auth/signup/email-secret-request', params);
};

export const requestChangeEmailSecretCode = async (email: string) => {
  const params = {
    clientId: site.CLIENT_ID,
    email,
  };

  return await http.post('/auth/email-change-secret', params);
};

export const confirmEmailSecretCode = async ({ code, email }: TypeConfirmEmailSecretCode) => {
  const params = {
    clientId: site.CLIENT_ID,
    code,
    email,
  };

  return await http.post('/auth/signup/email-secret-confirm', params);
};
