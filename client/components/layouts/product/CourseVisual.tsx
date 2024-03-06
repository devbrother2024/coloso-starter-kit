'use client';

import { useState } from 'react';

import { cx } from '@emotion/css';

import ResponsiveImage from '@/components/modules/common/ResponsiveImage';

const desktopCoverImage =
  'https://cdn.day1company.io/prod/uploads/202504/150304-1535/cover-programmer-devbrother2.webp';
const mobileCoverImage = 'https://cdn.day1company.io/prod/uploads/202504/150304-1535/cover-programmer-devbrother2.webp';

const CourseVisual = () => {
  return (
    <div className="catalog-cover__image">
      <ResponsiveImage
        className={cx('catalog-cover__image-item', {
          'catalog-cover__image-item--loaded': false,
        })}
        response={mobileCoverImage}
        primary={desktopCoverImage}
        alt="Cover Image"
        breakPoint={720}
        priority={true}
      />
    </div>
  );
};

export default CourseVisual;
