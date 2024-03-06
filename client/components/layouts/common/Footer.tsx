'use client';

import {
  IconAppStore,
  IconBehance,
  IconFacebook,
  IconInstagram,
  IconPlayStore,
  IconTwitter,
  IconYoutube,
} from '@/assets/icons';
import Link from '@/components/elements/Link';
import Stub from '@/components/elements/Stub';
import LanguageDropdown from '@/components/modules/common/LanguageDropdown';
import SiteSelector from '@/components/modules/common/SiteSelector';
import useTranslation from '@/hooks/client/useTranslation';

import FooterTheme from './themes/Footer.theme';

const Footer = () => {
  const t = useTranslation();

  return (
    <footer className={FooterTheme.container} id="footer">
      <div className={FooterTheme.layout}>
        <div className={FooterTheme.dropdownContainer}>
          <Link href="/" ariaLabel={t('Description', { scope: 'OtherFooters' })}>
            <Stub size={'152x36'} />
          </Link>

          <LanguageDropdown />
        </div>

        <div className={FooterTheme.contactLayout}>
          <ul className={FooterTheme.mailContainer}>
            <li className={FooterTheme.mailWrapper}>
              {t('Refund', { scope: 'OtherFooters' })}
              <a
                href={t('mailTo', {
                  scope: 'SiteGlobal',
                  email: '',
                })}
                className={FooterTheme.mail}
              >
                <Stub size={'120x20'} />
              </a>
            </li>
            <li className={FooterTheme.mailWrapper}>
              {t('HelpCenter', { scope: 'OtherFooters' })}
              <a
                href={t('mailTo', {
                  scope: 'SiteGlobal',
                  email: '',
                })}
                className={FooterTheme.mail}
              >
                <Stub size={'120x20'} />
              </a>
            </li>
          </ul>

          <div className={FooterTheme.serviceLayout}>
            <SiteSelector />

            <div className={FooterTheme.appStoreIconWrapper}>
              <a className={FooterTheme.appStoreIcon} href="" target="_blank" rel="noreferrer" aria-label="App store">
                <IconAppStore />
              </a>
              <a
                className={FooterTheme.appStoreIcon}
                href=""
                target="_blank"
                rel="noreferrer"
                aria-label="Google play store"
              >
                <IconPlayStore />
              </a>
            </div>
          </div>
          <div className={FooterTheme.companyLayout}>
            <ul className={FooterTheme.companyInfoWrapper}>
              <li className={FooterTheme.companyInfo}>
                <Stub size={'120x20'} />
              </li>
              <li className={FooterTheme.companyInfo}>
                <Stub size={'120x20'} />
              </li>
              <li className={FooterTheme.companyInfo}>
                <Stub size={'120x20'} />
              </li>
              <li className={FooterTheme.companyInfo}>
                <Stub size={'120x20'} />
              </li>
            </ul>
            <ul className={FooterTheme.snsContainer}>
              <li className={FooterTheme.snsIcon}>
                <a href="#" target="_blank" className="copyright__a" rel="noreferrer" aria-label="Behance">
                  <IconBehance />
                </a>
              </li>
              <li className={FooterTheme.snsIcon}>
                <a href="#" target="_blank" className="copyright__a" rel="noreferrer" aria-label="Facebook">
                  <IconFacebook />
                </a>
              </li>
              <li className={FooterTheme.snsIcon}>
                <a href="#" target="_blank" className="copyright__a" rel="noreferrer" aria-label="Instagram">
                  <IconInstagram />
                </a>
              </li>
              <li className={FooterTheme.snsIcon}>
                <a href="#" target="_blank" className="copyright__a" rel="noreferrer" aria-label="Youtube">
                  <IconYoutube />
                </a>
              </li>
              <li className={FooterTheme.snsIcon}>
                <a href="#" target="_blank" className="copyright__a" rel="noreferrer" aria-label="Twitter">
                  <IconTwitter />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
