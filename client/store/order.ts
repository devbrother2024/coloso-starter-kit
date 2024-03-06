import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { InitializePaymentPrice } from '@/policy/purchase';
import { TypeInitialOrderState } from '@/types/order';

const initialOrderState: TypeInitialOrderState = {
  orderDetail: null,
  product: null,
  optionProduct: null,
  courses: [],
  bundleProducts: [],
  optionProducts: [],
  electiveCourses: [],
  usedVoucherId: null,
  isBundle: false,
  isElective: false,
  isCancel: false,
  hasOptionProduct: false,
  paymentPrice: InitializePaymentPrice,
};

let orderStore = proxy<TypeInitialOrderState>({
  ...initialOrderState,
});

const setOrderStore = (state: Partial<TypeInitialOrderState> | null) => {
  orderStore = Object.assign(orderStore, state ? { ...state } : { ...initialOrderState });
};

devtools(orderStore, { name: 'order' });

export { orderStore, initialOrderState, setOrderStore };
