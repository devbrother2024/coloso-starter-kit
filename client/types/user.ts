export interface User {
  id: number;
  customerId: number;
  name: string;
  userId: number;
  site: string;
  email: string;
  maskedEmail: string;
  phone: string;
  language: string;
  country: string;
  postalCode: string | null;
  address: string | null;
  addressExtra: string | null;
  phoneCertifiedAt: string;
  phoneMarketingAgreedAt: string | null;
  phoneMarketingDisagreedAt: string | null;
  emailMarketingAgreedAt: string | null;
  emailMarketingDisagreedAt: string | null;
  emailMarketingAgreement: boolean | null;
  phoneMarketingAgreement: boolean | null;
}

export interface TypeSignUpAccount {
  name: string;
  username: string;
  password: string;
  email: string;
  emailCertified: boolean;
}

export interface TypeSignUp {
  account: TypeSignUpAccount;
  invalidName: boolean;
  invalidEmail: boolean;
  hasCertificateEmail: boolean;
  isPasswordConfirmed: boolean;
}

export interface TypeSignUpForm {
  signUpForm: TypeSignUp;
  dispatchSignUpForm: (states: Partial<TypeSignUp>) => void;
}

export interface TypeSaveUserMarketingAgreement {
  emailMarketingAgreement: boolean;
}
