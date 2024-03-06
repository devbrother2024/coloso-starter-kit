'use client';

import { useQuery } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';

import { getUserVouchers } from '@/apis/user';
import { IconVoucherRound } from '@/assets/icons';
import EmptyAccountItem from '@/components/layouts/account/EmptyAccountItem';
import VoucherItem from '@/components/layouts/account/VoucherItem';
import { queryKey } from '@/policy/queryKey';
import i18nStore from '@/store/i18n';
import { TypeVoucher } from '@/types/voucher';

const Vouchers = () => {
  const { lang } = useSnapshot(i18nStore);
  const { data: vouchers } = useQuery({
    queryKey: [queryKey.USER_VOUCHERS, { language: lang }],
    queryFn: () => getUserVouchers({ language: lang }),
    placeholderData: [],
  });

  if (!vouchers?.length) return <EmptyAccountItem icon={<IconVoucherRound className="icon" />} label="EmptyCoupon" />;

  return (
    <ul className="grid grid-column">
      {vouchers.map((voucher: TypeVoucher) => (
        <li key={voucher.id} className="grid-column__item">
          <VoucherItem useBeginAt={voucher.useBeginAt} useEndAt={voucher.useEndAt} template={voucher.voucherTemplate} />
        </li>
      ))}
    </ul>
  );
};

export default Vouchers;
