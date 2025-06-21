export const DialogModalType = {
  DEFAULT: 'DEFAULT',
  EXIST_EMAIL: 'EXIST_EMAIL',
  REJECT_SECRET: 'REJECT_SECRET',
  FAILED_SIGN_IN: 'FAILED_SIGN_IN',
  MARKETING_AGREEMENT: 'MARKETING_AGREEMENT',
  INVALID: 'INVALID',
  REJECT_SECRET_TIMEOUT: 'REJECT_SECRET_TIMEOUT',
};

export const DialogModalLabels: { [key: string]: { [key: string]: string } } = {
  DEFAULT: {
    title: 'AuthorizationError',
    description: 'SignInFailed',
  },
  ZOMBIE: {
    title: 'AuthorizationError',
    description: 'ZombieUser',
  },
  BLOCKED: {
    title: 'AuthorizationError',
    description: 'BlockedUser',
  },
  DELETED: {
    title: 'AuthorizationError',
    description: 'DeletedUser',
  },
  WITHDRAWN: {
    title: 'AuthorizationError',
    description: 'DeletedUser',
  },
  CONFIRM_WITHDRAW: {
    title: 'WithdrawTitle',
    description: 'WithdrawConfirmed',
  },
  OBSOLETED: {
    title: 'AuthorizationError',
    description: 'ObsoletedUser',
  },
  PENDING: {
    title: 'AuthorizationError',
    description: 'PendingUser',
  },
  INVALID: {
    title: 'AuthorizationError',
    description: 'ExistAccountLink',
  },
  EXIST_EMAIL: {
    title: 'AuthorizationError',
    description: 'InvalidEmailWarning',
  },
  REJECT_SECRET: {
    title: 'AuthorizationError',
    description: 'EmailVerificationFailed',
  },
  REJECT_SECRET_TIMEOUT: {
    title: 'AuthorizationError',
    description: 'TimeoutSecretCode',
  },
  SUCCEED_RESET_PASSWORD: {
    title: 'ResetPassword',
    description: 'ResetPasswordSuccess',
  },
  SUCCEED_FIND_PASSWORD: {
    title: 'ResetPassword',
    description: 'FindPasswordSuccess',
  },
  FAILED_FIND_PASSWORD: {
    title: 'AuthorizationError',
    description: 'ResetPasswordFailed',
  },
  FAILED_SIGN_IN: {
    title: 'AuthorizationError',
    description: 'SignInFailed',
  },
  UNAUTHORIZED: {
    title: 'AuthorizationError',
    description: 'FindPasswordFailedUser',
  },
  FORBIDDEN: {
    title: 'AuthorizationError',
    description: 'FindPasswordFailedUser',
  },
  MARKETING_AGREEMENT: {
    title: 'MarketingAgreementTitle',
    description: 'MarketingAgreementDescription',
  },
};
