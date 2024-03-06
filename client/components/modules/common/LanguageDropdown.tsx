'use client';

import { useSnapshot } from 'valtio';

import { IconArrowRoundDownRedSmall, IconGlobe, IconVerified } from '@/assets/icons';
import useLanguageSelector from '@/hooks/client/useLanguageSelector';
import { CustomerLanguageCode, CustomerLanguageLabel, LanguageLabelList } from '@/policy/language';
import i18nStore from '@/store/i18n';
import { toConstantCase } from '@/utils/string';

import DropdownTheme from './themes/LanguageDropdown.theme';

const LanguageDropdown = () => {
  const { lang } = useSnapshot(i18nStore);
  const languageKey = toConstantCase(lang.replace('-', '_'));
  const languageLabel = CustomerLanguageLabel[languageKey as keyof typeof CustomerLanguageLabel];

  const { onChangeLanguage } = useLanguageSelector();

  return (
    <div className={DropdownTheme.container}>
      <button className={DropdownTheme.currentSelector}>
        <i className={DropdownTheme.globeIcon}>
          <IconGlobe />
        </i>
        <strong className={DropdownTheme.currentLabel}>{languageLabel}</strong>
        <i className={DropdownTheme.arrowIcon}>
          <IconArrowRoundDownRedSmall />
        </i>
      </button>

      <ul className={DropdownTheme.list}>
        {LanguageLabelList.map(([key, value]) => {
          const languageCode = Object.assign(CustomerLanguageCode)[key];
          const isActiveButton = lang === languageCode;
          return (
            <li key={key} className={DropdownTheme.buttonWrapper}>
              {isActiveButton && (
                <i>
                  <IconVerified />
                </i>
              )}
              <button
                className={DropdownTheme.button({ isActiveButton })}
                onClick={() => onChangeLanguage(languageCode)}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageDropdown;
