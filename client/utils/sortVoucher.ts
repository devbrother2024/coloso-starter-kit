import { TypeVoucherTemplate, TypeSortVoucherTemplates } from '@/types/voucher';

import { calculateVoucher } from './localPolicy';

const parsePeriod = (period: Date | null | undefined) => {
  return period ? new Date(period).getTime() : Infinity;
};

const parsePeriodEndAt = (periodDuration: number | null | undefined, periodEndAt: Date | null | undefined) => {
  const now = new Date();
  return periodDuration
    ? now.setDate(now.getDate() + periodDuration)
    : periodEndAt
      ? new Date(periodEndAt).getTime()
      : Infinity;
};

const validateUsableVoucherTemplates = ({ salePrice, voucherTemplates }: TypeSortVoucherTemplates) => {
  const now = new Date().getTime();
  return voucherTemplates.filter((voucherTemplate) => {
    const parsePeriodEndAt = parsePeriod(voucherTemplate.periodEndAt);
    const validateMinPaymentAmount = salePrice >= voucherTemplate.minPaymentAmount;
    return now <= parsePeriodEndAt && validateMinPaymentAmount ? voucherTemplate : null;
  });
};

export const sortVoucherTemplates = ({ salePrice, voucherTemplates }: TypeSortVoucherTemplates) => {
  const usableVoucherTemplates = validateUsableVoucherTemplates({ salePrice, voucherTemplates });

  return usableVoucherTemplates.sort((prev, next) => {
    const { discountAmount: prevDiscountAmount } = calculateVoucher({ voucher: prev, salePrice, taxFreeAmount: 0 });
    const { discountAmount: nextDiscountAmount } = calculateVoucher({ voucher: next, salePrice, taxFreeAmount: 0 });

    const {
      id: prevId,
      redeemEndAt: prevRedeemEndAt,
      periodEndAt: prevPeriodEndAt,
      periodDuration: prevPeriodDuration,
    } = prev;

    const {
      id: nextId,
      redeemEndAt: nextRedeemEndAt,
      periodEndAt: nextPeriodEndAt,
      periodDuration: nextPeriodDuration,
    } = next;

    const parsedPrevRedeemEndAt = parsePeriod(prevRedeemEndAt);
    const parsedNextRedeemEndAt = parsePeriod(nextRedeemEndAt);

    const parsedPrevPeriodEndAt = parsePeriodEndAt(prevPeriodDuration, prevPeriodEndAt);
    const parsedNextPeriodEndAt = parsePeriodEndAt(nextPeriodDuration, nextPeriodEndAt);

    return (
      nextDiscountAmount - prevDiscountAmount ||
      parsedPrevRedeemEndAt - parsedNextRedeemEndAt ||
      parsedPrevPeriodEndAt - parsedNextPeriodEndAt ||
      nextId - prevId
    );
  });
};

export const getMaxDiscountVoucherTemplate = ({ salePrice, voucherTemplates }: TypeSortVoucherTemplates) => {
  const sortedVoucherTemplates = sortVoucherTemplates({ salePrice, voucherTemplates });

  return sortedVoucherTemplates.reduce((prev, cur) => {
    const prevMaxDiscountedPrice = prev.maxDiscountedPrice ?? 0;
    const { discountAmount: maxDiscountedPrice } = calculateVoucher({ voucher: cur, salePrice, taxFreeAmount: 0 });

    const maxDiscountRate = Math.floor((maxDiscountedPrice / salePrice) * 100);
    const currentVoucher = Object.assign({}, { ...cur, maxDiscountedPrice, maxDiscountRate });

    if (!prev.id) {
      return currentVoucher;
    }

    if (prevMaxDiscountedPrice === maxDiscountedPrice) {
      return parsePeriod(cur.redeemEndAt) < parsePeriod(prev.redeemEndAt) ? currentVoucher : prev;
    }

    return prevMaxDiscountedPrice > maxDiscountedPrice ? prev : currentVoucher;
  }, {} as TypeVoucherTemplate);
};
