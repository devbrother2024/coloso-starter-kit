'use client';

import Skeleton from 'react-loading-skeleton';

import { cssSkeleton, cssSkeletonCategory } from '@/styles/utils/Skeleton.style';

const DisplayTagListStub = () => {
  return (
    <>
      <h2 className="display-category__title">
        <span className="grid grid--large">
          <Skeleton
            baseColor="#f2f2f2"
            highlightColor="#e0e0e0"
            count={1}
            containerClassName={`${cssSkeleton} ${cssSkeleton}__text ${cssSkeletonCategory}__title`}
          />
        </span>
      </h2>

      <nav className="display-category">
        <div className="grid--large">
          <Skeleton
            baseColor="#f2f2f2"
            highlightColor="#e0e0e0"
            count={4}
            borderRadius="0.5rem"
            containerClassName={`${cssSkeleton} ${cssSkeleton}__text ${cssSkeletonCategory}__tag`}
          />
        </div>
      </nav>
    </>
  );
};

export default DisplayTagListStub;
