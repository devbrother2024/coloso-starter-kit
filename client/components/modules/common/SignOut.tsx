'use client';

import useAuth from '@/hooks/client/useAuth';
import useTranslation from '@/hooks/client/useTranslation';

import SignOutTheme from './themes/SignOut.theme';

const SignOut = () => {
  const { isAuthorized, rejectAuthorize } = useAuth();
  const t = useTranslation({ scope: 'GlobalNavigation' });

  return (
    <>
      {isAuthorized && (
        <li className={SignOutTheme.container}>
          <button type="button" onClick={() => rejectAuthorize()}>
            {t('SignOut')}
          </button>
        </li>
      )}
    </>
  );
};

export default SignOut;
