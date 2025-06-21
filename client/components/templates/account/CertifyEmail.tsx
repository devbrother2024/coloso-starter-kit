'use client';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { cx } from '@emotion/css';
import { useMutation } from '@tanstack/react-query';

import { confirmEmailSecretCode, requestEmailSecretCode } from '@/apis/auth';
import { IconCheckGreen } from '@/assets/icons';
import Button from '@/components/elements/Button';
import AccountDialog from '@/components/modules/dialogs/AccountDialog';
import useCountdown from '@/hooks/client/useCountdown';
import useDialog from '@/hooks/client/useDialog';
import useForm from '@/hooks/client/useForm';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { DialogModalType } from '@/policy/account';
import { NotificationErrorLabels, NotificationLabels } from '@/policy/notificationLabels';
import { CertificationTimer } from '@/policy/timer';
import { TypeSignUpForm } from '@/types/user';
import { isValidEmail } from '@/utils/validate';

const CertifyEmail = ({ signUpForm, dispatchSignUpForm }: TypeSignUpForm) => {
  const [form, dispatchForm] = useForm({
    code: '',
    onSendCode: false,
    invalidEmail: false,
    canResendEmail: false,
  });

  const { count, timer, isCounting, setIsCounting, setIsResetCount } = useCountdown(CertificationTimer.DEFAULT);
  const executeNotifications = useToast();
  const [dialogType, setDialogType] = useState(DialogModalType.DEFAULT);
  const { isActiveDialog, onOpenDialog, onCloseDialog } = useDialog();
  const t = useTranslation({ scope: 'AccountSystem' });

  const { mutate: mutationSendEmailCode } = useMutation({
    mutationFn: () => requestEmailSecretCode(signUpForm.account.email),
    onSuccess: () => {
      executeNotifications(NotificationLabels.SEND_SECRET);
      setIsCounting(true);
      setIsResetCount(true);
      dispatchForm({ onSendCode: true, canResendEmail: true });
    },
    onError: () => {
      dispatchForm({ canResendEmail: false });
      setDialogType(DialogModalType.EXIST_EMAIL);
      onOpenDialog();
    },
  });

  const { mutate: mutationCertifyCode } = useMutation({
    mutationFn: () => confirmEmailSecretCode({ code: form.code, email: signUpForm.account.email }),
    onSuccess: () => {
      dispatchForm({ onSendCode: false });
      dispatchSignUpForm({ account: { ...signUpForm.account, emailCertified: true }, hasCertificateEmail: true });
    },
    onError: () => {
      setDialogType(DialogModalType.REJECT_SECRET);
      onOpenDialog();
    },
  });

  const onCertifyCode = () => {
    if (!isCounting) {
      setDialogType(DialogModalType.REJECT_SECRET_TIMEOUT);
      onOpenDialog();
      return;
    }
    mutationCertifyCode();
  };

  useEffect(() => {
    if (count < CertificationTimer.RESEND) {
      dispatchForm({ canResendEmail: false });
    }
  }, [count, dispatchForm]);

  useEffect(() => {
    const { email } = signUpForm.account;
    const invalidEmail = !!email && !isValidEmail(email);

    dispatchForm({ invalidEmail });
  }, [signUpForm.account, dispatchForm]);

  return (
    <>
      {signUpForm.hasCertificateEmail ? (
        <CompleteCertifyEmail hasCertificateEmail={signUpForm.hasCertificateEmail} email={signUpForm.account.email} />
      ) : (
        <fieldset className="auth-block">
          <div
            className={cx('input__trigger', {
              label: !!signUpForm.account.username,
              invalid: form.invalidEmail,
            })}
          >
            <label htmlFor="user-email" className="label__trigger">
              {t('EmailLabel')}
            </label>
            <input
              id="user-email"
              className="input"
              type="email"
              minLength={5}
              autoComplete="off"
              required
              onChange={(event) =>
                dispatchSignUpForm({
                  account: {
                    ...signUpForm.account,
                    username: event.target.value,
                    email: event.target.value,
                  },
                })
              }
            />
          </div>
          {form.onSendCode ? (
            <Button
              className="btn--medium"
              type="button"
              disabled={form.canResendEmail}
              callback={() => mutationSendEmailCode()}
            >
              {t('ResendSecretCodeLabel')}
            </Button>
          ) : (
            <Button
              className="btn--medium"
              type="button"
              disabled={!signUpForm.account.username || !isValidEmail(signUpForm.account.username)}
              callback={() => mutationSendEmailCode()}
            >
              {t('SendSecretCodeLabel')}
            </Button>
          )}
          {form.invalidEmail && <p className="auth-block__invalid">{t(NotificationErrorLabels.INVALID_EMAIL)}</p>}
        </fieldset>
      )}

      {form.onSendCode && (
        <fieldset className="auth-block">
          <div className={cx('input__trigger', 'invalid', { label: !!form.code })}>
            <label htmlFor="phone-code" className="label__trigger">
              {t('SecretCodeLabel')}
            </label>
            <input
              id="phone-code"
              className="input"
              type="number"
              autoComplete="autocomplete"
              required
              value={form.code}
              onChange={(event) => {
                if (event.target.value.length > 6) return;
                dispatchForm({ code: event.target.value });
              }}
            />
            {isCounting && (
              <span data-testid="phone-verification-timer" className="auth-block__timer">
                {timer}
              </span>
            )}
          </div>

          <Button className="btn--medium" type="button" disabled={!form.code} callback={onCertifyCode}>
            {t('Verify')}
          </Button>
          <p className="auth-block__invalid">{t(NotificationErrorLabels.CONFIRM_SECRET)}</p>
        </fieldset>
      )}
      <AccountDialog isActive={isActiveDialog} modalState={dialogType} onClose={onCloseDialog} />
    </>
  );
};

const CompleteCertifyEmail = ({ email, hasCertificateEmail }: { email: string; hasCertificateEmail: boolean }) => {
  const t = useTranslation({ scope: 'AccountSystem' });

  return (
    <fieldset className="auth-block">
      <div className="input__trigger label">
        <label htmlFor="user-phone-certify" className="label__trigger">
          {t('EmailLabel')}
        </label>
        <input
          id="user-phone-certify"
          className="input"
          type="tel"
          readOnly={hasCertificateEmail}
          defaultValue={email}
        />
        <i className="icon">
          <IconCheckGreen />
        </i>
      </div>
    </fieldset>
  );
};

export default CertifyEmail;
