'use client';

import { useEffect, useState } from 'react';

import { DomainError, IamportPg, TransactionMethod } from '@day1co/redstone-policy';
import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSnapshot } from 'valtio';

import { requestApplyEnrollment } from '@/apis/enrollment';
import { requestOrder } from '@/apis/order';
import Button from '@/components/elements/Button';
import useAuth from '@/hooks/client/useAuth';
import usePurchase from '@/hooks/client/usePurchase';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { NotificationLabels } from '@/policy/notificationLabels';
import { PaymentMethod } from '@/policy/payment';
import { PaymentLocale, PaymentMethods } from '@/policy/purchase';
import iamStore from '@/store/iam';
import { purchaseStore, setPurchaseStore } from '@/store/purchase';
import getLogger from '@/utils/logger';
import { toCurrencyView } from '@/utils/price';
import { queryString } from '@/utils/string';
import { getVouchersInfo } from '@/utils/voucher';

const logger = getLogger('pages', 'purchase');

const additionalImpData = {
  [IamportPg.PAYPAL]: {
    optional: {
      no_shipping: true,
    },
  },
};

interface TypeSubmit {
  productId: number;
}

const Submit = ({ productId }: TypeSubmit) => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const { isDeliveryBuyer, isElective, addressInfo, agreements, selectedPaymentType, selectedProducts, product } =
    useSnapshot(purchaseStore);
  const router = useRouter();
  const purchasePath = usePathname();
  const searchParams = useSearchParams();
  const { rejectAuthorize } = useAuth();
  const executeNotifications = useToast();
  const { paymentPrice, validateProduct, redirectPrevPage } = usePurchase();

  const [disabled, setDisabled] = useState(false);
  const bundleId = Number(searchParams.get('bundle'));

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

  const getPgMethod = () => {
    const {
      selectedPaymentType,
      isPromotion,
      impData: { impPg },
    } = purchaseStore;

    const [type] = PaymentMethods.filter((type) => type.id === selectedPaymentType);
    const pg = type.pg as keyof typeof impPg;

    return {
      pg: impPg[pg],
      method: isPromotion ? TransactionMethod.PROMOTION.toLowerCase() : type.method,
    };
  };

  const getOptionalProductIds = () => {
    const { isElective, selectedProducts } = purchaseStore;
    if (bundleId) {
      return [bundleId];
    }
    if (isElective) {
      return selectedProducts.map(({ id }) => id);
    }
    return [];
  };

  const redirectToDonePage = ({ impUid, impMerchantUid, orderId, impSuccess }: Record<string, unknown>) => {
    router.push(
      `${purchasePath}/order/${orderId}?${queryString({
        imp_uid: impUid,
        merchant_uid: impMerchantUid,
        imp_success: impSuccess,
      })}`,
    );
  };

  const openPaymentHandler = (orderId: number, payload: Record<string, unknown>) => {
    const { impData } = purchaseStore;
    IMP.init(impData.impShopCode);
    IMP.request_pay(payload, (rsp: Record<string, unknown>) => {
      // 모바일에서는 콜백 함수가 불리지 않습니다.
      // 모바일의 경우 별도의 callback url 을 통해 콜백 데이터가 전달됩니다.
      // 코드의 통일성을 위해 데스크탑 환경에서도 모바일 콜백 URL 로 이동합니다.
      redirectToDonePage({
        orderId,
        impUid: rsp.imp_uid,
        impMerchantUid: rsp.merchant_uid,
        impSuccess: rsp.success,
      });
    });
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
