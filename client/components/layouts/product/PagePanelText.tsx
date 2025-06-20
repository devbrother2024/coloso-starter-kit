'use client';

import { cx } from '@emotion/css';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { useSnapshot } from 'valtio';

import useTimer from '@/hooks/client/useTimer';
import useTranslation from '@/hooks/client/useTranslation';
import { ProductType } from '@/policy/product';
import { queryKey } from '@/policy/queryKey';
import { catalogStore } from '@/store/catalog';
import i18nStore from '@/store/i18n';
import { cssSkeleton, cssSkeletonPurchasePanel } from '@/styles/utils/Skeleton.style';
import { colors } from '@/styles/variables.style';
import { TypeBundle } from '@/types/bundle';
import { checkBundleProduct, getCoursePrepareState } from '@/utils/catalog';
import { priceLocale } from '@/utils/price';
import { getMaxDiscountVoucherTemplate } from '@/utils/sortVoucher';

import PagePanelTextTheme from './themes/PagePanelText.theme';

const countdownBeginInDays = 2;

const PagePanelText = () => {
  const { page, course, priceList, isFloating, isValidCatalog, welcomeVouchers, downloadVouchers } =
    useSnapshot(catalogStore);

  const t = useTranslation();
  const { lang } = useSnapshot(i18nStore);
  const { isFetched } = useQuery({ queryKey: [queryKey.I18N, lang] });

  const { salePrice, maxDiscountPrice, maxDiscountRate } = priceList;
  const { floatingBarDecorationType: floatingBarType = null, floatingBarDecorationText2: floatingBarText = null } =
    page.extras ?? {};

  const maxDiscountVoucher = getMaxDiscountVoucherTemplate({
    salePrice,
    voucherTemplates: [...downloadVouchers, ...welcomeVouchers],
  });

  const courseHiddenState = () => {
    const { bundle, product, isValidCatalog } = catalogStore;
    if (!isValidCatalog) return null;

    const [course] = checkBundleProduct(bundle, product);

    const bundleType = bundle?.map((bundle: TypeBundle) => bundle.type);
    const isOptionProduct = bundleType?.includes(ProductType.GOODS) || bundleType?.includes(ProductType.COACHING);

    const courseProductHideAt = isOptionProduct ? course?.hideAt : product?.hideAt;

    if (courseProductHideAt && maxDiscountVoucher.redeemEndAt) {
      return [courseProductHideAt, maxDiscountVoucher.redeemEndAt].sort((a, b) => {
        const aTime = a instanceof Date ? a.getTime() : new Date(a).getTime();
        const bTime = b instanceof Date ? b.getTime() : new Date(b).getTime();
        return aTime - bTime;
      })[0];
    }

    return courseProductHideAt || maxDiscountVoucher.redeemEndAt;
  };

  const { countdown, isLastDay } = useTimer({
    hideAt: courseHiddenState(),
    pageExtras: page.extras,
    countdownBeginInDays,
  });

  const isDDay = floatingBarType === 'DDAY';
  const isValidPrice = isDDay && !!maxDiscountRate;
  const isValidFloatingBarMessage = (isDDay && countdown) || (!isDDay && floatingBarText);
  const textColorByCoursePrepareState = '#8EAEFF';

  const isEnabledToRenderCatalogPrice = isFetched && isValidCatalog;

  const defaultPrice = priceLocale(salePrice);
  const discountedPrice = priceLocale(salePrice - maxDiscountPrice);

  const [upTo, off] = t('DiscountUpTo', { scope: 'PageCover' }).split('{n}');

  if (!isEnabledToRenderCatalogPrice) {
    return (
      <Skeleton
        count={2}
        containerClassName={cx(`${cssSkeleton}`, `${cssSkeleton}__text`, `${cssSkeletonPurchasePanel}`, {
          [`${cssSkeletonPurchasePanel}--floating`]: isFloating,
        })}
      />
    );
  }

  return (
    <div className={PagePanelTextTheme.container({ isFloating })}>
      <p
        className={PagePanelTextTheme.priceWrapper({
          maxDiscountRate,
          isValidPrice,
          isFloating,
          countdown,
          isDDay,
        })}
      >
        {maxDiscountRate ? (
          <>
            <span
              className={PagePanelTextTheme.discountRateWrapper({
                maxDiscountRate,
                isFloating,
                isDDay,
              })}
            >
              <span
                className={PagePanelTextTheme.priceLabel({ isFloating })}
                dangerouslySetInnerHTML={{
                  __html: t('StartingDiscountPrice', {
                    scope: 'PageCover',
                    n: `<strong class='${PagePanelTextTheme.price}'>${discountedPrice}</strong>`,
                  }),
                }}
              />
              {upTo} &nbsp;
              <em
                className={PagePanelTextTheme.discountRate({
                  textColorByCoursePrepareState,
                  isFloating,
                })}
              >
                {maxDiscountRate}%
              </em>
              &nbsp; {off}
            </span>
          </>
        ) : (
          <>
            <small className={PagePanelTextTheme.priceLabel({ isFloating })}>
              {t('SalePrice', { scope: 'MyPage' })}
            </small>
            <strong className={PagePanelTextTheme.priceInfo({ isFloating })}>{defaultPrice}</strong>
          </>
        )}
      </p>
      {isValidFloatingBarMessage && (
        <span
          data-countdown-label={t('UntilExpireDays', { scope: 'PageCover' })}
          className={PagePanelTextTheme.message({
            isValidPrice,
            isFloating,
            countdown,
            isDDay,
          })}
        >
          {countdown && isDDay ? (
            <b className={PagePanelTextTheme.countdownWrapper({ isLastDay, textColorByCoursePrepareState })}>
              {countdown.split('').map((number, index) => {
                return (
                  <span
                    className={PagePanelTextTheme.countdown({ isLastDay, textColorByCoursePrepareState })}
                    key={index}
                  >
                    {number.trim()}
                  </span>
                );
              })}
            </b>
          ) : (
            <>{floatingBarText}</>
          )}
        </span>
      )}
    </div>
  );
};

export default PagePanelText;
