'use client';

import { cx } from '@emotion/css';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useSnapshot } from 'valtio';

import { getUserVouchers } from '@/apis/user';
import { IconArrowRoundRight } from '@/assets/icons';
import Link from '@/components/elements/Link';
import useAuth from '@/hooks/client/useAuth';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { NotificationLabels } from '@/policy/notificationLabels';
import { queryKey } from '@/policy/queryKey';
import i18nStore from '@/store/i18n';

const Menu = () => {
  const t = useTranslation();
  const pathname = usePathname();
  const executeNotifications = useToast();
  const { rejectAuthorize } = useAuth();
  const { lang } = useSnapshot(i18nStore);

  const accountMenuItems = [
    {
      title: t('ClassroomLabel', { scope: 'MyPage' }),
      link: '/account/classroom',
    },
    {
      label: 'voucher',
      title: t('CouponLabel', { scope: 'MyPage' }),
      link: '/account/coupon',
    },
    {
      title: t('PaymentHistoryLabel', { scope: 'MyPage' }),
      link: '/account/payment',
    },
  ];

  const { data: vouchers } = useQuery({
    queryKey: [queryKey.USER_VOUCHERS, { language: lang }],
    queryFn: () => getUserVouchers({ language: lang }),
    placeholderData: [],
  });

  const onSignOut = () => {
    rejectAuthorize();
    const { type, message } = NotificationLabels.REJECT_AUTHORIZATION;
    executeNotifications({ type, message: t(message, { scope: 'AppSystem' }) });
  };

  return (
    <nav className="me-nav">
      <h3 className="a11y">{t('PaymentHistoryLabel', { scope: 'MyPage' })}</h3>
      {accountMenuItems.map(({ title, link, label }) => {
        const isActiveItem = pathname.includes(link);
        return (
          <Link
            key={link}
            className={cx('me-nav__link', {
              'is-link--active': isActiveItem,
            })}
            href={link}
          >
            <span className="me-nav__title">
              {title}
              {label === 'voucher' && <small className="alert">{vouchers?.length ?? 0}</small>}
            </span>
            <i className="icon">
              <IconArrowRoundRight />
            </i>
          </Link>
        );
      })}

      <button type="button" className="me-nav__link me-nav__link--leave" onClick={onSignOut}>
        {t('SignOut', { scope: 'GlobalNavigation' })}
      </button>
    </nav>
  );
};

export default Menu;
