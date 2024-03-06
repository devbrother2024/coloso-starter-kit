import { ExtendedLanguage } from '@/types/language';
import { TypeProduct } from '@/types/product';

export interface TypeVoucher {
  id?: number | null;
  site: string;
  state: string;
  flags?: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  voucherTemplateId: number | null;
  customerId: number | null;
  useBeginAt?: Date | null;
  useEndAt?: Date | null;
  voucherTemplate: TypeVoucherTemplate;
}

export interface TypeVoucherTemplate {
  id: number;
  site: string;
  type: string;
  state: string;
  flags?: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  createdBy: number | null;
  updatedBy: number | null;
  code: string;
  title: string;
  description?: string;
  publicDescription?: string;
  currency: string;
  discount?: string;
  discountAmount: number;
  discountRate: number;
  maxDiscountAmount: number;
  minPaymentAmount: number;
  total: number;
  stock: number;
  redeemBeginAt?: Date | null;
  redeemEndAt?: Date | null;
  periodType: string;
  periodDuration?: number | null;
  periodBeginAt?: Date | null;
  periodEndAt?: Date | null;
  voucherTemplateFilters: TypeVoucherTemplateFilter[];
  extras?: {
    filterType: string;
  };
  isRedeemed?: boolean;
  maxDiscountRate?: number;
  maxDiscountedPrice?: number;
}

export interface ExtendedVouchers {
  vouchers: TypeVoucher[];
}

export interface TypeVoucherInfo {
  title: string;
  policy: string[];
  downloadable: boolean;
  maxDiscountPrice?: number;
  voucherList: TypeVoucherTemplate[];
}

export interface TypeSortVoucherTemplates {
  salePrice: number;
  voucherTemplates: TypeVoucherTemplate[];
}

export interface VouchersInfo {
  id?: number | null;
  productId: number;
  discountAmount: number;
  discountTaxFreeAmount: number;
}

export interface TypeRedeemVoucherByCodes {
  redeemCode: string | string[];
  type: string;
}

export interface TypeGetVouchersByProduct extends ExtendedLanguage {
  product: TypeProduct;
  voucherType: string[];
}

export interface TypeGetRedeemedVoucher extends ExtendedLanguage {
  voucherTemplateIds: number[];
}

export interface TypeGetVouchers extends ExtendedLanguage {
  code: string[];
}
