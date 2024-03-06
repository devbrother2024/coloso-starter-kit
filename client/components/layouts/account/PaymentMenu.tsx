'use client';

import { PropsWithChildren } from 'react';

import { cx } from '@emotion/css';
import { usePathname } from 'next/navigation';

import Link from '@/components/elements/Link';
import useTranslation from '@/hooks/client/useTranslation';

import PaymentMenuTheme from './themes/PaymentMenu.theme';

const PaymentMenu = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const t = useTranslation({ scope: 'MyPage' });

  const menuItems = [
    {
      title: t('PaymentLabel'),
      href: '/account/payment/paid',
    },
    {
      title: t('RefundLabel'),
      href: '/account/payment/refund',
    },
  ];

  return (
    <section className={PaymentMenuTheme.container}>
      <h3 className={PaymentMenuTheme.title}>{t('PaymentHistoryLabel')}</h3>

      <div className={PaymentMenuTheme.tab}>
        {menuItems.map(({ title, href }, index) => (
          <Link key={index} className={cx('tab', { 'is-link--active': pathname.includes(href) })} href={href}>
            {title}
          </Link>
        ))}
      </div>

      {children}
    </section>
  );
};

export default PaymentMenu;
