import { InitializePaymentPrice } from '@/policy/purchase';
import { TypeCompactCourse } from '@/types/course';
import { ExtendedLanguage } from '@/types/language';
import { ExtendedProduct } from '@/types/product';
import { TypeProduct, TypeProductBundle } from '@/types/product';
import { VouchersInfo } from '@/types/voucher';

export type Nullable<T> = T | null;

export type TypeOrderItem = ExtendedProduct;

export interface TypeOrder {
  pg: string;
  method: string | null;
  amount: number;
  productId: number;
  enrollmentId: number;
  discountAmount: number;
  taxFreeAmount: number;
  optionalProductIds: number[];
  deliveryReceiverName: string;
  deliveryReceiverPhone: string;
  deliveryPostalCode: string;
  deliveryAddress: string;
  deliveryAddressExtra: string;
  deliveryMessage: string;
  vouchersInfo: VouchersInfo[];
}

export interface ExtendedOrderItems {
  orderItems: TypeOrderItem[];
}

export interface TypeOrderDetail extends ExtendedOrderItems {
  id: number;
  cardCode: string;
  cardName: string;
  orderDiscountPrice: number;
  orderListPrice: number;
  orderName: string;
  orderSalePrice: number;
  orderState: string;
  paymentCompletedAt: string | null;
  paymentMethod: string;
  paymentPg: string;
  paymentRequestedAt: Date;
  paymentState: string;
  paymentType: string;
  paymentUpdatedAt: Date;
  voucherIds?: number[];
}

export interface TypeOrderUid {
  orderId: number;
  impMerchantUid: string;
  impUid: string;
}

export interface TypeGetOrderById extends ExtendedLanguage {
  orderId: number;
}

export interface TypeInitialOrderState {
  orderDetail: Nullable<TypeOrderDetail>;
  product: Nullable<TypeProduct>;
  usedVoucherId: Nullable<number>;
  optionProduct: Nullable<TypeProductBundle>;
  courses: TypeCompactCourse[];
  bundleProducts: TypeProduct[];
  optionProducts: TypeProductBundle[];
  electiveCourses: TypeCompactCourse[];
  isBundle: boolean;
  isElective: boolean;
  isCancel: boolean;
  hasOptionProduct: boolean;
  paymentPrice: typeof InitializePaymentPrice;
}

export interface TypeUpdatePaymentState {
  type: 'success' | 'cancel';
  state: boolean;
}
