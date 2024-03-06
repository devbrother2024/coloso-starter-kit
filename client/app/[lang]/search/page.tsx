import Search from '@/components/templates/curation/Search';
import serverTranslation from '@/hooks/server/useTranslation';
import type { TypeGetSearchResult } from '@/types/search';
import { updateSiteMeta } from '@/utils/meta';

interface TypeSearchPage {
  params: { lang: string };
  searchParams: TypeGetSearchResult;
}

export async function generateMetadata({ params: { lang }, searchParams: { keyword } }: TypeSearchPage) {
  try {
    const t = await serverTranslation({ locale: lang, scope: 'PageSystem' });
    const title = `${keyword} ${t('SearchResults')}`;
    const url = `/search?keyword=${keyword}`;
    return updateSiteMeta({ title, url, lang });
  } catch (err) {
    return {};
  }
}

const SearchPage = async ({ searchParams: { keyword, sort } }: TypeSearchPage) => {
  return <Search keyword={keyword} sort={sort} />;
};

export default SearchPage;
