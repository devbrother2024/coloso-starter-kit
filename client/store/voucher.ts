import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { isProd } from '@/client/policy';
import { TypeVoucherTemplate } from '@/types/voucher';

interface TypeVoucherStore {
  downloadVoucherList: TypeVoucherTemplate[];
}

const initialVoucherStore: TypeVoucherStore = {
  downloadVoucherList: [],
};

const voucherStore = proxy<TypeVoucherStore>({ ...initialVoucherStore });

devtools(voucherStore, { name: 'dialog' });

export default voucherStore;
