'use client';

import { useRef } from 'react';

import { cx } from '@emotion/css';
import { useQuery } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';

import { getExchangeRate } from '@/apis/exchange';
import { IconCloseThin, IconInfo } from '@/assets/icons';
import { onStopPropagationDialog } from '@/hooks/client/useDialog';
import useTranslation from '@/hooks/client/useTranslation';
import { Currency } from '@/policy/local';
import { queryKey } from '@/policy/queryKey';
import { catalogStore } from '@/store/catalog';
import { TypeExchange, TypeExchangeRate } from '@/types/exchange';
import { priceLocale, toCurrencyView } from '@/utils/price';

import ProductPriceTheme from './themes/ProductPrice.theme';

const ProductPrice = () => {
  const {
    priceList: { salePrice = 0, maxDiscountRate, maxDiscountPrice = 0 },
  } = useSnapshot(catalogStore);

  const checkboxRef = useRef<HTMLInputElement>(null);

  const t = useTranslation();

  const { data: baseExchangeRate } = useQuery({
    queryKey: [queryKey.EXCHANGE_RATE],
    queryFn: getExchangeRate,
    placeholderData: [],
  });

  const coverPrice = priceLocale(salePrice);
  const discountedPrice = salePrice - maxDiscountPrice;
  const baseCurrency = toCurrencyView(discountedPrice);

  const onCloseModal = () => {
    if (!checkboxRef.current) return;
    checkboxRef.current.checked = false;
  };

  const exchangeRates = baseExchangeRate.reduce(
    (acc: TypeExchange[], cur: TypeExchangeRate) => {
      const { currency, exchangeRate: integerExchangeRate } = cur;
      const rawExchangeRate = integerExchangeRate / 100;

      const exchangeRate = Number((rawExchangeRate * baseCurrency).toFixed(2));

      if (currency === Currency.NTD) {
        return [...acc, { currency, exchangeRate: Math.round(exchangeRate) }];
      }

      return [...acc, { currency, exchangeRate }];
    },
    [{ currency: Currency.USD, exchangeRate: baseCurrency.toFixed(2) }],
  );

  const PageCurrencyPolicy = [
    `* ${t('TodayExchangeRate', { scope: 'PageCover' })}`,
    `* ${t('BasedMaxDiscount', { scope: 'PageCover' })}`,
  ];

  const [upTo, off] = t('DiscountUpTo', { scope: 'PageCover' }).split('{n}');

  return (
    <div className={ProductPriceTheme.container({})}>
      <div>
        {maxDiscountRate ? (
          <>
            <span className={ProductPriceTheme.discountInfo}>
              {upTo} <em className={ProductPriceTheme.discountPercent}>{maxDiscountRate}%</em> <span>{off}</span>
              &nbsp;
              <s className={ProductPriceTheme.coverPrice}>{coverPrice}</s>
            </span>
            <strong className={ProductPriceTheme.price}>{priceLocale(discountedPrice)} ~</strong>
          </>
        ) : (
          <>
            <small className={ProductPriceTheme.priceLabel}>{t('SalePrice', { scope: 'MyPage' })}</small>
            <strong className={ProductPriceTheme.price}>{coverPrice}</strong>
          </>
        )}
      </div>

      <input
        className={cx('a11y', ProductPriceTheme.checkbox)}
        id="currency-trigger"
        ref={checkboxRef}
        type="checkbox"
      />

      <aside className={ProductPriceTheme.modalContainer} onClick={onCloseModal}>
        <dialog open className={ProductPriceTheme.modal} onClick={onStopPropagationDialog}>
          <header className={ProductPriceTheme.modalHeader}>
            <h4>{t('PriceByCurrency', { scope: 'PageCover' })}</h4>
            <button onClick={onCloseModal}>
              <IconCloseThin />
            </button>
          </header>

          <ul>
            {exchangeRates.map((data: TypeExchange, index: number) => {
              return (
                <li className={ProductPriceTheme.currencyWrapper} key={index}>
                  <span className={ProductPriceTheme.currencyTitle}>{data.currency}</span>
                  <em>{data.exchangeRate}</em>
                </li>
              );
            })}
          </ul>

          <div className={ProductPriceTheme.modalPolicy}>
            {PageCurrencyPolicy.map((policy, index) => (
              <span key={index}>{policy}</span>
            ))}
          </div>
        </dialog>
      </aside>

      <label className={ProductPriceTheme.currencyButton} htmlFor="currency-trigger">
        <span>{t('PriceByCurrency', { scope: 'PageCover' })}</span>
        <i className={ProductPriceTheme.currencyIcon}>
          <IconInfo />
        </i>
      </label>
    </div>
  );
};

export default ProductPrice;
