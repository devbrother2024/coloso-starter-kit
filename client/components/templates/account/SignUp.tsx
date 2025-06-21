'use client';

import { FormEvent, useEffect, useState } from 'react';

import { cx } from '@emotion/css';
import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/apis/auth';
import Button from '@/components/elements/Button';
import Link from '@/components/elements/Link';
import AccountDialog from '@/components/modules/dialogs/AccountDialog';
import AccountMarketingAgreementDialog from '@/components/modules/dialogs/AccountMarketingAgreementDialog';
import useAuth from '@/hooks/client/useAuth';
import useDialog from '@/hooks/client/useDialog';
import useForm from '@/hooks/client/useForm';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { DialogModalType } from '@/policy/account';
import { CustomerCountry, CustomerLanguage } from '@/policy/language';
import { NotificationErrorLabels, NotificationLabels } from '@/policy/notificationLabels';
import { isValidEmail, isValidName } from '@/utils/validate';

import CertifyEmail from './CertifyEmail';
import VerifyPassword from './VerifyPassword';

const userAccountInfo = {
  name: '',
  username: '',
  password: '',
  email: '',
  emailCertified: false,
};

const userServicePolicy = {
  emailMarketingAgreement: false,
};

const SignUp = () => {
  const [form, dispatchForm] = useForm({
    account: userAccountInfo,
    servicePolicy: userServicePolicy,
    invalidName: false,
    invalidEmail: false,
    hasCertificateEmail: false,
    isPasswordConfirmed: false,
  });
  const [country, setUserCountry] = useState<CustomerCountry | null>(null);
  const [language, setUserLanguage] = useState<CustomerLanguage | null>(null);
  const executeNotifications = useToast();

  const isActiveSignUpButton =
    !!form.account.name &&
    !!form.account.email &&
    !form.invalidName &&
    !form.invalidEmail &&
    form.hasCertificateEmail &&
    form.isPasswordConfirmed &&
    !!country &&
    !!language;

  const {
    isActiveDialog: isActiveAccountDialog,
    onOpenDialog: onOpenAccountDialog,
    onCloseDialog: onCloseAccountDialog,
  } = useDialog();
  const {
    isActiveDialog: isActiveMarketingDialog,
    onOpenDialog: onOpenMarketingDialog,
    onCloseDialog: onCloseMarketingDialog,
  } = useDialog();
  const { successSignIn } = useAuth();
  const t = useTranslation({ scope: 'AccountSystem' });

  const { mutate: mutationSignUp, isPending: isSignUpPending } = useMutation({
    mutationFn: () => {
      const signUpAccount = {
        ...form.account,
        ...form.servicePolicy,
        country,
        language,
      };
      return signUp(signUpAccount);
    },
    onSuccess: ({ data }: { data: Record<string, string> }) => {
      executeNotifications(marketingNotifyLabel());
      successSignIn({
        accessToken: data.accessToken,
      });
    },
    onError: () => {
      onOpenAccountDialog();
    },
  });

  const marketingNotifyLabel = () => {
    const { CONFIRM_EMAIL_MARKETING_AGREED, CONFIRM_EMAIL_MARKETING_DISAGREED } = NotificationLabels;
    const marketingLabel = form.servicePolicy.emailMarketingAgreement
      ? CONFIRM_EMAIL_MARKETING_AGREED
      : CONFIRM_EMAIL_MARKETING_DISAGREED;

    return { ...marketingLabel, message: t(marketingLabel.message, { scope: 'AccountSystem' }) };
  };

  const onSubmitSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpenMarketingDialog();
  };

  const addPolicyLabelLink = (slug: string, token: string) => {
    return `<a href='/info/${slug}' style='text-decoration: underline;' target='_blank'>${t(token)}</a>`;
  };

  const registerAgreement = () => {
    const termLabel = addPolicyLabelLink('terms', 'termLabel');
    const privacyLabel = addPolicyLabelLink('privacy', 'privacyLabel');

    return t('RegisterAgreement', { term: termLabel, privacy: privacyLabel });
  };

  useEffect(() => {
    const { name, email } = form.account;
    const invalidName = !!name && !isValidName(name);
    const invalidEmail = !!email && !isValidEmail(email);

    dispatchForm({ invalidName, invalidEmail });
  }, [form.account, dispatchForm]);

  return (
    <>
      <form
        className="auth-board"
        data-testid="sign-in-form"
        onSubmit={(e) => {
          onSubmitSignUp(e);
        }}
      >
        <header className="auth-board__head">
          <h2 className="auth-board__h">{t('SignUp')}</h2>
        </header>

        <fieldset className="auth-block">
          <div
            className={cx('input__trigger', {
              label: !!form.account.name,
              invalid: form.invalidName,
            })}
          >
            <label htmlFor="user-name" className="label__trigger">
              {t('NameLabel')}
            </label>
            <input
              id="user-name"
              className="input"
              type="text"
              minLength={2}
              autoComplete="autocomplete"
              required
              onChange={(event) => dispatchForm({ account: { ...form.account, name: event.target.value } })}
            />
          </div>
          {form.invalidName && <p className="auth-block__invalid">{t(NotificationErrorLabels.INVALID_NAME)}</p>}
        </fieldset>

        <CertifyEmail signUpForm={form} dispatchSignUpForm={dispatchForm} />

        <VerifyPassword signUpForm={form} dispatchSignUpForm={dispatchForm} />

        <Button className="btn--wide" disabled={!isActiveSignUpButton || isSignUpPending}>
          {t('SignUp')}
        </Button>

        <div className="auth-caption">
          <p className="auth-board__p" dangerouslySetInnerHTML={{ __html: registerAgreement() }} />

          <span>
            {t('SignInHelp')}
            <Link className="auth-link" href="/sign-in">
              {t('SignInLink')}
            </Link>
          </span>
        </div>
      </form>
      <AccountMarketingAgreementDialog
        isActive={isActiveMarketingDialog}
        onClose={() => {
          onCloseMarketingDialog();
        }}
        callback={({ agreementFlag }: { agreementFlag: boolean; redirectUrl?: string }) => {
          onCloseMarketingDialog();
          dispatchForm({ servicePolicy: { emailMarketingAgreement: agreementFlag } });
          mutationSignUp();
        }}
      />
      <AccountDialog
        modalState={DialogModalType.INVALID}
        isActive={isActiveAccountDialog}
        onClose={onCloseAccountDialog}
      />
    </>
  );
};

export default SignUp;
