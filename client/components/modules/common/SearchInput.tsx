'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSnapshot } from 'valtio';

import { getSearchRecommendedKeywords } from '@/apis/search';
import { IconClose, IconCloseCircle, IconSearch, IconSearchBlack, IconSearchLarge } from '@/assets/icons';
import Link from '@/components/elements/Link';
import { onStopPropagationDialog } from '@/hooks/client/useDialog';
import useTranslation from '@/hooks/client/useTranslation';
import { queryKey } from '@/policy/queryKey';
import commonStore from '@/store/common';
import i18nStore from '@/store/i18n';
import { a11y } from '@/styles/variables.style';
import { TypeSearch } from '@/types/search';

import SearchInputTheme from './themes/SearchInput.theme';

const placeholderData = { recommendedKeywords: [], placeholder: '' };

const SearchInput = ({ activeSearchInput, onActiveState }: TypeSearch) => {
  const t = useTranslation({ scope: 'PageSystem' });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { lang } = useSnapshot(i18nStore);
  const searchKeyword = searchParams.get('keyword');
  const { isSearchPath } = useSnapshot(commonStore);

  const inputRef = useRef<HTMLInputElement>(null);
  const [activePanel, setActivePanel] = useState(false);
  const [keyword, setKeyword] = useState(searchKeyword ?? '');

  const { data: search } = useQuery({
    queryKey: [queryKey.SEARCH_RECOMMENDED_KEYWORD, { language: lang }],
    queryFn: () => getSearchRecommendedKeywords({ language: lang }),
    placeholderData,
  });

  const { recommendedKeywords, placeholder } = search ?? placeholderData;

  const goToSearchResultPage = (keyword: string) => {
    return `/search?keyword=${keyword.replaceAll(' ', '')}`;
  };

  const onClearKeywords = () => {
    setKeyword('');
    inputRef.current?.focus();
  };

  const resetSearchInput = () => {
    setActivePanel(false);
    inputRef.current?.blur();
    onActiveState(false);
  };

  const onUpdatePreviousRoute = () => {
    const { isSearchPath } = commonStore;

    if (!isSearchPath && !!pathname) {
      commonStore.previousRoute = pathname;
    }
  };

  const onToggleButton = () => {
    const { isSearchPath, previousRoute } = commonStore;

    const isInactivatedSearchResultInput = isSearchPath && !activeSearchInput;
    if (isInactivatedSearchResultInput) {
      return router.push(previousRoute);
    }

    return onActiveState(!activeSearchInput);
  };

  const onSubmit = (e: KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdatePreviousRoute();
    resetSearchInput();

    const { lang } = i18nStore;

    router.push(`/${lang}${goToSearchResultPage(keyword)}`);
  };

  const onClickRecommendKeyword = (keyword: string) => {
    onUpdatePreviousRoute();
    setActivePanel(false);
    onActiveState(false);
    setKeyword(keyword);
  };

  useEffect(() => {
    setActivePanel(!isSearchPath);
  }, [isSearchPath]);

  useEffect(() => {
    !keyword && setActivePanel(true);
  }, [keyword]);

  useEffect(() => {
    searchKeyword && setKeyword(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    activeSearchInput && inputRef.current?.focus();
  }, [activeSearchInput]);

  return (
    <section className={SearchInputTheme.container({ activeSearchInput })}>
      <h2 className={a11y}>Search Input</h2>

      <form
        onSubmit={onSubmit}
        onClick={() => onActiveState(true)}
        className={SearchInputTheme.form({ activeSearchInput, isSearchPath })}
      >
        <i>{keyword ? <IconSearchBlack /> : <IconSearch />}</i>
        <input
          required
          type="text"
          minLength={2}
          ref={inputRef}
          value={keyword}
          autoComplete="off"
          className={SearchInputTheme.input}
          placeholder={placeholder || ''}
          onInput={(e) => setKeyword(e.currentTarget.value)}
        />

        {keyword && (
          <button type="button" onClick={onClearKeywords}>
            <i>
              <IconCloseCircle />
            </i>
          </button>
        )}
      </form>

      {activeSearchInput && activePanel && (
        <aside className={SearchInputTheme.panel} onClick={() => onActiveState(false)}>
          <div
            className={SearchInputTheme.panelLayout({ isRecommendedKeywords: !!recommendedKeywords?.length })}
            onClick={onStopPropagationDialog}
          >
            <h3 className={SearchInputTheme.panelTitle}>{t('RecommendedSearch')}</h3>
            <ul className={SearchInputTheme.keywordList}>
              {recommendedKeywords?.map((keyword: string, index: number) => (
                <li key={index}>
                  <Link
                    className={SearchInputTheme.keyword}
                    href={goToSearchResultPage(keyword)}
                    onClick={() => onClickRecommendKeyword(keyword)}
                  >
                    {keyword}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}

      <button
        className={SearchInputTheme.toggleButton({ activeSearchInput, isSearchPath })}
        onClick={onToggleButton}
        aria-label="search icon"
      >
        <i>{activeSearchInput || isSearchPath ? <IconClose /> : <IconSearchLarge />}</i>
      </button>
    </section>
  );
};

export default SearchInput;
