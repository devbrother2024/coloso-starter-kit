import http from '@/client/http';
import {
  TypeGetRedeemedVoucher,
  TypeGetVouchers,
  TypeGetVouchersByProduct,
  TypeRedeemVoucherByCodes,
  TypeVoucher,
} from '@/types/voucher';
import { mapParams } from '@/utils/api';

export const getVouchers = async ({ code, language }: TypeGetVouchers) => {
  const { data } = await http.get('/vouchers');
  return data;
};

export const redeemVoucherByCodes = async ({ redeemCode, type }: TypeRedeemVoucherByCodes) => {
  const { data } = await http.post('/vouchers/redeem', { redeemCode, type });
  return data;
};

export const getVouchersByProduct = async ({
  product: { id, courseId, formatId, categoryId, type },
  voucherType,
  language,
}: TypeGetVouchersByProduct) => {
  const params = mapParams({ id, courseId, formatId, categoryId, type, voucherType, language });
  const { data } = await http.get('/vouchers/product', params);
  return data;
};

export const getRedeemedVoucher = async ({
  voucherTemplateIds,
  language,
}: TypeGetRedeemedVoucher): Promise<TypeVoucher[]> => {
  const params = mapParams({ voucherTemplateIds, language });
  const { data } = await http.get('/vouchers/check/redeem', params);
  return data;
};
