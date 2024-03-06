'use client';

import { PropsWithChildren } from 'react';

import { cx } from '@emotion/css';
import { useSnapshot } from 'valtio';

import { catalogStore } from '@/store/catalog';

const CatalogClass = ({ children }: PropsWithChildren) => {
  const { isFloating, isCourseBeingPrepared } = useSnapshot(catalogStore);

  return (
    <div
      className={cx('catalog-class', {
        'catalog-class--floating': isFloating,
        'catalog-class--prepared': isCourseBeingPrepared,
      })}
    >
      <div className="catalog-class__content">{children}</div>
    </div>
  );
};

export default CatalogClass;
