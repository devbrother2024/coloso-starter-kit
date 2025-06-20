'use client';

import { Fragment } from 'react';

import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { useSnapshot } from 'valtio';

import { IconArrowRoundRightSmall } from '@/assets/icons';
import Link from '@/components/elements/Link';
import { queryKey } from '@/policy/queryKey';
import { catalogStore } from '@/store/catalog';
import categoryStore from '@/store/category';
import i18nStore from '@/store/i18n';
import { cssSkeleton, cssSkeletonCatalogCaption } from '@/styles/utils/Skeleton.style';

const ProductCategory = () => {
  const { display } = useSnapshot(catalogStore);
  const { categoryMap } = useSnapshot(categoryStore);
  const { lang } = useSnapshot(i18nStore);

  const { isFetching } = useQuery({ queryKey: [queryKey.I18N, lang] });

  const currentCategoryTree = display?.id ? categoryMap.get(display.id) : null;
  const hasSecondaryCategory = !!currentCategoryTree?.parent?.id;

  const category = [
    {
      isVisible: true,
      slug: currentCategoryTree?.parent?.id || currentCategoryTree?.id,
      title: currentCategoryTree?.parent?.title || currentCategoryTree?.title,
      icon: null,
    },
    {
      isVisible: hasSecondaryCategory,
      slug: currentCategoryTree?.id,
      title: currentCategoryTree?.title,
      icon: <IconArrowRoundRightSmall />,
    },
  ];

  if (isFetching) {
    return (
      <nav className="catalog-category">
        <Skeleton containerClassName={`${cssSkeleton} ${cssSkeleton}__text ${cssSkeletonCatalogCaption}__text`} />
      </nav>
    );
  }

  return (
    <nav className="catalog-category">
      {category.map((category, index) => {
        const { isVisible, slug, title, icon } = category;
        if (!isVisible) return null;
        return (
          <Fragment key={index}>
            {icon}
            <Link href={`/category/${slug}`}>{title}</Link>
          </Fragment>
        );
      })}
    </nav>
  );
};

export default ProductCategory;
