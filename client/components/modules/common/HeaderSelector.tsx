'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSnapshot } from 'valtio';

import { IconArrowSquare, IconGlobe, IconVerified } from '@/assets/icons';
import useSiteLanguage from '@/hooks/client/useSiteLanguage';
import { CustomerLanguageCode, CustomerLanguageLabel } from '@/policy/language';
import i18nStore from '@/store/i18n';
import userStore from '@/store/iam';
import { a11y } from '@/styles/variables.style';

import HeaderSelectorTheme from './themes/HeaderSelector.theme';

interface TypeHeaderSelector {
  activeSearchInput: boolean;
}

type TypeCustomerLanguageCode = keyof typeof CustomerLanguageCode;
type TypeCustomerLanguageLabel = keyof typeof CustomerLanguageLabel;

const CustomerLanguageCodeKeys = Object.keys(CustomerLanguageCode);
const CustomerLanguageLabelList: [string, string][] = Object.entries(CustomerLanguageLabel);

const HeaderSelector = ({ activeSearchInput }: TypeHeaderSelector) => {
  // TODO: 현재는 store를 가져와 초기값을 지정한다. Customer가 붙으면 DB에서 기본값을 가져와 설정해야함.
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLanguageValue, setSelectedLanguageValue] = useState('English');

  const { lang } = useSnapshot(i18nStore);
  const { setSiteLanguage } = useSiteLanguage();

  const pathname = usePathname();

  // TODO: language selector와 동일한 로직.
  useEffect(() => {
    const currentLanguageLabelKey = CustomerLanguageCodeKeys.find(
      (key) => CustomerLanguageCode[key as TypeCustomerLanguageCode] === lang,
    );

    const currentLanguageValue = CustomerLanguageLabel[currentLanguageLabelKey as TypeCustomerLanguageLabel];

    setSelectedLanguage(lang);
    setSelectedLanguageValue(currentLanguageValue);
  }, [lang]);

  useEffect(() => {
    const [, lang] = pathname.split('/') ?? 'en';
    setSiteLanguage(lang);
  }, [pathname, setSiteLanguage]);

  return (
    <>
      <aside className={HeaderSelectorTheme.container({ activeSearchInput })}>
        <h2 className={a11y}>Language Selector</h2>

        <div className={HeaderSelectorTheme.wrapper}>
          <span className={HeaderSelectorTheme.currentLanguage({ activeSearchInput })}>
            <i className={HeaderSelectorTheme.icon}>
              <IconGlobe />
            </i>
            <em>{selectedLanguageValue}</em>
            <i className={HeaderSelectorTheme.icon}>
              <IconArrowSquare />
            </i>
          </span>

          <div className={HeaderSelectorTheme.info}>
            {CustomerLanguageLabelList.map(([languageKey, languageValue]) => {
              const languageCode = Object.assign(CustomerLanguageCode)[languageKey];
              const isActiveButton = selectedLanguage === languageCode;

              return (
                <button className={HeaderSelectorTheme.infoButton({ isActiveButton })} key={languageKey}>
                  {isActiveButton && <IconVerified />}
                  {languageValue}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};

export default HeaderSelector;
