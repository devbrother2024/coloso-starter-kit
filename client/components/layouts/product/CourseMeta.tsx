'use client';

import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { useSnapshot } from 'valtio';

import { IconCalender, IconInfinite, IconPlay, IconTimer, IconVoucher } from '@/assets/icons';
import useCatalog from '@/hooks/client/useCatalog';
import useTranslation from '@/hooks/client/useTranslation';
import { queryKey } from '@/policy/queryKey';
import { catalogStore } from '@/store/catalog';
import i18nStore from '@/store/i18n';
import { cssSkeleton, cssSkeletonCatalogCaption } from '@/styles/utils/Skeleton.style';
import { getCoursePrepareState } from '@/utils/catalog';

const CourseMeta = () => {
  const t = useTranslation();
  const { lang } = useSnapshot(i18nStore);
  const { isFetching } = useQuery({ queryKey: [queryKey.I18N, lang] });
  const { course, product } = useSnapshot(catalogStore);
  const { sortedDownloadVouchers, sortedWelcomeVouchers } = useCatalog();

  const isUsableVoucher = !!sortedDownloadVouchers.length || !!sortedWelcomeVouchers.length;
  const isCourseBeingPrepared = getCoursePrepareState(course?.openAt);
  const isProductPeriod = !!(product.periodEndAt || product.periodDuration);

  const meta = [
    {
      isVisible: true,
      icon: isProductPeriod ? <IconCalender /> : <IconInfinite />,
      description: isProductPeriod
        ? t('LimitedPeriod', { scope: 'PageCover' })
        : t('UnlimitedAvailable', { scope: 'MyPage' }),
    },
    {
      isVisible: true,
      icon: isCourseBeingPrepared ? <IconTimer /> : <IconPlay />,
      description: isCourseBeingPrepared
        ? t('Booking', { scope: 'PageCover' })
        : t('AvailableAt', { scope: 'PageCover' }),
    },
    { isVisible: isUsableVoucher, icon: <IconVoucher />, description: t('CouponDiscount', { scope: 'PageCover' }) },
  ];

  if (isFetching) {
    return (
      <Skeleton
        count={3}
        containerClassName={`${cssSkeleton} ${cssSkeleton}__icon ${cssSkeletonCatalogCaption}__icon`}
      />
    );
  }

  return (
    <ul className="catalog-cover__meta" id="purchase-panel-trigger">
      {meta.map((item, index) => {
        const { isVisible, icon, description } = item;
        if (!isVisible) return null;
        return (
          <li key={index} className="catalog-cover__meta-item">
            <i>{icon}</i> <span>{description}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default CourseMeta;
