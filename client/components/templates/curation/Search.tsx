'use client';

import { useQuery } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';

import { getBanners } from '@/apis/banner';
import { getSearchResult } from '@/apis/search';
import Loader from '@/components/elements/Loader';
import SearchNotFound from '@/components/layouts/curation/NotFound';
import SearchResult from '@/components/layouts/curation/Result';
import { bannerType } from '@/policy/banner';
import { queryKey } from '@/policy/queryKey';
import i18nStore from '@/store/i18n';
import { TypeGetSearchResult } from '@/types/search';

const placeholderData = { courses: [], searchKeyword: '', popularKeywords: null, total: 0 };

const Search = ({ keyword, sort }: Omit<TypeGetSearchResult, 'language'>) => {
  const { lang } = useSnapshot(i18nStore);
  const { data: searchPage, isFetched: isFetchedSearchPage } = useQuery({
    queryKey: [queryKey.SEARCH_RESULT, keyword, sort, lang],
    queryFn: () => getSearchResult({ keyword, sort, language: lang }),
    enabled: !!keyword,
  });

  const { data: searchBanner } = useQuery({
    queryKey: [queryKey.SEARCH_BANNER, { language: lang }],
    queryFn: () => getBanners({ type: bannerType.SEARCH_PAGE, language: lang }),
    placeholderData: {},
  });

  const { courses, searchKeyword, popularKeywords, total } = searchPage ?? placeholderData;

  const banners = { data: searchBanner?.SEARCH_PAGE ?? [], meta: searchBanner?.bannerType ?? {} };

  if (!isFetchedSearchPage) {
    return <Loader />;
  }
  return (
    <>
      {total ? (
        <SearchResult keyword={searchKeyword} courses={courses} total={total} sort={sort} />
      ) : (
        <SearchNotFound popularKeywords={popularKeywords} banners={banners} />
      )}
    </>
  );
};

export default Search;
