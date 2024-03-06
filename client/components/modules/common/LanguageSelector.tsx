'use client';

import { useSnapshot } from 'valtio';

import { IconGlobe, IconVerified } from '@/assets/icons';
import useLanguageSelector from '@/hooks/client/useLanguageSelector';
import { LanguageLabelList, CustomerLanguageCode } from '@/policy/language';
import i18nStore from '@/store/i18n';

import LanguageSelectorTheme from './themes/LanguageSelector.theme';

const LanguageSelector = () => {
  const { lang } = useSnapshot(i18nStore);
  const { onChangeLanguage } = useLanguageSelector();

  return (
    <div className={LanguageSelectorTheme.container}>
      <i className={LanguageSelectorTheme.iconGlobe}>
        <IconGlobe />
      </i>
      <ul>
        {LanguageLabelList.map(([key, value]) => {
          const languageCode = Object.assign(CustomerLanguageCode)[key];
          const isActiveButton = lang === languageCode;
          return (
            <li key={key} className={LanguageSelectorTheme.languageItem}>
              <button
                className={LanguageSelectorTheme.languageButton({ isActiveButton })}
                onClick={() => onChangeLanguage(languageCode)}
              >
                {value}
              </button>
              {isActiveButton && (
                <i className={LanguageSelectorTheme.iconCheck}>
                  <IconVerified />
                </i>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSelector;
