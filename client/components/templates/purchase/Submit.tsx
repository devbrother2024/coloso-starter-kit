'use client';

import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSnapshot } from 'valtio';

import { requestApplyEnrollment } from '@/apis/enrollment';
import { requestOrder } from '@/apis/order';
import Button from '@/components/elements/Button';
import useAuth from '@/hooks/client/useAuth';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { NotificationLabels } from '@/policy/notificationLabels';
import { purchaseStore } from '@/store/purchase';
import { DomainError } from '@/utils/localPolicy';
import getLogger from '@/utils/logger';
import { queryString } from '@/utils/string';

const logger = getLogger('pages', 'purchase');

const Submit = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const { isDeliveryBuyer, isElective, addressInfo, agreements, selectedPaymentType, selectedProducts, product } =
    useSnapshot(purchaseStore);
  const router = useRouter();
  const purchasePath = usePathname();
  const { rejectAuthorize } = useAuth();
  const executeNotifications = useToast();

  const [disabled, setDisabled] = useState(false);

  const { mutateAsync: requestOrderMutateAsync } = useMutation({
    mutationFn: requestOrder,
    onError: (error: Error) => {
      if (error?.message === 'VOUCHER_REDEEM_FAILED') {
        executeNotifications(NotificationLabels.FAILED_VOUCHER_CODE);
      }
      logger.warn('failed to mutate purchase', error?.message);
    },
  });

  const { mutateAsync: requestApplyEnrollmentMutateAsync } = useMutation({
    mutationFn: requestApplyEnrollment,
    onError: (error: Error) => {
      if (error?.message === DomainError.INVALID_ACCESS_TOKEN) {
        // TODO: 언어 변경
        rejectAuthorize('/en/account');
      }
      logger.warn('fail to request apply enrollment', error?.message);
    },
  });

  const redirectToDonePage = ({ impUid, impMerchantUid, orderId, impSuccess }: Record<string, unknown>) => {
    router.push(
      `${purchasePath}/order/${orderId}?${queryString({
        imp_uid: impUid,
        merchant_uid: impMerchantUid,
        imp_success: impSuccess,
      })}`,
    );
  };

  const onSubmit = async () => {
    router.push('/purchase/12312412/order/12312412');
  };

  useEffect(() => {
    const { electiveOptionCount } = product.extras ?? { electiveOptionCount: 0 };
    const invalidElective =
      (isElective && (selectedProducts.length === 0 || electiveOptionCount !== selectedProducts.length)) ||
      (isElective && !agreements.elective);

    setDisabled(invalidElective);
  }, [isDeliveryBuyer, isElective, addressInfo, agreements, selectedPaymentType, selectedProducts, product.extras]);

  return (
    <Button type="button" className="btn purchase-submit btn--wide" disabled={disabled} callback={onSubmit}>
      {t('PaymentButton')}
    </Button>
  );
};

export default Submit;
