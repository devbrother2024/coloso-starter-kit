// TODO: deprecated -> TypeProduct와 비교해 병합할 것.

export interface TypeBundle {
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
  courseId: number | null;
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
  taxFreeAmount: number;
  discountAmount: number;
  taxAmount: number;
  deliveryAmount: number;
  totalStock: number;
  periodType: string;
  periodDuration: string | null;
  periodBeginAt: string | null;
  periodEndAt: string | null;
  showAt: string | null;
  hideAt: string | null;
  disallowCouponTags: string;
  discountInfoShowAt: string | null;
  playLimitCount: number;
  extras: {
    umsLinkUrl?: string | null;
    umsExtMessage?: string | null;
    productCardImageAssetId: number;
    productCardAssetUrl: string;
  };
  productId?: number;
  bundleProductId?: number;
  sequence?: number;
  quantity?: number;
  discountPercent?: string;
}
