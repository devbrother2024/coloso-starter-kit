import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { TypeProduct, TypeProductBundle } from '@/types/product';
import { TypeImpData, TypePurchase } from '@/types/purchase';
import { TypeVoucher } from '@/types/voucher';
import { TransactionMethod } from '@/utils/localPolicy';

interface TypePurchaseState extends Omit<TypePurchase, 'vouchers'> {
  selectedProducts: TypeProduct[];
  discountProduct: TypeProduct | null;
  usableVouchers: TypeVoucher[];
  selectedVoucher: TypeVoucher | null;
  selectedPaymentType: string | null;
  courseProduct: TypeProduct[];
  optionProduct: TypeProductBundle[];
  isBundle: boolean;
  isElective: boolean;
  isAllowVouchers: boolean;
  isDeliveryBuyer: boolean;
  isPromotion: boolean;
  callbackUrl: string;
  callPayment: boolean;
  agreements: {
    term: boolean;
    privacy: boolean;
    elective: boolean;
  };
  addressInfo: {
    name: string;
    phone: string;
    postalCode: string;
    address: string;
    addressExtra: string;
    deliveryMemo: string;
  };
}

export const initialPurchaseState: TypePurchaseState = {
  impData: <TypeImpData>{},
  product: <TypeProduct>{},
  bundle: [],
  courseProduct: [],
  optionProduct: [],
  usableVouchers: [],
  selectedProducts: [],
  selectedVoucher: null,
  selectedPaymentType: TransactionMethod.CARD,
  discountProduct: null,
  callbackUrl: '',
  isBundle: false,
  isElective: false,
  isAllowVouchers: false,
  isDeliveryBuyer: false,
  isPromotion: false,
  callPayment: false,
  agreements: {
    term: false,
    privacy: false,
    elective: false,
  },
  addressInfo: {
    name: '',
    phone: '',
    postalCode: '',
    address: '',
    addressExtra: '',
    deliveryMemo: '',
  },
};

let purchaseStore = proxy<TypePurchaseState>({
  ...initialPurchaseState,
});

const setPurchaseStore = (state: Partial<TypePurchaseState>) => {
  purchaseStore = Object.assign(purchaseStore, { ...state });
};

const resetPurchaseStore = () => {
  purchaseStore = Object.assign(purchaseStore, { ...initialPurchaseState });
};

devtools(purchaseStore, { name: 'purchase' });

export { purchaseStore, setPurchaseStore, resetPurchaseStore };
