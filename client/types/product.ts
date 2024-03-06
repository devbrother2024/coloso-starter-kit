import { TypeCategory } from '@/types/category';
import { TypeCompactCourse } from '@/types/course';
import { TypeFormat } from '@/types/format';
import { ExtendedLanguage } from '@/types/language';
import { TypeImpData } from '@/types/purchase';
import { TypeVoucher } from '@/types/voucher';

export interface TypeProduct {
  id: number;
  site: string;
  type: string;
  state: string;
  flags: number;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  subCategoryId: number | null;
  formatId: number;
  courseId: number;
  couponId: number | null;
  planId: number | null;
  code: string;
  title: string;
  publicTitle: string;
  subtitle: string;
  description: string;
  currency: string;
  listPrice: number;
  salePrice: number;
  discountPercent: number | null;
  taxFreeAmount: number;
  discountAmount: number;
  taxAmount: number;
  deliveryAmount: number;
  totalStock: number;
  periodType: string;
  periodDuration: string | null;
  periodBeginAt: string | null;
  periodEndAt: string | null;
  showAt: string;
  hideAt: string;
  disallowCouponTags: string;
  discountInfoShowAt: string | null;
  playLimitCount: number;
  extras: {
    electiveOptionCount: number;
    umsLinkUrl: string;
    umsExtMessage: string;
    productCardImageAssetId: number;
    productCardAssetUrl: string;
  };
  products: TypeProduct[];
  category?: TypeCategory;
  format?: TypeFormat;
  course?: TypeCompactCourse;
  courses?: TypeCompactCourse[];
  displays?: TypeCategory[];
  items?: TypeProductBundle[];
}

export interface TypeProductBundle extends TypeProduct {
  bundleProductId: number;
}

export interface ExtendedProduct {
  product: TypeProduct;
}

export interface ExtendedBundle {
  bundle: TypeProductBundle[];
}

export interface TypeGetProductOrders {
  bundle: TypeProductBundle[];
  impData: TypeImpData;
  product: TypeProduct;
  site: string;
  vouchers: TypeVoucher[];
  callbackUrl: string;
}

export interface TypeGetProductOrdersParam extends ExtendedLanguage {
  productId: number;
  bundleId: number | null;
}

export interface TypeGetProductByCourseId extends ExtendedLanguage {
  courseId: number;
}
