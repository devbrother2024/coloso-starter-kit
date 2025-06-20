'use client';

import { cx } from '@emotion/css';

import { IconArrowTail } from '@/assets/icons';
import Link from '@/components/elements/Link';
import CardBanner from '@/components/layouts/curation/CardBanner';
import { TypeCatalogResponse } from '@/types/operation';

interface TypeRecommendCard {
  config: TypeCatalogResponse;
}

const RecommendCard = ({ config }: TypeRecommendCard) => {
  const { data: catalogs, meta: catalogMeta } = config;
  const { publicTitle, publicSubtitle, publicSubtitleLink, isLightTheme } = catalogMeta;

  if (!catalogs.length) return null;

  return (
    <section className={cx('recommend-card', { 'light-theme': isLightTheme })}>
      <div className="grid--large">
        <div className="catalog-wrapper">
          <h2 className="catalog-title">{publicTitle}</h2>
          <ul className="grid grid-column grid-column--triple">
            {catalogs.map((catalog) => (
              <li key={catalog.id} className="grid-column__item">
                <CardBanner catalog={catalog} isLightTheme={isLightTheme ?? false} />
              </li>
            ))}
          </ul>
          {publicSubtitle && publicSubtitleLink && (
            <span className="catalog-more">
              <Link className="catalog-more__link" href={publicSubtitleLink}>
                <p className="a11y">{publicTitle}</p>
                {publicSubtitle}
                <IconArrowTail className="catalog-more__icon" />
              </Link>
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecommendCard;
