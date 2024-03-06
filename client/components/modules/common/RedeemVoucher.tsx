'use client';

import { MouseEvent, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { redeemVoucherByCodes } from '@/apis/voucher';
import Button from '@/components/elements/Button';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { NotificationLabels } from '@/policy/notificationLabels';
import { queryKey } from '@/policy/queryKey';
import { VoucherType } from '@/policy/voucher';
import getLogger from '@/utils/logger';

const logger = getLogger('components', 'voucher-redeem');

const DISABLE_REDEEM_TIMEOUT = 2500;

interface TypeRedeemVoucher {
  refetch?: () => void;
}

const RedeemVoucher = ({ refetch }: TypeRedeemVoucher) => {
  const t = useTranslation({ scope: 'CouponSystem' });

  const queryClient = useQueryClient();
  const executeNotifications = useToast();

  const [redeemCode, setRedeemCode] = useState('');
  const [disableRedeem, setDisableRedeem] = useState(false);

  const { mutate: redeemVoucherCodesMutate } = useMutation({
    mutationFn: (redeemCode: string) => redeemVoucherByCodes({ redeemCode, type: VoucherType.DEFAULT }),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [queryKey.USER_VOUCHERS] });
      unlockDisableRedeemVoucher();
      initializeRedeemCode();

      const { message, type } = NotificationLabels.SUCCEED_VOUCHER_REDEEM;
      executeNotifications({ type, message: t(message) });

      refetch && refetch();
    },
    onError: (error: Error) => {
      const { message, type } = NotificationLabels.FAILED_VOUCHER_CODE;
      executeNotifications({ type, message: t(message) });
      unlockDisableRedeemVoucher();
      logger.warn(`fail to redeem vouchers by code=${redeemCode}`, error?.message);
    },
  });

  const initializeRedeemCode = () => {
    setRedeemCode('');
  };

  const unlockDisableRedeemVoucher = () => {
    setTimeout(() => {
      setDisableRedeem(false);
    }, DISABLE_REDEEM_TIMEOUT);
  };

  const redeemVoucher = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    redeemVoucherCodesMutate(redeemCode);
    setDisableRedeem(true);
  };

  return (
    <div className="redeem-voucher">
      <label htmlFor="redeem-voucher" className="a11y">
        Apply
      </label>
      <input
        id="redeem-voucher"
        className="input input--wide"
        type="text"
        placeholder={t('EnterCouponCode')}
        value={redeemCode}
        onChange={(event) => setRedeemCode(event.target.value)}
      />
      <Button className="btn--medium btn--primary" disabled={disableRedeem || !redeemCode} callback={redeemVoucher}>
        {t('RedeemLabel')}
      </Button>
    </div>
  );
};

export default RedeemVoucher;
