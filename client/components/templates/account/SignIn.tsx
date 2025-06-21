'use client';

import { FormEvent, useEffect, useState } from 'react';

import { cx } from '@emotion/css';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { signIn } from '@/apis/auth';
import Button from '@/components/elements/Button';
import Link from '@/components/elements/Link';
import AccountDialog from '@/components/modules/dialogs/AccountDialog';
import useAuth from '@/hooks/client/useAuth';
import useDialog from '@/hooks/client/useDialog';
import useForm from '@/hooks/client/useForm';
import useTranslation from '@/hooks/client/useTranslation';
import { DialogModalType } from '@/policy/account';
import { NotificationErrorLabels } from '@/policy/notificationLabels';
import { isValidEmail, isValidPassword } from '@/utils/validate';

const SignIn = () => {
  const [form, dispatchForm] = useForm({
    username: 'test@test.com',
    password: 'aaaaaaaa',
    invalidEmail: false,
    invalidPassword: false,
    isActiveSignInButton: false,
  });

  const router = useRouter();
  const { successSignIn } = useAuth();
  const [dialogType, setDialogType] = useState(DialogModalType.DEFAULT);
  const {
    isActiveDialog: isActiveAccountDialog,
    onOpenDialog: onOpenAccountDialog,
    onCloseDialog: onCloseAccountDialog,
  } = useDialog();
  const {
    isActiveDialog: isActiveHibernatedDialog,
    onOpenDialog: onOpenHibernatedDialog,
    onCloseDialog: onCloseHibernatedDialog,
  } = useDialog();

  const t = useTranslation({ scope: 'AccountSystem' });

  const { mutate: mutationSignIn } = useMutation({
    mutationFn: () => signIn({ username: form.username, password: form.password }),
    onSuccess: ({ data }: { data: Record<string, string> }) => {
      successSignIn({
        accessToken: data.accessToken,
        callback: () => {
          router.back();
        },
      });
    },
  });

  const onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutationSignIn();
  };

  useEffect(() => {
    const invalidEmail = !!form.username && !isValidEmail(form.username);
    const invalidPassword = !!form.password && !isValidPassword(form.password);
    const isActiveSignInButton = !!form.username && !!form.password && !form.invalidEmail && !form.invalidPassword;
    console.log(invalidEmail);
    console.log(invalidPassword);
    console.log(isActiveSignInButton);

    dispatchForm({
      invalidEmail,
      invalidPassword,
      isActiveSignInButton,
    });
  }, [form.invalidEmail, form.invalidPassword, form.password, form.username, dispatchForm]);

  return (
    <>
      <form
        className="auth-board"
        onSubmit={(event) => {
          onSubmitLogin(event);
        }}
      >
        <header className="auth-board__head">
          <h2 className="auth-board__h">{t('SignIn')}</h2>
        </header>

        <fieldset className="auth-block">
          <div
            className={cx('input__trigger', {
              label: !!form.username,
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
              autoComplete="autocomplete"
              defaultValue={form.username}
              required
              onChange={(event) => dispatchForm({ username: event.target.value })}
            />
          </div>
          {form.invalidEmail && <p className="auth-block__invalid">{t(NotificationErrorLabels.INVALID_EMAIL)}</p>}
        </fieldset>

        <fieldset className="auth-block">
          <div
            className={cx('input__trigger', {
              label: !!form.password,
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
              autoComplete="autocomplete"
              defaultValue={form.password}
              required
              onChange={(event) => dispatchForm({ password: event.target.value })}
            />
          </div>
          {form.invalidPassword && (
            <p className="auth-block__invalid">{t(NotificationErrorLabels.INVALID_PASSWORD_LOGIN)}</p>
          )}
        </fieldset>

        <div className="auth-tool"></div>

        <Button className="btn--wide" disabled={!form.isActiveSignInButton}>
          {t('SignIn')}
        </Button>

        <p className="auth-caption">
          {t('SignUpHelp')}
          <Link className="auth-link" href="/sign-up">
            {t('SignUpLink')}
          </Link>
        </p>
      </form>
      <AccountDialog isActive={isActiveAccountDialog} modalState={dialogType} onClose={onCloseAccountDialog} />
    </>
  );
};

export default SignIn;
