'use client';

import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { useSnapshot } from 'valtio';

import { IconCalenderGraySmall, IconTimeGraySmall } from '@/assets/icons';
import useTimer from '@/hooks/client/useTimer';
import useTranslation from '@/hooks/client/useTranslation';
import { queryKey } from '@/policy/queryKey';
import { catalogStore } from '@/store/catalog';
import i18nStore from '@/store/i18n';
import { cssSkeleton } from '@/styles/utils/Skeleton.style';
import { getCoursePrepareState } from '@/utils/catalog';
import { durationAsDiff, formatUTC, formatUnitToDot } from '@/utils/date';

const ClassPeriod = () => {
  const { course, product } = useSnapshot(catalogStore);
  const t = useTranslation();
  const { lang } = useSnapshot(i18nStore);
  const { isFetching } = useQuery({ queryKey: [queryKey.I18N, lang] });
  const isCourseBeingPrepared = getCoursePrepareState(course?.openAt);

  const { countdown: countdownEndAt, isLastDay: isLastEndAtDay } = useTimer({
    hideAt: product.periodEndAt,
    countdownBeginInDays: 1,
  });

  const { countdown: countdownOpenAt, isLastDay: isLastOpenAtDay } = useTimer({
    hideAt: course?.openAt,
    countdownBeginInDays: 1,
  });

  const formatCountdown = (countdown: string | null | undefined, isLastDay: boolean) => {
    if (!countdown) return;
    if (isLastDay) return countdown.split(':');
    return countdown.split('D-').join('');
  };

  const formatDuration = (duration: string | null) => {
    if (!duration) return;

    const { days } = durationAsDiff(+duration);
    return t('AvailableDays', { scope: 'PageCover', n: `${days()}` });
  };

  const formatPeriod = (period: string | null) => {
    if (!period || !getCoursePrepareState(period)) return;

    const { dateLabel, minuteLabel } = formatUnitToDot(period);
    return `${dateLabel} ${minuteLabel} ${formatUTC().label}`;
  };

  const formatCourseOpenAt = () => {
    if (!isCourseBeingPrepared) {
      return t('AvailableAt', { scope: 'PageCover' });
    }

    const countdown = formatCountdown(countdownOpenAt, isLastOpenAtDay);

    if (isLastOpenAtDay && countdown) {
      const [hh, mm, ss] = countdown;
      return t('UntilOpenDuration', { scope: 'PageCover', hh, mm, ss });
    }

    return t('UntilOpenDays', { scope: 'PageCover', n: Number(countdown) });
  };

  const formatCoursePeriod = () => {
    const { product } = catalogStore;
    if (!product.periodEndAt) {
      return t('UnlimitedAvailable', { scope: 'MyPage' });
    }

    // TODO: getCoursePrepareState => 공용으로 사용할 수 있는 네이밍으로 변경
    const isCourseBeingEnded = getCoursePrepareState(product.periodEndAt);
    if (!isCourseBeingEnded) return '-';

    const countdown = formatCountdown(countdownEndAt, isLastEndAtDay);

    if (isLastEndAtDay && countdown) {
      const [hh, mm, ss] = countdown;
      return t('UntilAvailableDuration', { scope: 'PageCover', hh, mm, ss });
    }

    return t('UntilAvailableDays', { scope: 'PageCover', n: Number(countdown) });
  };

  const classPeriod = [
    {
      icon: <IconTimeGraySmall />,
      text: formatCourseOpenAt(),
      subText: formatPeriod(course?.openAt),
    },
    {
      icon: <IconCalenderGraySmall />,
      text: product.periodDuration ? formatDuration(product.periodDuration) : formatCoursePeriod(),
      subText: formatPeriod(product.periodEndAt),
    },
  ];

  return (
    <>
      {classPeriod.map((data, index) => {
        const { icon, text, subText } = data;
        if (isFetching) {
          return (
            <li key={index} className="item">
              <i>{icon}</i>
              <Skeleton containerClassName={`${cssSkeleton} ${cssSkeleton}__text`} />
            </li>
          );
        }
        return (
          <li key={index} className="item">
            <i>{icon}</i>
            <div className="item__text">
              <span>{text}</span>
              {subText && <small>{subText}</small>}
            </div>
          </li>
        );
      })}
    </>
  );
};

export default ClassPeriod;
