'use client';

import { useMemo } from 'react';

import { StringUtil } from '@day1co/pebbles';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import Link from '@/components/elements/Link';
import useTranslation from '@/hooks/client/useTranslation';
import i18nStore from '@/store/i18n';
import { TypeCatalog } from '@/types/operation';
import { formatUnitToDotShortCut } from '@/utils/date';

interface TypeCard {
  catalog: TypeCatalog;
  isLightTheme: boolean;
}

const ValidLangTokenLength = 1;

const CardBanner = ({ catalog, isLightTheme }: TypeCard) => {
  const t = useTranslation({ scope: 'PageCover' });
  const { lang } = useSnapshot(i18nStore);
  const { page, products, publicTitle, publicDescription, defaultCardAsset, openAt, extras } = catalog;
  const [product] = products ?? [];

  const { catalogCardBadgeType: badgeType, catalogCardBadgeTitle: badgeLabel } = page?.extras ?? {
    catalogCardBadgeType: 'RED',
    catalogCardBadgeTitle: '',
  };

  const lecture = publicDescription || '';
  const assetUrl = defaultCardAsset?.url || '';
  const keywords: string[] = StringUtil.split(extras?.displayKeywords || '');
  const displayTitle = (product.displays?.length && product.displays[0].title) || '';

  const catalogOpenAt = useMemo(() => {
    const courseOpenAt = new Date(openAt);
    const { dateLabel } = formatUnitToDotShortCut(courseOpenAt.toString());
    const readyCatalog = courseOpenAt > new Date();
    const openAtToken = readyCatalog ? t('CourseOpen', { openAt: `${dateLabel}` }) : t('AvailableAt');
    return openAtToken.length > ValidLangTokenLength ? openAtToken : '';
  }, [openAt, lang, t]);

  return (
    <figure className="card responsive-card">
      <Link className="card__link" href={`/products/${catalog.slug || catalog.id}`}>
        {assetUrl && <Image src={assetUrl} className="card__img" width={352} height={220} loading="lazy" alt="" />}

        <figcaption className="card__caption">
          <ul
            className="card__labels"
            data-badge-label={badgeLabel}
            data-badge-color={badgeType}
            data-badge-display={displayTitle}
          >
            {isLightTheme ? (
              <>
                {keywords.map((keyword, index) => (
                  <li key={index}>{keyword}</li>
                ))}
              </>
            ) : (
              <li className="caption">{catalogOpenAt}</li>
            )}
          </ul>
          <strong className="card__title">{publicTitle}</strong>
          <i className="card__note">{lecture}</i>
        </figcaption>
      </Link>
    </figure>
  );
};
export default CardBanner;
