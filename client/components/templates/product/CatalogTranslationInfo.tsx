'use client';

import { useSnapshot } from 'valtio';

import { IconTranslation } from '@/assets/icons';
import useTranslation from '@/hooks/client/useTranslation';
import { catalogStore } from '@/store/catalog';
import i18nStore from '@/store/i18n';

interface TypeCatalogTranslationInfo {
  isProductsPage: boolean;
}

const CatalogTranslationInfo = ({ isProductsPage }: TypeCatalogTranslationInfo) => {
  const t = useTranslation();
  const { lang } = useSnapshot(i18nStore);
  const { course } = useSnapshot(catalogStore);

  const autoTranslationKeys = Object.values<string>(course.extras?.active ?? {});
  const isAutoTranslation = autoTranslationKeys.some((language) =>
    language.toLowerCase().includes(lang.toLocaleLowerCase().replace('-', '')),
  );
  const descriptions: string[] = t('AutoTranslationDescription', { scope: 'PageCover' }).split('\n');

  if (!isProductsPage || !isAutoTranslation) return;

  return (
    <div className="catalog-translation-info">
      <h4 className="catalog-translation-info__title">
        <i>
          <IconTranslation />
        </i>
        {t('AutoTranslationTitle', { scope: 'PageCover' })}
      </h4>
      <div className="catalog-translation-info__description">
        {descriptions.map((description, i) => (
          <p key={i}>{description}</p>
        ))}
      </div>
    </div>
  );
};
export default CatalogTranslationInfo;
