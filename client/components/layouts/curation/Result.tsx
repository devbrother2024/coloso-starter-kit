'use client';

import React from 'react';

import SortOrder from '@/components/modules/common/SortOrder';
import useTranslation from '@/hooks/client/useTranslation';
import { TypeSearchResult } from '@/types/search';

import DisplayCards from './DisplayCards';
import SearchResultTheme from './themes/Result.theme';

const SearchResult = ({ keyword, total, courses, sort }: Omit<TypeSearchResult, 'language'>) => {
  const t = useTranslation();

  return (
    <section className={SearchResultTheme.container}>
      <header className={SearchResultTheme.header}>
        <h3 className={SearchResultTheme.title} data-title={t('SearchResults', { scope: 'PageSystem' })}>
          {keyword}
        </h3>

        <aside className={SearchResultTheme.info}>
          <strong className={SearchResultTheme.infoTitle}>{t('TotalCount', { scope: 'SiteGlobal', n: total })}</strong>
          <SortOrder sort={sort} keyword={keyword} />
        </aside>
      </header>

      <DisplayCards courses={courses} />
    </section>
  );
};

export default SearchResult;
