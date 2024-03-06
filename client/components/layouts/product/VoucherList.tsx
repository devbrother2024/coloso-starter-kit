'use client';

import { useRef } from 'react';

import { cx } from '@emotion/css';

import { IconArrowRoundRightSmall, IconCloseThin } from '@/assets/icons';
import VoucherCard from '@/components/layouts/product/VoucherCard';
import { onStopPropagationDialog } from '@/hooks/client/useDialog';
import useTranslation from '@/hooks/client/useTranslation';
import { TypeVoucherInfo } from '@/types/voucher';
import { priceLocale } from '@/utils/price';

import VoucherListTheme from './themes/VoucherList.theme';

const VoucherList = ({ voucherInfo }: { voucherInfo: TypeVoucherInfo }) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { title, maxDiscountPrice, voucherList, downloadable, policy } = voucherInfo;

  const t = useTranslation({ scope: 'PageCover' });

  const onCloseModal = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  return (
    <div className={VoucherListTheme.container}>
      <input
        className={cx('a11y', VoucherListTheme.checkbox)}
        id={`VoucherList-${title}-trigger`}
        ref={checkboxRef}
        type="checkbox"
      />

      <label className={VoucherListTheme.priceWrapper} htmlFor={`VoucherList-${title}-trigger`}>
        <small className={VoucherListTheme.priceLabel}>{title}</small>
        <span className={VoucherListTheme.priceInfo}>
          {t('Max')} <em className={VoucherListTheme.price}>{priceLocale(maxDiscountPrice)}</em>
        </span>
        <i className={VoucherListTheme.priceIcon}>
          <IconArrowRoundRightSmall />
        </i>
      </label>

      <aside className={VoucherListTheme.modalContainer} onClick={onCloseModal}>
        <dialog className={VoucherListTheme.modal} open onClick={onStopPropagationDialog}>
          <header className={VoucherListTheme.modalHeader}>
            <h4 className={VoucherListTheme.modalTitle}>{title}</h4>
            <button className={VoucherListTheme.modalCloseButton} onClick={onCloseModal}>
              <IconCloseThin />
            </button>
          </header>

          <div className={VoucherListTheme.modalCardWrapper}>
            {voucherList.map((voucherTemplate, index) => (
              <VoucherCard key={index} voucherTemplate={voucherTemplate} downloadable={downloadable} />
            ))}
          </div>

          <ul className={VoucherListTheme.modalPolicy}>
            {policy.map((text, index) => (
              <li className={VoucherListTheme.modalPolicyText} key={index}>
                {text}
              </li>
            ))}
          </ul>
        </dialog>
      </aside>
    </div>
  );
};

export default VoucherList;
