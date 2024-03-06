'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import Link from '@/components/elements/Link';
import SortOrder from '@/components/modules/common/SortOrder';
import useTranslation from '@/hooks/client/useTranslation';
import { TypeCourseRank } from '@/types/course';

import DisplayCardsTheme from './themes/DisplayCards.theme';
import SearchResultTheme from './themes/Result.theme';

interface TypeDisplayCards {
  courses: TypeCourseRank[];
  sort?: string;
}

const DisplayCards = ({ courses, sort }: TypeDisplayCards) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  const t = useTranslation({ scope: 'PageSystem' });

  if (!courses?.length) return null;
  return (
    <section className={DisplayCardsTheme.container({ isSearchResultPage: !!keyword })}>
      {!keyword && (
        <aside className={SearchResultTheme.info}>
          <h3 className={DisplayCardsTheme.title}>{t('AllClasses')}</h3>
          <SortOrder sort={sort} keyword={keyword} />
        </aside>
      )}

      <ul className={DisplayCardsTheme.cardWrapper}>
        {courses?.map((course) => {
          const { id, slug, publicTitle: title, publicDescription: author, defaultCardAsset: asset } = course;
          return (
            <li key={id} className={DisplayCardsTheme.card}>
              <Link href={`/products/mock-page`}>
                <figure className={DisplayCardsTheme.cardInfo}>
                  <Image
                    className={DisplayCardsTheme.cardImage}
                    src={asset?.url ?? ''}
                    loading="lazy"
                    height={220}
                    width={352}
                    alt={title}
                  />
                </figure>
                <h4 className={DisplayCardsTheme.cardTitle}>{title}</h4>
                <span className={DisplayCardsTheme.cardAuthor}>{author}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default DisplayCards;
