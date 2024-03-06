'use client';

import { IconVerified } from '@/assets/icons';
import Stub from '@/components/elements/Stub';
import useTranslation from '@/hooks/client/useTranslation';

import SiteSelectorTheme from './themes/SiteSelector.theme';

const SiteSelector = () => {
  const t = useTranslation({ scope: 'SiteGlobal' });

  return (
    <div className={SiteSelectorTheme.container}>
      <p>{t('Site')}</p>
      <ul>
        <li className={SiteSelectorTheme.siteItem}>
          <i>
            <IconVerified />
          </i>
          <a className={SiteSelectorTheme.link({})} href={'#'}>
            <Stub size={'120x20'} />
          </a>
        </li>
        <li className={SiteSelectorTheme.siteItem}>
          <a className={SiteSelectorTheme.link({})} href={'#'}>
            <Stub size={'120x20'} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SiteSelector;
