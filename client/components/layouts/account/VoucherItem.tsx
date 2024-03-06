'use client';

import { useState } from 'react';

import { cx } from '@emotion/css';

import { IconArrowRoundDown } from '@/assets/icons';
import useTranslation from '@/hooks/client/useTranslation';
import { TypeVoucherTemplate } from '@/types/voucher';
import { diff, formatUTC, formatUnitToSlash } from '@/utils/date';
import { priceLocale } from '@/utils/price';
import { isAvailablePeriodVoucher } from '@/utils/voucher';

interface TypeVoucherItem {
  useBeginAt?: Date | null;
  useEndAt?: Date | null;
  template: TypeVoucherTemplate;
}

const VoucherItem = ({ useBeginAt, useEndAt, template }: TypeVoucherItem) => {
  const { title, discount = '', discountAmount, publicDescription = '' } = template;
  const displayDiscount = discount.includes('%') ? discount : priceLocale(discountAmount);
  const t = useTranslation({ scope: 'CouponSystem' });

  const [isOpenDescription, setIsOpenDescription] = useState(false);

  const onClickDescription = () => {
    setIsOpenDescription((prev) => !prev);
  };

  const getCountdownDay = (useEndAt: Date) => {
    const now = new Date();
    const diffDay = diff(now, useEndAt, 'day');
    const countdownLabel = diffDay === 0 ? 'day' : diffDay;

    return `D-${countdownLabel}`;
  };

  const voucherDateLabel = (period: Date) => {
    const { dateLabel, minuteLabel } = formatUnitToSlash(String(period));
    return `${dateLabel} ${minuteLabel} ${formatUTC().label}`;
  };

  const voucherTermLabel = (): string => {
    if (!isAvailablePeriodVoucher(useBeginAt))
      return useBeginAt ? t('VoucherUseStartDateUnit', { term: voucherDateLabel(useBeginAt) }) : '';
    return useEndAt ? t('CouponDueDateUnit', { term: voucherDateLabel(useEndAt) }) : t('Unlimited');
  };

  return (
    <figure className="me-section__voucher">
      <div className="board-block">
        <div className="voucher-block">
          <div className="voucher-block__alert">
            <i className="voucher-block__count">{displayDiscount}</i>
            {useEndAt && <span className="voucher-block__countdown">{getCountdownDay(useEndAt)}</span>}
          </div>
          <p className="voucher-block__name" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="voucher-block__term">{voucherTermLabel()}</p>
        </div>

        {!!publicDescription && (
          <div className="voucher-block__description" onClick={onClickDescription}>
            <span className="voucher-block__description-text">
              {t('Details')}
              <i
                className={cx({
                  'voucher-block__description-icon__open': isOpenDescription,
                  'voucher-block__description-icon': !isOpenDescription,
                })}
              >
                <IconArrowRoundDown />
              </i>
            </span>
            {isOpenDescription && <p className="voucher-block__description-content">{publicDescription}</p>}
          </div>
        )}
      </div>
    </figure>
  );
};
export default VoucherItem;
