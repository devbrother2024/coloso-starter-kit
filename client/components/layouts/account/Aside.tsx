'use client';

import { useSnapshot } from 'valtio';

import { IconArrowRoundRightRed } from '@/assets/icons';
import Link from '@/components/elements/Link';
import Menu from '@/components/layouts/account/Menu';
import useTranslation from '@/hooks/client/useTranslation';
import userStore from '@/store/iam';
import { a11y } from '@/styles/variables.style';

import AsideTheme from './themes/Aside.theme';

const Aside = () => {
  const t = useTranslation({ scope: 'GlobalNavigation' });

  const {
    iam: { name },
  } = useSnapshot(userStore);

  return (
    <header className={AsideTheme.container}>
      <h3 className={a11y}>account information</h3>
      <div className={AsideTheme.contents}>
        <strong>
          {t('Greeting')} <br />
          <Link className={AsideTheme.link} href="/account/info">
            <em>{name}</em>
            {t('GreetingEnd')}
            <i className={AsideTheme.icon}>
              <IconArrowRoundRightRed />
            </i>
          </Link>
        </strong>
      </div>
      <Menu />
    </header>
  );
};

export default Aside;
