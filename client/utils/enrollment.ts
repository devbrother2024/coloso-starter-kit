import { TypeEnrollment } from '@/types/enrollment';
import { formatUnitToSlash, getDatetimeString } from '@/utils/date';

const formatDateAtHour = (date: string | null) => {
  if (!date) return null;
  const { dateLabel, minuteLabel } = formatUnitToSlash(date);
  return `${dateLabel} ${minuteLabel}`;
};

export const catalogPeriodDate = (enrollment: TypeEnrollment) => {
  const { course, createdAt, periodBeginAt, periodEndAt } = enrollment;
  const catalog = course;

  const now = getDatetimeString(new Date());
  const catalogOpenDate = catalog?.openAt ? getDatetimeString(new Date(catalog.openAt)) : now;
  const periodBeginAtDate = periodBeginAt && getDatetimeString(new Date(periodBeginAt));
  const periodEndAtDate = periodEndAt && getDatetimeString(new Date(periodEndAt));

  const isOpened = (periodBeginAtDate || catalogOpenDate) <= now;
  const isClosed = periodEndAtDate ? periodEndAtDate < now : false;

  const openAt = catalog?.openAt ?? null;
  const periodStartAt = isOpened && !isClosed ? createdAt : openAt;

  return {
    isOpen: isOpened,
    isActive: isOpened && !isClosed,
    openAt: formatDateAtHour(periodStartAt),
    beginAt: formatDateAtHour(periodBeginAt),
    endAt: formatDateAtHour(periodEndAt),
  };
};
