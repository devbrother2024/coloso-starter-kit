'use client';

import dynamic from 'next/dynamic';

import { IconBang } from '@/assets/icons';
import Link from '@/components/elements/Link';
import useTranslation from '@/hooks/client/useTranslation';
import { a11y } from '@/styles/variables.style';
import { TypeSearchNotFound } from '@/types/search';

import SearchNotFoundTheme from './themes/NotFound.theme';

const DynamicCarouselWide = dynamic(() => import('@/components/templates/curation/CarouselWide'), { ssr: false });

const SearchNotFound = ({ popularKeywords, banners }: TypeSearchNotFound) => {
  const t = useTranslation({ scope: 'PageSystem' });
  return (
    <section className={SearchNotFoundTheme.container}>
      <h2 className={a11y}>No search results</h2>

      <div className={SearchNotFoundTheme.layout}>
        <figure className={SearchNotFoundTheme.info}>
          <i className={SearchNotFoundTheme.infoIcon}>
            <IconBang />
          </i>
          <figcaption className={SearchNotFoundTheme.infoMessage} data-newline={true}>
            {t('NoResultsSearched')}
          </figcaption>
        </figure>

        {popularKeywords && (
          <div className={SearchNotFoundTheme.rank}>
            <h3 className={SearchNotFoundTheme.rankTitle}>{t('PopularSearches')}</h3>
            <ul>
              {popularKeywords.map((keyword, index) => (
                <li key={index}>
                  <Link className={SearchNotFoundTheme.list} href={`/search?keyword=${keyword}`} data={index + 1}>
                    {keyword}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <DynamicCarouselWide config={banners} />
    </section>
  );
};

export default SearchNotFound;
