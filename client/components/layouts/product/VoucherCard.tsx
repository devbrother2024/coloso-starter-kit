'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';

import { redeemVoucherByCodes } from '@/apis/voucher';
import { IconCheck, IconDownload } from '@/assets/icons';
import useAuth from '@/hooks/client/useAuth';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { NotificationLabels } from '@/policy/notificationLabels';
import { VoucherType } from '@/policy/voucher';
import { catalogStore } from '@/store/catalog';
import i18nStore from '@/store/i18n';
import voucherStore from '@/store/voucher';
import { TypeVoucherTemplate } from '@/types/voucher';
import { getRedeemNotificationLabel, getVoucherPeriod } from '@/utils/catalog';
import { formatUTC } from '@/utils/date';
import { calculateVoucher } from '@/utils/localPolicy';
import { toCurrencyView } from '@/utils/price';

import VoucherCardTheme from './themes/VoucherCard.theme';

interface TypeVoucherCard {
  voucherTemplate: TypeVoucherTemplate;
  downloadable: boolean;
}

const VoucherCard = ({ voucherTemplate, downloadable }: TypeVoucherCard) => {
  const { priceList } = useSnapshot(catalogStore);

  const { salePrice = 0 } = priceList;
  const { title, isRedeemed, redeemEndAt, code, discountRate, maxDiscountAmount } = voucherTemplate;

  const t = useTranslation();
  const router = useRouter();
  const { isAuthorized } = useAuth();
  const executeNotifications = useToast();

  const { mutateAsync: redeemVoucherCodesMutate, isPending } = useMutation({ mutationFn: redeemVoucherByCodes });

  const redeemDisabledState = isRedeemed || !downloadable || isPending;

  const updateVoucherRedeemState = (voucherTemplates: TypeVoucherTemplate[], redeemCode: string) =>
    voucherTemplates.map((voucher) => {
      const isRedeemed = voucher.code === redeemCode;
      return isRedeemed ? { ...voucher, isRedeemed } : voucher;
    });

  const checkRedeemVoucherStateByCode = async (redeemCode: string) => {
    try {
      const voucherTemplates = await redeemVoucherCodesMutate({
        redeemCode,
        type: VoucherType.DOWNLOAD,
      });

      const { message, type } = getRedeemNotificationLabel(voucherTemplates);
      executeNotifications({ type, message: `${t(message, { scope: 'CouponSystem' })}` });

      voucherStore.downloadVoucherList = updateVoucherRedeemState(voucherStore.downloadVoucherList, redeemCode);
    } catch (err) {
      const { message, type } = NotificationLabels.FAILED_VOUCHER_CODE;
      executeNotifications({ type, message: `${t(message, { scope: 'CouponSystem' })}` });
    }
  };

  const getDiscountLabel = (voucherTemplate: TypeVoucherTemplate, salePrice: number): string => {
    const { discountAmount } = calculateVoucher({
      voucher: voucherTemplate,
      taxFreeAmount: 0,
      salePrice,
    });

    if (discountRate && (!maxDiscountAmount || maxDiscountAmount > discountAmount)) {
      return t('DiscountPercentUSD', { scope: 'PurchaseSystem', n: discountRate });
    }

    return t('DiscountAmountUSD', { scope: 'PurchaseSystem', n: toCurrencyView(discountAmount).toFixed(2) });
  };

  const onRedeemVoucher = async (redeemCode: string) => {
    const { lang } = i18nStore;

    if (!isAuthorized) {
      return router.push(`/${lang}/sign-in`);
    }

    await checkRedeemVoucherStateByCode(redeemCode);
  };

  return (
    <button
      className={VoucherCardTheme.container({
        isRedeemed,
        downloadable,
      })}
      onClick={() => onRedeemVoucher(code)}
      disabled={redeemDisabledState}
    >
      <span className={VoucherCardTheme.textWrapper}>
        <em
          className={VoucherCardTheme.discountPrice({
            isRedeemed,
            downloadable,
          })}
        >
          {getDiscountLabel(voucherTemplate, salePrice)}
        </em>
        <strong
          className={VoucherCardTheme.title({
            isRedeemed,
            downloadable,
          })}
        >
          {title}
        </strong>
        <span className={VoucherCardTheme.period}>
          {redeemEndAt
            ? `${t('IssuePeriod', { scope: 'PageCover' })} ${getVoucherPeriod(redeemEndAt)} ${formatUTC().label}`
            : t('Unlimited', { scope: 'CouponSystem' })}
        </span>
      </span>
      {downloadable && (
        <i className={VoucherCardTheme.icon({ isRedeemed })}>{isRedeemed ? <IconCheck /> : <IconDownload />}</i>
      )}
    </button>
  );
};

export default VoucherCard;
