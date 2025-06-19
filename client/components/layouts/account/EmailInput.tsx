'use client';
import { FormEvent, useEffect, useState } from 'react';

import { cx } from '@emotion/css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';

import { requestChangeEmailSecretCode } from '@/apis/auth';
import { confirmEmailSecretCodeAndUpdateEmail } from '@/apis/user';
import Button from '@/components/elements/Button';
import AccountDialog from '@/components/modules/dialogs/AccountDialog';
import useCountdown from '@/hooks/client/useCountdown';
import useDialog from '@/hooks/client/useDialog';
import useEvent from '@/hooks/client/useEvent';
import useForm from '@/hooks/client/useForm';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { DialogModalType } from '@/policy/account';
import { NotificationErrorLabels, NotificationLabels } from '@/policy/notificationLabels';
import { queryKey } from '@/policy/queryKey';
import { CertificationTimer } from '@/policy/timer';
import userStore from '@/store/iam';
import getLogger from '@/utils/logger';
import { isValidEmail, isValidEmailSecret } from '@/utils/validate';

const logger = getLogger('pages', 'info/emailInput');

const EmailInput = () => {
  const { count, timer, isCounting, setIsCounting, setIsResetCount } = useCountdown(CertificationTimer.DEFAULT);
  const [dialogType, setDialogType] = useState('');
  const { isActiveDialog, onOpenDialog, onCloseDialog } = useDialog();

  const [form, dispatchForm] = useForm({
    code: '',
    newEmail: '',
    onSendCode: false,
    openEditFiled: false,
    canResendEmail: true,
    isRequestFailedEmail: false,
  });

  const t = useTranslation();

  const { iam: user } = useSnapshot(userStore);
  const { preventEnter } = useEvent();
  const executeNotifications = useToast();
  const queryClient = useQueryClient();

  const { mutate: mutationSendEmailCode } = useMutation({
    mutationFn: () => requestChangeEmailSecretCode(form.newEmail),
    onSuccess: () => {
      setIsCounting(true);
      setIsResetCount(true);
      dispatchForm({ canResendEmail: true, isRequestFailedEmail: false, onSendCode: true });
      executeNotifications(NotificationLabels.SEND_SECRET);
    },
    onError: (err: Error) => {
      logger.warn('failed to mutate send email code', err.message);
      dispatchForm({ canResendEmail: false, isRequestFailedEmail: true });
    },
  });

  const { mutate: mutationCertifyCode } = useMutation({
    mutationFn: () => confirmEmailSecretCodeAndUpdateEmail({ code: form.code, email: form.newEmail }),
    onSuccess: () => {
      getUserAccount();
      onToggleButton();
      executeNotifications(NotificationLabels.VALID_EMAIL);
    },
    onError: (err: Error) => {
      logger.warn('failed to mutate certification by code', err.message);
      setDialogType(getDialogType(err.message));
      onOpenDialog();
    },
  });

  const getDialogType = (errMessage: string) => {
    switch (errMessage) {
      case 'NOT_MATCH':
        return DialogModalType.REJECT_SECRET;
      default:
        return DialogModalType.EXIST_EMAIL;
    }
  };

  const getUserAccount = () => {
    queryClient.invalidateQueries({ queryKey: [queryKey.IAM] });
  };

  const onSendEmailCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutationSendEmailCode();
  };

  const onToggleButton = () => {
    dispatchForm({ newEmail: '', code: '', onSendCode: false, openEditFiled: !form.openEditFiled });
  };

  const onCertifyCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  return (
    <>
      <fieldset className="board-block__col">
        <label className="board-block__label" htmlFor="display-name">
          {t('EmailLabel', { scope: 'AccountSystem' })}
        </label>
        <div className="board-block__item">
          <span className="board-block__text board-block__text--masked">{user?.email || ''}</span>
          <Button className="btn--large btn--secondary" callback={onToggleButton}>
            {form.openEditFiled
              ? t('CancelButton', { scope: 'SiteGlobal' })
              : t('ChangeButton', { scope: 'SiteGlobal' })}
          </Button>
        </div>

        {form.openEditFiled && (
          <>
            <form className="board-block__item" onSubmit={onSendEmailCode}>
              <div
                className={cx('input__trigger', { invalid: !isValidEmail(form.newEmail) || form.isRequestFailedEmail })}
              >
                <input
                  className="input input-half"
                  value={form.newEmail}
                  placeholder={t('NewEmailLabel', { scope: 'AccountSystem' })}
                  type="email"
                  required
                  onKeyDown={preventEnter}
                  onChange={(event) => {
                    dispatchForm({ newEmail: event.target.value });
                  }}
                />
              </div>

              {form.onSendCode ? (
                <Button className="btn--large" disabled={form.canResendEmail}>
                  {t('ResendSecretCodeLabel', { scope: 'AccountSystem' })}
                </Button>
              ) : (
                <Button className="btn--large" disabled={!form.newEmail || !isValidEmail(form.newEmail)}>
                  {t('SendSecretCodeLabel', { scope: 'AccountSystem' })}
                </Button>
              )}
            </form>
            {(!isValidEmail(form.newEmail) || form.isRequestFailedEmail) && (
              <p className="board-block__msg board-block__msg--error">
                {t(NotificationErrorLabels.INVALID_EMAIL, { scope: 'AccountSystem' })}
              </p>
            )}
          </>
        )}

        {form.onSendCode && (
          <>
            <p className="board-block__msg">{t('SendRequestSuccess', { scope: 'AccountSystem' })}</p>
            <form className="board-block__item" onSubmit={onCertifyCode}>
              <div className={cx('input__trigger', { invalid: !isValidEmailSecret(form.code) })}>
                <input
                  id="phone-code"
                  className="input"
                  type="number"
                  placeholder={t('SecretCodeLabel', { scope: 'AccountSystem' })}
                  autoComplete="autocomplete"
                  required
                  value={form.code}
                  onChange={(event) => {
                    if (event.target.value.length > 6) return;
                    dispatchForm({ code: event.target.value });
                  }}
                />
                <span data-testid="phone-verification-timer" className="auth-block__timer">
                  {timer}
                </span>
              </div>
              <Button className="btn--large" disabled={!form.code || !isValidEmailSecret(form.code)}>
                {t('Verify', { scope: 'AccountSystem' })}
              </Button>
            </form>
            {!isValidEmailSecret(form.code) && (
              <p className="board-block__msg board-block__msg--error">
                {t(NotificationErrorLabels.CONFIRM_SECRET, { scope: 'AccountSystem' })}
              </p>
            )}
          </>
        )}
      </fieldset>
      <AccountDialog isActive={isActiveDialog} modalState={dialogType} onClose={onCloseDialog} />
    </>
  );
};

export default EmailInput;
