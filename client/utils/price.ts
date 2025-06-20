import { LocaleOptions } from '@/policy/local';

const { CURRENCY, LOCALE_FORMAT } = LocaleOptions;

export const priceLocale = (price = 0, isPositive = true) => {
  if (isNaN(price)) return 0;
  const isNeedPositive = isPositive || !price;
  const intlOption = {
    currency: CURRENCY,
    useGrouping: false,
  };
  const convertedPrice = new Intl.NumberFormat(LOCALE_FORMAT, intlOption);
  const localePrice = convertedPrice.format(price ? price / 100 : price);
  return isNeedPositive ? localePrice : `-${localePrice}`;
};

const convertMoneyUnit = (value: number) => {
  value = Math.floor(value);

  if (!Number.isInteger(value)) {
    throw new Error('Value must be an integer when inputUnit is fractionalUnit');
  }

  const fractionRatio = 100;
  const fractionalUnit = value % fractionRatio;
  const currency = (value - fractionalUnit) / fractionRatio;
  const result = currency + '.' + fractionalUnit.toString().padStart(2, '0');
  return Number(Number(result).toFixed(2));
};

export const toCurrencyView = (price = 0) => {
  let resultPrice = price ?? 0;

  resultPrice = convertMoneyUnit(resultPrice);

  return resultPrice;
};
