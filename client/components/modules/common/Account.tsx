'use client';

import { useEffect, Fragment } from 'react';

import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { useSnapshot } from 'valtio';

import { getUserInfo } from '@/apis/user';
import { IconArrowSquare, IconUser } from '@/assets/icons';
import Link from '@/components/elements/Link';
import useAuth from '@/hooks/client/useAuth';
import useTranslation from '@/hooks/client/useTranslation';
import { queryKey } from '@/policy/queryKey';
import userStore from '@/store/iam';
import { cssSkeleton, cssSkeletonAccount } from '@/styles/utils/Skeleton.style';
import { a11y } from '@/styles/variables.style';

import AccountTheme from './themes/Account.theme';

interface TypeAccount {
  activeNavigation: boolean;
  activeSearchInput: boolean;
}

const Account = ({ activeNavigation, activeSearchInput }: TypeAccount) => {
  const { iam: user } = useSnapshot(userStore);
  const { isAuthorized, rejectAuthorize: signOut } = useAuth();

  const t = useTranslation({ scope: 'GlobalNavigation' });

  const { data: iam, isFetched } = useQuery({
    queryKey: [queryKey.IAM],
    queryFn: async () => {
      try {
        return await getUserInfo();
      } catch {
        signOut();
      }
    },
    placeholderData: {},
    enabled: isAuthorized,
    retry: 1,
  });

  useEffect(() => {
    if (!iam) return;
    userStore.iam = { ...iam };
  }, [iam]);

  const accountMenu = [
    { name: t('MyCoupon'), link: '/account/coupon' },
    { name: t('MyPayment'), link: '/account/payment' },
    { name: t('EditUserInfo'), link: '/account/info' },
    { name: t('SignOut') },
  ];

  if (isAuthorized && !isFetched)
    return <Skeleton containerClassName={`${cssSkeleton} ${cssSkeleton}__text ${cssSkeletonAccount}`} />;

  return (
    <aside className={AccountTheme.container({ activeNavigation, isAuthorized, activeSearchInput })}>
      <h2 className={a11y}>Account</h2>

      {isAuthorized && (
        <Link className={AccountTheme.classroomLink({ activeSearchInput })} href="/account/classroom">
          {t('MyClassroom')}
        </Link>
      )}

      <section className={AccountTheme.wrapper}>
        <Link
          className={AccountTheme.login({ isAuthorized, activeSearchInput })}
          href={isAuthorized ? '/account' : '/sign-in'}
        >
          <i className={AccountTheme.icon}>
            <IconUser />
          </i>
          <span className={AccountTheme.loginText({ isAuthorized })}>{isAuthorized ? user.name : t('SignIn')}</span>
          <i className={AccountTheme.icon}>
            <IconArrowSquare />
          </i>
        </Link>

        {isAuthorized && (
          <div className={AccountTheme.info}>
            {accountMenu.map((info, index) => {
              const { name, link } = info;
              return (
                <Fragment key={index}>
                  {link ? (
                    <Link className={AccountTheme.infoButton} href={link}>
                      {name}
                    </Link>
                  ) : (
                    <button className={AccountTheme.infoButton} type="button" onClick={() => signOut()}>
                      {name}
                    </button>
                  )}
                </Fragment>
              );
            })}
          </div>
        )}
      </section>
    </aside>
  );
};

export default Account;
