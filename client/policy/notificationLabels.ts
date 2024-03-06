export const NotificationLabels = {
  INVALID_PHONE: {
    message: '',
    type: 'reject',
  },
  SUCCEED_VERIFICATION: {
    message: '',
    type: 'confirm',
  },
  INVALID_SALE_PRODUCT: {
    message: 'UnavailableProductNow',
    type: 'reject',
  },
  SUCCEED_VOUCHER_REDEEM: {
    message: 'Redeemed',
    type: 'confirm',
  },
  SUCCEED_VOUCHER_APPLY: {
    message: 'Applied',
    type: 'confirm',
  },
  FAILED_VOUCHER_CODE: {
    message: 'RedeemFailed',
    type: 'reject',
  },
  ALREADY_VOUCHER_CODE: {
    message: 'RedeemedAlready',
    type: 'reject',
  },
  VALID_EMAIL: {
    message: 'EmailUpdated',
    type: 'confirm',
  },
  INVALID_EMAIL: {
    message: 'InvalidEmailWarning',
    type: 'reject',
  },
  CONFIRM_PASSWORD: {
    message: 'ResetPhoneNumberSuccess',
    type: 'confirm',
  },
  SEND_SECRET: {
    message: 'SendRequestSuccess',
    type: 'confirm',
  },
  REJECT_SECRET_TIMEOUT: {
    message: 'TimeoutSecretCode',
    type: 'reject',
  },
  REJECT_SECRET_RESEND: {
    message: 'ResendRequestRejected',
    type: 'reject',
  },
  CONFIRM_SUBMIT: {
    message: 'UpdateConfirmed',
    type: 'confirm',
  },
  REJECT_SUBMIT: {
    message: 'UpdateFailed',
    type: 'reject',
  },
  CONFIRM_WITHDRAW: {
    message: 'WithdrawConfirmed',
    type: 'confirm',
  },
  ERROR_WITHDRAW: {
    message: 'WithdrawFailed',
    type: 'reject',
  },
  CONFIRM_EMAIL_MARKETING_AGREED: {
    message: 'AgreedEmail',
    type: 'confirm',
  },
  CONFIRM_EMAIL_MARKETING_DISAGREED: {
    message: 'DisagreedEmail',
    type: 'reject',
  },
  REJECT_AUTHORIZATION: {
    message: 'SignedOutLabel',
    type: 'reject',
  },
  OVERFLOW_PRODUCT_ITEM: {
    message: 'InvalidProductSelection',
    type: 'reject',
  },
};

export const NotificationErrorLabels = {
  INVALID_NAME: 'InvalidNameWarning',
  INVALID_EMAIL: 'InvalidEmailWarning',
  CONFIRM_SECRET: 'SendRequestSuccess',
  REJECT_SECRET: 'EmailVerificationFailed',
  REJECT_SECRET_TIMEOUT: 'ResendRequestRejected',
  INVALID_PASSWORD_LOGIN: 'InvalidPasswordWarning',
  INVALID_PASSWORD: 'InvalidPasswordWarning',
  INVALID_PASSWORD_MATCH: 'InvalidPasswordConfirmWarning',
  INVALID_SECRET_CODE: 'InvalidSecretCode',
};
