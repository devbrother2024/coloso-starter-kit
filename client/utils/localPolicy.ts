import { TypeVoucherTemplate } from '@/types/voucher';

export interface CalculateVoucherParams {
  voucher: TypeVoucherTemplate;
  salePrice: number;
  taxFreeAmount: number;
}

export interface CalculateVoucherResult {
  discountAmount: number;
  discountTaxFreeAmount: number;
}

export const calculateVoucher = ({
  voucher,
  salePrice,
  taxFreeAmount,
}: CalculateVoucherParams): CalculateVoucherResult => {
  const { discountAmount = 0, discountRate = 0, maxDiscountAmount = 0 } = voucher;

  let calculatedDiscountAmount = discountAmount;

  if (discountRate > 0) {
    calculatedDiscountAmount = Math.floor((salePrice * discountRate) / 100);
    if (maxDiscountAmount > 0) {
      calculatedDiscountAmount = Math.min(calculatedDiscountAmount, maxDiscountAmount);
    }
  }

  const taxFreeRatio = taxFreeAmount / salePrice;
  const discountTaxFreeAmount = Math.floor(calculatedDiscountAmount * taxFreeRatio);

  return {
    discountAmount: calculatedDiscountAmount,
    discountTaxFreeAmount,
  };
};

export const MIN_PAYABLE_PRICE = 1000;

export enum OrderState {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export enum TransactionMethod {
  CARD = 'CARD',
  VIRTUAL_ACCOUNT = 'VIRTUAL_ACCOUNT',
  TRANSFER = 'TRANSFER',
  PHONE = 'PHONE',
  KAKAO_PAY = 'KAKAO_PAY',
  TOSS_PAY = 'TOSS_PAY',
  NAVER_PAY = 'NAVER_PAY',
  PROMOTION = 'PROMOTION',
}

export class DomainError extends Error {
  static INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN';
  static PAGE_SLUG_NOT_FOUND = 'PAGE_SLUG_NOT_FOUND';

  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class PageDefaultException extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'PageDefaultException';
    this.code = code;
  }
}

export interface VoucherTemplateFilter {
  type: 'INCLUDE' | 'EXCLUDE';
  targetName: string;
  targetValue: string;
}

// Validation functions
export const isValidName = (value: string): boolean => {
  const nameRegex = /^[가-힣a-zA-Z\s]{2,50}$/;
  return nameRegex.test(value);
};

export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
};

export const isValidEmailSecret = (value: string): boolean => {
  const emailSecretRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailSecretRegex.test(value);
};

export const isValidPassword = (value: string): boolean => {
  return true;
};

// Voucher related types and functions
export interface VoucherCondition {
  productIds: string[];
  productTypes: string[];
  categoryIds: string[];
  displayIds: number[];
  formatIds: number[];
  courseIds: string[];
}

export class VoucherFilterValidation {
  private condition: VoucherCondition | null = null;

  setCondition(condition: VoucherCondition) {
    this.condition = condition;
  }

  validate(filters: VoucherTemplateFilter[]): boolean {
    if (!this.condition) return false;

    return filters.every((filter) => {
      const { type, targetName, targetValue } = filter;
      const conditionValue = this.condition?.[targetName as keyof VoucherCondition];

      if (!conditionValue) return false;

      const hasValue = Array.isArray(conditionValue)
        ? conditionValue.includes(String(targetValue))
        : conditionValue === targetValue;

      return type === 'INCLUDE' ? hasValue : !hasValue;
    });
  }
}

export const convertToVoucherCondition = (product: any): VoucherCondition => {
  return {
    productIds: [product.id.toString()],
    productTypes: [product.type],
    categoryIds: product.categories?.map((cat: any) => cat.id.toString()) ?? [],
    displayIds: product.displays?.map((display: any) => display.id) ?? [],
    formatIds: product.formats?.map((format: any) => format.id) ?? [],
    courseIds: product.courses?.map((course: any) => course.id.toString()) ?? [],
  };
};
