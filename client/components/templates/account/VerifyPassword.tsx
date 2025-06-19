'use client';
import { useEffect } from 'react';

import { cx } from '@emotion/css';

import useForm from '@/hooks/client/useForm';
import useTranslation from '@/hooks/client/useTranslation';
import { NotificationErrorLabels } from '@/policy/notificationLabels';
import { TypeSignUpForm } from '@/types/user';
import { isValidPassword } from '@/utils/validate';

const VerifyPassword = ({ signUpForm, dispatchSignUpForm }: TypeSignUpForm) => {
  const [form, dispatchForm] = useForm({
    confirmPassword: '',
    invalidPassword: false,
  });

  const t = useTranslation({ scope: 'AccountSystem' });

  useEffect(() => {
    const { password } = signUpForm.account;
    const invalidPassword = !!password && !isValidPassword(password);

    dispatchForm({ invalidPassword });
  }, [signUpForm.account, dispatchForm]);

  return (
    <>
      <fieldset className="auth-block">
        <div
          className={cx('input__trigger', {
            label: !!signUpForm.account.password,
            invalid: form.invalidPassword,
          })}
        >
          <label htmlFor="user-password" className="label__trigger">
            {t('PasswordLabel')}
          </label>
          <input
            id="user-password"
            className="input"
            type="password"
            minLength={8}
            autoComplete="new-password"
            required
            onChange={(event) =>
              dispatchSignUpForm({
                account: {
                  ...signUpForm.account,
                  password: event.target.value,
                },
              })
            }
          />
        </div>

        {form.invalidPassword && <p className="auth-block__invalid">{t(NotificationErrorLabels.INVALID_PASSWORD)}</p>}
      </fieldset>

      {signUpForm.account.password && !form.invalidPassword && (
        <fieldset className="auth-block">
          <div
            className={cx('input__trigger', {
              label: !!form.confirmPassword,
              invalid: !!form.confirmPassword && !signUpForm.isPasswordConfirmed,
            })}
          >
            <label htmlFor="user-password-confirm" className="label__trigger">
              {t('ConfirmPasswordLabel')}
            </label>
            <input
              id="user-password-confirm"
              className="input"
              type="password"
              minLength={8}
              autoComplete="new-password"
              required
              onChange={(event) => {
                dispatchSignUpForm({ isPasswordConfirmed: signUpForm.account.password === event.target.value });
                dispatchForm({ confirmPassword: event.target.value });
              }}
            />
          </div>

          {form.confirmPassword && !signUpForm.isPasswordConfirmed && (
            <p className="auth-block__invalid">{t(NotificationErrorLabels.INVALID_PASSWORD_MATCH)}</p>
          )}
        </fieldset>
      )}
    </>
  );
};

export default VerifyPassword;
