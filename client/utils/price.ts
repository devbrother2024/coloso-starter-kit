import { moneyUnitConverter } from '@day1co/pebbles';

import { LocaleOptions } from '@/policy/local';

const { CURRENCY, LOCALE_FORMAT } = LocaleOptions;

export const priceLocale = (price = 0, isPositive = true) => {
  if (isNaN(price)) return 0;
  const isNeedPositive = isPositive || !price;
  const intlOption = {
    style: 'currency',
    currency: CURRENCY,
    currencyDisplay: 'code',
    useGrouping: false,
  };
  const convertedPrice = new Intl.NumberFormat(LOCALE_FORMAT, intlOption);
  const localePrice = convertedPrice.format(price ? price / 100 : price);
  return isNeedPositive ? localePrice : `-${localePrice}`;
};

export const toCurrencyView = (price = 0) => {
  let resultPrice = price ?? 0;

  resultPrice = Number(
    Number(
      moneyUnitConverter.convert({
        value: resultPrice,
        inputUnit: 'fractionalUnit',
        outputUnit: 'currency',
      }),
    ).toFixed(2),
  );

  return resultPrice;
};
