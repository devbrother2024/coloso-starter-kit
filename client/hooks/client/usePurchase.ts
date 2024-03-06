import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { subscribe } from 'valtio';

import useToast from '@/hooks/client/useToast';
import { NotificationLabels } from '@/policy/notificationLabels';
import { ProductState } from '@/policy/product';
import { InitializePaymentPrice } from '@/policy/purchase';
import { purchaseStore } from '@/store/purchase';
import { TypeProduct } from '@/types/product';
import { TypeVoucherTemplate } from '@/types/voucher';
import { calcPaymentPrice } from '@/utils/payment';
import { toCurrencyView } from '@/utils/price';

import useTranslation from './useTranslation';

const REDIRECT_DELAY = 2000;

const usePurchase = () => {
  const t = useTranslation({ scope: 'PurchaseSystem' });
  const router = useRouter();
  const executeNotifications = useToast();
  const [paymentPrice, setPaymentPrice] = useState(InitializePaymentPrice);

  const redirectPrevPage = useCallback(() => {
    setTimeout(() => {
      router.back();
    }, REDIRECT_DELAY);
  }, [router]);

  const discountInfo = (voucherTemplate: TypeVoucherTemplate) => {
    const { discountAmount, discountRate, minPaymentAmount, maxDiscountAmount } = voucherTemplate;

    const amount = t('DiscountAmountUSD', { n: toCurrencyView(discountAmount).toFixed(2) });
    const rate = t('DiscountPercentUSD', { n: discountRate });
    const discountUpTo = t('DiscountUpToUSD', { n: toCurrencyView(maxDiscountAmount).toFixed(2) });
    const purchaseOver = t('PurchaseOverUSD', { n: toCurrencyView(minPaymentAmount).toFixed(2) });

    const sale = discountAmount ? amount : rate;
    const minPayment = minPaymentAmount ? purchaseOver : '';
    const maxDiscount = maxDiscountAmount ? discountUpTo : '';
    const saleCondition = minPaymentAmount || maxDiscountAmount ? ' - ' : '';
    const saleRange = minPaymentAmount && maxDiscountAmount ? ', ' : '';

    return `${sale}${saleCondition}${minPayment}${saleRange}${maxDiscount}`;
  };

  useEffect(() => {
    const unsubscribe = subscribe(purchaseStore, () => {
      const { product, courseProduct, optionProduct, selectedVoucher, discountProduct, isBundle, isElective } =
        purchaseStore;
      const result = calcPaymentPrice({
        product,
        courseProduct,
        optionProduct,
        selectedVoucher,
        discountProduct,
        isBundle,
        isElective,
      });
      setPaymentPrice(result);
    });
    return () => unsubscribe();
  }, []);

  return {
    redirectPrevPage,
    paymentPrice,
    discountInfo,
  };
};

export default usePurchase;
