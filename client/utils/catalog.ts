import { NotificationLabels } from '@/policy/notificationLabels';
import { ProductType } from '@/policy/product';
import { TypeBundle } from '@/types/bundle';
import { TypeProduct } from '@/types/product';
import { TypeVoucherTemplate } from '@/types/voucher';
import { formatUnitToDot, getTimestampString } from '@/utils/date';

export const getMaxDiscountAmount = (welcomeAmount = 0, DownloadAmount = 0) => {
  return Math.max(welcomeAmount, DownloadAmount);
};

export const getCoursePrepareState = (period: string) => {
  if (!period) return false;

  const courseOpenPeriod = +getTimestampString(new Date(period));
  const currentPeriod = +getTimestampString(new Date());

  return courseOpenPeriod >= currentPeriod;
};

export const getVoucherPeriod = (period: Date) => {
  const { dateLabel, minuteLabel } = formatUnitToDot(String(period));
  return `${dateLabel} ${minuteLabel}`;
};

export const getRedeemNotificationLabel = (voucherTemplates: TypeVoucherTemplate[]) =>
  voucherTemplates.length ? NotificationLabels.SUCCEED_VOUCHER_REDEEM : NotificationLabels.ALREADY_VOUCHER_CODE;

const filterBundleByCourseType = (bundle: TypeBundle[]) => {
  return bundle.filter((bundle: TypeBundle) => bundle.type === ProductType.COURSE);
};

export const checkBundleProduct = (bundle: TypeBundle[], product: TypeProduct) => {
  if (!bundle || !product) return [];

  const filteredBundle = filterBundleByCourseType(bundle);
  const isSingleProduct = filteredBundle?.length < 1;
  return isSingleProduct ? [product] : filteredBundle;
};
