import React from 'react';

import { useRouter } from 'next/navigation';

import SearchResultTheme from '../../layouts/curation/themes/Result.theme';

import { IconArrowRoundDownBlack } from '@/assets/icons';
import useTranslation from '@/hooks/client/useTranslation';
import { SearchSortLabel } from '@/policy/search';
import { queryString } from '@/utils/string';

interface TypeSortOrder {
  sort?: string;
  keyword?: string | null;
}

const SortOrder = ({ sort = SearchSortLabel.newest, keyword }: TypeSortOrder) => {
  const t = useTranslation();
  const router = useRouter();

  const SearchSortList: { [key: string]: string } = {
    newest: t('SortByNewest', { scope: 'PageSystem' }),
    popularity: t('SortByPopularity', { scope: 'PageSystem' }),
  };

  const onClickSortOrder = (sort: string) => {
    const pathname = `?${queryString(keyword ? { sort, keyword } : { sort })}`;
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className={SearchResultTheme.filterWrapper}>
      <button className={SearchResultTheme.currentFilter} onClick={(e) => e.currentTarget.focus()}>
        {SearchSortList[sort]}
        <i className={SearchResultTheme.currentFilterIcon}>
          <IconArrowRoundDownBlack />
        </i>
      </button>

      <fieldset className={SearchResultTheme.filter}>
        {Object.entries(SearchSortList).map(([sortLabel, sortText], index) => (
          <React.Fragment key={index}>
            <input
              className={SearchResultTheme.filterInput}
              type="radio"
              name="value"
              id={sortLabel}
              aria-checked={sortLabel === sort}
            />
            <label
              className={SearchResultTheme.filterLabel}
              onMouseDown={() => onClickSortOrder(sortLabel)}
              htmlFor={sortLabel}
            >
              {sortText}
            </label>
          </React.Fragment>
        ))}
      </fieldset>
    </div>
  );
};

export default SortOrder;
