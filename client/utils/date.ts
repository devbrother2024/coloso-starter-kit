export enum Timezone {
  PST = 8,
  PDT = 7,
}

export enum TimezoneLabel {
  PST = 'PST',
  PDT = 'PDT',
}

import { DateFormats } from '@/policy/date';
import { LocaleOptions } from '@/policy/local';
import { TypeDurationAsDiff } from '@/types/utils/date';

const { LOCALE_FORMAT, TIMEZONE } = LocaleOptions;
const { YYYY_MM_DD, YY_MM_DD, YYYY_MM, MM_DD_YYYY, MM_DD, HH_MM, HH, WEEKDAY, HH_MM_SS } = DateFormats;

interface TypeDateFormat {
  year?: string;
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
  weekday?: string;
}

interface TypeMinutesToTime {
  minutes: number;
  leadingZero?: boolean;
}

interface TypePeriodDate {
  startDate?: string;
  endDate?: string;
}

const setDateTimeFormat = (d: string | number, dateFormat: TypeDateFormat) => {
  if (!d) return {};

  const date = new Date(d);
  const dateLabel = dateFormatter(date, dateFormat);
  const hourLabel = dateTimeFormat(date, HH);
  const minuteLabel = dateTimeFormat(date, HH_MM);
  const secondLabel = dateTimeFormat(date, HH_MM_SS);
  const weekdayLabel = `(${dateTimeFormat(date, WEEKDAY)})`;

  return { dateLabel, hourLabel, minuteLabel, secondLabel, weekdayLabel };
};

const dateFormatter = (date: Date, format: TypeDateFormat) => {
  const dateFormat = dateTimeFormat(date, format);

  // 날짜 포맷의 마지막 구분점과 사이 공백 제거 (MM. DD. > MM.DD)
  return dateFormat
    .replace(/ /gi, '')
    .split('.')
    .filter((str) => str)
    .join('.');
};

const intlOption = {
  hourCycle: 'h23',
  timeZone: TIMEZONE,
} as const;

const dateTimeFormat = (date: Date, format: TypeDateFormat) => {
  const options = { ...intlOption, ...format } as Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat(LOCALE_FORMAT, options).format(date);
};

export const formatUnitToDotShortCut = (date: string) => {
  return setDateTimeFormat(date, MM_DD);
};

// TODO: 적당한 이름으로 교체 필요
export const durationAsDiff = (diff: number): TypeDurationAsDiff => {
  return {
    asDays: () => diff / (60 * 60 * 24),
    days: () => Math.floor(diff / (60 * 60 * 24)),
    hours: () => Math.floor((diff / (60 * 60)) % 24),
    daysToHours: () => Math.floor(diff / 3600),
    minutes: () => Math.floor((diff / 60) % 60),
    seconds: () => Math.floor(diff % 60),
  };
};

export const secondsToTime = (seconds: number) => {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;
  return [hh, mm > 9 ? mm : hh ? '0' + mm : mm || '0', ss > 9 ? ss : '0' + ss].filter((a) => a).join(':');
};

export const minutesToTime = ({ minutes, leadingZero = false }: TypeMinutesToTime) => {
  const hh = Math.floor(minutes / 60);
  const mm = Math.floor(minutes % 60);

  if (leadingZero) {
    return {
      hh: String(hh).padStart(2, '0'),
      mm: String(mm).padStart(2, '0'),
    };
  }

  return { hh, mm };
};

export const formatUnitToDot = (date: string | number) => {
  return setDateTimeFormat(date, YYYY_MM_DD);
};

export const formatUnitToSlash = (date: string) => {
  return setDateTimeFormat(date, MM_DD_YYYY);
};

export const isValidPeriod = ({ startDate, endDate }: TypePeriodDate) => {
  const now = new Date();
  const isOpen = startDate && new Date(startDate) < now;
  const isClose = endDate && new Date(endDate) < now;

  const unlimitedState = !startDate && !endDate;
  const isActiveState = (!!isOpen && !isClose) || (!startDate && !isClose) || (!endDate && !!isOpen);

  return unlimitedState || isActiveState;
};

export const formatUTC = () => {
  const dateTimeFormat = new Intl.DateTimeFormat(LOCALE_FORMAT, {
    ...intlOption,
    timeZoneName: 'short',
  });
  const timeZoneName = dateTimeFormat.formatToParts(new Date()).find((part) => part.type === 'timeZoneName')
    ?.value as TimezoneLabel;
  const offset = Timezone[timeZoneName ?? TimezoneLabel.PST];
  const label = `(UTC-${offset})`;

  return { offset, label };
};

export function diff(_sinceDate: Date, _untilDate: Date, type: 'day' | 'hour' | 'minute' | 'second'): number {
  const [sinceDate, untilDate] = [_sinceDate, _untilDate].sort((a, b) => a.getTime() - b.getTime());

  const diffSeconds = (untilDate.getTime() - sinceDate.getTime()) / 1000;
  const ONE_DAY_IN_SECOND = 86400;
  const ONE_HOUR_IN_SECOND = 3600;
  const ONE_MINUTE_IN_SECOND = 60;

  let result: number;
  switch (type) {
    case 'day':
      result = diffSeconds / ONE_DAY_IN_SECOND;
      break;
    case 'hour':
      result = diffSeconds / ONE_HOUR_IN_SECOND;
      break;
    case 'minute':
      result = diffSeconds / ONE_MINUTE_IN_SECOND;
      break;
    default:
      // second
      result = diffSeconds;
  }

  return Math.floor(result);
}

const zeroPadding = (value: number) => {
  return value < 10 ? '0' + value : value;
};

/**
 * @description It converts `date` in `YYYY-MM-DDTHH:mm:ssZ` format
 */
export function getDatetimeString(date: Date): string {
  return (
    date.getUTCFullYear() +
    '-' +
    zeroPadding(date.getUTCMonth() + 1) +
    '-' +
    date.getUTCDate() +
    'T' +
    date.getUTCHours() +
    ':' +
    date.getUTCMinutes() +
    ':' +
    date.getUTCSeconds() +
    'Z'
  );
}

/**
 *
 * @description It converts `date` in `YYYYMMDDHHmmssSSS` format.
 */
export function getTimestampString(date: Date): string {
  return (
    '' +
    date.getUTCFullYear() +
    zeroPadding(date.getUTCMonth() + 1) +
    date.getUTCDate() +
    date.getUTCHours() +
    date.getUTCMinutes() +
    date.getUTCSeconds() +
    date.getUTCMilliseconds()
  );
}
