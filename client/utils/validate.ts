import {
  isValidName as validName,
  isValidEmail as validEmail,
  isValidEmailSecret as validEmailSecret,
  isValidPassword as validPassword,
} from '@/utils/localPolicy';

export const isValidName = (value: string) => !value || validName(value);

export const isValidEmail = (value: string) => !value || validEmail(value);

export const isValidEmailSecret = (value: string) => !value || validEmailSecret(value);

export const isValidPassword = (value: string) => !value || validPassword(value);
